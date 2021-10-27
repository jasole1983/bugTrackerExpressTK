import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/users/authSlice' 
import bugReducer, { bugSelectors } from '../features/bugs/bugSlice'
import sessionReducer from './session'
import userReducer from '../features/users/userSlice'


// if (process.env.NODE_ENV === 'production') {
//   enhancer = applyMiddleware(thunk);
// } else {
//   const logger = require('redux-logger').default;
//   const composeEnhancers =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//   enhancer = composeEnhancers(applyMiddleware(thunk, logger));
// }
const store = configureStore({
    reducer: {
        auth: authReducer,
        bugs: bugReducer,
        session: sessionReducer,
        users: userReducer,
    }
})

export const bugs = bugSelectors.selectAll(store.getState())

export default store

