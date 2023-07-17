import { combineReducers, createStore } from "redux";
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

const StoriesStore = createStore(reducers, composeWithDevTools());

// Infer the `RootState` and `AppDispatch` types from the store itself
type StoriesState = ReturnType<typeof StoriesStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type StoriesDispatch = typeof StoriesStore.dispatch;

export { StoriesStore, StoriesState, StoriesDispatch, ReduxAction };
