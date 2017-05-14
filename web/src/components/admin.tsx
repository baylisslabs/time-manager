import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { modalOpen } from "../actions/ui";
import { ModalKey } from "./modal/keys";

import MainAppBar from "./mainappbar";
import Timeframe from "./timeframe";
import {Card} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CircularProgress from "material-ui/CircularProgress";
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

import { Flex, Box } from "reflexbox";

/* !!check user role!! */
const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const Admin = ({history, dispatch}) => {
    /* apply role and only show/disable valid options */
    const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Log into Account</MenuItem>
        <MenuItem onTouchTap={()=>dispatch(modalOpen(ModalKey.CHANGE_ROLE))}>Change Role</MenuItem>
        <MenuItem onTouchTap={()=>dispatch(modalOpen(ModalKey.ADMIN_PASSWORD_RESET))}>Reset Password</MenuItem>
        <MenuItem onTouchTap={()=>dispatch(modalOpen(ModalKey.DELETE_ACCOUNT))}>Delete Account</MenuItem>
    </IconMenu>
    );

     return (
     <div>
        <MainAppBar title="Admin"/>
        <Flex column col={12} p={2}>
        <p>Manage user's accounts.</p><br/>
        {/* todo: pagination / scroll / goto / (id self) */}
        <List>
            <Subheader>Users</Subheader>
            <ListItem
                leftAvatar={<Avatar>C</Avatar>}
                rightIconButton={rightIconMenu}
                primaryText="user@domain.com"
                secondaryText={
                    <p>
                    <span style={{color: darkBlack}}>Admin Amy</span><br/>
                    Admin
                    </p>
                }
                secondaryTextLines={2}
            />
            <Divider inset={true} />
            <ListItem
                leftAvatar={<Avatar>U</Avatar>}
                rightIconButton={rightIconMenu}
                primaryText="ursula@gmail.com"
                secondaryText={
                    <p>
                    <span style={{color: darkBlack}}>User manager Ursula</span><br/>
                    User Manager
                    </p>
                }
                secondaryTextLines={2}
            />
             <Divider inset={true} />
            <ListItem
                leftAvatar={<CircularProgress/>}
            />
        </List>
        </Flex>
     </div>
     );
};

export default withRouter<any>(connect()(Admin));

