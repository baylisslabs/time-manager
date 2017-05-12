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

import { PASSWORD_RESET } from "./modals";

const PasswordReset = ({dispatch}) => (
        <Dialog
          modal={false}
          open={true}
          onRequestClose={()=>dispatch(modalClose(PASSWORD_RESET))}
        >
            <Flex column p={2}>
                <h2>Reset Your Password</h2><br/>
                <p>Please provide the email address you used when you signed up for your account.</p><br/>
                <p>We will send you an email with a link to reset your password.</p>
                <TextField
                    hintText="name@domain.me"
                    floatingLabelText="Email Address"
                    type="text" />
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

export default (connect()(PasswordReset)) as () => JSX.Element;
