

import { Enum } from "typescript-string-enums";
import { ModalKey } from "../components/modal/keys";

export const ActionType = Enum(
    "FETCH",
    "MODAL",
    "LOG_OUT",
    "UPDATE_TIME",
    "UPDATE_FEEDBACK_MSG",
    "INIT_SESSION"
);

export type ActionType = Enum<typeof ActionType>;

export const ModalActionType = Enum(
    "OPEN",
    "CLOSE",
);

export type ModalActionType = Enum<typeof ModalActionType>;

export type Action =
    FetchAction
    | ModalAction
    | LogOutAction
    | TimeAction
    | FeedbackMsgAction
    | SessionAction;

export interface FetchAction {
    type: typeof ActionType.FETCH;
    resource: string;
    status: FetchStatus;
    response?: any;
    error?: Error;
}

export interface ModalAction {
    type: typeof ActionType.MODAL;
    modalAction: ModalActionType;
    name: ModalKey;
}

export interface LogOutAction {
    type: typeof ActionType.LOG_OUT;
}

export interface TimeAction {
    type: typeof ActionType.UPDATE_TIME;
    timeStamp: number;
}

export interface FeedbackMsgAction {
    type: typeof ActionType.UPDATE_FEEDBACK_MSG;
    message: string;
}

export interface SessionAction {
    type: typeof ActionType.INIT_SESSION;
    sessionId: string;
}

export const FetchStatus = Enum(
    "Begin",
    "Ok",
    "Error"
);

export type FetchStatus = Enum<typeof FetchStatus>;

export interface ActionThunk<T extends { type: ActionType }> {
    (dispatch: (action: T) => void): void;
}