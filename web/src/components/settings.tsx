import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import MainAppBar from "./mainappbar";
import { Flex, Box } from "reflexbox";

const Settings = ({history, dispatch}) => (
     <div>
        <MainAppBar title="Settings"/>
    </div>
);

export default withRouter<any>(connect()(Settings));

