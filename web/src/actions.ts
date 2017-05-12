
import * as cookie from "./cookie";

export const INIT_SESSION = "INIT_SESSION";
export const FETCH_AUTH = "FETCH_AUTH";
export const MODAL_OPEN = "MODAL_OPEN";
export const MODAL_CLOSE = "MODAL_CLOSE";
export const LOG_OUT = "LOG_OUT";
export const UPDATE_TIME = "UPDATE_TIME";

export enum FetchStatus {
  Begin = 1,
  Ok,
  Error
};

export function fetchAuth(userId: string, password: string) {
    return (dispatch: (action) => void) => {
        dispatch(fetchBegin(FETCH_AUTH));

        /* todo server will do this */
        const sessionId = "ABCD1234";
        cookie.write("sid",sessionId);

        dispatch(fetchOk(FETCH_AUTH,{
            sessionId
        }));
  };
}

export function fetchBegin(type: string) {
  return {
    type,
    status: FetchStatus.Begin,
   };
}

export function fetchOk(type: string, response: any) {
  return {
    type,
    status: FetchStatus.Ok,
    response,
   };
}

export function fetchFailed(type: string, error: Error) {
  return {
    type,
    status: FetchStatus.Error,
    error
  };
}

export function modalOpen(name: string) {
  return {
    type: MODAL_OPEN,
    name
  };
}

export function modalClose(name: string) {
  return {
    type: MODAL_CLOSE,
    name
  };
}


export function logOut() {
    return (dispatch: (action) => void) => {
        cookie.remove("sid");
        dispatch({
            type: LOG_OUT,
        });
  };
}

export function updateTime(timeStamp: number) {
  return {
    type: UPDATE_TIME,
    timeStamp
  };
}

export function initSession(sessionId: string) {
  return {
    type: INIT_SESSION,
    sessionId
  };
}
