import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { tableReducer } from "./tableReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { modalReducer } from "./detailedModalReducer";

type ReduxAction<TYPE extends string, Payload = undefined> = {
  type: TYPE;
  payload: Payload;
};

const reducers = combineReducers({
  tableReducer: tableReducer,
  modalReducer: modalReducer,
});

const ReduxStore = createStore(reducers, composeWithDevTools());

// Infer the `RootState` and `AppDispatch` types from the store itself
type ReduxState = ReturnType<typeof ReduxStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type ReduxDispatch = typeof ReduxStore.dispatch;

export { ReduxStore, ReduxState, ReduxDispatch, ReduxAction };
