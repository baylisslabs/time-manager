
import * as express from "express";
import * as bodyParser from "body-parser";

export class App {
  private app: express.Express;
  private port: number;

  constructor(port: number) {
    this.port = port;

    this.app = express();

    this.app.use(bodyParser.json());
    this.app.use(express.static('dist/www'))

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
