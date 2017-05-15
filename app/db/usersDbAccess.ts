import * as mongodb from "mongodb";
import * as bcrypt from "bcrypt";

import {User,Role} from "../model/model";
import {validateUser,validateUserCredential} from "../model/validation";

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
    validateUser(user);
    /* todo: cleanse data */
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

  async update(user: User): Promise<number> {
    validateUser(user,false);
    /* todo: cleanse data */
    const collection = await this.usersCollection();
    return new Promise<number>((resolve,reject)=>{
      collection.update(
        {email: user.email},
        !user.password ? {  $set: { role: user.role } } : { $set: { password: user.password, role: user.role } },
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
        {email: 1, role: 1} as any,
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

  private async usersCollection() {
    if(!this.db) {
      let server = new mongodb.Server("localhost",27017/*,{ auto_reconnect: true}*/);
      let db = new mongodb.Db("timemanager", server, { w: 1 });
      this.db = await db.open();
    }
    return this.db.collection("users");
  }
}
