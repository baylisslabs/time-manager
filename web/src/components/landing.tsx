import * as React from "react";
import { withRouter } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import IconButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from 'material-ui/FontIcon';
import { Flex, Box } from "reflexbox";

const Landing = ({history}) => (
     <div>
        <AppBar
            //iconElementLeft={<FontIcon className="material-icons" style={{lineHeight: "0.5rem"}}>home</FontIcon>}
            showMenuIconButton={false}
            title="Time Manager"
            iconElementRight={<FlatButton label="LOGIN" onTouchTap={()=>history.push("/login")} />} />

        <Flex justify="center" col={12} pt={3}>
            <img style={{minHeight: 180}} src="http://placekitten.com/180/180" alt="placeholder" />
        </Flex>

        <Flex justify="center" col={12} pt={3}>
            <h1 style={{textAlign: "center"}}>Time Manager</h1>
        </Flex>

        <Flex justify="center" col={12} pt={2}>
            <Box col={6} sm={4}>
                <h2 style={{textAlign: "center"}}>Join us now to become the Boss of your own Time</h2>
            </Box>
        </Flex>

        <Flex justify="center" col={12} pt={3}>
            <RaisedButton primary={true} label="SIGN UP" onTouchTap={()=>history.push("/signup")}/>
        </Flex>
    </div>
);

export default withRouter<any>(Landing);