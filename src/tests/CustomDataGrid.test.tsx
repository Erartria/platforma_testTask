import {
  render,
  fireEvent,
  waitFor,
  act,
  findAllByText,
} from "@testing-library/react";
import React, { ReactNode } from "react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { CustomDataGridFC } from "../components/CustomDataGridFC";
import { ReduxStore } from "../stores/Redux/store";
import { TableSchema } from "../dataGridConfigs/report-config";
import { combineReducers, createStore } from "redux";
import { tableReducer } from "../stores/Redux/tableReducer";
import { modalReducer } from "../stores/Redux/detailedModalReducer";

const HOKComponentWithProvider = (
  children: ReactNode,
  store: typeof ReduxStore = MockReduxStore
) => {
  return <Provider store={store}>{children}</Provider>;
};

describe("Data grid", () => {
  //создавать таблицу на базе конфигурации report-config.json или report-config.js,
  it("Data grid is renders all columns from configuration", async () => {
    const { getByText } = render(
      HOKComponentWithProvider(<CustomDataGridFC data={tableMockData} />)
    );

    const columnEnelements: HTMLElement[] = [];

    //Ждем пока отобразится таблица
    await waitFor(() => {
      getByText(visibleColumns[0].caption);
    });
    visibleColumns.forEach((col) => {
      columnEnelements.push(getByText(col.caption));
    });
    expect(columnEnelements).toHaveLength(visibleColumns.length);
  });
  //•	предоставлять возможность скрытия/отображения колонок (без изменения источника данных data.js),
  it("Data grid can hide/show columns", async () => {
    const { queryByText, getAllByRole, getByText, getByTitle, findAllByText } =
      render(
        HOKComponentWithProvider(<CustomDataGridFC data={tableMockData} />)
      );

    //Ждем пока отобразится таблица
    await waitFor(() => {
      getByText(visibleColumns[0].caption);
    });

    const showHideColumnWidget = getByTitle(/column chooser/i);

    expect(showHideColumnWidget).toBeInTheDocument();

    await fireEvent.click(showHideColumnWidget);
    await waitFor(() => {
      expect(getAllByRole(`treeitem`)).toHaveLength(
        tableMockConfiguration.colums.length
      );
    });

    const treeItems = getAllByRole(`treeitem`) as HTMLElement[];
    const firstTreeItem = treeItems[0] as HTMLElement;
    const parentPopupWindow = firstTreeItem.closest(
      ".dx-overlay-wrapper"
    ) as HTMLElement;

    const closeButtonHideShowColumnWidget = parentPopupWindow.querySelector(
      `[role="button"]`
    ) as HTMLElement;

    act(() => {
      closeButtonHideShowColumnWidget.click();
    });

    await fireEvent.click(showHideColumnWidget);

    const columnEnelementsDoubleDim = await Promise.all(
      tableMockConfiguration.colums.map(async (cur) => {
        const allByTextArr = await findAllByText(cur.caption);
        return allByTextArr;
      }, [])
    );
    let columnEnelements: HTMLElement[] = [];
    columnEnelements = columnEnelements.concat(...columnEnelementsDoubleDim);
    const visibleColumnElements = columnEnelements.filter((el) =>
      el.querySelector(`div`)
    );

    // Скрыта первая колонка
    expect(visibleColumnElements).toHaveLength(
      tableMockConfiguration.colums.length - 1
    );
  });

  //•	предоставлять возможность изменения наименования колонок,
  it("Data grid can change column names", async () => {
    const { queryByText, getByText, getByRole } = render(
      HOKComponentWithProvider(<CustomDataGridFC data={tableMockData} />)
    );
    // Ждем пока отобразится таблица
    await waitFor(() => {
      getByText(tableMockConfiguration.colums[0].caption);
    });
    const columnEnelements: HTMLElement[] = [];
    tableMockConfiguration.colums.forEach((col) => {
      const foundElement = queryByText(col.caption);
      foundElement && columnEnelements.push(foundElement);
    });
    act(() => columnEnelements[0].click());
    const changeColumnHeaderInput = getByRole("form") as HTMLInputElement;
    // при нажатии на колонку - поялвляется инупут с текстом колонки
    expect(changeColumnHeaderInput.value).toEqual(
      tableMockConfiguration.colums[0].caption
    );

    const someText = "Test";
    await userEvent.clear(changeColumnHeaderInput);
    userEvent.type(changeColumnHeaderInput, `${someText}{enter}`);
    // Ждем пока отобразится таблица
    await waitFor(() => {
      expect(getByText("Test")).toBeInTheDocument();
    });
  });
  //•	для таблицы сделать пагинацию (20-30 записей на 1 страницу таблицы),
  it("Data grid has a pagination", async () => {
    const { getByText } = render(
      <Provider store={MockReduxStore}>
        <CustomDataGridFC {...tableMockConfiguration} data={tableMockData} />
      </Provider>
    );

    await waitFor(() => {
      expect(getByText("20")).toBeInTheDocument();
    });
  });

  //•	при двойном клике на строку таблицы должно открываться модальное окно, в котором выведена подробная информация о записи.
  //   it("Data grid row on doubleclcik shows a detailed information modal", async () => {
  //     const { getByText, container } = render(
  //       HOKComponentWithProvider(<CustomDataGridFC data={tableMockData} />)
  //     );
  //     // // Ждем пока отобразится таблица
  //     // await waitFor(() => {
  //     //   getByText(tableMockConfiguration.colums[0].caption);
  //     // });
  //     const firstTrAtBody = container.querySelector(
  //       ".dx-data-row"
  //     ) as HTMLElement;
  //     act(() => userEvent.dblClick(firstTrAtBody));
  //     expect(getByText(/detailed info/i)).toBeInTheDocument();
  //   });
});

const reducers = combineReducers({
  tableReducer: tableReducer,
  modalReducer: modalReducer,
});

const MockReduxStore = createStore(reducers);

// Infer the `RootState` and `AppDispatch` types from the store itself
type MockReduxState = ReturnType<typeof MockReduxStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type MockReduxDispatch = typeof MockReduxStore.dispatch;

const tableMockConfiguration: TableSchema = {
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
  hiddenColums: [
    {
      caption: "Column # 4",
      dataField: "col4",
      dataType: "date",
      format: "yyyy-MM-dd",
    },
  ],
};

const tableMockData = [
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

const visibleColumns = tableMockConfiguration.colums.filter(
  (col) =>
    tableMockConfiguration.hiddenColums?.findIndex(
      (c) => c.dataField == col.dataField
    ) == -1
);
