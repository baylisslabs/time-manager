import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { Enum } from "typescript-string-enums";
import { State, FetchIndicator } from "../../state";
import { modalClose } from "../../actions/ui";
import { updateUser } from "../../actions/fetch";
import { User,Role } from "../../../../app/model/model";
import { ModalKey } from "./keys";

import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Chip from "material-ui/Chip";
import SelectField from "material-ui/SelectField";
import MenuItem from 'material-ui/MenuItem';
import LinearProgress from 'material-ui/LinearProgress';
import { red500, white } from "material-ui/styles/colors";
import { Flex, Box } from "reflexbox";

import FormMessage from "./formMessage";
import { connectSelectField, connectForm } from "../helpers/formConnect";
import { Dict } from "../helpers/dict";


const items = [
  <MenuItem key={1} value={Role.regular} primaryText="Regular" />,
  <MenuItem key={2} value={Role.userManager} primaryText="User Manager" />,
  <MenuItem key={3} value={Role.admin} primaryText="Admin" />,
];

interface ChangeRoleProps {
    readonly dispatch: Dispatch<any>;
    readonly onValidate: () => boolean;
    readonly busy: boolean;
    readonly sessionId; string;
    readonly formMessage: string;
    readonly formValues: Dict<string>;
    readonly initialFormValues: Dict<string>;
    readonly user: User;
}

const formConfig = {
    formId: "changeRole",
    validate
};

function validate(values: Dict<string>): Dict<string> {
    let required = ["role"];
    let errors = {};

    required.forEach(key=>{
        const value = values[key];
        errors[key] = (value && value.toString().trim()) ? "" : "Required";
    });

    return errors;
}

function mapStateToProps(state: State, ownProps: ChangeRoleProps) {
    const sessionId = state.app.sessionId;
    const fetchState = state.app.fetchState;
    const busy = (fetchState && fetchState.status == FetchIndicator.InProgress);
    return { ...ownProps, sessionId, busy, initialFormValues: Object.assign({ role: ownProps.user.role }) };
}

const FormSelectField = connectSelectField(formConfig);

const ChangeRole = (props: ChangeRoleProps) => {
    const { dispatch, busy, sessionId, onValidate, formMessage, formValues } = props;

    const changeRoleAction = () => {
        const newRole = formValues.role;
        if(onValidate() && Enum.isType(Role,newRole)) {
            dispatch(updateUser(sessionId, props.user.email, { role: newRole },{ formId: formConfig.formId, modalKey: ModalKey.CHANGE_ROLE }));
        }
    };

    return (
        <Dialog
          modal={true}
          open={true}
        >
            <Flex column p={2}>
                <h2>Change User's Role</h2><br/>
                <p>{props.user.name} &lt;{props.user.email}&gt;</p>
                <FormSelectField
                    name="role"
                    floatingLabelText="Role"
                    items={items}
                />
                <Flex justify="center" col={12} pt={3}>
                    <FormMessage busy={busy} formMessage={formMessage} />
                </Flex>
                <Flex justify="space-between" col={12} pt={3}>
                    <div>
                        <RaisedButton primary={true} label="CHANGE" disabled={busy} onTouchTap={changeRoleAction}/>
                    </div>
                     <div>
                        <RaisedButton label="CANCEL" onTouchTap={()=>dispatch(modalClose(ModalKey.CHANGE_ROLE))}/>
                    </div>
                </Flex>
            </Flex>
        </Dialog>
    );
}

export default (
    connect(mapStateToProps)(
        connectForm<ChangeRoleProps>(formConfig,ChangeRole)
    ) as React.ComponentClass<{ user: User }>
);
