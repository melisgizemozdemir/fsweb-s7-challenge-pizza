import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Logo from '../Assets/mile1-assets/logo.svg';

import "../css/OrderPage.css";


const malzemeler = [
    "Pepperoni",
    "Mantar",
    "Zeytin",
    "Sosis",
    "Kanada Jambonu",
    "Tavuk Izgara",
    "Soğan",
    "Domates",
    "Mısır",
    "Sucuk",
    "Jalapeno",
    "Sarımsak",
    "Biber",
    "Ananas",
    "Kabak",
];

const OrderPage = () => {
    const history = useHistory();
    
    const [formData, setFormData] = useState({
        isim: '',
        boyut: '',
        malzemeler: [],
        notlar: 'Siparişinize eklemek istediğiniz not var mı?',
        adet: 1
    });

    const [checkedMalzemeler, setCheckedMalzemeler] = useState(
        malzemeler.reduce((acc, malzeme) => {
            acc[malzeme] = false;
            return acc;
        }, {})
    );

    useEffect(() => {
        const malzemeSayisi = Object.values(checkedMalzemeler).filter(val => val).length;
        const isFormValid = malzemeSayisi >= 4 && malzemeSayisi <= 10 && formData.isim.length >=3 && formData.boyut !== '';
        document.getElementById('submitBtn').disabled = !isFormValid;
    }, [checkedMalzemeler, formData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            const updatedMalzemeler = checked ? [...formData.malzemeler, value] : formData.malzemeler.filter(malzeme => malzeme !== value);
            setFormData(prevState => ({
                ...prevState,
                malzemeler: updatedMalzemeler
            }));
            setCheckedMalzemeler(prevState => ({
                ...prevState,
                [value]: checked
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleDropdownChange = (e) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            boyut: value
        }));
    };

    const handleAdetChange = (operation) => {
        if (operation === 'azalt' && formData.adet === 1) return;
        setFormData(prevState => ({
            ...prevState,
            adet: operation === 'arttir' ? prevState.adet + 1 : prevState.adet - 1
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        axios.post('https://reqres.in/api/pizza', formData )
    .then((response)=> {
        console.log('Response:', response.data);
        history.push('/siparis-onayi');
    })
    .catch((error) => {
        console.error("Error",error);
    });
    };
    
    return (
        <div>
            <header className="header"><img className ="logo" src={Logo} /></header>
            <form className="form-container" onSubmit={handleSubmit}>
                <h1>Position Absolute Pizza</h1>
                <h2>85.50₺</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius modi necessitatibus, quia facere totam vel iusto? Porro accusamus dignissimos ipsum ullam ex eaque, sed quidem voluptate aperiam laudantium eligendi provident!</p>

                <div className="radio-dropdown-container">
                    <div className='radio'>
                        <label ><b>Boyut Seç<b/></b></label><br /><br/>
                        <input type="radio" id="kucuk" name="boyut" value="kucuk" onChange={handleDropdownChange} required />
                        <label>Küçük</label><br />
                        <input type="radio" id="orta" name="boyut" value="orta" onChange={handleDropdownChange} />
                        <label>Orta</label><br />
                        <input type="radio" id="buyuk" name="boyut" value="buyuk" onChange={handleDropdownChange} />
                        <label>Büyük</label><br /><br />
                    </div>

                    <div className='dropdown'>
                        <label><b>Hamur Seç</b></label><br /><br/>
                        <select value={formData.selectedOption} onChange={handleDropdownChange}>
                            <option value="ince">İnce</option>
                            <option value="kalin">Kalın</option>
                        </select><br /><br />
                    </div>
                </div>

                <label><b>Hamur Seç</b></label><br />
                <div className="checkbox-container">
               
                {malzemeler.map((malzeme, index) => (
                  <div className="checkbox-row" key={index}>
                    <label htmlFor={`malzeme${index + 1}`} check>
                      <input
                        id={`malzeme${index + 1}`}
                        data-cy={`malzeme-checkbox-${malzeme}`}
                        type="checkbox"
                        name="malzeme"
                        value={malzeme}
                        onChange={handleChange}
                      />{' '}
                      {malzeme}
                    </label>
                  </div>
                ))}
              </div>
                
                <label><b>İsim Soyisim</b></label>
                <div className="name-input">
                    <input type="text" name="isim" value={formData.isim} onChange={handleChange} /><br /><br /> 
                </div>

                <label><b>Sipariş Notu</b><br />
                    <div className="note-input">
                        <textarea name="notlar" value={formData.notlar} rows={4} onChange={handleChange}></textarea><br /><br />
                    </div>
                </label>
            
                <hr/>

                <div className ="adet-ozet-container">
                    <div className="adet-input">
                        <button type="button" onClick={() => handleAdetChange('azalt')}>-</button>
                        <input
                            type="number"
                            name="adet"
                            value={formData.adet}
                            readOnly
                        />
                        <button type="button" onClick={() => handleAdetChange('arttir')}>+</button>
                    </div><br />

                    <hr />
                    <div className='fiyat-bilgisi'>
                        <label><b>Sipariş Toplamı</b></label><br/><br/>
                        <label>Seçimler:</label>
                        <span>{Object.values(checkedMalzemeler).filter(val => val).length * 5}₺</span>
                        <br/><label >Toplam Fiyat:  </label>
                        <span>{(85.5 + (Object.values(checkedMalzemeler).filter(val => val).length * 5)) * formData.adet}₺</span>
                        
                    </div>
                
                    
                </div>
                <button id="submitBtn" className='button' type="submit" disabled>Sipariş Ver</button>
                
            </form>
        </div>
    );
}

export default OrderPage;
