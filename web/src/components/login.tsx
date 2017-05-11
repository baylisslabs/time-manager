import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAuth } from "../actions";

import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import TextField from "material-ui/TextField";
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
                    <p>Please enter your email address and password to login.</p>
                    <TextField
                        hintText="Email Address"
                        floatingLabelText="Email"
                        type="text" />
                    <TextField
                        hintText="Password Field"
                        floatingLabelText="Password"
                        type="password" />
                    <Flex justify="center" col={12} pt={3}>
                        <RaisedButton primary={true} label="LOG IN" onTouchTap={()=>dispatch(fetchAuth("user","1234"))}/>
                    </Flex>
                </Flex>
            </Paper>
        </Flex>
    </div>
);

export default withRouter<any>(connect()(Login));


