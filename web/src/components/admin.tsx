import * as React from "react";
import { History } from 'history';
import { withRouter, Redirect } from "react-router-dom";
import { connect, Dispatch } from "react-redux";
import { State, FetchIndicator } from "../state";
import { Action } from "../actions/types";
import { logInAs } from "../actions/app";
import { fetchUsers } from "../actions/fetch";
import { modalOpen } from "../actions/ui";
import { ModalKey } from "./modal/keys";
import { userFromState } from "../identity";
import { User,Role } from "../../../app/model/model";

import MainAppBar from "./mainappbar";
import {Card} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
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

interface AdminProps {
    readonly history: History;
    readonly dispatch: Dispatch<any>;
    readonly user: User;
    readonly userList: User[];
    readonly loading: boolean;
    readonly sessionId; string;
}

function mapStateToProps(state: State, ownProps: AdminProps) {
    const sessionId = state.app.sessionId;
    const user = userFromState(state);
    const fetchState = state.app.fetchState;
    const loading = (fetchState && fetchState.status == FetchIndicator.InProgress);
    const userList = state.domain.users || [];
    return { ...ownProps, user, userList, loading, sessionId };
}

const iconButtonElement = (
    <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
    >
        <MoreVertIcon color={grey400} />
    </IconButton>
);

class Admin extends React.Component<AdminProps,{}> {

    constructor(props: AdminProps) {
        super(props);
    }

    componentDidMount() {
        const {dispatch, sessionId, user, loading} = this.props;
        if(!loading && (user.role === Role.admin || user.role === Role.userManager)) {
            dispatch(fetchUsers(sessionId))
        }
    }

    rightIconMenu = (other: User) => {
        const self = this.props.user;
        if(self.email !== other.email) {
            if(self.role === Role.admin) {
                return (
                    <IconMenu iconButtonElement={iconButtonElement}>
                        <MenuItem onTouchTap={()=>this.props.dispatch(logInAs(other))}>Log into Account</MenuItem>
                        <MenuItem onTouchTap={()=>this.props.dispatch(modalOpen(ModalKey.CHANGE_ROLE))}>Change Role</MenuItem>
                        <MenuItem onTouchTap={()=>this.props.dispatch(modalOpen(ModalKey.ADMIN_PASSWORD_RESET))}>Reset Password</MenuItem>
                        <MenuItem onTouchTap={()=>this.props.dispatch(modalOpen(ModalKey.DELETE_ACCOUNT))}>Delete Account</MenuItem>
                    </IconMenu>
                );
            }
            if(self.role === Role.userManager && other.role == Role.regular) {
                return (
                    <IconMenu iconButtonElement={iconButtonElement}>
                        <MenuItem onTouchTap={()=>this.props.dispatch(logInAs(other))}>Log into Account</MenuItem>
                        <MenuItem onTouchTap={()=>this.props.dispatch(modalOpen(ModalKey.ADMIN_PASSWORD_RESET))}>Reset Password</MenuItem>
                        <MenuItem onTouchTap={()=>this.props.dispatch(modalOpen(ModalKey.DELETE_ACCOUNT))}>Delete Account</MenuItem>
                    </IconMenu>
                );
            }
        }
        return null;
    };

    listItems() {
        return this.props.userList.map(other=>(
            <div key={other.email}>
                <ListItem
                    leftAvatar={<Avatar>{other.name[0]}</Avatar>}
                    rightIconButton={this.rightIconMenu(other)}
                    primaryText={other.email}
                    secondaryText={
                        <p>
                        <span style={{color: darkBlack}}>{other.name}</span><br/>
                        {other.role}
                        </p>
                    }
                    secondaryTextLines={2}
                />
                <Divider inset={true} />
             </div>
        ));
    }

    render() {
        const {history, dispatch, user, userList, loading} = this.props;

        if(user.role != Role.admin && user.role != Role.userManager) {
            return <Redirect to="/"/>
        }
        else {
            return (
                <div>
                    <MainAppBar title="Admin"/>
                    <Flex column col={12} p={2}>
                        <p>Manage user's accounts.</p><br/>
                        {/* todo: pagination / scroll / goto / (id self) */}
                        {loading ? (
                            <List>
                                <Subheader>Users</Subheader>
                                <ListItem
                                    leftAvatar={<CircularProgress/>}
                                />
                            </List>
                            ) : (
                            <List>
                                <Subheader>Users</Subheader>
                                {this.listItems()}
                            </List>
                            )
                        }
                    </Flex>
                </div>
            );
        }
    }
}

export default withRouter<any>(connect(mapStateToProps)(Admin));

