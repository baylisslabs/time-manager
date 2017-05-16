import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { Enum } from "typescript-string-enums";
import { State, FetchIndicator } from "../../state";
import { modalClose } from "../../actions/ui";
import { deleteUser } from "../../actions/fetch";
import { User,Role } from "../../../../app/model/model";
import { ModalKey } from "./keys";


import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Chip from "material-ui/Chip";
import TextField from "material-ui/TextField";
import AutoComplete from "material-ui/AutoComplete";
import DatePicker from "material-ui/DatePicker";
import LinearProgress from 'material-ui/LinearProgress';
import { red500, white } from "material-ui/styles/colors";

import { Flex, Box } from "reflexbox";

import FormMessage from "./formMessage";
import { connectSelectField, connectForm } from "../helpers/formConnect";
import { Dict } from "../helpers/dict";

interface DeleteAccountProps {
    readonly dispatch: Dispatch<any>;
    readonly onValidate: () => boolean;
    readonly formValues: Dict<string>;
    readonly busy: boolean;
    readonly sessionId; string;
    readonly formMessage: string;
    readonly user: User;
}

const formConfig = {
    formId: "deleteAccount"
};

function mapStateToProps(state: State, ownProps: DeleteAccountProps) {
    const sessionId = state.app.sessionId;
    const fetchState = state.app.fetchState;
    const busy = (fetchState && fetchState.status == FetchIndicator.InProgress);
    return { ...ownProps, sessionId, busy };
}

const DeleteAccount = (props: DeleteAccountProps) => {
    const { dispatch, busy, sessionId, onValidate, formMessage } = props;

    const changeRoleAction = () => {
        if(onValidate()) {
            dispatch(deleteUser(sessionId, props.user.email, { formId: formConfig.formId, modalKey: ModalKey.DELETE_ACCOUNT }));
        }
    };

    return (
        <Dialog
          modal={true}
          open={true}
        >
            <Flex column p={2}>
                <h2>Delete this user's account and all their data?</h2><br/>
                <p>{props.user.name} &lt;{props.user.email}&gt;</p>
                <Flex justify="center" col={12} pt={3}>
                    <FormMessage busy={busy} formMessage={formMessage} />
                </Flex>
                <Flex justify="space-between" col={12} pt={3}>
                    <div>
                        <RaisedButton primary={true} disabled={busy} label="OK" onTouchTap={changeRoleAction}/>
                    </div>
                     <div>
                        <RaisedButton label="CANCEL" onTouchTap={()=>dispatch(modalClose(ModalKey.DELETE_ACCOUNT))}/>
                    </div>
                </Flex>
            </Flex>
        </Dialog>
    );
};

export default (
    connect(mapStateToProps)(
        connectForm<DeleteAccountProps>(formConfig,DeleteAccount)
    ) as React.ComponentClass<{ user: User }>
);
