import * as React from "react";
import { connect } from "react-redux";
import { State } from "../../state";

import PasswordReset from "./passwordReset";
import AddTimeRecord from "./addTimeRecord";
import EditTimeRecord from "./editTimeRecord";
import DeleteTimeRecord from "./deleteTimeRecord";
import ErrorAlert from "./errorAlert";
import DeleteAccount from "./deleteAccount";
import AdminPasswordReset from "./adminPasswordReset";
import ChangeRole from "./changeRole";

import {
    PASSWORD_RESET,
    ADD_TIME_RECORD,
    EDIT_TIME_RECORD,
    DELETE_TIME_RECORD,
    ERROR_ALERT,
    DELETE_ACCOUNT,
    ADMIN_PASSWORD_RESET,
    CHANGE_ROLE
} from "./modals";

function mapStateToProps(state: State) {
    return { modal: state.modal }
}


const ModalManager = ({modal}) => {
    switch(modal) {
        case PASSWORD_RESET: return <PasswordReset/>;
        case ADD_TIME_RECORD: return <AddTimeRecord/>;
        case EDIT_TIME_RECORD: return <EditTimeRecord/>;
        case DELETE_TIME_RECORD: return <DeleteTimeRecord/>;
        case ERROR_ALERT: return <ErrorAlert/>;
        /* admin */
        case DELETE_ACCOUNT: return <DeleteAccount/>;
        case ADMIN_PASSWORD_RESET: return <AdminPasswordReset/>;
        case CHANGE_ROLE: return <ChangeRole/>;
        default: return null;
    }
};

export default connect(mapStateToProps)(ModalManager);

