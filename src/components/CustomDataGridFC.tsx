import React, { FC, useCallback, useState } from "react";
import { DataType } from "../dataGridConfigs/data";
import { TableSchema } from "../dataGridConfigs/report-config";
import { DetailedInfoModal, DetailedInfoModalProps } from "./DetailedInfoModal";
import DataGrid, {
  Column,
  ColumnChooser,
  Pager,
  Paging,
} from "devextreme-react/data-grid";
import dxDataGrid, {
  CellClickEvent,
  RowDblClickEvent,
} from "devextreme/ui/data_grid";
import { OptionChangedEventInfo } from "devextreme/core/dom_component";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { ColumnAction } from "../stores/Redux/tableReducer";
import { ReduxDispatch, ReduxState } from "../stores/Redux/store";

type CustomDataGridPropsFC = {
  data: DataType[];
};
type CustomDataGridStateFC = Required<CustomDataGridPropsFC> & {
  editingColumnIndex?: number;
  detailedModal: Partial<DetailedInfoModalProps>;
};

const pageSizes: Readonly<Array<number>> = [20, 30];

const CustomDataGridFC: FC<CustomDataGridPropsFC> = ({ data }) => {
  const dispatch = useDispatch<ReduxDispatch>();
  // const [detailedModal, setDetailedModal] = useState<
  //   CustomDataGridStateFC["detailedModal"]
  // >({ isVisible: false });

  const { isVisible: modalIsVisible, record: modalRecord } = useSelector(
    (selector: ReduxState) => selector.modalReducer
  );
  const { colums, hiddenColums, name } = useSelector(
    (selector: ReduxState) => selector.tableReducer.schema
  );
  const { editingColumnIndex } = useSelector(
    (selector: ReduxState) => selector.tableReducer
  );

  const gridOnRowDblClick = (evt: RowDblClickEvent<DataType>) => {
    dispatch({
      type: "SHOW_MODAL_WITH_DETAILS",
      payload: { record: evt.data },
    });
  };
  const gridOnCellClick = (evt: CellClickEvent<DataType>) => {
    if (evt.rowType == "header") {
      dispatch({
        type: "CHANGE_COLUMN_EDITING_MODE",
        payload: { columnIndex: evt.columnIndex },
      });
      // eslint-disable-next-line no-console
      // console.log("FC is working");
    }
  };
  const gridHandleOptionChange = (
    evt: OptionChangedEventInfo<dxDataGrid<DataType>>
  ) => {
    const regExp = new RegExp(/columns\[\d\].visible/i);
    if (regExp.test(evt.fullName)) {
      const start = evt.fullName.indexOf("[");
      const end = evt.fullName.indexOf("]");
      const index = parseInt(evt.fullName.substr(start + 1, end - start - 1));
      const currentColumns = evt.component.option().columns ?? [];
      if (currentColumns.length > index) {
        const currentColumn = currentColumns[index];
        // eslint-disable-next-line no-console
        console.log(currentColumns);
        dispatch({
          type: "CHANGE_COLUMN_VISIBILITY",
          payload: {
            visible: evt.value,
            column: currentColumn as TableSchema["colums"][number],
          },
        });
      }
    }
  };

  const inputOnKeyDown = (keyEvt: React.KeyboardEvent<HTMLInputElement>) => {
    if (keyEvt.key == "Enter") {
      keyEvt.preventDefault();
      dispatch({
        type: "CHANGE_COLUMN_EDITING_MODE",
        payload: { columnIndex: undefined },
      });
    }
  };

  return (
    <>
      <DetailedInfoModal
        isVisible={true}
        onOk={() => dispatch({ type: "HIDE_MODAL", payload: undefined })}
        onCancel={() => dispatch({ type: "HIDE_MODAL", payload: undefined })}
      />
      {name && <h1>{name}</h1>}
      <DataGrid
        // allowColumnReordering={true}
        // rowAlternationEnabled={true}
        showBorders={true}
        keyExpr={"key"}
        style={{ width: "100%" }}
        dataSource={data}
        onRowDblClick={gridOnRowDblClick}
        onCellClick={gridOnCellClick}
        onOptionChanged={gridHandleOptionChange}
      >
        <ColumnChooser allowSearch={true} mode="select" enabled={true} />
        {colums.map((col, index) => {
          return (
            <Column
              allowSorting={false}
              key={index}
              caption={col.caption}
              dataField={col.dataField}
              dataType={col.dataType}
              format={col.format}
              alignment={col.alignment}
              visible={
                hiddenColums?.findIndex(
                  (hCol) => hCol.dataField == col.dataField
                ) == -1
              }
              headerCellRender={() => {
                if (index == editingColumnIndex) {
                  return (
                    <input
                      role="form"
                      autoFocus
                      key={index}
                      value={col.caption}
                      onKeyDown={inputOnKeyDown}
                      onChange={(evt) =>
                        dispatch({
                          type: "CHANGE_COLUMN_CAPTION",
                          payload: {
                            dataField: col.dataField,
                            caption: evt.target.value,
                          },
                        })
                      }
                    />
                  );
                } else {
                  return col.caption;
                }
              }}
            />
          );
        })}

        <Pager
          showPageSizeSelector={true}
          allowedPageSizes={pageSizes}
          showNavigationButtons={true}
          showInfo={true}
          infoText="Страница №{0}. Всего страниц: {1} ({2} строк)"
        />
        <Paging defaultPageSize={pageSizes.length > 0 ? pageSizes[0] : 10} />
      </DataGrid>
    </>
  );
};

export { CustomDataGridFC, CustomDataGridPropsFC };
