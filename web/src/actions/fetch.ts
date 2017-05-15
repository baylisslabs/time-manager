import { Action, ActionType, ActionThunk } from "./types";
import { FetchAction, FetchStatus } from "./types";
import { createFormAction } from "./ui";
import { formInit,formSetMessage } from "../components/helpers/formRedux";
import * as cookie from "../util/cookie";

export function fetchAuth(userId: string, password: string): ActionThunk<Action> {
    return (dispatch: (action: Action) => void) => {
        dispatch(fetchBegin("AUTH"));

        /* todo server will do this */
        setTimeout(()=>{
            if(userId=="foo@foo.com") {
                dispatch(createFormAction(formInit("login",{})));
                dispatch(createFormAction(formSetMessage("login","Invalid user name or password")));
                dispatch(fetchFailed("AUTH",new Error("Error")));
            } else {
                const sessionId = "ABCD1234";
                cookie.write("sid",sessionId);

                dispatch(fetchOk("AUTH",{
                    sessionId
                }));
            }
        },2000);
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

export function fetchFailed(resource: string, error: Error): FetchAction {
    return {
        type: ActionType.FETCH,
        resource,
        status: FetchStatus.Error,
        error
    };
}