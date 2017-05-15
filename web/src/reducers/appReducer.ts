
import { Action, ActionType } from "../actions/types";

import { FetchAction, FetchStatus } from "../actions/types";
import { TimeAction } from "../actions/types";
import { SessionAction } from "../actions/types";
import { LogOutAction } from "../actions/types";

import { AppState, FetchIndicator } from "../state";

export function appReducer(state = new AppState(), action: Action) {
    switch(action.type) {
        case ActionType.FETCH: return fetchResource(fetch(state,action),action);
        case ActionType.LOG_OUT: return logOut(state,action);
        case ActionType.UPDATE_TIME: return updateTime(state,action);
        case ActionType.INIT_SESSION: return initSession(state,action);
        default: return state;
    }
}

function fetch(state: AppState, action: FetchAction) {
    switch(action.status) {
        case FetchStatus.Begin:
            return AppState.clone(state,{
                fetchState: {
                    resource: action.resource,
                    status: FetchIndicator.InProgress,
                    errorMessage: null
                }
            });
        case FetchStatus.Ok:
            return AppState.clone(state,{
                fetchState: {
                    resource: action.resource,
                    status: FetchIndicator.Success,
                    errorMessage: null
                }
            });
        case FetchStatus.Error:
            return AppState.clone(state,{
                fetchState: {
                    resource: action.resource,
                    status: FetchIndicator.Error,
                    errorMessage: action.error.message
                },
            });
      }
      return state;
}

function fetchResource(state: AppState, action: FetchAction) {
    if(action.resource==="AUTH") {
        return fetchAuth(state,action);
    }
    return state;
}

function fetchAuth(state: AppState, action: FetchAction) {
    switch(action.status) {
        case FetchStatus.Ok:
            return AppState.clone(state,{
                sessionId: action.response.sessionId
            });
        default: return state;
      }
}

function logOut(state: AppState, action: LogOutAction) {
    return AppState.clone(state,{
        sessionId: null
    });
}

function updateTime(state: AppState, action: TimeAction) {
    return AppState.clone(state,{
        timeNow: action.timeStamp
     });
}

function initSession(state: AppState, action: SessionAction) {
    return AppState.clone(state,{
        sessionId: action.sessionId
    });
}