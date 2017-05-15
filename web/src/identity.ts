import * as jwtDecode from "jwt-decode";
import { User } from "../../app/model/model";
import { State } from "./State";

export function userFromToken(token: string) : User {
    return jwtDecode(token) as User;
}

export function userFromState(state: State) : User {
    return jwtDecode(state.app.sessionId) as User;
}


