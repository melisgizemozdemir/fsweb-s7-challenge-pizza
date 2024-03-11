import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Anasayfa from './components/pages/Anasayfa';
import SiparisFormu from './components/pages/SiparisFormu';
import SiparisOnayi from './components/pages/SiparisOnayi';


import "./App.css"

function App() {
  

  return (
<>
        <Switch>
            <Route exact path='/'><Anasayfa /></Route>
            <Route path='/siparis-formu'> <SiparisFormu /></Route>
            <Route path='/siparis-onayi'><SiparisOnayi /></Route>
        </Switch>
        </>
  )
}

export default App
