import * as React from "react";
import { connect } from "react-redux";
import { modalClose } from "../../actions";

import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Chip from "material-ui/Chip";
import TextField from "material-ui/TextField";
import AutoComplete from "material-ui/AutoComplete";
import DatePicker from "material-ui/DatePicker";
import LinearProgress from 'material-ui/LinearProgress';
import { red500, white } from "material-ui/styles/colors";

import { Flex, Box } from "reflexbox";

import { DELETE_TIME_RECORD } from "./modals";

const DeleteTimeRecord = ({dispatch}) => (
        <Dialog
          modal={true}
          open={true}
        >
            <Flex column p={2}>
                <h2>Delete this record?</h2><br/>
                <Flex justify="center" col={12} pt={3}>
                    <Chip backgroundColor={red500} labelColor={white}>Something went wrong. Please try again</Chip>
                </Flex>
                <Flex justify="center" col={12} pt={3}>
                    <LinearProgress mode="indeterminate" />
                </Flex>
                <Flex justify="space-between" col={12} pt={3}>
                    <div>
                        <RaisedButton primary={true} label="OK" onTouchTap={()=>{}}/>
                    </div>
                     <div>
                        <RaisedButton label="CANCEL" onTouchTap={()=>dispatch(modalClose(DELETE_TIME_RECORD))}/>
                    </div>
                </Flex>
            </Flex>
        </Dialog>
);

export default (connect()(DeleteTimeRecord)) as () => JSX.Element;
