import * as React from "react";
import { connect } from "react-redux";

import DatePicker from "material-ui/DatePicker";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Divider from "material-ui/Divider";

/* todo: bring up from to in modal if custom selection, show date range info in field */
const Timeframe = () => (
     <div>
        <SelectField
            floatingLabelText="Select a timeframe"
        >
            <MenuItem value={1} primaryText="Next Week" />
            <MenuItem value={2} primaryText="Next Month" />
            <Divider/>
            <MenuItem value={3} primaryText="Last Week" />
            <MenuItem value={4} primaryText="Last Month" />
            <Divider/>
            <MenuItem value={5} primaryText="Custom..." />
        </SelectField>
        <DatePicker
            floatingLabelText="From"
        />
        <DatePicker
            floatingLabelText="To"
        />
    </div>
);

export default connect()(Timeframe);

