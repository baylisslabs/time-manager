import * as React from "react";
import { connect } from "react-redux";
import { State } from "../state";
import { updateFeedbackMsg } from "../actions";

import Snackbar from "material-ui/Snackbar";

function mapStateToProps(state: State) {
    return { feedbackMsg: state.feedbackMsg }
}

/* todo: bring up from to in modal if custom selection, show date range info in field */
const FeedbackMsg = ({ feedbackMsg, dispatch }) => (
     <Snackbar
        open={!!feedbackMsg}
        message={feedbackMsg || ""}
        onRequestClose={()=>dispatch(updateFeedbackMsg(null))}
        autoHideDuration={4000}
     />
);

export default connect(mapStateToProps)(FeedbackMsg);

