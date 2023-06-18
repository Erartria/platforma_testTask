import type { Meta, StoryObj } from "@storybook/react";
import { ColumnHider, ColumnHiderProps } from "../components/ColumnHider";

const meta: Meta<ColumnHiderProps> = {
  title: "ColumnHider",
  component: ColumnHider,
};

type Story = StoryObj<ColumnHiderProps>;

//👇 Throws a type error it the args don't match the component props
const colums = [
  { caption: "Column 1", dataField: "col1" },
  { caption: "Column 2", dataField: "col2" },
  { caption: "Column 3", dataField: "col3" },
];
const hiddenColums = [colums[1]];
const Hider: Story = {
  name: "ColumnHider",
  args: {
    buttonText: "Column hider",
    colums: colums,
    hiddenColumns: hiddenColums,
    /* eslint-disable @typescript-eslint/no-empty-function */
    onMenuItemClick: () => {},
  },
};

export default meta;
export { Hider };
