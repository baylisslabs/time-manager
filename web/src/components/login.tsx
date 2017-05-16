import * as React from "react";
import { History } from 'history';
import { withRouter } from "react-router-dom";
import { connect, Dispatch } from "react-redux";
import { State, FetchIndicator } from "../state";

import { Action } from "../actions/types";
import { modalOpen } from "../actions/ui";
import { fetchAuth } from "../actions/fetch";
import { ModalKey } from "./modal/keys";

import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Paper from "material-ui/Paper";
import Chip from "material-ui/Chip";
import TextField from "material-ui/TextField";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import LinearProgress from 'material-ui/LinearProgress';
import { red500, white } from "material-ui/styles/colors";

import { Flex, Box } from "reflexbox";
import FormMessage from "./modal/formMessage";
import { connectTextField, connectForm } from "./helpers/formConnect";
import { Dict } from "./helpers/dict";

interface LoginProps {
    readonly history: History;
    readonly dispatch: Dispatch<Action>;
    readonly onValidate: () => boolean;
    readonly busy: boolean;
    readonly formMessage: string;
    readonly formValues: Dict<string>;
}

const formConfig = {
    formId: "login",
    validate
};

function validate(values: Dict<string>): Dict<string> {
    let required = ["email","password"];
    let errors = {};

    required.forEach(key=>{
        const value = values[key];
        errors[key] = (value && value.toString().trim()) ? "" : "Required";
    });

    return errors;
}

function mapStateToProps(state: State, ownProps: LoginProps) {
    const fetchState = state.app.fetchState;
    const busy = (fetchState && fetchState.status == FetchIndicator.InProgress);

    return { ...ownProps, busy };
}

const FormTextField = connectTextField(formConfig);

const Login = (props : LoginProps) => {
    const { history, dispatch, onValidate, busy, formMessage, formValues } = props;

    const logInAction = () => {
        if(onValidate()) {
            dispatch(fetchAuth(formValues.email, formValues.password));
        }
    };

    return (
        <div>
            <AppBar
                title="Time Manager"
                showMenuIconButton={false}
                iconElementRight={<IconButton onTouchTap={()=>history.push("/")}><NavigationClose /></IconButton>} />

            <Flex justify="center" col={12} p={3}>
                <Paper zDepth={2}>
                    <Flex column p={2}>
                        <h2>Log in to Your Account</h2>
                        <FormTextField
                            name="email"
                            hintText="name@domain.me"
                            floatingLabelText="Email Address"
                            type="text" />
                        <FormTextField
                            name="password"
                            hintText="Password"
                            floatingLabelText="Password"
                            type="password" />
                        <Flex justify="center" col={12} pt={3}>
                            <FormMessage busy={busy} formMessage={formMessage} />
                        </Flex>
                        <Flex justify="center" col={12} pt={3}>
                            <div>
                                <RaisedButton primary={true} label="LOG IN" disabled={busy} onTouchTap={logInAction}/>
                            </div>
                        </Flex>
                        <Flex justify="center" col={12} pt={3}>
                            <FlatButton primary={true} label="Forgot your password?" onTouchTap={()=>dispatch(modalOpen(ModalKey.PASSWORD_RESET))}/>
                        </Flex>
                    </Flex>
                </Paper>
            </Flex>
        </div>
    );
};

export default withRouter<any>(
    connect(mapStateToProps)(
        connectForm<LoginProps>(formConfig,Login)
    )
);



