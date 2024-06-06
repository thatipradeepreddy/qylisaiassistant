import { configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import rootReducer from "./reducers/rootReducer.reducer";
import userSaga from "./sagas/userSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

function* rootSaga() {
  yield all([
    userSaga()
  ]);
}

sagaMiddleware.run(rootSaga);

export default store;
