import { ActionType, ActionThunk } from "./types";
import { FetchAction, FetchStatus } from "./types";
import * as cookie from "../util/cookie";

export function fetchAuth(userId: string, password: string): ActionThunk<FetchAction> {
    return (dispatch: (action: FetchAction) => void) => {
        dispatch(fetchBegin("AUTH"));

        /* todo server will do this */
        const sessionId = "ABCD1234";
        cookie.write("sid",sessionId);

        dispatch(fetchOk("AUTH",{
            sessionId
        }));
  };
}

export function fetchBegin(resource: string): FetchAction {
    return {
        type: ActionType.FETCH,
        resource,
        status: FetchStatus.Begin,
    };
}

export function fetchOk(resource: string, response: any): FetchAction {
    return {
        type: ActionType.FETCH,
        resource,
        status: FetchStatus.Ok,
        response,
    };
}

export function fetchFailed(type: ActionType,  resource: string, error: Error): FetchAction {
    return {
        type: ActionType.FETCH,
        resource,
        status: FetchStatus.Error,
        error
    };
}