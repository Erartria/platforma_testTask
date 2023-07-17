import React from "react";
import { DataType } from "../dataGridConfigs/data";
import { TableSchema } from "../dataGridConfigs/report-config";
import { ColumnHider } from "./ColumnHider";
import { DetailedInfoModal, DetailedInfoModalProps } from "./DetailedInfoModal";
import DataGrid, { Column, Pager, Paging } from "devextreme-react/data-grid";

type CustomDataGridProps = TableSchema & {
  data: DataType[];
};
type CustomDataGridState = Required<CustomDataGridProps> & {
  editingColumnIndex?: number;
  detailedModal: Partial<DetailedInfoModalProps>;
};

class CustomDataGrid extends React.PureComponent<
  CustomDataGridProps,
  CustomDataGridState
> {
  constructor(props: CustomDataGridProps) {
    super(props);
    this.state = {
      name: "",
      code: "",
      hiddenColums: [],
      detailedModal: {
        isVisible: false,
      },
      ...props,
    };
  }

  private pageSizes: Readonly<Array<number>> = [20, 30];

  render() {
    return (
      <>
        <DetailedInfoModal
          isVisible={true}
          onOk={() => this.setState({ detailedModal: { isVisible: false } })}
          onCancel={() =>
            this.setState({ detailedModal: { isVisible: false } })
          }
          {...this.state.detailedModal}
        />
        <ColumnHider
          buttonText="Hide/Show columns"
          hiddenColumns={this.state.hiddenColums}
          colums={this.props.colums}
          onMenuItemClick={(column) => {
            const newHiddenColumns = [...this.state.hiddenColums];
            if (this.state.hiddenColums.includes(column)) {
              this.setState({
                hiddenColums: newHiddenColumns.filter((col) => col != column),
              });
            } else {
              newHiddenColumns.push(column);
              this.setState({
                hiddenColums: newHiddenColumns,
              });
            }
          }}
        />
        {this.props.name && <h1>{this.props.name}</h1>}
        <DataGrid
          // allowColumnReordering={true}
          // rowAlternationEnabled={true}
          showBorders={true}
          keyExpr={"key"}
          style={{ width: "100%" }}
          dataSource={this.props.data}
          onRowDblClick={this.onRowDblClick}
          onCellClick={(evt) => {
            if (evt.rowType == "header") {
              this.setState({ editingColumnIndex: evt.columnIndex });
            }
          }}
        >
          {this.props.colums
            .filter((col) => !this.state.hiddenColums?.includes(col))
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
                    if (index == this.state.editingColumnIndex) {
                      return (
                        <input
                          role="form"
                          autoFocus
                          key={index}
                          value={col.caption}
                          // onBlur={() =>
                          //   this.setState({ editingColumnIndex: undefined })
                          // }
                          onKeyDown={(keyEvt) => {
                            if (keyEvt.key == "Enter") {
                              keyEvt.preventDefault();
                              this.setState({ editingColumnIndex: undefined });
                            }
                          }}
                          onChange={(el) =>
                            this.setState((prev) => {
                              col.caption = el.target.value;
                              return { colums: [...prev.colums, col] };
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
            allowedPageSizes={this.pageSizes}
            showNavigationButtons={true}
            showInfo={true}
            infoText="Страница №{0}. Всего страниц: {1} ({2} строк)"
          />
          <Paging
            defaultPageSize={this.pageSizes.length > 0 ? this.pageSizes[0] : 10}
          />
        </DataGrid>
      </>
    );
  }

  public onRowDblClick = (evt: { data: DataType }) => {
    this.setState({ detailedModal: { isVisible: true, record: evt.data } });
  };
}

export { CustomDataGrid, CustomDataGridProps };
