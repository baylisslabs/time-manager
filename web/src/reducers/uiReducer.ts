import { Action, ActionType, ModalActionType } from "../actions/types";

import { FeedbackMsgAction } from "../actions/types";
import { ModalAction } from "../actions/types";
import { LogOutAction } from "../actions/types";
import { RootFormAction } from "../actions/types";

import { UiState } from "../state";

import { formReducer } from "../components/helpers/formRedux";

export function uiReducer(state = new UiState(), action: Action) {
    switch(action.type) {
        case ActionType.MODAL: return modal(state,action);
        case ActionType.LOG_OUT: return logOut(state,action);
        case ActionType.UPDATE_FEEDBACK_MSG: return updateFeedbackMsg(state,action);
        case ActionType.FORM: return form(state,action);
        default: return state;
    }
}

function modal(state: UiState, action: ModalAction) {
    switch(action.modalAction) {
        case ModalActionType.OPEN: return modalOpen(state,action);
        case ModalActionType.CLOSE: return modalClose(state,action);
        default: return state;
    }
}

function modalOpen(state: UiState, action: ModalAction) {
    return UiState.clone(state,{
        modal: action.name
      });
}

function modalClose(state: UiState, action: ModalAction) {
    if(state.modal===action.name) {
        return UiState.clone(state,{
          modal: null
        });
    }
    return state;
}

function logOut(state: UiState, action: LogOutAction) {
    return UiState.clone(state,{
        modal: null,
        feedbackMsg: null
    });
}

function updateFeedbackMsg(state: UiState, action: FeedbackMsgAction) {
    return UiState.clone(state,{
        feedbackMsg: action.message
    });
}

function form(state: UiState, action: RootFormAction) {
    return UiState.clone(state,{
        form: formReducer(state.form,action.formAction)
    });
}


