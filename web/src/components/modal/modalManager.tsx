import * as React from "react";
import { connect } from "react-redux";
import { State } from "../../state";

import PasswordReset from "./passwordReset";
import AddTimeRecord from "./addTimeRecord";
import EditTimeRecord from "./EditTimeRecord";
import DeleteTimeRecord from "./DeleteTimeRecord";

import {
    PASSWORD_RESET,
    ADD_TIME_RECORD,
    EDIT_TIME_RECORD,
    DELETE_TIME_RECORD
} from "./modals";

function mapStateToProps(state: State) {
    return { modal: state.modal }
}


const ModalManager = ({modal}) => {
    switch(modal) {
        case PASSWORD_RESET: return <PasswordReset/>
        case ADD_TIME_RECORD: return <AddTimeRecord/>
        case EDIT_TIME_RECORD: return <EditTimeRecord/>
        case DELETE_TIME_RECORD: return <DeleteTimeRecord/>
        default: return null;
    }
};

export default connect(mapStateToProps)(ModalManager);

