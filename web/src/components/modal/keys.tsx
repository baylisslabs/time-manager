import { Enum } from "typescript-string-enums";
import { User } from "../../../../app/model/model";

export const ModalKey = Enum(
    "PASSWORD_RESET",
    "ADD_TIME_RECORD",
    "EDIT_TIME_RECORD",
    "DELETE_TIME_RECORD",
    "ERROR_ALERT",
    /* admin */
    "ADMIN_PASSWORD_RESET",
    "CHANGE_ROLE",
    "DELETE_ACCOUNT"
);

export type ModalKey = Enum<typeof ModalKey>;

export type SimpleModalKey = typeof ModalKey.PASSWORD_RESET
    | typeof ModalKey.ADD_TIME_RECORD
    | typeof ModalKey.EDIT_TIME_RECORD
    | typeof ModalKey.DELETE_TIME_RECORD
    | typeof ModalKey.ERROR_ALERT;

export type ModalContext = SimpleModal | AdminModal;

export interface SimpleModal {
    readonly key: SimpleModalKey;
}

export interface AdminModal {
    readonly key: typeof ModalKey.CHANGE_ROLE | typeof ModalKey.DELETE_ACCOUNT | typeof ModalKey.ADMIN_PASSWORD_RESET,
    readonly user: User
}