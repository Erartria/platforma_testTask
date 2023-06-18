import type { Meta, StoryObj } from "@storybook/react";
import {
  DetailedInfoModal,
  DetailedInfoModalProps,
} from "../components/DetailedInfoModal";

const meta: Meta<DetailedInfoModalProps> = {
  title: "DetailedInfoModal",
  component: DetailedInfoModal,
};

type Story = StoryObj<DetailedInfoModalProps>;

//👇 Throws a type error it the args don't match the component props
const DetailedInfo: Story = {
  name: "DetailedInfo",
  args: {
    isVisible: true,
    record: {
      key: "1",
      col1: "Test 1",
      col2: "Test 2",
      col3: "Test 3",
      col4: new Date(),
    },
  },
};

export default meta;
export { DetailedInfo };
