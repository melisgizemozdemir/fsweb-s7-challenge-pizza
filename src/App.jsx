import React from 'react';
import { Route, Switch, Link} from 'react-router-dom';



import OrderPage from './components/pages/OrderPage';
import ConfirmationPage from './components/pages/ConfimationPage';
import Logo from '../Assets/mile1-assets/logo.svg';
import Hero from '../Assets/mile1-assets/home-banner.png'

import "./App.css"

function HomePage() {
  return (

    <>
 <div className='container'>
   

      <img className= "hero" src={Hero}/>

     
      
          <div className='logo'>
            <img src={Logo} />
          </div>
          
          <h1 className = 'baslik'>fırsatı kaçırma</h1>
          <h1 className='baslik2'>KOD ACIKTIRIR PIZZA, DOYURUR</h1>
      
          <Link to="/siparis-formu" className="button">ACIKTIM</Link>
    </div>
      </>
  );
}


function App() {
  
  return (

      <>

    <Switch> 
            <Route exact path="/"><HomePage/></Route>
            <Route path='/siparis-formu'> <OrderPage /></Route>
            <Route path='/siparis-onayi'><ConfirmationPage /></Route>
    </Switch>

        </>
  )
}

export default App
