import * as React from "react";
import { connect } from "react-redux";
import { modalClose } from "../../actions/ui";

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

import { ModalKey } from "./keys";

const ErrorAlert = ({dispatch}) => (
        <Dialog
          modal={false}
          open={true}
          onRequestClose={()=>dispatch(modalClose(ModalKey.ERROR_ALERT))}
        >
            <Flex column p={2}>
                <p>Uhoh, something went wrong.</p>
                <Flex justify="center" col={12} pt={3}>
                    <RaisedButton primary={true} label="OK" onTouchTap={()=>dispatch(modalClose(ModalKey.ERROR_ALERT))}/>
                </Flex>
            </Flex>
        </Dialog>
);

export default (connect()(ErrorAlert)) as () => JSX.Element;
