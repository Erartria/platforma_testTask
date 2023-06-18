import { DownOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Space } from "antd";
import React from "react";
import { TableSchema } from "../dataGridConfigs/report-config";

const getItems = (
  columns: TableSchema["colums"],
  hiddenColumns: TableSchema["colums"],
  onMenuItemClick: (column: TableSchema["colums"][number]) => void
): MenuProps["items"] => {
  return columns.map((column) => {
    return {
      key: column.dataField,
      label: (
        <button type="button" onClick={(_) => onMenuItemClick(column)}>
          {hiddenColumns.includes(column) ? "Show" : "Hide"} {column.caption}
        </button>
      ),
    };
  });
};
type ColumnHiderProps = {
  buttonText: string;
  colums: TableSchema["colums"];
  hiddenColumns: TableSchema["colums"];
  onMenuItemClick: (column: TableSchema["colums"][number]) => void;
};
const ColumnHider: React.FC<ColumnHiderProps> = ({
  buttonText,
  colums,
  hiddenColumns,
  onMenuItemClick,
}) => {
  const items = getItems(colums, hiddenColumns, onMenuItemClick);
  return (
    <Dropdown menu={{ items }}>
      <a role="menu" onClick={(e) => e.preventDefault()}>
        <Space>
          {buttonText}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export { ColumnHider, ColumnHiderProps };
