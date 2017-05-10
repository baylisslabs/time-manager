
import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as expressLogging from "express-logging";
import * as logger from "logops";

export class App {
  private app: express.Express;
  private port: number;

  constructor(port: number) {
    this.port = port;

    this.app = express();

    if(process.env.NODE_ENV != "production") {
      this.app.use(expressLogging(logger));
    }

    this.app.use(bodyParser.json());
    this.app.use(express.static(path.resolve(__dirname,"../www")));

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
  }

  private configureErrorHandler() {
    this.app.use(((err, req, res, next) => {
      //console.error(err);
      if (err.name === 'UnauthorizedError') {
        res.status(401).send({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    }) as any);
  };
}
