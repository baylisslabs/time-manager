
import { Action, ActionType } from "../actions/types";

import { FetchAction, FetchStatus } from "../actions/types";
import { TimeAction } from "../actions/types";
import { SessionAction } from "../actions/types";

import { AppState } from "../state";

export function appReducer(state = new AppState(), action: Action) {
    switch(action.type) {
        case ActionType.FETCH: return fetch(state,action);
        case ActionType.LOG_OUT: return logOut(state,action);
        case ActionType.UPDATE_TIME: return updateTime(state,action);
        case ActionType.INIT_SESSION: return initSession(state,action);
        default: return state;
    }
}
function fetch(state: AppState, action: FetchAction) {
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
      }
      return state;
}

function logOut(state: AppState, action: Action) {
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