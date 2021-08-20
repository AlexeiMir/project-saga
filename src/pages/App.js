import {useDispatch, useSelector} from "react-redux";
import {Link, NavLink} from "react-router-dom";

function App() {
    const store = useSelector(store => store)
    const dispatch = useDispatch()

    console.log(store)

  return (
    <div className="App">
      Saga
        <div>
            <Link to={'/blog'}>
                Open blog
            </Link>
        </div>
    </div>
  );
}

export default App;
