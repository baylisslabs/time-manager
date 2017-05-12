import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import MainAppBar from "./mainappbar";
import Timeframe from "./timeframe";

import { Flex, Box } from "reflexbox";


const Plan = ({history, dispatch}) => (
     <div>
        <MainAppBar title="Plan"/>
         <Flex column col={12} p={2}>
            <Timeframe />
        </Flex>
    </div>
);

export default withRouter<any>(connect()(Plan));

