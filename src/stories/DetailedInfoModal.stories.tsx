import type { Meta, StoryObj } from "@storybook/react";
import {
  DetailedInfoModal,
  DetailedInfoModalProps,
} from "../components/DetailedInfoModal";
import { Provider } from "react-redux";
import React from "react";
import { StoriesStore } from "./store/Redux/store";

const meta: Meta<DetailedInfoModalProps> = {
  title: "DetailedInfoModal",
  component: DetailedInfoModal,
  decorators: [(story) => <Provider store={StoriesStore}>{story()}</Provider>],
};

type Story = StoryObj<DetailedInfoModalProps>;

//👇 Throws a type error it the args don't match the component props
const DetailedInfo: Story = {
  name: "DetailedInfo",
};

export default meta;
export { DetailedInfo };
