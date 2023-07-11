import React from 'react'
import Editors from './Editors'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './store/store';

const App = () => {
    return (
        <Provider store={store}>
            <Editors />
        </Provider>
    )
}

export default App



// return (
//     <Router>
//         <Route path="/"  component={<Editors />} />
//         <Route path="/about" component={<h1>Hello surya</h1>} />
//         <Route path="/contact" component={<Editors />} />
//         {/* <Editors /> */}
//     </Router>
// )