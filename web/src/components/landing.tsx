import * as React from "react";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";

export function Landing() {
    const loginButton = <FlatButton label="LOGIN"/>;

    return (
        <div>
            <AppBar showMenuIconButton={false} title="Time Manager" iconElementRight={loginButton} />
            <div className="row-centered mt:5@xs">
                <img src="http://placekitten.com/180/180"  alt="placeholder" />
            </div>
            <div className="row-centered mt:4@xs">
                <h1 className="col-4 text-center">Time Manager</h1>
            </div>
            <div className="row-centered mt:2@xs">
                <h2 className="col-4 text-center">Join us now to become the Boss of your own Time</h2>
            </div>
            <div className="row-centered mt:3@xs">
                <RaisedButton primary={true} label="SIGN UP"/>
            </div>
        </div>
    );
}