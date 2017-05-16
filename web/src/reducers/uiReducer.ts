import { Action, ActionType, ModalActionType } from "../actions/types";

import { FeedbackMsgAction } from "../actions/types";
import { ModalAction } from "../actions/types";
import { LogOutAction,LogInAsAction } from "../actions/types";
import { RootFormAction } from "../actions/types";

import { UiState } from "../state";

import { formReducer } from "../components/helpers/formRedux";

export function uiReducer(state = new UiState(), action: Action) {
    switch(action.type) {
        case ActionType.MODAL: return modal(state,action);
        case ActionType.LOG_OUT: return logOut(state,action);
        case ActionType.LOG_IN_AS: return logInAs(state,action);
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
        modal: action.modal
      });
}

function modalClose(state: UiState, action: ModalAction) {
    if(state.modal.key===action.key) {
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

function logInAs(state: UiState, action: LogInAsAction) {
    if(action.user) {
        return UiState.clone(state,{
            feedbackMsg: `Logged in as ${action.user.name} (${action.user.email})`
        });
    }
    return state;
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


