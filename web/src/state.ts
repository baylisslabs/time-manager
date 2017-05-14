
import { ModalKey } from "./components/modal/keys";

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

  static clone(source:UiState, modifers: Partial<UiState>) {
    return {...source, ...modifers};
  }
}

