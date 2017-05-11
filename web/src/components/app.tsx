import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider, connect } from "react-redux";
import { Store } from "redux";
import { State } from "../state";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Landing from "./landing";
import Login from "./login";
import SignUp from "./signup";
import Plan from "./plan";
import Report from "./report";
import Settings from "./settings";
import NoMatch from "./nomatch";

function mapStateToProps(state: State) {
    return { loggedIn: !!state.sessionId }
}

const App = connect(mapStateToProps)(({ loggedIn }) => loggedIn ? (
    <Router>
        <MuiThemeProvider>
            <Switch>
                <Route exact path="/" component={Plan} />
                <Redirect from="/login" to="/" />
                <Route path="/plan" component={Plan} />
                <Route path="/report" component={Report} />
                <Route path="/settings" component={Settings} />
                <Route component={NoMatch} />
            </Switch>
        </MuiThemeProvider>
    </Router>
) : (
    <Router>
        <MuiThemeProvider>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <Redirect from="/plan" to="/login?redir=plan" />
                <Redirect from="/report" to="/login?redir=report" />
                <Redirect from="/settings" to="/login?redir=settings" />
                <Route component={NoMatch} />
            </Switch>
        </MuiThemeProvider>
    </Router>
));

export function mount(element: HTMLElement, store: Store<State>) {
    ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>), element);
}
