import * as React from "react";
import { withRouter } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import NavigationClose from "material-ui/svg-icons/navigation/close";
import TextField from "material-ui/TextField";
import { Flex, Box } from "reflexbox";

const SignUp = ({history}) => (
    <div>
        <AppBar
            title="Time Manager"
            showMenuIconButton={false}
            iconElementRight={<IconButton onTouchTap={()=>history.push("/")} ><NavigationClose /></IconButton>} />

        <Flex column justify="center" col={12} p={3}>
            <p>Hi, your new account will be ready shortly. We just need a few details from you:</p><br/>
            <Divider/>
            <Stepper orientation="vertical">
                <Step>
                    <StepLabel>Email address and password</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Your Name</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Review and Register</StepLabel>
                </Step>
            </Stepper>
        </Flex>
    </div>
);

export default withRouter<any>(SignUp);