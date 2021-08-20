import { createBrowserHistory } from 'history'
import {connectRouter} from "connected-react-router";
import {combineReducers} from "redux";

export const history = createBrowserHistory()

const initial = {
    blog: {}
}

function appReducer(state=initial,action) {
    switch (action.type) {
        case 'BLOG LOADED':
            return {
                ...state,
                blog: action.payload
            }
        default:
            return state;

    }

}

const rootReducer = combineReducers({
    app: appReducer,
    router: connectRouter(history)
})

export default rootReducer;