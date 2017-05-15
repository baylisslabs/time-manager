
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
        const newUserRequest = req.body as User;
        const userCredential = (req as any).user as User;
        permissions.guardCreateUser(userCredential,newUserRequest);
        /* todo: salt the password */
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
    this.router.get("/:userId", (req,res) => {
        const id = req.params.userId;
        const userCredential = (req as any).user as User;
        permissions.guardReadUser(userCredential,id);

        this.usersDb.getSingle(id).then(user => {
            if(!user) {
              res.status(404).end();
            } else {
              res.json(User.redact(user));
            }
        }).catch((err: Error) => {
          this.writeError(err,res);
        });
    });

    // update
    this.router.put("/:userId", (req,res) => {
        const email = req.params.email;
        const updateUserRequest = User.clone((req.body as User),{email: email});
        const userCredential = (req as any).user as User;
        permissions.guardUpdateUser(userCredential,updateUserRequest);
        /* todo: salt the password */
        this.usersDb.update(updateUserRequest).then(count => {
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
    this.router.delete("/:userId", (req,res) => {
        const id = req.params.userId;
        const userCredential = (req as any).user as User;
        permissions.guardDeleteUser(userCredential,id);

        this.usersDb.deleteSingle(id).then(count => {
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
}
