import {User,Role} from "./model";
import has from "../util/has";

export class PermissionDeniedError extends Error {
  constructor() {
    super("Permission Denied");
  }
}

export interface Guard<T> {
    (value: T): void;
}

/* sign up first - then user's role is upgraded by an admin */
export function guardCreateUser(credential: User, newUser: User) {
    if(credential.role === Role.admin && newUser.role === Role.regular) {
        return true;
    }
    if(credential.role === Role.userManager && newUser.role === Role.regular) {
        return true;
    }
    if(credential.role == Role.regular && newUser.role === Role.regular) {
        return true;
    }
    throw new PermissionDeniedError();
}

/* regular users can't list accounts */
export function guardListUsers(credential: User) {
    if(credential.role === Role.admin) {
        return true;
    }
    if(credential.role === Role.userManager) {
        return true;
    }
    throw new PermissionDeniedError();
}

export function guardReadUser(credential: User, email: string,): Guard<User> {
    if(credential.role === Role.admin) {
        return ()=>{};
    }
    if(credential.role === Role.userManager) {
        return makeGuard<User>(user=>user.role === Role.regular);
    }
    if(credential.role == Role.regular && credential.email === email) {
        return ()=>{};
    }
    throw new PermissionDeniedError();
}

export function guardUpdateUser(credential: User, email: string, update: Partial<User>): Guard<User> {
    if(credential.role === Role.admin) {
        if(credential.email !== email || !has(update,"role")) {
            return ()=>{};
        }
    }
    if(credential.role === Role.userManager) {
        if(!has(update,"role")) {
            return makeGuard<User>(user=>user.role === Role.regular);
        }
    }
    if(credential.role === Role.regular && credential.email === email) {
        if(!has(update,"role")) {
            return ()=>{};
        }
    }
    throw new PermissionDeniedError();
}

export function guardDeleteUser(credential: User, email: string): Guard<User> {
    if(credential.role === Role.admin) {
        if(credential.email !== email) {
            return ()=>{};
        }
    }
    if(credential.role === Role.userManager) {
        if(credential.email !== email) {
            return makeGuard<User>(user=>user.role === Role.regular);
        }
    }
    throw new PermissionDeniedError();
}

export function guardActivities(credential: User, email: string): Guard<User> {
    if(credential.role === Role.admin) {
        return ()=>{};
    }
    if(credential.role === Role.userManager) {
        return makeGuard<User>(user=>user.role === Role.regular);
    }
    if(credential.role == Role.regular && credential.email === email) {
        return ()=>{};
    }
    throw new PermissionDeniedError();
}

function makeGuard<T>(pred: (value: T) => boolean) {
    return (value) => {
        if (!pred(value)) {
            throw new PermissionDeniedError();
        }
    }
}