import * as React from "react";
import Chip from "material-ui/Chip";
import LinearProgress from "material-ui/LinearProgress";
import { red500, white } from "material-ui/styles/colors";

interface FormMessageProps {
    readonly busy: boolean;
    readonly formMessage: string;
}

const FormMessage = (props: FormMessageProps) => (
    props.busy ?
        <LinearProgress />
        : props.formMessage ?
            <Chip backgroundColor={red500} labelColor={white}>{props.formMessage}</Chip> : null
);

export default FormMessage;