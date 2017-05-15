

import { Enum } from "typescript-string-enums";
import { ModalKey } from "../components/modal/keys";
import { FormActionType, FormAction } from "../components/helpers/formRedux";

export const ActionType = Enum(
    "FETCH",
    "MODAL",
    "LOG_OUT",
    "UPDATE_TIME",
    "UPDATE_FEEDBACK_MSG",
    "INIT_SESSION",
    "FORM"
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
    | SessionAction
    | RootFormAction;

export type ResourceId =
    "AUTH" | "USERS";

export interface FetchAction {
    readonly type: typeof ActionType.FETCH;
    readonly resource: ResourceId;
    readonly status: FetchStatus;
    readonly response?: any;
    readonly error?: Error;
}

export interface ModalAction {
    readonly type: typeof ActionType.MODAL;
    readonly modalAction: ModalActionType;
    readonly name: ModalKey;
}

export interface LogOutAction {
    readonly type: typeof ActionType.LOG_OUT;
}

export interface TimeAction {
    readonly type: typeof ActionType.UPDATE_TIME;
    readonly timeStamp: number;
}

export interface FeedbackMsgAction {
    readonly type: typeof ActionType.UPDATE_FEEDBACK_MSG;
    readonly message: string;
}

export interface SessionAction {
    readonly type: typeof ActionType.INIT_SESSION;
    readonly sessionId: string;
}

export interface RootFormAction {
    readonly type: typeof ActionType.FORM;
    readonly formAction: FormAction;
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