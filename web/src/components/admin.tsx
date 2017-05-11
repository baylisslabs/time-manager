import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import MainAppBar from "./mainappbar";
import { Flex, Box } from "reflexbox";

/* !!check user role!! */
const Admin = ({history, dispatch}) => (
     <div>
        <MainAppBar title="Admin"/>
    </div>
);

export default withRouter<any>(connect()(Admin));

