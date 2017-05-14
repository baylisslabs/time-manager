import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
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

const Login = ({history, dispatch}) => (
    <div>
        <AppBar
            title="Time Manager"
            showMenuIconButton={false}
            iconElementRight={<IconButton onTouchTap={()=>history.push("/")}><NavigationClose /></IconButton>} />

        <Flex justify="center" col={12} p={3}>
            <Paper zDepth={2}>
                <Flex column p={2}>
                    <h2>Log in to Your Account</h2>
                    <TextField
                        hintText="name@domain.me"
                        floatingLabelText="Email Address"
                        type="text" />
                    <TextField
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
                            <RaisedButton primary={true} label="LOG IN" onTouchTap={()=>dispatch(fetchAuth("user","1234"))}/>
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

export default withRouter<any>(connect()(Login));


