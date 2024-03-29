import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import movieReducer from "./reducers/movieReducer";
import userReducer from "./reducers/userReducer";
import postReducer from "./reducers/postReducer";
import dataReducer from "./reducers/dataReducer";
import chatReducer from "./reducers/chatReducer";
import liveShowReducer from "./reducers/liveShowReducer";
import searchReducer from "./reducers/searchReducer";
import ticketReducer from "./reducers/ticketReducer";
import browserReducer from "./reducers/browseReducer";
// const initialState = {
//   movie: {},
// };
const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers = combineReducers({
  movie: movieReducer,
  user: userReducer,
  post: postReducer,
  data: dataReducer,
  chat: chatReducer,
  liveShow: liveShowReducer,
  search: searchReducer,
  ticket: ticketReducer,
  browse: browserReducer,
});

// const store = createStore(
//   reducers,
//   initialState,
//   compose(
//     applyMiddleware(...middleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
