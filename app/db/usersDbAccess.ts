import * as mongodb from "mongodb";
import * as bcrypt from "bcrypt";

import {User,Role} from "../model/model";
import {validateCreateUser,validateUpdateUser,validateUserCredential} from "../model/validation";
import has from "../util/has";

const SALT_NUM_HASH_ROUNDS = 10;

export class UsersDbAccess {
  private db: mongodb.Db;

  async get(): Promise<User[]> {
    const collection = await this.usersCollection();
    return new Promise<User[]>((resolve,reject)=>{
      collection.find({},{ email: 1, role: 1, name: 1 }).toArray((error,users)=>{
        if(error) {
          reject(error);
        } else {
          resolve(users);
        }
      });
    });
  }

  async insert(user: User): Promise<User> {
    validateCreateUser(user);
    const hashedPassword = await bcrypt.hash(user.password,SALT_NUM_HASH_ROUNDS) as string;
    user = { ...user, password: hashedPassword };
    const collection = await this.usersCollection();
    return new Promise<User>((resolve,reject)=>{
      collection.insert(user,(error,result)=>{
        if(error) {
          reject(error);
        } else {
          resolve(user);
        }
      });
    });
  }

  async update(email: string, user: Partial<User>): Promise<number> {
    validateUpdateUser(user);
    if (user.password) {
        const hashedPassword = await bcrypt.hash(user.password,SALT_NUM_HASH_ROUNDS) as string;
        user = { ...user, password: hashedPassword };
    }
    const collection = await this.usersCollection();
    return new Promise<number>((resolve,reject)=>{
      collection.update(
        {email: email},
        this.buildUpdate(user),
        (error,result)=>{
        if(error) {
          reject(error);
        } else {
          resolve(result.result.n);
        }
      });
    });
  }

  async getSingle(email: string): Promise<User> {
    const collection = await this.usersCollection();
    return new Promise<User>((resolve,reject)=>{
      collection.findOne(
        {email: email},
        {email: 1, role: 1, name: 1} as any,
        (error,result)=>{
          if(error) {
            reject(error);
          } else {
            resolve(result);
          }
      });
    });
  }

  async getSingleByCredential(user: User): Promise<User> {
    validateUserCredential(user);
    const collection = await this.usersCollection();
    return new Promise<User>((resolve,reject)=>{
      collection.findOne(
        {email: user.email},
        {email: 1, role: 1, password: 1, name: 1} as any,
        (error,result)=>{
          if(error) {
            reject(error);
          } else {
            if(result) {
                bcrypt.compare(user.password, result.password, (error,hashOk) => {
                    if (hashOk) {
                        resolve(result);
                    } else {
                        resolve(null);
                    }
                });
            } else {
                resolve(null);
            }
          }
      });
    });
  }

  async deleteSingle(email: string): Promise<number> {
    const collection = await this.usersCollection();
    return new Promise<number>((resolve,reject)=>{
      collection.deleteOne({email: email},
        (error,result)=>{
          if(error) {
            reject(error);
          } else {
            resolve(result.deletedCount);
          }
      });
    });
  }

  private buildUpdate(user: Partial<User>) {
      const $set:any = {};

      if (has(user, "email")) {
        $set.email = user.email;
      }
      if (has(user, "password")) {
        $set.password = user.password;
      }
      if (has(user, "role")) {
        $set.role = user.role;
      }
      if (has(user, "name")) {
        $set.name = user.name;
      }
      if (has(user, "preferrredHours")) {
        $set.preferrredHours = user.preferrredHours;
      }

      return { $set };
  }


  private async usersCollection() {
    if(!this.db) {
      let server = new mongodb.Server("localhost",27017/*,{ auto_reconnect: true}*/);
      let db = new mongodb.Db("timemanager", server, { w: 1 });
      this.db = await db.open();
    }
    return this.db.collection("users");
  }
}
