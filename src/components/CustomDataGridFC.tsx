import React, { FC, useCallback, useMemo, useState } from "react";
import { DataType } from "../dataGridConfigs/data";
import { TableSchema } from "../dataGridConfigs/report-config";
import { ColumnHider } from "./ColumnHider";
import { DetailedInfoModal, DetailedInfoModalProps } from "./DetailedInfoModal";
import DataGrid, { Column, Pager, Paging } from "devextreme-react/data-grid";
import { CellClickEvent, RowDblClickEvent } from "devextreme/ui/data_grid";

type CustomDataGridPropsFC = TableSchema & {
  data: DataType[];
};
type CustomDataGridStateFC = Required<CustomDataGridPropsFC> & {
  editingColumnIndex?: number;
  detailedModal: Partial<DetailedInfoModalProps>;
};

const pageSizes: Readonly<Array<number>> = [20, 30];

const CustomDataGridFC: FC<CustomDataGridPropsFC> = ({
  colums: propColums,
  name,
  data,
}) => {
  const [hiddenColums, setHiddenColumns] = useState<
    CustomDataGridStateFC["hiddenColums"]
  >([]);
  const [detailedModal, setDetailedModal] = useState<
    CustomDataGridStateFC["detailedModal"]
  >({ isVisible: false });
  const [editingColumnIndex, setEditingColumnIndex] =
    useState<CustomDataGridStateFC["editingColumnIndex"]>(undefined);
  const [colums, setColums] =
    useState<CustomDataGridStateFC["colums"]>(propColums);

  const memGridOnRowDblClick = useCallback(
    (evt: RowDblClickEvent<DataType>) => {
      setDetailedModal({ isVisible: true, record: evt.data });
    },
    [setDetailedModal]
  );
  const memGridOnCellClick = useCallback(
    (evt: CellClickEvent<DataType>) => {
      if (evt.rowType == "header") {
        setEditingColumnIndex(evt.columnIndex);
        // eslint-disable-next-line no-console
        // console.log("FC is working");
      }
    },
    [setEditingColumnIndex]
  );

  const memInputOnKeyDown = (keyEvt: React.KeyboardEvent<HTMLInputElement>) => {
    if (keyEvt.key == "Enter") {
      keyEvt.preventDefault();
      setEditingColumnIndex(undefined);
    }
  };
  const memInputOnChange = (
    el: React.ChangeEvent<HTMLInputElement>,
    currentColumn: TableSchema["colums"][number]
  ) => {
    currentColumn.caption = el.target.value;
    setColums([...colums, currentColumn]);
  };

  return (
    <>
      <DetailedInfoModal
        isVisible={true}
        onOk={() => setDetailedModal({ ...detailedModal, isVisible: false })}
        onCancel={() =>
          setDetailedModal({ ...detailedModal, isVisible: false })
        }
        {...detailedModal}
      />
      <ColumnHider
        buttonText="Hide/Show columns"
        hiddenColumns={hiddenColums}
        colums={colums}
        onMenuItemClick={(column) => {
          const newHiddenColumns = [...hiddenColums];
          if (hiddenColums.includes(column)) {
            setHiddenColumns(newHiddenColumns.filter((col) => col != column));
          } else {
            newHiddenColumns.push(column);
            setHiddenColumns(newHiddenColumns);
          }
        }}
      />
      {name && <h1>{name}</h1>}
      <DataGrid
        // allowColumnReordering={true}
        // rowAlternationEnabled={true}
        showBorders={true}
        keyExpr={"key"}
        style={{ width: "100%" }}
        dataSource={data}
        onRowDblClick={memGridOnRowDblClick}
        onCellClick={memGridOnCellClick}
      >
        {colums
          .filter((col) => !hiddenColums?.includes(col))
          .map((col, index) => {
            return (
              <Column
                allowSorting={false}
                key={index}
                caption={col.caption}
                dataField={col.dataField}
                dataType={col.dataType}
                format={col.format}
                alignment={col.alignment}
                headerCellRender={() => {
                  if (index == editingColumnIndex) {
                    return (
                      <input
                        role="form"
                        autoFocus
                        key={index}
                        value={col.caption}
                        onKeyDown={memInputOnKeyDown}
                        onChange={(evt) => memInputOnChange(evt, col)}
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
