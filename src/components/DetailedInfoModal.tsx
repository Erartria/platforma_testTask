import { Modal } from "antd";
import React, { FC } from "react";
import { DataType } from "../dataGridConfigs/data";

type DetailedInfoModalProps = {
  record?: DataType;
  isVisible: boolean;
  onOk: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const DetailedInfoModal: FC<DetailedInfoModalProps> = ({
  record,
  isVisible,
  onOk,
  onCancel,
}) => {
  return (
    <Modal
      title="Detailed Info"
      open={isVisible}
      onOk={(e) => onOk(e)}
      onCancel={(e) => onCancel(e)}
    >
      {record &&
        Object.entries(record).map(([key, value]) => {
          return (
            <div
              key={key}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>{key}:</div>
              <div>{JSON.stringify(value)}</div>
            </div>
          );
        })}
    </Modal>
  );
};
export { DetailedInfoModal, DetailedInfoModalProps };
