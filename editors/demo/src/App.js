import React from 'react'
import Editors from './Editors'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const App = () => {
    return (
        <Editors />
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