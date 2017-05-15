import * as React from "react";
import { History } from 'history';
import { withRouter } from "react-router-dom";
import { connect, Dispatch } from "react-redux";
import { State } from "../state";
import { Action } from "../actions/types";
import { logOut } from "../actions/app";
import { userFromState } from "../identity";
import { Role } from "../../../app/model/model";

import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import MenuIcon from "material-ui/svg-icons/navigation/menu";
import { white } from "material-ui/styles/colors";
import Divider from "material-ui/Divider";
import { Flex, Box } from "reflexbox";


interface MainAppBarProps {
    readonly history: History;
    readonly dispatch: Dispatch<Action>;
    readonly title: string;
    readonly userRole: Role;
}

function mapStateToProps(state: State, ownProps: MainAppBarProps) {
    const user = userFromState(state);
    const userRole = user.role;
    return { ...ownProps, userRole };
}

const LeftMenu = (props: MainAppBarProps) => (
    <IconMenu
      iconButtonElement={<IconButton iconStyle={{color: white}}><MenuIcon/></IconButton>}
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}>
        <MenuItem primaryText="Plan" onTouchTap={()=>props.history.push("/plan")}/>
        <MenuItem primaryText="Report" onTouchTap={()=>props.history.push("/report")}/>
        <Divider/>
        <MenuItem primaryText="Preferences" onTouchTap={()=>props.history.push("/preferences")}/>
        <MenuItem primaryText="Account" onTouchTap={()=>props.history.push("/account")}/>
        <Divider/>
        {(props.userRole === Role.admin || props.userRole === Role.userManager) ?
            <div>
                <MenuItem primaryText="Admin" onTouchTap={()=>props.history.push("/admin")}/>
                <Divider/>
            </div>
            : null
        }
        <MenuItem primaryText="Log out" onTouchTap={()=>props.dispatch(logOut())}/>
    </IconMenu>
);

const MainAppBar = (props: MainAppBarProps) => (
    <AppBar
        showMenuIconButton={true}
        title={props.title}
        iconElementLeft={
            <LeftMenu
                {...props}
            />
        }
    />
);

export default withRouter<any>(connect(mapStateToProps)(MainAppBar));

