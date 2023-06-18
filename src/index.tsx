import React from "react";
import ReactDOM from "react-dom/client";
import { reportWebVitals } from "./reportWebVitals";
import { DataGrid } from "./components/DataGrid";
import { Data } from "./dataGridConfigs/data";
import { tableConfiguration } from "./dataGridConfigs/report-config";

const element = document.getElementById("root");
if (element) {
  const root = ReactDOM.createRoot(element);
  root.render(<DataGrid {...tableConfiguration} data={Data} />);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
