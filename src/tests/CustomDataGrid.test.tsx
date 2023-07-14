// import { render, fireEvent, waitFor, act } from "@testing-library/react";
// import React from "react";
// import userEvent from "@testing-library/user-event";
// import { Provider } from "react-redux";
// // eslint-disable-next-line jest/no-mocks-import
// import {
//   MockReduxStore,
//   tableMockConfiguration,
//   tableMockData,
// } from "../../internals/__mocks__/storeMock";
// import { CustomDataGridFC } from "../components/CustomDataGridFC";

// describe("Data grid", () => {
//   //создавать таблицу на базе конфигурации report-config.json или report-config.js,
//   it("Data grid is renders all columns from configuration", async () => {
//     const { getByText } = render(
//       <Provider store={MockReduxStore}>
//         <CustomDataGridFC data={tableMockData} />
//       </Provider>
//     );

//     const columnEnelements: HTMLElement[] = [];

//     // Ждем пока отобразится таблица
//     await waitFor(() => {
//       getByText(tableMockConfiguration.colums[0].caption);
//     });

//     tableMockConfiguration.colums.forEach((col) => {
//       columnEnelements.push(getByText(col.caption));
//     });
//     expect(columnEnelements).toHaveLength(tableMockConfiguration.colums.length);
//   });
//   //•	предоставлять возможность скрытия/отображения колонок (без изменения источника данных data.js),
//   it("Data grid can hide/show columns", async () => {
//     const { queryByText, getAllByRole, getByRole } = render(
//       <Provider store={MockReduxStore}>
//         <CustomDataGridFC {...tableMockConfiguration} data={tableMockData} />
//       </Provider>
//     );
//     const showHideColumnWidget = getByRole("menu");
//     expect(showHideColumnWidget).toBeInTheDocument();

//     fireEvent.mouseOver(showHideColumnWidget);
//     await waitFor(() => {
//       expect(getAllByRole(`menuitem`)).toHaveLength(
//         tableMockConfiguration.colums.length
//       );
//     });

//     const hideColumnButtonMenus = getAllByRole(`menuitem`);

//     const buttonHide: HTMLButtonElement =
//       hideColumnButtonMenus[0].querySelector<HTMLButtonElement>(
//         `[type="button"]`
//       ) as HTMLButtonElement;
//     act(() => {
//       buttonHide.click();
//     });
//     const columnEnelements: HTMLElement[] = [];
//     tableMockConfiguration.colums.forEach((col) => {
//       const foundElement = queryByText(col.caption);
//       foundElement && columnEnelements.push(foundElement);
//     });

//     // Скрыта первая колонка
//     expect(columnEnelements).toHaveLength(
//       tableMockConfiguration.colums.length - 1
//     );

//     fireEvent.mouseOver(showHideColumnWidget);
//     await waitFor(() => {
//       expect(getAllByRole(`menuitem`)).toHaveLength(
//         tableMockConfiguration.colums.length
//       );
//     });

//     const showColumnButtonMenus = getAllByRole(`menuitem`);

//     const buttonShow: HTMLButtonElement =
//       showColumnButtonMenus[0].querySelector<HTMLButtonElement>(
//         `[type="button"]`
//       ) as HTMLButtonElement;
//     act(() => {
//       buttonShow.click();
//     });

//     const columnEnelementsShown: HTMLElement[] = [];
//     tableMockConfiguration.colums.forEach((col) => {
//       const foundElement = queryByText(col.caption);
//       foundElement && columnEnelementsShown.push(foundElement);
//     });

//     // Все колонки снова показаны
//     expect(columnEnelementsShown).toHaveLength(
//       tableMockConfiguration.colums.length
//     );
//   });

//   //•	предоставлять возможность изменения наименования колонок,
//   it("Data grid can change column names", async () => {
//     const { queryByText, getByText, getByRole, debug } = render(
//       <Provider store={MockReduxStore}>
//         <CustomDataGridFC {...tableMockConfiguration} data={tableMockData} />
//       </Provider>
//     );
//     // Ждем пока отобразится таблица
//     await waitFor(() => {
//       getByText(tableMockConfiguration.colums[0].caption);
//     });
//     const columnEnelements: HTMLElement[] = [];
//     tableMockConfiguration.colums.forEach((col) => {
//       const foundElement = queryByText(col.caption);
//       foundElement && columnEnelements.push(foundElement);
//     });
//     act(() => columnEnelements[0].click());
//     const changeColumnHeaderInput = getByRole("form") as HTMLInputElement;
//     // при нажатии на колонку - поялвляется инупут с текстом колонки
//     expect(changeColumnHeaderInput.value).toEqual(
//       tableMockConfiguration.colums[0].caption
//     );

//     const someText = "Test";
//     await userEvent.clear(changeColumnHeaderInput);
//     userEvent.type(changeColumnHeaderInput, `${someText}{enter}`);
//     // Ждем пока отобразится таблица
//     await waitFor(() => {
//       expect(getByText("Test")).toBeInTheDocument();
//     });
//   });
//   //•	для таблицы сделать пагинацию (20-30 записей на 1 страницу таблицы),
//   it("Data grid has a pagination", async () => {
//     const { getByText } = render(
//       <Provider store={MockReduxStore}>
//         <CustomDataGridFC {...tableMockConfiguration} data={tableMockData} />
//       </Provider>
//     );

//     await waitFor(() => {
//       expect(getByText("20")).toBeInTheDocument();
//     });
//   });

//   //•	при двойном клике на строку таблицы должно открываться модальное окно, в котором выведена подробная информация о записи.
//   it("Data grid row on doubleclcik shows a detailed information modal", async () => {
//     const { getByText, container } = render(
//       <Provider store={MockReduxStore}>
//         <CustomDataGridFC {...tableMockConfiguration} data={tableMockData} />
//       </Provider>
//     );
//     // Ждем пока отобразится таблица
//     await waitFor(() => {
//       getByText(tableMockConfiguration.colums[0].caption);
//     });
//     const firstTrAtBody = container.querySelector(
//       ".dx-data-row"
//     ) as HTMLElement;
//     act(() => userEvent.dblClick(firstTrAtBody));
//     expect(getByText(/detailed info/i)).toBeInTheDocument();
//   });
// });
