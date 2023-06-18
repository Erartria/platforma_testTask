import { FromSchema } from "json-schema-to-ts";
import { columnSchema, tableSchema } from "./report-config.schema";

const tableConfiguration: TableSchema = {
  name: "Configurable table",
  code: "table-01",
  colums: [
    {
      caption: "Column # 1",
      dataField: "col1",
      dataType: "text",
      alignment: "center",
    },
    {
      caption: "Column # 2",
      dataField: "col2",
      dataType: "text",
      alignment: "left",
    },
    {
      caption: "Column # 3",
      dataField: "col3",
      dataType: "text",
      alignment: "right",
    },
    {
      caption: "Column # 4",
      dataField: "col4",
      dataType: "date",
      format: "yyyy-MM-dd",
    },
  ],
};

type TableSchema = FromSchema<
  typeof tableSchema,
  { references: [typeof columnSchema] }
>;
type ColumnSchema = TableSchema["colums"][0];

export { TableSchema, ColumnSchema, tableConfiguration };
