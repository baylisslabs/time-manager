import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../actions";

import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropDown from "material-ui/svg-icons/navigation/arrow-drop-down";
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import Divider from 'material-ui/Divider';
import { Flex, Box } from "reflexbox";


const RightMenu = ({ history, dispatch }) => (
    <IconMenu
      iconButtonElement={<IconButton><ArrowDropDown /></IconButton>}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}>
        <MenuItem primaryText="Settings" onTouchTap={()=>history.push("/settings")}/>
        <Divider/>
        <MenuItem primaryText="Log out" onTouchTap={()=>dispatch(logOut())}/>
    </IconMenu>
);

const LeftMenu = ({ history, dispatch }) => (
    <IconMenu
      iconButtonElement={<IconButton><MenuIcon /></IconButton>}
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}>
        <MenuItem primaryText="Plan" onTouchTap={()=>history.push("/plan")}/>
        <MenuItem primaryText="Report" onTouchTap={()=>history.push("/report")}/>
    </IconMenu>
);

const MainAppBar = (props: { history: any, dispatch: any, title: string}) => (
    <AppBar
        showMenuIconButton={true}
        title={props.title}
        iconElementLeft={
            <LeftMenu
                dispatch={props.dispatch}
                history={props.history}
            />
        }
        iconElementRight={
            <RightMenu
                dispatch={props.dispatch}
                history={props.history}
            />
        } />
);

export default withRouter<any>(connect()(MainAppBar));

