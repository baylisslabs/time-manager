
import { ActionType, ActionThunk } from "./types";
import { LogOutAction, LogInAsAction } from "./types";
import { TimeAction } from "./types";
import { SessionAction } from "./types";
import { User } from "../../../app/model/model";
import * as cookie from "../util/cookie";


export function logOut(): ActionThunk<LogOutAction> {
    return (dispatch: (action: LogOutAction) => void) => {
        cookie.remove("sid");
        dispatch({
            type: ActionType.LOG_OUT,
        });
  };
}

export function logInAs(user: User): LogInAsAction {
    return {
        type: ActionType.LOG_IN_AS,
        user
    };
}

export function updateTime(timeStamp: number): TimeAction {
    return {
        type: ActionType.UPDATE_TIME,
        timeStamp
    };
}

export function initSession(sessionId: string): SessionAction {
    return {
        type: ActionType.INIT_SESSION,
        sessionId
    };
}
