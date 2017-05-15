
import { ModalKey } from "./components/modal/keys";
import { FormMap } from "./components/helpers/formRedux";
import { Enum } from "typescript-string-enums";

export class State {
    readonly app: AppState;
    readonly domain: DomainState;
    readonly ui: UiState;

    static clone(source:State, modifers: Partial<State>) {
        return {...source, ...modifers};
    }
}

export class AppState {
    readonly sessionId: string = null;
    readonly timeNow: number = null;
    readonly fetchState: FetchState = null;

    static clone(source:AppState, modifers: Partial<AppState>) {
        return {...source, ...modifers};
    }
}

export class DomainState {
    /* */
    static clone(source:DomainState, modifers: Partial<DomainState>) {
        return {...source, ...modifers};
    }
}

export class UiState {
    readonly modal: ModalKey = null;
    readonly feedbackMsg: string = null;
    readonly form: FormMap;

    static clone(source:UiState, modifers: Partial<UiState>) {
        return {...source, ...modifers};
    }
}

export const FetchIndicator = Enum(
    "InProgress",
    "Success",
    "Error"
);

export type FetchIndicator = Enum<typeof FetchIndicator>;

export class FetchState {
    readonly resource: string = null;
    readonly status: FetchIndicator = null;
    readonly errorMessage = null;

    static clone(source:UiState, modifers: Partial<UiState>) {
        return {...source, ...modifers};
    }
}
