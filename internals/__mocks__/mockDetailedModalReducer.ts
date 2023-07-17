import { DataType } from "../../src/dataGridConfigs/data";
import { ReduxAction } from "../../src/stores/Redux/store";

type State = {
  record?: DataType;
  isVisible: boolean;
};

const initialState: State = {
  record: undefined,
  isVisible: false,
};

type ShowModalWithDetails = ReduxAction<
  "SHOW_MODAL_WITH_DETAILS",
  {
    record: DataType;
  }
>;

type HideModalWithDetails = ReduxAction<"HIDE_MODAL">;

type ModalAction = ShowModalWithDetails | HideModalWithDetails;

const modalReducer = (
  state: State = initialState,
  action: ModalAction
): State => {
  const { payload } = action;
  switch (action.type) {
    case "SHOW_MODAL_WITH_DETAILS": {
      return {
        ...state,
        isVisible: true,
        record: payload?.record,
      };
      break;
    }
    case "HIDE_MODAL":
      return {
        ...state,
        isVisible: false,
        record: undefined,
      };
    default:
      return state;
  }
};

export { modalReducer, ModalAction, State };
