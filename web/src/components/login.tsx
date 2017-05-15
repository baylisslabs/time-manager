import * as React from "react";
import { History } from 'history';
import { withRouter } from "react-router-dom";
import { connect, Dispatch } from "react-redux";

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

import { renderTextField, connectForm } from "./helpers/formConnect";
import { Dict } from "./helpers/dict";

interface RouterConnectProps {
    history: History;
    dispatch: Dispatch<Action>;
    onValidate: () => boolean;
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

const FormTextField = renderTextField(formConfig);

const Login = (props : RouterConnectProps) => {
    const { history, dispatch, onValidate } = props;

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
                            <Chip backgroundColor={red500} labelColor={white}>Email or password details are invalid</Chip>
                        </Flex>
                        <Flex justify="center" col={12} pt={3}>
                            <LinearProgress mode="indeterminate" />
                        </Flex>
                        <Flex justify="center" col={12} pt={3}>
                            <div>
                                <RaisedButton primary={true} label="LOG IN" onTouchTap={()=>onValidate() && dispatch(fetchAuth("user","1234"))}/>
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
    connectForm<RouterConnectProps>(formConfig,Login)
);



