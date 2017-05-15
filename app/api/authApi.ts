
import * as express from "express";
import * as jwt from "jsonwebtoken";
import {UsersDbAccess} from "../db/usersDbAccess";
import {User,Role,Authenication} from "../model/model";

export class AuthApi {
  private router: express.Router;
  private usersDb: UsersDbAccess;
  private expirySeconds = 1440 * 60; // 24 hours
  private sharedSecret: string;

  constructor(usersDb: UsersDbAccess, sharedSecret: string) {
    this.usersDb = usersDb;
    this.sharedSecret = sharedSecret;
    this.router = express.Router();
    this.registerRoutes();
  }

  public mount(parent: express.Router, path: string) {
    return parent.use(path,this.router)
  }

  private registerRoutes() {
    // create
    this.router.post("/", (req,res) => {
        let userCredential = req.body as User;

        this.usersDb.getSingleByCredential(userCredential).then(user => {
            if(user && user.email === userCredential.email) {
              user = User.redact(user);
              const auth = new Authenication(jwt.sign(user, this.sharedSecret, {
                 expiresIn: this.expirySeconds,
                 issuer: "//timemanager.com.au",
                 audience: "//users"
               }));
              res.json(auth);
            } else {
              res.location(req.baseUrl);
              res.status(401).end();
            }
        }).catch((err: Error) => {
          this.writeError(err,res);
        });
    });
  }

  private writeError(err: Error, res: express.Response) {
    res.status(500).json({
      message: err.message
    });
  }
}
