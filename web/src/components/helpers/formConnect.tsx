
import * as React from "react";
import { connect, Dispatch } from "react-redux";

import { fieldChanged, formValidated, formInit, formDestroy } from "./formRedux";
import { Dict } from "./dict";
import { createFormAction } from "../../actions/ui";
import { State } from "../../state"

import TextField from "material-ui/TextField";


export interface FormProps {
    readonly onValidate: () => boolean;
}

export interface FormConfig {
    readonly formId: string,
    readonly validate?: (values: Dict<string>) => Dict<string>
}

export interface TextFieldProps {
    readonly name: string;
    readonly hintText: string;
    readonly floatingLabelText: string;
    readonly type: string;
}

export function renderTextField(config: FormConfig): React.ComponentClass<TextFieldProps> {
    const mapStateToProps = (state : State, ownProps: TextFieldProps)  => {
        let values = {};
        let value = "";
        let errorText = "";
        let touched = false;
        if(state.ui && state.ui.form) {
            const formData = state.ui.form[config.formId];
            if(formData && formData.values) {
                values = formData.values;
                value = formData.values[ownProps.name] || "";
            }
            if(formData && formData.errors) {
                errorText = formData.errors[ownProps.name]
            }
            if(formData && formData.touched) {
                touched = formData.touched[ownProps.name]
            }
        }
        return { ...ownProps, values, value, errorText: touched ? errorText : "" };
    }

    const field = (props : TextFieldProps & { dispatch: Dispatch<any>, value: string, values: Dict<string>, errorText: string}) => {

        const onChange = (event: Event, newValue: string) => {
            const errors = config.validate(Dict.clone(props.values,Dict.singleton(props.name,newValue)));
            props.dispatch(
                createFormAction(
                    fieldChanged(config.formId, props.name, newValue, errors)
                )
            );
        };

        return <TextField
            value={props.value}
            hintText={props.hintText}
            errorText={props.errorText}
            floatingLabelText={props.floatingLabelText}
            type={props.type}
            onChange={onChange}
        />;
    };

    return connect(mapStateToProps)(field);
}

export function connectForm<Props extends FormProps>(
    config: FormConfig,
    WrappedComponent: (props: Props) => JSX.Element) {
        const mapStateToProps = (state : State, ownProps?: Props)  => {
            if(state.ui && state.ui.form) {
                const formData = state.ui.form[config.formId];
                if(formData && formData.values) {
                    const values = formData.values || {};
                    return { ...(ownProps || {}), values };
                }
            }
            return  { ...(ownProps || {}), values: {} };
        }

        return connect(mapStateToProps)(
            class WrappedForm extends React.Component<Props & { dispatch: Dispatch<any>, values: Dict<string> },{}> {
                constructor(props: Props & { dispatch: Dispatch<any>, values: Dict<string> }) {
                    super(props);
                }

                componentDidMount() {
                    this.props.dispatch(
                        createFormAction(
                            formInit(config.formId, {})
                        )
                    );
                }

                componentWillUnmount() {
                    this.props.dispatch(
                        createFormAction(
                            formDestroy(config.formId)
                        )
                    );
                }

                onValidate = () => {
                    if(config.validate) {
                        const errors = config.validate(this.props.values);
                        this.props.dispatch(
                            createFormAction(
                                formValidated(config.formId, errors)
                            )
                        );
                        return Dict.values(errors).every(error=>!error);
                    }
                    return true;
                };

                render() {
                    return <WrappedComponent
                        onValidate={this.onValidate}
                        {...this.props}
                    />;
                }
            }
        );
}
