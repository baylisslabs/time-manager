import * as React from "react";
import { connect } from "react-redux";
import { modalClose } from "../../actions";

import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import Chip from "material-ui/Chip";
import TextField from "material-ui/TextField";
import LinearProgress from 'material-ui/LinearProgress';
import { red500, white } from "material-ui/styles/colors";

import { Flex, Box } from "reflexbox";

import { ADMIN_PASSWORD_RESET } from "./modals";

const AdminPasswordReset = ({dispatch}) => (
        <Dialog
          modal={false}
          open={true}
          onRequestClose={()=>dispatch(modalClose(ADMIN_PASSWORD_RESET))}
        >
            <Flex column p={2}>
                <h2>Reset User's Password</h2><br/>
                <p>An email will be sent to the user's primary email address(below) with a link instructing them to reset their password.</p><br/>
                <p>Primary Email: name@domain.me</p>
                <Flex justify="center" col={12} pt={3}>
                    <Chip backgroundColor={red500} labelColor={white}>Something went wrong. Please try again</Chip>
                </Flex>
                <Flex justify="center" col={12} pt={3}>
                    <LinearProgress mode="indeterminate" />
                </Flex>
                <Flex justify="center" col={12} pt={3}>
                    <div>
                        <RaisedButton primary={true} label="SEND EMAIL" onTouchTap={()=>{}}/>
                    </div>
                </Flex>
            </Flex>
        </Dialog>
);

export default (connect()(AdminPasswordReset)) as () => JSX.Element;
