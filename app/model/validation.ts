import {Activity,ActivityFilter,User,Role} from "./model";

export function validateActivity(activity: Activity):void {
    if(!activity) {
        throw Error("activity record must be supplied");
    }
    if(!activity.isoDate) {
        throw Error("isoDate must be supplied");
    }
    if(!activity.description) {
        throw Error("destination must be supplied");
    }
    if(!activity.hours|| !Number(activity.hours)) {
        throw Error("hours must be supplied");
    }
    /*if() {
        throw Error("hours must be in 15 minute increments");
    }*/
}

/*
export function validateActivityFilter(activityFilter: ActivityFilter):void {
  if(activityFilter.earliestTime != null && !Number.isInteger(activityFilter.earliestTime)) {
    throw Error("earliestTime is invalid");
  }
  if(activityFilter.latestTime != null && !Number.isInteger(activityFilter.latestTime)) {
    throw Error("latestTime is invalid");
  }
  if(tripFilter.earliestTime != null && tripFilter.latestTime != null && tripFilter.earliestTime>tripFilter.latestTime) {
    throw Error("latestTime is invalid");
  }
}
*/

export function validateUserCredential(user: User):void {
  if(!user) {
    throw Error("user record must be supplied");
  }
  if(!user.email) {
    throw Error("email must be supplied");
  }
  if(!user.password) {
    throw Error("password must be supplied");
  }
}

export function validateUser(user: User, passwordRequired = true):void {
  if(!user) {
    throw Error("user record must be supplied");
  }
  if(!user.email) {
    throw Error("email must be supplied");
  }
  if(passwordRequired && !user.password) {
    throw Error("password must be supplied");
  }
  if(!user.role) {
    throw Error("role must be supplied");
  }
  if(!user.name) {
    throw Error("name must be supplied");
  }
  if(user.role != Role.regular && user.role != Role.userManager && user.role != Role.admin) {
      throw Error("role is invalid");
  }

  /*if(!/^[0-9a-zA-Z]{3,24}$/.test(user.email)) {
      throw Error("email is invalid");
  }*/

  if(user.password) {
    if(!/^.{8,24}$/.test(user.password)) {
      throw Error("password is invalid"); /* todo: ui - rules */
    }
  }
}
