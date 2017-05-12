import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import DatePicker from "material-ui/DatePicker";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";

import MainAppBar from "./mainappbar";
import Timeframe from "./timeframe";
import { Flex, Box } from "reflexbox";

const Report = ({history, dispatch}) => (
     <div>
        <MainAppBar title="Report"/>

        <Flex column col={12} p={2}>
            <p>Select the timeframe for the printable daily summary report.</p><br/>
            <Timeframe />
            <Flex col={12} pt={3}>
                <RaisedButton primary={true} label="Generate Report" disabled={true}/>
            </Flex>
        </Flex>
    </div>
);

export default withRouter<any>(connect()(Report));

