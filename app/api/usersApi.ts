
import * as express from "express";
import {UsersDbAccess} from "../db/usersDbAccess";
import {User,Role} from "../model/model";
import * as permissions from "../model/permissions";

export class UsersApi {
  private router: express.Router;
  private usersDb: UsersDbAccess;

  constructor(usersDb: UsersDbAccess) {
    this.usersDb = usersDb;
    this.router = express.Router();
    this.registerRoutes();
  }

  public mount(parent: express.Router, path: string) {
    return parent.use(path,this.router)
  }

  private registerRoutes() {
    // create
    this.router.post("/", (req,res) => {
        const newUserRequest = User.cleanse(req.body as User);
        const userCredential = (req as any).user as User;
        permissions.guardCreateUser(userCredential,newUserRequest);

        this.usersDb.insert(newUserRequest).then(newUser => {
            newUser = User.redact(newUser);
            res.location(`${req.baseUrl}/${newUser.email}`);
            res.status(201).json(newUser);
        }).catch((err: Error) => {
            this.writeError(err,res);
        });
    });

    // list
    this.router.get("/", (req,res) => {
        const userCredential = (req as any).user as User;
        permissions.guardListUsers(userCredential);

        this.usersDb.get().then(users => {
            res.json(users.map(User.redact));
        }).catch((err: Error) => {
          this.writeError(err,res);
        });
    });

    // read
    this.router.get("/:email", (req,res) => {
        const email = req.params.email;
        const userCredential = (req as any).user as User;
        const guard = permissions.guardReadUser(userCredential,email);

        this.usersDb.getSingle(email).then(user => {
            if(!user) {
              res.status(404).end();
            } else {
              guard(user);
              res.json(User.redact(user));
            }
        }).catch((err: Error) => {
          this.writeError(err,res);
        });
    });

    // update
    this.router.put("/:email", (req,res) => {
        const email = req.params.email;
        const updateUserRequest = req.body as User;//User.cleanse(req.body) ;
        const userCredential = (req as any).user as User;
        const guard = permissions.guardUpdateUser(userCredential,email,updateUserRequest);

        this.usersDb.getSingle(email)
        .then(user=>this.maybeGuard(user,guard))
        .then(count=>count?this.usersDb.update(email, updateUserRequest):0)
        .then(count => {
            if(count) {
                res.status(204).end();
            } else {
                res.status(404).end();
            }
        }).catch((err: Error) => {
            this.writeError(err,res);
        });
    });

    // delete
    this.router.delete("/:email", (req,res) => {
        const email = req.params.email;
        const userCredential = (req as any).user as User;
        const guard = permissions.guardDeleteUser(userCredential,email);

        this.usersDb.getSingle(email)
        .then(user=>this.maybeGuard(user,guard))
        .then(count=>count?this.usersDb.deleteSingle(email):0)
        .then(count => {
            if(!count) {
              res.status(404).end();
            } else {
              res.end();
            }
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
