
import {
  FETCH_AUTH,
  MODAL_OPEN,
  MODAL_CLOSE,
  LOG_OUT,
  UPDATE_TIME,
  INIT_SESSION,
  FetchStatus
} from "./actions";

import { State } from "./state";

export function timeManagerApp(state = new State(), action: any) {

  switch(action.type) {
    case FETCH_AUTH:
      switch(action.status) {
        case FetchStatus.Ok:
          return State.clone(state,{
            sessionId: action.response.sessionId
        });
      }
      break;
    case MODAL_OPEN:
      if(!state.modal) {
        return State.clone(state,{
          modal: action.name
        });
      }
    case MODAL_CLOSE:
      if(state.modal===action.name) {
        return State.clone(state,{
          modal: null
        });
      }
    case LOG_OUT:
      return State.clone(state,{
        sessionId: null
      });
    case UPDATE_TIME:
      return State.clone(state,{
        timeNow: action.timeStamp
      });
    case INIT_SESSION:
        return State.clone(state,{
            sessionId: action.sessionId
        });
  }

  return state;
}