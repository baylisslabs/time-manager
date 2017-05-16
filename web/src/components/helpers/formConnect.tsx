
import * as React from "react";
import { connect, Dispatch } from "react-redux";

import { fieldChanged, formValidated, formInit, formDestroy } from "./formRedux";
import { Dict } from "./dict";
import { createFormAction } from "../../actions/ui";
import { State } from "../../state"

import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";

interface ConnectFieldProps {
    readonly dispatch: Dispatch<any>;
    readonly value: string;
    readonly values: Dict<string>;
    readonly errorText: string;
    readonly onChange: (event: Event, newValue: string) => void;
}

interface BaseFieldProps {
    readonly name: string;
};

export interface FormProps {
    readonly onValidate: () => boolean;
    readonly formMessage: string;
    readonly formValues: Dict<string>;
    readonly initialFormValues?: Dict<string>;
}

export interface FormConfig {
    readonly formId: string,
    readonly validate?: (values: Dict<string>) => Dict<string>
}

export interface SelectFieldProps extends BaseFieldProps {
    readonly floatingLabelText: string;
    readonly items: JSX.Element[];
    readonly hintText?: string;
}

export interface TextFieldProps extends BaseFieldProps {
    readonly floatingLabelText: string;
    readonly type: string;
    readonly hintText?: string;
}

export function connectSelectField(config: FormConfig): React.ComponentClass<SelectFieldProps> {
    return connectField<SelectFieldProps>(config,(props) => (
        <SelectField
            value={props.value}
            errorText={props.errorText}
            hintText={props.hintText}
            floatingLabelText={props.floatingLabelText}
            onChange={(e,k,p)=>props.onChange(e,p)}
        >
            {props.items}
        </SelectField>
    ));
}

export function connectTextField(config: FormConfig): React.ComponentClass<TextFieldProps> {
    return connectField<TextFieldProps>(config,(props) => (
        <TextField
            value={props.value}
            errorText={props.errorText}
            hintText={props.hintText}
            floatingLabelText={props.floatingLabelText}
            type={props.type}
            onChange={props.onChange}
        />
    ));
}

export function connectForm<Props extends FormProps>(
    config: FormConfig,
    WrappedComponent: (props: Props) => JSX.Element) {
        const mapStateToProps = (state : State, ownProps: Props)  => {
            let formValues = {};
            let formMessage = "";
            if(state.ui && state.ui.form) {
                const formData = state.ui.form[config.formId];
                if(formData && formData.values) {
                    formValues = formData.values;
                }
                if(formData && formData.message) {
                    formMessage = formData.message;
                }
            }
            return  { ...Object.assign(ownProps), formValues, formMessage };
        }

        return connect(mapStateToProps)(
            class WrappedForm extends React.Component<Props & { dispatch: Dispatch<any>, formValues: Dict<string>, formMessage: string },{}> {
                constructor(props: Props & { dispatch: Dispatch<any>, formValues: Dict<string>, formMessage: string }) {
                    super(props);
                }

                componentDidMount() {
                    this.props.dispatch(
                        createFormAction(
                            formInit(config.formId, {...Object.assign(this.props.initialFormValues || {})})
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
                        const errors = config.validate(this.props.formValues);
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
                        formMessage={this.props.formMessage}
                        formValues={this.props.formValues}
                        {...Object.assign(this.props)}
                    />;
                }
            }
        );
}

function connectField<Props extends BaseFieldProps>(
        config: FormConfig,
        wrappedField: (props: Props & ConnectFieldProps) => JSX.Element): React.ComponentClass<Props>
{
    const mapStateToProps = (state : State, ownProps: Props)  => {
        let values = {};
        let value = "";
        let errorText = "";
        let touched = false;
        if(state.ui && state.ui.form) {
            const formData = state.ui.form[config.formId];
            if(formData && formData.values) {
                values = formData.values;
                if(Dict.contains(values,ownProps.name)) {
                    value = values[ownProps.name] || "";
                }
            }
            if(formData && formData.errors) {
                errorText = formData.errors[ownProps.name]
            }
            if(formData && formData.touched) {
                touched = formData.touched[ownProps.name]
            }
        }
        return { ...Object.assign(ownProps), values, value, errorText: touched ? errorText : "" };
    }

    const field = (props : Props & ConnectFieldProps) => {
        const onChange = (event: Event, newValue: string) => {
            const errors = config.validate(Dict.clone(props.values,Dict.singleton(props.name,newValue)));
            props.dispatch(
                createFormAction(
                    fieldChanged(config.formId, props.name, newValue, errors)
                )
            );
        };

        return wrappedField({...Object.assign(props), onChange});
    };

    return connect(mapStateToProps)(field);
}
