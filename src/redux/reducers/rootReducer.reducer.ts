// rootReducer.ts
import { combineReducers } from 'redux';
import userReducer from './userReducer.redducer';


const rootReducer = combineReducers({
  USER: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
