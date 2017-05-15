import {User,Role} from "./model";

export class PermissionDeniedError extends Error {
  constructor() {
    super("Permission Denied");
  }
}

export function guardCreateUser(credential: User, newUser: User) {
  if(credential.role === Role.admin) {
      return true;
  }
  if(credential.role === Role.userManager) {
      return true;
  }
  if(credential.role == Role.regular && newUser.role === Role.regular) {
     return true;
  }
  throw new PermissionDeniedError();
}

export function guardListUsers(credential: User) {
    if(credential.role === Role.admin) {
        return true;
    }
    if(credential.role === Role.userManager) {
        return true;
    }
    throw new PermissionDeniedError();
}

export function guardReadUser(credential: User, email: string) {
    if(credential.role === Role.admin) {
        return true;
    }
    if(credential.role === Role.userManager) {
        return true;
    }
    if(credential.role == Role.regular && credential.email === email) {
        return true;
    }
    throw new PermissionDeniedError();
}

export function guardUpdateUser(credential: User, updatedUser: User) {
    if(credential.role === Role.admin) {
        return true;
    }
    if(credential.role === Role.userManager) {
        return true;
    }
    if(credential.role == Role.regular && credential.email === updatedUser.email && updatedUser.role === Role.regular) {
        return true;
    }
    throw new PermissionDeniedError();
}

export function guardDeleteUser(credential: User, email: string) {
    if(credential.role === Role.admin) {
        return true;
    }
    if(credential.role === Role.userManager) {
        return true;
    }
    if(credential.role == Role.regular && credential.email === email) {
        return true;
    }
    throw new PermissionDeniedError();
}

export function guardTrips(credential: User, email: string) {
    if(credential.role === Role.admin) {
        return true;
    }
    if(credential.role === Role.userManager && credential.email === email) {
        return true;
    }
    if(credential.role == Role.regular && credential.email === email) {
        return true;
    }
    throw new PermissionDeniedError();
}
