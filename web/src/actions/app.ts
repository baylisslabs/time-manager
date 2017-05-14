
import { ActionType, ActionThunk } from "./types";
import { LogOutAction } from "./types";
import { TimeAction } from "./types";
import { SessionAction } from "./types";
import * as cookie from "../util/cookie";


export function logOut(): ActionThunk<LogOutAction> {
    return (dispatch: (action: LogOutAction) => void) => {
        cookie.remove("sid");
        dispatch({
            type: ActionType.LOG_OUT,
        });
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
