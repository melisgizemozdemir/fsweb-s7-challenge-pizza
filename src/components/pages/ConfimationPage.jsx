import React from 'react';

import Logo from '../Assets/mile1-assets/logo.svg';

import "../css/ConfirmationPage.css"

const ConfirmationPage = () => {
    return (
        <div className='page-container'>
        
        <header className='header'>
                <img className ="logo" src={Logo} alt="Logo" />
                </header>
            <section className="success-section">
                <h1 className='success-h1'>TEBRİKLER!<br />SİPARİŞİNİZ ALINDI! </h1>
            </section>
        </div>
    );
}

export default ConfirmationPage;
