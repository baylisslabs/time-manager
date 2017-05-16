
import { UsersDbAccess } from "../db/usersDbAccess";
import { User, Role } from "../model/model";

export class UnauthorizedError extends Error {
    constructor() {
        super("UnauthorizedError");
    }
}

export class IdentityService {
    private usersDb: UsersDbAccess;

    constructor(usersDb: UsersDbAccess) {
        this.usersDb = usersDb;
    }

    async verifyUserClaim(claim: User): Promise<User> {
        const user = await this.usersDb.getSingle(claim.email);
        if (user) {
            if(user.email===claim.email
            && user.role===claim.role) {
                return user;
            }
        }
        throw new UnauthorizedError();
    }
}