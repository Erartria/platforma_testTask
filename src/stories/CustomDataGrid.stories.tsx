import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import type { Meta, StoryObj } from "@storybook/react";
import {
  CustomDataGrid,
  CustomDataGridProps,
} from "../components/CustomDataGrid";
import { TableSchema } from "../dataGridConfigs/report-config";

const storieTableConfig: TableSchema = {
  name: "Configurable mock table",
  code: "table-01-mock",
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

const storieTableData = [
  {
    key: "1",
    col1: "Edward 1",
    col2: "King 1",
    col3: "Smth 1",
    col4: new Date(2020, 12, 12),
  },
  {
    key: "2",
    col1: "Edward 2",
    col2: "King 2",
  },
  {
    key: "3",
    col1: "Edward 3",
    col2: "King 3",
  },
  {
    key: "4",
    col1: "Edward 4",
    col2: "King 4",
  },
  {
    key: "5",
    col1: "Edward 5",
    col2: "King 5",
  },
  {
    key: "6",
    col1: "Edward 6",
    col2: "King 6",
  },
  {
    key: "7",
    col1: "Edward 7",
    col2: "King 7",
  },
  {
    key: "8",
    col1: "Edward 8",
    col2: "King 8",
  },
  {
    key: "9",
    col1: "Edward 9",
    col2: "King 9",
  },
  {
    key: "10",
    col1: "Edward 10",
    col2: "King 10",
  },
  {
    key: "11",
    col1: "Edward 11",
    col2: "King 11",
  },
  {
    key: "12",
    col1: "Edward 12",
    col2: "King 12",
  },
  {
    key: "13",
    col1: "Edward 13",
    col2: "King 13",
  },
  {
    key: "14",
    col1: "Edward 1",
    col2: "King 1",
  },
  {
    key: "15",
    col1: "Edward 2",
    col2: "King 2",
  },
  {
    key: "16",
    col1: "Edward 3",
    col2: "King 3",
  },
  {
    key: "17",
    col1: "Edward 4",
    col2: "King 4",
  },
  {
    key: "18",
    col1: "Edward 5",
    col2: "King 5",
  },
  {
    key: "19",
    col1: "Edward 6",
    col2: "King 6",
  },
  {
    key: "20",
    col1: "Edward 7",
    col2: "King 7",
  },
  {
    key: "21",
    col1: "Edward 8",
    col2: "King 8",
  },
  {
    key: "22",
    col1: "Edward 9",
    col2: "King 9",
  },
  {
    key: "23",
    col1: "Edward 10",
    col2: "King 10",
  },
  {
    key: "24",
    col1: "Edward 11",
    col2: "King 11",
  },
  {
    key: "25",
    col1: "Edward 12",
    col2: "King 12",
  },
  {
    key: "26",
    col1: "Edward 13",
    col2: "King 13",
  },
  {
    key: "27",
    col1: "Edward 10",
    col2: "King 10",
  },
  {
    key: "28",
    col1: "Edward 11",
    col2: "King 11",
  },
  {
    key: "29",
    col1: "Edward 12",
    col2: "King 12",
  },
  {
    key: "30",
    col1: "Edward 13",
    col2: "King 13",
  },
];

const meta: Meta<CustomDataGridProps> = {
  title: "DataGrid",
  component: CustomDataGrid,
};

type Story = StoryObj<CustomDataGridProps>;

const args = Object.assign({}, storieTableConfig, { data: storieTableData });
//👇 Throws a type error it the args don't match the component props
const Table: Story = {
  name: "DataGrid",
  args: args,
};

// eslint-disable-next-line no-restricted-syntax
export default meta;
export { Table };
