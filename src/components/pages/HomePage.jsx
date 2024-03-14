import { Link } from 'react-router-dom';
import Hero from '../Assets/mile1-assets/home-banner.png'
import Logo from '../Assets/mile1-assets/logo.svg';

import "../css/HomePage.css"

function HomePage() {
    return (
  
      <>
  
   <div className = 'background-container'>
     
        <img className= "hero" src={Hero}/>
    
    </div>
        
    <div className='container'>
        
        <div className='logo'>
          
          <img src={Logo} />
          
          </div>
            
        <h1 className = 'baslik'>fırsatı kaçırma</h1>
        <h1 className='baslik2'>KOD ACIKTIRIR <br/>PIZZA,DOYURUR</h1>
        
            <Link to="/siparis-formu" className="button">ACIKTIM</Link>
      </div>
  
      
        </>
    );
  }
  
  export default HomePage;
