//  Выполняет бизнес логику  (запрос/ таумаут/ запись в кеш) .
//  Запускается в зависимоти от какого-то выполненого экшена
// тестят workerSaga
// Effects - функции возвращающие простые объекты, которые содержат инструкции выполняющиеся самой sagaMiddleware
// Effect прокидывает в redux-saga инструкции, которые ей надо выполнять
// takeEvery создает и запускает worker сагу на каждый dispatch данного action
// takeLatest - автоматически отменяет любую предыдущую задачу саги, запущенную ранее, если она все еще выполняется
// takeLeading - Автоматически отменяет любую следующую задачу саги, запущенную позднее , если первая запущенная еше
// выполняется
// put (неблокирующий)- указывает middleware отправить действие в store. Вызывает dispatch c переданным action. Диспатчит изменения в store
// call(блокирующий) - Выполняет вызов асинхронной функции. Если функция вернет promise, приостанавливает сагу до тех пор , пока
// promise не вызовет resolve
// take & call - блокирующие эффекты. takeEvery сам по себе не блокирующий, но внутри он использует take + fork
// fork - эффект, который указывает middleware выполнить неблокирующий вызов переданной функции
// (создает разветвленный процесс)
// spawn - создает параллельную задачу в корне саги, сам процесс не привязан к родителю
// join - заблокировать не блокирующую задачу и получить ее результат
// select - получить данные из store, аналог useSelect/mapStateToProps
// cancel - отменяет задачу
// yield fork - создает объект с методами и свойствами, которые создает сага
// all - эффект. Параллельно запускает все таски и ждет их завершения. аналог Promise.all
// apply - вызывает функцию в контексте первого аргумента
import {take, takeEvery, takeLatest, takeLeading,put,call, fork, spawn, join, select, delay,all} from 'redux-saga/effects'
import {loadBasicData} from "./initialSagas";
import pageLoaderSaga, {loadOnAction} from "./pageLoaderSaga";
// take(блокирующий) ждет какого либо диспатча экшена в нашем приложении и после того как он происходит, он может выполниться

async function swapiGet(pattern) {
    const request = await fetch(`http://swapi.dev/api/${pattern}`)
    const data = await request.json()

    return data
}

const wait = (t) => new Promise((resolve => {
    setTimeout(resolve,t)
}))



export default function* rootSaga() {
    const sagas = [loadBasicData, pageLoaderSaga, loadOnAction]

    const retrySagas = yield sagas.map(saga => {
        return spawn(function* () {
            while (true){
                try {
                    yield call(saga)
                    break
                } catch(e) {
                    console.log(e)
                }
            }

        })
    })
    yield all(retrySagas)
}

/*function* loadPeople() {
    const people = yield call(swapiGet, 'people')
    yield put({type:'SET_PEOPLE', payload: people.results})
    console.log('load people')
    return people
}
function* loadPlanets() {
    const planets = yield call(swapiGet, 'planets')
    yield put({type:'SET_PLANETS', payload: planets.results})
    console.log('load planets')
}*/

/*
export function* workerSaga() {
    console.log('run parallels tasks')
    // const task = yield fork(loadPeople)
    // yield spawn(loadPlanets)
    // const people = yield join(task)
    yield call(loadPeople)
    yield call(loadPlanets)
    const store = yield select(s => s)
    console.log('finish parallels tasks', store)

}
*/

//  Следит за dispatch'em экшена в приложении и запускает worker
// export function* watchLoadDataSaga() {
//     // while(true){
//     //     yield take('CLICK')
//     //
//     //     yield workerSaga()
//     // }
//     yield takeEvery('LOAD_DATA', workerSaga)
// }