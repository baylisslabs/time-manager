import * as cookie from "../util/cookie";
import { User } from "../../../app/model/model";
import { Action, ActionType, ActionThunk } from "./types";
import { FetchAction, FetchStatus, ResourceId } from "./types";
import { createFormAction } from "./ui";
import { formInit,formSetMessage } from "../components/helpers/formRedux";
import { userFromToken } from "../identity";

export function fetchAuth(email: string, password: string): ActionThunk<Action> {
    return (dispatch: (action: Action) => void) => {
        dispatch(fetchBegin("AUTH"));

        return fetch("/authentication", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        .then(checkResponseStatus)
        .then(parseJSON)
        .then(json => {
            cookie.write("sid",json.token); /* todo: use sid+http-only token technique */
            dispatch(fetchOk("AUTH",{
                authToken: json.token,
                sessionId: json.token
            }));
        })
        .catch(error => {
            dispatch(createFormAction(formInit("login",{})));
            dispatch(createFormAction(formSetMessage("login",
                error.statusCode && error.statusCode === 401 ?
                    "Invalid user name or password"
                    : "An error occurred. Please try again")));
            dispatch(fetchFailed("AUTH",error));
        });
    };
}

export function fetchUsers(authToken: string, /* filter ... */): ActionThunk<Action> {
    return (dispatch: (action) => void) => {
        dispatch(fetchBegin("USERS"));

        return fetch(`/users`, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            },
            cache: "no-store"
        })
        .then(checkResponseStatus)
        .then(parseJSON)
        .then(json => dispatch(fetchOk("USERS", { users: json })))
        .catch(error => dispatch(fetchFailed("USERS", error)));
    };
}

export function fetchBegin(resource: ResourceId): FetchAction {
    return {
        type: ActionType.FETCH,
        resource,
        status: FetchStatus.Begin,
    };
}

export function fetchOk(resource: ResourceId, response: any): FetchAction {
    return {
        type: ActionType.FETCH,
        resource,
        status: FetchStatus.Ok,
        response,
    };
}

export function fetchFailed(resource: ResourceId, error: Error): FetchAction {
    return {
        type: ActionType.FETCH,
        resource,
        status: FetchStatus.Error,
        error
    };
}

export class FetchResponseError extends Error {
  constructor(public statusCode: string, message: string) {
    super(message);
        console.log("FetchResponseError",statusCode,message);
  }
}

/* helpers */
function parseJSON(response) {
  return response.json()
}

function checkResponseStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const contentType = response.headers.get("content-type");
    if(contentType && contentType.indexOf("application/json") !== -1) {
      return response.json().then(function(json) {
        throw new FetchResponseError(response.status, json.message);
      });

    } else {
      throw new FetchResponseError(response.status, response.statusText);
    }
  }
}
