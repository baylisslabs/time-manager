import * as mongodb from "mongodb";
import * as bcrypt from "bcrypt";

async function configure() {
  let server = new mongodb.Server("localhost",27017);
  let db = new mongodb.Db("timemanager", server, { w: 1 });
  await db.open();

  let usersCollection = db.collection("users");
  let salt = bcrypt.genSaltSync();
  usersCollection.createIndex( { email: 1 }, { unique: true });
  usersCollection.save({ _id: "1", email: "admin@bayliss-it.com.au", password: bcrypt.hashSync("secret",salt), role: "admin", name: "Administrator" });
  usersCollection.save({ _id: "2", email: "chris@bayliss-it.com.au", password: bcrypt.hashSync("secret",salt), role: "regular", name: "Chris B" });

  db.close();
}

configure();
