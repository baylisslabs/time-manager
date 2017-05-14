import { ActionType, ModalActionType } from "./types";
import { FeedbackMsgAction } from "./types";
import { ModalAction } from "./types";
import { ModalKey } from "../components/modal/keys";

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
