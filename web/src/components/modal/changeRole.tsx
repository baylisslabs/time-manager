import * as React from "react";
import { connect } from "react-redux";
import { modalClose } from "../../actions/ui";

import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Chip from "material-ui/Chip";
import SelectField from "material-ui/SelectField";
import MenuItem from 'material-ui/MenuItem';
import LinearProgress from 'material-ui/LinearProgress';
import { red500, white } from "material-ui/styles/colors";

import { Flex, Box } from "reflexbox";

import { ModalKey } from "./keys";

const items = [
  <MenuItem key={1} value={1} primaryText="Regular" />,
  <MenuItem key={2} value={2} primaryText="User Manager" />,
  <MenuItem key={3} value={3} primaryText="Admin" />,
];

const ChangeRole = ({dispatch}) => (
        <Dialog
          modal={true}
          open={true}
        >
            <Flex column p={2}>
                <h2>Change User's Role</h2><br/>
                <SelectField
                      floatingLabelText="Role"
                >
                    {items}
                </SelectField>
                <Flex justify="center" col={12} pt={3}>
                    <Chip backgroundColor={red500} labelColor={white}>Something went wrong. Please try again</Chip>
                </Flex>
                <Flex justify="center" col={12} pt={3}>
                    <LinearProgress mode="indeterminate" />
                </Flex>
                <Flex justify="space-between" col={12} pt={3}>
                    <div>
                        <RaisedButton primary={true} label="CHANGE" onTouchTap={()=>{}}/>
                    </div>
                     <div>
                        <RaisedButton label="CANCEL" onTouchTap={()=>dispatch(modalClose(ModalKey.CHANGE_ROLE))}/>
                    </div>
                </Flex>
            </Flex>
        </Dialog>
);

export default (connect()(ChangeRole)) as () => JSX.Element;
