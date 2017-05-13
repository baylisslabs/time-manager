
export class State {
  readonly sessionId: string = null;
  readonly timeNow: number = null;
  readonly modal: string = null;
  readonly feedbackMsg: string = null;

  static clone(source:State, modifers: Partial<State>) {
    return {...source, ...modifers};
  }
}

