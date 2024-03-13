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
        // Malzeme sayısı 4'ten az veya 10'dan fazla ise butonu devre dışı bırak
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
        try {
            const response = await axios.post('https://reqres.in/api/pizza', formData);
            console.log('Response:', response.data);
            history.push('/siparis-onayi');
        } catch (error) {
            console.error('Hata:', error);
        }
    };

    return (
        <div>
            <header className="header"><img className ="logo" src={Logo} /></header>
            <form className="form-container" onSubmit={handleSubmit}>
                <h1>Position Absolute Pizza</h1>
                <h2>85.50 TL</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius modi necessitatibus, quia facere totam vel iusto? Porro accusamus dignissimos ipsum ullam ex eaque, sed quidem voluptate aperiam laudantium eligendi provident!</p>

                <div className="radio-dropdown-container">
                    <div className='radio'>
                        <label >Boyut Seç</label><br /><br/>
                        <input type="radio" id="kucuk" name="boyut" value="kucuk" onChange={handleDropdownChange} required />
                        <label>Küçük</label><br />
                        <input type="radio" id="orta" name="boyut" value="orta" onChange={handleDropdownChange} />
                        <label>Orta</label><br />
                        <input type="radio" id="buyuk" name="boyut" value="buyuk" onChange={handleDropdownChange} />
                        <label>Büyük</label><br /><br />
                    </div>

                    <div className='dropdown'>
                        <label>Hamur Seç</label><br /><br/>
                        <select value={formData.selectedOption} onChange={handleDropdownChange}>
                            <option value="ince">İnce</option>
                            <option value="kalin">Kalın</option>
                        </select><br /><br />
                    </div>
                </div>

                <div className="checkbox-container">
                    <label>Ek Malzemeler<br />En az 4, en fazla 10 malzeme seçebilirsiniz. 5TRY</label><br /><br />
                    <div className='all-checkbox'>
                        {malzemeler.map((malzeme, index) => (
                            <div key={index}>
                                <input
                                    type="checkbox"
                                    name="malzemeler"
                                    value={malzeme}
                                    onChange={handleChange}
                                    checked={checkedMalzemeler[malzeme]}
                                />
                                <label>{malzeme}</label><br />
                            </div>
                        ))}
                    </div>
                </div>
                
                <label>İsim Soyisim</label>
                <div className="name-input">
                    <input type="text" name="isim" value={formData.isim} onChange={handleChange} /><br /><br /> 
                </div>

                <label>Sipariş Notu<br />
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
                        <label>Sipariş Toplamı</label><br/><br/>
                        <label>Seçimler:</label>
                        <span>{Object.values(checkedMalzemeler).filter(val => val).length * 5} TL</span>
                        <br/><label >Toplam Fiyat:  </label>
                        <span>{(85.5 + (Object.values(checkedMalzemeler).filter(val => val).length * 5)) * formData.adet} TL</span>
                    </div>
                </div>
                <button id="submitBtn" className='button' type="submit" disabled>Sipariş Ver</button>
                
            </form>
        </div>
    );
}

export default OrderPage;
