import { ActionType, ModalActionType, RootFormAction } from "./types";
import { FeedbackMsgAction } from "./types";
import { ModalAction } from "./types";
import { ModalKey, SimpleModalKey, ModalContext } from "../components/modal/keys";
import { FormActionType, FormAction } from "../components/helpers/formRedux";

export function modalOpen(key: SimpleModalKey): ModalAction {
    return {
        type: ActionType.MODAL,
        modalAction: ModalActionType.OPEN,
        modal : { key },
        key
    };
}

export function modalOpenWithContext(modal: ModalContext): ModalAction {
    return {
        type: ActionType.MODAL,
        modalAction: ModalActionType.OPEN,
        modal,
        key: modal.key
    };
}

export function modalClose(key: ModalKey): ModalAction {
    return {
        type: ActionType.MODAL,
        modalAction: ModalActionType.CLOSE,
        modal: null,
        key
    };
}

export function updateFeedbackMsg(message: string): FeedbackMsgAction {
    return {
        type: ActionType.UPDATE_FEEDBACK_MSG,
        message
    };
}

export function createFormAction(formAction: FormAction) : RootFormAction {
    return {
        type: ActionType.FORM,
        formAction
    };
}
