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
        adet: 1,
        hamur:'',
       
    });

    const [checkedMalzemeler, setCheckedMalzemeler] = useState(
        malzemeler.reduce((acc, malzeme) => {
            acc[malzeme] = false;
            return acc;
        }, {})
    );

    
    const [isFormValid, setIsValid] = useState(false);

    useEffect(() => {
        const malzemeSayisi = Object.values(checkedMalzemeler).filter(val => val).length;
        if(malzemeSayisi >= 4 && malzemeSayisi <= 10 && formData.isim.length >=3 && formData.boyut !== '' && formData.hamur !== '')
        setIsValid(true);
    else{
        setIsValid(false);
    }
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
        } else if (name === 'hamur' || name === 'boyut') { // input alanı hamur veya boyut seçimi ise
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    


    const handleAdetChange = (operation) => {
        if (operation === 'azalt' && formData.adet === 1) return;
        setFormData(prevState => ({
            ...prevState,
            adet: operation === 'arttir' ? prevState.adet + 1 : prevState.adet - 1
        }));
    };

    
    const handleSubmit = (event) => {
        event.preventDefault();

    if(!isFormValid) return;

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
        <>
            <header className="header"><img className ="logo" src={Logo} /></header>
            <form className="form-container" onSubmit={handleSubmit}>
                <h1>Position Absolute Pizza</h1>
                <h2>85.50₺</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius modi necessitatibus, quia facere totam vel iusto? Porro accusamus dignissimos ipsum ullam ex eaque, sed quidem voluptate aperiam laudantium eligendi provident!</p>

                <div className="radio-dropdown-container">
                    <div className='radio'>
                        <label ><b>Boyut Seç<b/></b></label><br /><br/>
                        <input type="radio" name="boyut" value="kucuk" onChange={handleChange} required />
                        <label>Küçük</label><br />
                        <input type="radio" name="boyut" value="orta" onChange={handleChange} />
                        <label>Orta</label><br />
                        <input type="radio" name="boyut" value="buyuk" onChange={handleChange} />
                        <label>Büyük</label><br /><br />
                    </div>

                    <div className='dropdown'>
                        <label><b>Hamur Seç</b></label><br /><br/>
                        <select name="hamur" value={formData.hamur} onChange={handleChange}>
                            <option value="" disabled hidden>Hamur Kalınlığı Seçiniz</option>
                            <option value="ince">İnce</option>
                            <option value="kalin">Kalın</option>
                        </select><br /><br />
                    </div>
                </div>

                <label><b>Ek Malzemeler</b><br/>En az 4, en fazla 10 malzeme seçiniz. Adet: 5₺</label><br/>
                <div className="checkbox-container">
               
                {malzemeler.map((malzeme, index) => (
                  <div className="checkbox-row" key={index}>
                    <label htmlFor={`malzeme${index + 1}`}>
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
                    <input type="text" name="isim" value={formData.isim} onChange={handleChange} data-cy="ad-input"/><br /><br /> 
                </div>
                
                
                    <label><b>Sipariş Notu</b><br /></label>
                    <div className="note-input"> 
                    <textarea name="notlar" value={formData.notlar} rows={4} onChange={handleChange} 
                    onClick = {() => setFormData(prevState => ({...prevState,notlar: ''}))}></textarea><br /><br />
                    </div>
                
            
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
                <button disabled= {!isFormValid} className='button' type="submit">Sipariş Ver</button>
                
            </form>
        </>
    );
}

export default OrderPage;
