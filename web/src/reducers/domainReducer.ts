
import { Action, ActionType } from "../actions/types";
import { FetchAction, FetchStatus } from "../actions/types";
import { LogOutAction } from "../actions/types";
import { User } from "../../../app/model/model";
import { DomainState } from "../state";

export function domainReducer(state = new DomainState(), action: Action) {
    switch(action.type) {
        case ActionType.FETCH: return fetch(state,action);
        case ActionType.LOG_OUT: return logOut(state,action);
        default: return state;
    }
}

function fetch(state: DomainState, action: FetchAction) {
    if(action.resource==="USERS") {
        return fetchUsers(state,action);
    }
    return state;
}

function fetchUsers(state: DomainState, action: FetchAction) {
    switch(action.status) {
        case FetchStatus.Begin:
            return DomainState.clone(state,{
                users: []
            });
        case FetchStatus.Ok:
            return DomainState.clone(state,{
                users: action.response.users as User[]
            });
        /*case FetchStatus.Error:*/
      }
      return state;
}

function logOut(state: DomainState, action: LogOutAction) {
    return new DomainState();
}
