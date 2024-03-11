import { Link } from "react-router-dom";

export default function Anasayfa(){

    return (

        <div className="anasayfa-container">
        <div className="hero-banner">
        </div>

            <div className="overlay">
        <div className="logo-container">
          <img src=".assets/logo.png" alt="Logo" />
        </div>
        <div className="baslik-container">
          <h1>İlk Başlık</h1>
          <h1>İkinci Başlık</h1>
         
        </div>
        <div className="button-container">
          <Link to="/siparis-formu">
            <button className="sari-buton">Sipariş Ver</button>
          </Link>
        </div>
      </div>
    </div>
  );
};