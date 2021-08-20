import {apply, call, take, takeEvery, fork, put, takeLatest, cancel, actionChannel} from "@redux-saga/core/effects";
import {LOCATION_CHANGE} from "connected-react-router";

// actionChannel - собирает actions, которые произошли в буфер и потом по очереди запускает их

export function* fetchPlanets(signal) {
    console.log('LOAD_SOME_DATA starts')

    const response = yield call(fetch, 'http://swapi.dev/api/planets',{signal})
    const data = yield call([response, response.json])

    console.log('LOAD_SOME_DATA completed', data)

}

export function* loadOnAction() {
    const channel = yield actionChannel('LOAD_SOME_DATA')
    while(true){
        yield take(channel)

        yield call(fetchPlanets)
    }
    //yield takeLatest('LOAD_SOME_DATA',fetchPlanets)
    /*let task; // таска, к-ая в данный момент выполняется
    let abortController = new AbortController()

    while(true){
        yield take('LOAD_SOME_DATA')

        if (task){
            abortController.abort();
            yield cancel(task);
            abortController = new AbortController()
        }

        task = yield fork(fetchPlanets, abortController.signal) // signal передается в fetch

    }*/

}


function* loadBlogData() {
    const request = yield call(fetch, 'http://swapi.dev/api/vehicles')
    //const data = yield call([request, request.json])
    const data = yield apply(request, request.json)

    console.log('blog data', data)

    yield put({type:'BLOG LOADED', payload:data})

}

export default function* pageLoaderSaga() {
    while(true){
        const action = yield take(LOCATION_CHANGE)

        if (action.payload.location.pathname.endsWith('blog')) {
            yield fork(loadBlogData)
        }

        console.log('LOCATION_CHANGE', action)
    }

    //yield takeEvery('LOAD_BLOG_DATA', loadBlogData)

}