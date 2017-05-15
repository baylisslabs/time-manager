
import { Enum } from "typescript-string-enums";
import TextField from "material-ui/TextField";
import { Dict } from "./dict";

export type FormMap = Dict<FormData>;

export class FormData {
    readonly values: Dict<string> = {};
    readonly errors: Dict<string> = {};
    readonly touched: Dict<boolean> = {};
    readonly message: string = "";
}

export const FormActionType = Enum(
    "FIELD_CHANGED",
    "FORM_VALIDATED",
    "FORM_INIT",
    "FORM_DESTROY",
    "FORM_SET_MESSAGE"
);

export type FormActionType = Enum<typeof FormActionType>;

export type FormAction =
    FieldChangedAction
    | FormValidatedAction
    | FormInitAction
    | FormDestroyAction
    | FormSetMessageAction;

export class FieldChangedAction {
    readonly type: typeof FormActionType.FIELD_CHANGED;
    readonly formId: string;
    readonly fieldId: string;
    readonly newValue: string;
    readonly errors: Dict<string>;
}

export class FormValidatedAction {
    readonly type: typeof FormActionType.FORM_VALIDATED;
    readonly formId: string;
    readonly errors: Dict<string>;
}

export class FormInitAction {
    readonly type: typeof FormActionType.FORM_INIT;
    readonly formId: string;
    readonly values: Dict<string>;
}

export class FormSetMessageAction {
    readonly type: typeof FormActionType.FORM_SET_MESSAGE;
    readonly formId: string;
    readonly message: string;
}

export class FormDestroyAction  {
    readonly type: typeof FormActionType.FORM_DESTROY;
    readonly formId: string;
}

export function fieldChanged(formId: string, fieldId: string, newValue: string, errors: Dict<string>): FieldChangedAction {
    return {
        type: FormActionType.FIELD_CHANGED, formId, fieldId, newValue, errors
    };
}

export function formValidated(formId: string, errors: Dict<string>): FormValidatedAction {
    return {
        type: FormActionType.FORM_VALIDATED, formId, errors
    };
}

export function formInit(formId: string, values: Dict<string>): FormInitAction {
    return {
        type: FormActionType.FORM_INIT, formId, values
    };
}

export function formDestroy(formId: string): FormDestroyAction {
    return {
        type: FormActionType.FORM_DESTROY, formId
    };
}

export function formSetMessage(formId: string, message: string): FormSetMessageAction {
    return {
        type: FormActionType.FORM_SET_MESSAGE, formId, message
    };
}

export function formReducer(state: FormMap = {}, action: FormAction): FormMap {
    switch(action.type) {
        case FormActionType.FIELD_CHANGED: return fieldChangedReducer(state,action);
        case FormActionType.FORM_VALIDATED: return formValidatedReducer(state,action);
        case FormActionType.FORM_INIT: return formInitReducer(state,action);
        case FormActionType.FORM_DESTROY: return formDestroyReducer(state,action);
        case FormActionType.FORM_SET_MESSAGE: return formSetMessageReducer(state,action);
        default: return state;
    }
}

function fieldChangedReducer(state: FormMap, action: FieldChangedAction) : FormMap {
    const original = state[action.formId] || new FormData();
    const updated = {
        values: Dict.clone(original.values,Dict.singleton(action.fieldId,action.newValue)),
        errors: action.errors ? action.errors : original.errors,
        touched: Dict.clone(original.touched,Dict.singleton(action.fieldId,true)),
        message: "",
    };
    return Dict.clone(state,Dict.singleton(action.formId,updated));
}

function formValidatedReducer(state: FormMap, action: FormValidatedAction) : FormMap {
    const original = state[action.formId] || new FormData();
    const newErrors = action.errors ? action.errors : original.errors;
    const updated = {
        values: original.values,
        errors: action.errors ? action.errors : original.errors,
        touched: Dict.create(Dict.keys(newErrors).map(key=>({ key, value: true }))),
        message: ""
    };
    return Dict.clone(state,Dict.singleton(action.formId,updated));
}

function formInitReducer(state: FormMap, action: FormInitAction) : FormMap {
    const original = state[action.formId] || new FormData();
    const updated = {
        values: action.values,
        errors: {},
        touched: {},
        message: ""
    };
    return Dict.clone(state,Dict.singleton(action.formId,updated));
}

function formSetMessageReducer(state: FormMap, action: FormSetMessageAction) : FormMap {
    const original = state[action.formId] || new FormData();
    const updated = {
        values: original.values,
        errors: original.errors,
        touched: original.touched,
        message: action.message
    };
    return Dict.clone(state,Dict.singleton(action.formId,updated));
}

function formDestroyReducer(state: FormMap, action: FormDestroyAction) : FormMap {
    return Dict.clone(state,Dict.singleton(action.formId,undefined));
}




