import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { reportWebVitals } from "./reportWebVitals";
import { Data } from "./dataGridConfigs/data";
import { tableConfiguration } from "./dataGridConfigs/report-config";
import { HashRouter } from "react-router-dom";
import { CustomDataGridFC } from "./components/CustomDataGridFC";

const element = document.getElementById("root");
if (element) {
  const root = ReactDOM.createRoot(element);
  root.render(
    <HashRouter>
      <CustomDataGridFC {...tableConfiguration} data={Data} />
    </HashRouter>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
