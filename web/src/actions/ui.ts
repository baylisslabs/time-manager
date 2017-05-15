import { ActionType, ModalActionType, RootFormAction } from "./types";
import { FeedbackMsgAction } from "./types";
import { ModalAction } from "./types";
import { ModalKey } from "../components/modal/keys";
import { FormActionType, FormAction } from "../components/helpers/formRedux";

export function modalOpen(name: ModalKey): ModalAction {
    return {
        type: ActionType.MODAL,
        modalAction: ModalActionType.OPEN,
        name
    };
}

export function modalClose(name: ModalKey): ModalAction {
    return {
        type: ActionType.MODAL,
        modalAction: ModalActionType.CLOSE,
        name
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
