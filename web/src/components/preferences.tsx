import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateFeedbackMsg } from "../actions";

import MainAppBar from "./mainappbar";
import Divider from "material-ui/Divider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Toggle from 'material-ui/Toggle';
import Avatar from "material-ui/Avatar";
import AutoComplete from 'material-ui/AutoComplete';
import CircularProgress from "material-ui/CircularProgress";

import { Flex, Box } from "reflexbox";

function validHours() {
    let values = [];
    for(let i=0;i<=24*4;++i) {
        values.push(i/4);
    }
    return values;
}

const hoursValues = validHours().map(h=>h.toString());
const daysOfWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

const Preferences = ({history, dispatch}) => (
     <div>
        <MainAppBar title="Preferences"/>

        <Flex column col={12} p={2}>
            <p>Enter your preferred or available number of working hours for each day of the week.</p><br/>
            <Toggle label="Same for all days" labelPosition="right" />
            {daysOfWeek.map((day) =>
                <AutoComplete
                    key={day}
                    hintText="hours i.e 7.25"
                    dataSource={hoursValues}
                    floatingLabelText={day}
                />)
            }
            <Flex col={12} pt={3}>
                <RaisedButton primary={true} label="Update Preferences" disabled={false} onTouchTap={()=>dispatch(updateFeedbackMsg("Preferences updated successfully"))} />
            </Flex>
             <Flex col={12} pt={3}>
                <RaisedButton primary={true} label="Updating..." labelPosition="before" disabled={true} icon={<CircularProgress size={25}/>}/>
            </Flex>
        </Flex>
    </div>
);

export default withRouter<any>(connect()(Preferences));

