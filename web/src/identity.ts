import * as jwtDecode from "jwt-decode";
import { User } from "../../app/model/model";
import { State } from "./State";

export function userFromToken(token: string) : User {
    return jwtDecode(token) as User;
}

export function userFromState(state: State) : User {
    if(state.app.loggedInAs && state.app.sessionId) {
        return state.app.loggedInAs;
    }
    return jwtDecode(state.app.sessionId) as User;
}


