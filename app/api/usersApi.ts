
import * as express from "express";
import {UsersDbAccess} from "../db/usersDbAccess";
import {IdentityService} from "../service/identityService";
import {User,Role} from "../model/model";
import * as permissions from "../model/permissions";

export class UsersApi {
  private router: express.Router;
  private usersDb: UsersDbAccess;
  private identityService: IdentityService;

  constructor(usersDb: UsersDbAccess, identityService: IdentityService) {
    this.usersDb = usersDb;
    this.identityService = identityService;
    this.router = express.Router();
    this.registerRoutes();
  }

  public mount(parent: express.Router, path: string) {
    return parent.use(path,this.router)
  }

  private registerRoutes() {
    // create
    this.router.post("/", (req,res) => {
        const newUserRequest = User.cleanse(req.body);
        this.identityService.verifyUserClaim((req as any).user)
            .then(userCredential=>permissions.guardCreateUser(userCredential,newUserRequest))
            .then(()=>this.usersDb.insert(newUserRequest))
            .then(newUser => {
                newUser = User.redact(newUser);
                res.location(`${req.baseUrl}/${newUser.email}`);
                res.status(201).json(newUser);
            }).catch((err: Error) => {
                this.writeError(err,res);
            });
    });

    // list
    this.router.get("/", (req,res) => {
        this.identityService.verifyUserClaim((req as any).user)
            .then(userCredential=>permissions.guardListUsers(userCredential))
            .then(()=>this.usersDb.get())
            .then(users => {
                res.json(users.map(User.redact));
            }).catch((err: Error) => {
            this.writeError(err,res);
            });
    });

    // read
    this.router.get("/:email", (req,res) => {
        const email = req.params.email;
        this.identityService.verifyUserClaim((req as any).user)
            .then(userCredential=>permissions.guardReadUser(userCredential,email))
            .then(guard=>{
                this.usersDb.getSingle(email).then(user => {
                    if(!user) {
                        res.status(404).end();
                    } else {
                        guard(user);
                        res.json(User.redact(user));
                    }
                });
            }).catch((err: Error) => {
                this.writeError(err,res);
            });
    });

    // update
    this.router.put("/:email", (req,res) => {
        const email = req.params.email;
        const updateUserRequest = User.cleanse(req.body);
        this.identityService.verifyUserClaim((req as any).user)
            .then(userCredential=>permissions.guardUpdateUser(userCredential,email,updateUserRequest))
            .then(guard=>{
                this.usersDb.getSingle(email)
                    .then(user=>this.maybeGuard(user,guard))
                    .then(count=>count?this.usersDb.update(email, updateUserRequest):0)
                    .then(count => {
                        if(count) {
                            res.status(204).end();
                        } else {
                            res.status(404).end();
                        }
                    });
            }).catch((err: Error) => {
                this.writeError(err,res);
            });
    });

    // delete
    this.router.delete("/:email", (req,res) => {
        const email = req.params.email;
        this.identityService.verifyUserClaim((req as any).user)
            .then(userCredential=>permissions.guardDeleteUser(userCredential,email))
            .then(guard=>{
                this.usersDb.getSingle(email)
                .then(user=>this.maybeGuard(user,guard))
                .then(count=>count?this.usersDb.deleteSingle(email):0)
                .then(count => {
                    if(!count) {
                    res.status(404).end();
                    } else {
                    res.end();
                }
                });
            }).catch((err: Error) => {
            this.writeError(err,res);
            });
    });
  }

  private writeError(err: Error, res: express.Response) {
    if(err.message && err.message.startsWith("E11000")) {
      res.status(409).json({
        message: "email already in use"
      });
    } else {
      res.status(500).json({
        message: err.message
      });
    }
  }

  private maybeGuard(user: User, guard: permissions.Guard<User>) {
      if(user) {
          guard(user);
          return 1;
      }
      return 0;
  }
}
