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

import { ModalContext, ModalKey } from "./keys";

function mapStateToProps(state: State) {
    return { modal: state.ui.modal }
}

const ModalManager = (props: { modal: ModalContext } ) => {
    const { modal } = props;
    if(modal) {
        switch(modal.key) {
            case ModalKey.PASSWORD_RESET: return <PasswordReset/>;
            case ModalKey.ADD_TIME_RECORD: return <AddTimeRecord/>;
            case ModalKey.EDIT_TIME_RECORD: return <EditTimeRecord/>;
            case ModalKey.DELETE_TIME_RECORD: return <DeleteTimeRecord/>;
            case ModalKey.ERROR_ALERT: return <ErrorAlert/>;
            /* admin */
            case ModalKey.DELETE_ACCOUNT: return <DeleteAccount user={modal.user}/>;
            case ModalKey.ADMIN_PASSWORD_RESET: return <AdminPasswordReset/>;
            case ModalKey.CHANGE_ROLE: return <ChangeRole user={modal.user}/>;
        }
    }
    return null;
};

export default connect(mapStateToProps)(ModalManager);

