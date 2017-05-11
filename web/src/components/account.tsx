import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import MainAppBar from "./mainappbar";
import Divider from "material-ui/Divider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Avatar from "material-ui/Avatar";

import { Flex, Box } from "reflexbox";

const Account = ({history, dispatch}) => (
     <div>
        <MainAppBar title="Account"/>

        <Flex column col={12} p={2}>
            <Avatar>C</Avatar>
            <TextField
                hintText="Joe Citizen"
                floatingLabelText="Your Name"
                type="text" />
            <Flex col={12} pt={3}>
                <RaisedButton primary={true} label="Update Profile" disabled={true}/>
            </Flex>
        </Flex>

        <Flex column col={12} p={2}>
            <TextField
                hintText="user@example.com"
                floatingLabelText="Primary Email"
                type="text" />
            <Flex col={12} pt={3}>
                <RaisedButton primary={true} label="Update Primary Email Address" disabled={true}/>
            </Flex>
        </Flex>

        <Flex column col={12} p={2}>
                <TextField
                floatingLabelText="Current Password"
                type="password" />
            <TextField
                floatingLabelText="New Password"
                type="password" />
            <TextField
                floatingLabelText="Confirm Password"
                type="password" />
            <Flex col={12} pt={3}>
                <RaisedButton primary={true} label="Change Password" disabled={true}/>
            </Flex>
        </Flex>

    </div>
);

export default withRouter<any>(connect()(Account));

