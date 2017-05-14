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
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import CircularProgress from "material-ui/CircularProgress";
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

import { Flex, Box } from "reflexbox";

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
            <MenuItem onTouchTap={()=>dispatch(modalOpen(ModalKey.EDIT_TIME_RECORD))}>Edit</MenuItem>
            {/*<MenuItem>Move</MenuItem>*/}
            <MenuItem onTouchTap={()=>dispatch(modalOpen(ModalKey.DELETE_TIME_RECORD))}>Delete</MenuItem>
        </IconMenu>
    );

     return <div>
        <MainAppBar title="Plan"/>
         <Flex column col={12} p={2}>
            <Box pt={1}>
                <p>Plan upcoming schedule or record your time spent.</p>
            </Box>
            <Flex pt={1} align="center" justify="space-between">
                <Timeframe />
                <div>
                    <FloatingActionButton mini={true} onTouchTap={()=>dispatch(modalOpen(ModalKey.ADD_TIME_RECORD))}>
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
            </Flex>
             {/* todo: pagination / scroll / goto */}
            <Box pt={1}>
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
            <Box pt={1}>
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
            <Box pt={1}>
                <Card>
                    <List>
                        <Subheader>Sunday, 2017-05-14</Subheader>
                        <ListItem
                            leftAvatar={<CircularProgress size={30} />}
                        />
                    </List>
                </Card>
            </Box>
        </Flex>
    </div>;
};

export default withRouter<any>(connect()(Plan));

