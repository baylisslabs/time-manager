import * as React from "react";
import { withRouter } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import NavigationClose from "material-ui/svg-icons/navigation/close";

export const Login = withRouter<any>(({history})=>(
    <div>
        <AppBar
            title="Login"
            showMenuIconButton={false}
            iconElementRight={<IconButton onTouchTap={()=>history.push("/")} ><NavigationClose /></IconButton>} />
    </div>
));

