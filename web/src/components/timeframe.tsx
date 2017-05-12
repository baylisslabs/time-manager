import * as React from "react";
import { connect } from "react-redux";

import DatePicker from "material-ui/DatePicker";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

const Timeframe = () => (
     <div>
        <SelectField
            floatingLabelText="Timeframe"
        >
            <MenuItem value={1} primaryText="Next Week" />
            <MenuItem value={2} primaryText="Next Month" />
            <MenuItem value={3} primaryText="Last Week" />
            <MenuItem value={4} primaryText="Last Month" />
            <MenuItem value={4} primaryText="Last Quarter" />
            <MenuItem value={4} primaryText="Last Year" />
            <MenuItem value={5} primaryText="Custom" />
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

