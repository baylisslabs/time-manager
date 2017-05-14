import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../actions/app";

import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import MenuIcon from "material-ui/svg-icons/navigation/menu";
import { white } from "material-ui/styles/colors";
import Divider from "material-ui/Divider";
import { Flex, Box } from "reflexbox";

const LeftMenu = ({ history, dispatch }) => (
    <IconMenu
      iconButtonElement={<IconButton iconStyle={{color: white}}><MenuIcon/></IconButton>}
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}>
        <MenuItem primaryText="Plan" onTouchTap={()=>history.push("/plan")}/>
        <MenuItem primaryText="Report" onTouchTap={()=>history.push("/report")}/>
        <Divider/>
        <MenuItem primaryText="Preferences" onTouchTap={()=>history.push("/preferences")}/>
        <MenuItem primaryText="Account" onTouchTap={()=>history.push("/account")}/>
        <Divider/>
        <MenuItem primaryText="Admin" onTouchTap={()=>history.push("/admin")}/>
        <Divider/>
        <MenuItem primaryText="Log out" onTouchTap={()=>dispatch(logOut())}/>
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
    />
);

export default withRouter<any>(connect()(MainAppBar));

