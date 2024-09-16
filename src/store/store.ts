import { createStore, applyMiddleware, Store, AnyAction } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { rootReducer, RootState } from './rootReducer';


const store: Store<RootState, AnyAction> = createStore(
  rootReducer,
  applyMiddleware(thunk as unknown as ThunkMiddleware<RootState, AnyAction>)
);

export default store;
