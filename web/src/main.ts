
import { mount } from "./components/app";
import * as injectTapEventPlugin from "react-tap-event-plugin";
import { getStore } from "./store";
import { initSession, updateTime } from "./actions/app";
import * as cookie from "./util/cookie";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = getStore();

if(process.env.NODE_ENV==="development") {
    store.subscribe(()=> {
    console.log(JSON.stringify(store.getState()));
    });
}

store.dispatch(initSession(cookie.read("sid")));
store.dispatch(updateTime(new Date().getTime()));

mount(document.getElementById("app"), store);
