
import * as express from "express";
import * as jwt from "express-jwt";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as expressLogging from "express-logging";
import * as logger from "logops";

//import {ActivityDbAccess} from "./db/activityDbAccess";
import {UsersDbAccess} from "./db/usersDbAccess";
//import {ActivityApi} from "./api/activityApi";
import {UsersApi} from "./api/usersApi";
import {AuthApi} from "./api/authApi";
import {PermissionDeniedError} from "./model/permissions";


export class App {
  private app: express.Express;
  private port: number;
  private jwtSecretKey: string;

  constructor(port: number) {
    this.port = port;
    this.jwtSecretKey = "DNj4B400AEtu79us8ccOk9p9Fy3062e3";

    this.app = express();

    if(process.env.NODE_ENV != "production") {
      this.app.use(expressLogging(logger));
    }

    this.configureAuth();
    this.app.use(bodyParser.json());
    this.app.use(express.static(path.resolve(__dirname,"../www")));

    /*let activityDb = new ActivityDbAccess();
    let activityApi = new ActivtyApi(activityDb);
    activityApi.mount(this.app,"/users/:email/activities");*/

    let usersDb = new UsersDbAccess();
    let usersApi = new UsersApi(usersDb);
    usersApi.mount(this.app,"/users");

    let authApi = new AuthApi(usersDb,this.jwtSecretKey);
    authApi.mount(this.app,"/authentication");

    /* fallback */
    this.app.get('/*', (req,res) => {
      res.sendFile(path.resolve(__dirname, "../www/index.html"));
    });

    this.configureErrorHandler();
  }

  start() {
    this.app.listen(this.port, () => {
        console.log("timemanager server listening on port %d", this.port);
      });
  }

  private configureAuth() {
      let jwtHandler = jwt({
        secret: this.jwtSecretKey,
        audience: "//users",
        issuer: "//timemanager.com.au" });

    this.app.use("/users",jwtHandler);
  }

  private configureErrorHandler() {
    this.app.use(((err, req, res, next) => {
      //console.error(err);
      if (err.name === 'UnauthorizedError') {
        res.status(401).send({ message: err.message });
      } else if (err instanceof PermissionDeniedError) {
        res.status(403).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    }) as any);
  };
}
