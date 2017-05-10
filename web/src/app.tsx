import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Landing } from "./components/landing";
import { Login } from "./components/login";
import { SignUp } from "./components/signup";
import { NoMatch } from "./components/nomatch";

const App = ()=>(
    <Router>
        <MuiThemeProvider>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <Route component={NoMatch} />
            </Switch>
        </MuiThemeProvider>
    </Router>
);

export function mount(element: HTMLElement) {
    ReactDOM.render(<App />, element);
}
