import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { modalOpen } from "../actions";

import DatePicker from "material-ui/DatePicker";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";

import FlatButton from "material-ui/FlatButton";
import IconButton from "material-ui/IconButton";
import NavigationClose from "material-ui/svg-icons/navigation/close";

import CircularProgress from 'material-ui/CircularProgress';

import AppBar from "material-ui/AppBar";

import MainAppBar from "./mainappbar";
import Timeframe from "./timeframe";
import { Flex, Box } from "reflexbox";

import { ERROR_ALERT } from "./modal/modals";

import * as Markdown from "react-markdown";

const Report = ({history, dispatch}) => (
     <div>
         {/* if no report data available */}
        <MainAppBar title="Report"/>

        <Flex column col={12} p={2}>
            <p>Select the timeframe for the printable daily summary report.</p><br/>
            <Timeframe />
            <Flex col={12} pt={3}>
                <RaisedButton primary={true} label="Generate Report" disabled={false} onTouchTap={()=>dispatch(modalOpen(ERROR_ALERT))}/>
            </Flex>
            <Flex col={12} pt={3}>
                <RaisedButton primary={true} label="Generating..." labelPosition="before" disabled={true} icon={<CircularProgress size={25}/>}/>
            </Flex>

        </Flex>
        {/* if report data available. todo: no-print style on the print button/whole appbar */}
        <AppBar
            title=""
            showMenuIconButton={true}
            iconElementRight={<FlatButton label="PRINT" onTouchTap={()=>{}}></FlatButton>}
            iconElementLeft={<IconButton onTouchTap={()=>{}}><NavigationClose /></IconButton>} />

        <Flex column col={12} p={2}>
            <Markdown className="markdown-body" skipHtml={true} source={`## Daily Summary Report

__From Sat, 2015-05-13 to Sun, 2015-05-14__

---
- Date: Sat, 2015-05-13
- Total time: 9h
- Notes:
  - Working on stuff
  - Save the planet
---
- Date: Sun, 2015-05-14
- Total time: 7h
- Notes:
  - Working on stuff
  - Save the planet *again*
`} />
        </Flex>
    </div>
);

export default withRouter<any>(connect()(Report));

