import { TableSchema } from "../../src/dataGridConfigs/report-config";
import { ReduxAction } from "../../src/stores/Redux/store";
import { tableMockConfiguration } from "./storeMock";

type State = {
  schema: TableSchema;
  editingColumnIndex?: number;
};

const initialState: State = {
  schema: tableMockConfiguration,
  editingColumnIndex: undefined,
};

type ChangeColumnCaption = ReduxAction<
  "CHANGE_COLUMN_CAPTION",
  {
    caption: TableSchema["colums"][number]["caption"];
    dataField: TableSchema["colums"][number]["dataField"];
  }
>;
type ChangeEditingModeForColumn = ReduxAction<
  "CHANGE_COLUMN_EDITING_MODE",
  {
    columnIndex?: number;
  }
>;
type ChangeColumnVisibility = ReduxAction<
  "CHANGE_COLUMN_VISIBILITY",
  {
    visible: boolean;
    column: TableSchema["colums"][number];
  }
>;

type ColumnAction =
  | ChangeColumnCaption
  | ChangeColumnVisibility
  | ChangeEditingModeForColumn;

const tableReducer = (
  state: State = initialState,
  action: ColumnAction
): State => {
  switch (action.type) {
    case "CHANGE_COLUMN_CAPTION": {
      const { payload } = action;
      const changedColumns = state.schema.colums.map((col) => {
        if (col.dataField == payload.dataField) {
          col.caption = payload.caption;
        }
        return col;
      });
      return {
        ...state,
        schema: {
          ...state.schema,
          colums: changedColumns,
        },
      };
      break;
    }
    case "CHANGE_COLUMN_VISIBILITY": {
      const { payload } = action;
      if (
        payload.visible &&
        state.schema.hiddenColums?.findIndex(
          (hCol) => hCol.dataField == payload.column.dataField
        ) == -1
      ) {
        return {
          ...state,
          schema: {
            ...state.schema,
            hiddenColums: [
              ...state.schema.colums.filter(
                (hCol) => hCol.dataField != payload.column.dataField
              ),
            ],
          },
        };
      } else if (
        !payload.visible &&
        state.schema.hiddenColums?.findIndex(
          (hCol) => hCol.dataField != payload.column.dataField
        ) != -1
      ) {
        const cHiddenColumns = state.schema.hiddenColums ?? [];
        const newHiddenColumns = [...cHiddenColumns, payload.column];
        return {
          ...state,
          schema: {
            ...state.schema,
            hiddenColums: newHiddenColumns,
          },
        };
      }
      return state;
      break;
    }
    case "CHANGE_COLUMN_EDITING_MODE": {
      const { payload } = action;
      return {
        ...state,
        editingColumnIndex: payload.columnIndex,
      };
      break;
    }
    default: {
      return state;
      break;
    }
  }
};

export { tableReducer, ColumnAction, State };
