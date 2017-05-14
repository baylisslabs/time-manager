
import { Action, ActionType } from "../actions/types";
import { DomainState } from "../state";

export function domainReducer(state = new DomainState(), action: Action) {
    return state;
}

