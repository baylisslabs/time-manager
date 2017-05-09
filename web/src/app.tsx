

import * as React from "react";
import * as ReactDOM from "react-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";

import { Landing } from "./components/landing";

const App = () => (
    <MuiThemeProvider>
        <Landing />
    </MuiThemeProvider>
);

export function mount(element: HTMLElement) {
    ReactDOM.render(
        <App />,
        element
    );
}
