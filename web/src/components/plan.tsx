import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { modalOpen } from "../actions";

import MainAppBar from "./mainappbar";
import Timeframe from "./timeframe";
import {Card} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

import { Flex, Box } from "reflexbox";

import {
    ADD_TIME_RECORD,
    EDIT_TIME_RECORD,
    DELETE_TIME_RECORD
} from "./modal/modals";

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const Plan = ({history, dispatch}) => {
    const rightIconMenu = (
        <IconMenu iconButtonElement={iconButtonElement}>
            <MenuItem onTouchTap={()=>dispatch(modalOpen(EDIT_TIME_RECORD))}>Edit</MenuItem>
            {/*<MenuItem>Move</MenuItem>*/}
            <MenuItem onTouchTap={()=>dispatch(modalOpen(DELETE_TIME_RECORD))}>Delete</MenuItem>
        </IconMenu>
    );

     return <div>
        <MainAppBar title="Plan"/>
         <Flex column col={12} p={2}>
            <p>Plan upcoming schedule or record your time spent below.</p><br/>
            <Flex p={1} align="center" justify="space-between">
                <Timeframe />
                <div>
                    <FloatingActionButton mini={true} onTouchTap={()=>dispatch(modalOpen(ADD_TIME_RECORD))}>
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
            </Flex>
             {/* todo: pagination / scroll / goto */}
            <Box p={1}>
                <Card>
                    <List>
                        <Subheader>Friday, 2017-05-12</Subheader>
                        <ListItem
                            leftAvatar={<Avatar size={30}>4.5</Avatar>}
                            rightIconButton={rightIconMenu}
                            secondaryText={
                                <p>
                                Working on a project
                                </p>
                            }
                            secondaryTextLines={2}
                        />
                        <Divider inset={true} />
                        <ListItem
                            leftAvatar={<Avatar size={30}>2.5</Avatar>}
                            rightIconButton={rightIconMenu}
                            secondaryText={
                                <p>
                                Personal study
                                </p>
                            }
                            secondaryTextLines={2}
                        />
                    </List>
                </Card>
            </Box>
            <Box p={1}>
                <Card>
                    <List>
                        <Subheader>Saturday, 2017-05-13</Subheader>
                        <ListItem
                            leftAvatar={<Avatar size={30}>1.5</Avatar>}
                            rightIconButton={rightIconMenu}
                            secondaryText={
                                <p>
                                Working on a project
                                </p>
                            }
                            secondaryTextLines={2}
                        />
                        <Divider inset={true} />
                        <ListItem
                            leftAvatar={<Avatar size={30}>2.5</Avatar>}
                            rightIconButton={rightIconMenu}
                            secondaryText={
                                <p>
                                Home Errands
                                </p>
                            }
                            secondaryTextLines={2}
                        />
                    </List>
                </Card>
            </Box>
        </Flex>
    </div>;
};

export default withRouter<any>(connect()(Plan));

