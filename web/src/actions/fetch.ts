import * as cookie from "../util/cookie";
import { User } from "../../../app/model/model";
import { Action, ActionType, ActionThunk } from "./types";
import { FetchAction, FetchStatus, ResourceId } from "./types";
import { createFormAction, modalClose } from "./ui";
import { ModalKey } from "../components/modal/keys";
import { formInit,formSetMessage } from "../components/helpers/formRedux";
import { userFromToken } from "../identity";

export function fetchAuth(email: string, password: string): ActionThunk<Action> {
    return (dispatch: (action: Action) => void) => {
        dispatch(fetchBegin("AUTH"));

        fetch("/authentication", {
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

        fetch(`/users`, {
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

export function updateUser(authToken: string, email: string, user: Partial<User>, ui: { formId: string, modalKey: ModalKey } ) {
    return (dispatch: (action) => void) => {
        dispatch(fetchBegin("USER_UPDATE"));

        fetch(`/users/${encodeURIComponent(email)}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(checkResponseStatus)
        .then(() => {
            if(ui && ui.modalKey) {
                dispatch(modalClose(ui.modalKey));
                if(ui.modalKey==ModalKey.CHANGE_ROLE) {
                    dispatch(fetchUsers(authToken));
                }
            }
            dispatch(fetchOk("USER_UPDATE", {}));
        })
        .catch(error => {
            if(ui && ui.formId) {
                dispatch(createFormAction(formSetMessage(ui.formId, error.message.toString())));
            }
            dispatch(fetchFailed("USER_UPDATE", error))
        });
    };
}

export function deleteUser(authToken: string, email: string, ui: { formId: string, modalKey: ModalKey } ) {
    return (dispatch: (action) => void) => {
        dispatch(fetchBegin("USER_DELETE"));

        fetch(`/users/${encodeURIComponent(email)}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${authToken}`,
            }
        })
        .then(checkResponseStatus)
        .then(() => {
            if(ui && ui.modalKey) {
                dispatch(modalClose(ui.modalKey));
                if(ui.modalKey==ModalKey.DELETE_ACCOUNT) {
                    dispatch(fetchUsers(authToken));
                }
            }
            dispatch(fetchOk("USER_DELETE", {}));
        })
        .catch(error => {
            if(ui && ui.formId) {
                dispatch(createFormAction(formSetMessage(ui.formId, error.message.toString())));
            }
            dispatch(fetchFailed("USER_DELETE", error))
        });
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
