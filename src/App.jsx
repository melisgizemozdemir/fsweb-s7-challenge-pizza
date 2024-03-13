import React from 'react';
import { Route, Switch} from 'react-router-dom';

import HomePage from './components/pages/HomePage';
import OrderPage from './components/pages/OrderPage'
import ConfirmationPage from './components/pages/ConfimationPage';


import "./App.css"


function App() {
  
  return (

      <>
    <Switch> 
            <Route exact path="/"><HomePage/></Route>
            <Route path='/siparis-formu'> <OrderPage /></Route>
            <Route path='/siparis-onayi'><ConfirmationPage /></Route>
    </Switch>

        </>
  );
}

export default App
