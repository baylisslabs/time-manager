import { Enum } from "typescript-string-enums";

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

