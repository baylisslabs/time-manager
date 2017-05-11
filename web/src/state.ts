
export class State {
  readonly sessionId: string = null;
  readonly timeNow: number = null;

  static clone(source:State, modifers: Partial<State>) {
    return {...source, ...modifers};
  }
}

