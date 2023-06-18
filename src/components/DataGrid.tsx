import { Table } from "antd";
import React from "react";
import { DataType } from "../dataGridConfigs/data";
import { TableSchema } from "../dataGridConfigs/report-config";
import { ColumnHider } from "./ColumnHider";
import { DetailedInfoModal, DetailedInfoModalProps } from "./DetailedInfoModal";
import { format } from "date-fns";
import { ColumnType } from "antd/es/table";

type DataGridProps = TableSchema & {
  data: DataType[];
};
type DataGridState = Required<DataGridProps> & {
  editingColumn?: TableSchema["colums"][number];
  detailedModal: Partial<DetailedInfoModalProps>;
};

class DataGrid extends React.PureComponent<DataGridProps, DataGridState> {
  constructor(props: DataGridProps) {
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
        <Table
          size="small"
          pagination={{
            defaultPageSize: 20,
            showSizeChanger: true,
            pageSizeOptions: ["20", "30"],
            total: this.props.data.length,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          caption={`${this.props.name}`}
          key={this.props.code}
          style={{ width: "100%" }}
          dataSource={this.props.data}
          onRow={(record) => {
            return {
              onDoubleClick: () => {
                this.setState({
                  detailedModal: { isVisible: true, record: record },
                });
              },
            };
          }}
          columns={this.props.colums
            .filter((col) => !this.state.hiddenColums?.includes(col))
            .map((col) => {
              return {
                title: () => {
                  if (this.state.editingColumn == col) {
                    return (
                      <input
                        role="form"
                        autoFocus
                        value={col.caption}
                        onBlur={() =>
                          this.setState({ editingColumn: undefined })
                        }
                        onKeyDown={(keyEvt) => {
                          if (keyEvt.key == "Enter") {
                            keyEvt.preventDefault();
                            this.setState({ editingColumn: undefined });
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
                },
                dataIndex: col.dataField,
                align: col.alignment,
                onHeaderCell: () => {
                  return {
                    onClick: (_) => {
                      this.setState({ editingColumn: col });
                    },
                  };
                },
                render: (cellData) => {
                  switch (col.dataType) {
                    case "date":
                      if (col.format && cellData && cellData instanceof Date) {
                        return format(cellData, col.format);
                      }
                      break;
                    default:
                      console.warn(
                        `Cell data ${cellData} for column ${col} could be rendered uncorrectly`
                      );
                    case "text":
                    case "string":
                    case "number":
                      return cellData;
                      break;
                  }
                  if (cellData) {
                    console.warn(
                      `Cell data ${cellData} for column ${col} could be rendered uncorrectly. Use JSON.stringify`
                    );
                    return JSON.stringify(cellData);
                  } else {
                    return "";
                  }
                },
              } as ColumnType<DataType>;
            })}
        />
      </>
    );
  }
}

export { DataGrid, DataGridProps };
