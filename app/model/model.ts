import { Enum } from "typescript-string-enums";

export class Activity {
    constructor(
        readonly _id: string,
        readonly isoDate: string,
        readonly description: string,
        readonly hours: number) {
    }
    static clone(source:Activity, modifers: Partial<Activity>) {
        return { ...source, modifers };
    }
}

export class ActivityFilter {
  constructor(
    //readonly descriptionStartsWith?: string,
    readonly earliestIsoDate?: string,
    readonly latestIsoDateTime?: string) {
  }
  static clone(source:ActivityFilter, modifers: Partial<ActivityFilter>) {
        return { ...source, modifers };
  }
}

export class Authenication {
    constructor(readonly token: string) {
    }
}

/* ordered by privilege level */
export const Role = Enum(
    "admin",
    "userManager",
    "regular"
);

export type Role = Enum<typeof Role>;

export class User {
  constructor(
    readonly email: string,
    readonly password: string,
    readonly role: Role,
    readonly name: string,
    readonly preferrredHours: PreferredHours) {
    }

    static redact(user: User) {
      return new User(user.email,"",user.role,user.name,user.preferrredHours);
    }
    static clone(source:User, modifers: Partial<User>) {
      return { ...source, modifers };
    }
}

export class PreferredHours {
    constructor(
        readonly monday: number,
        readonly tuesday: number,
        readonly wednesday: number,
        readonly thursday: number,
        readonly friday: number,
        readonly saturday: number,
        readonly sunday: number) {
    }

    static clone(source:PreferredHours, modifers: Partial<PreferredHours>) {
      return { ...source, modifers };
    }
}

export enum DaysOfWeek {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

