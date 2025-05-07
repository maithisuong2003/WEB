import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { REST_API_BASE_URL } from '../services/ProductService.js';
import '../assets/css/FogotPasswordPage.css';

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${REST_API_BASE_URL}/email/send_reset_password_email`, { accountEmail: email })
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
            Swal.fire('ThĂ nh cĂ´ng', 'Email khĂ´i phá»¥c máº­t kháº©u Ä‘Ă£ Ä‘Æ°á»£c gá»­i', 'success');
        } catch (error) {
            Swal.fire('ThĂ nh cĂ´ng', 'Email khĂ´i phá»¥c máº­t kháº©u Ä‘Ă£ Ä‘Æ°á»£c gá»­i', 'success');
        }
    };

    return (
        <div className="login-container">
            <div className="forgot-card">
                <div style={{position: 'relative', marginBottom: '20px'}}>
                    <span onClick={() => navigate('/login')} style={{position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#19b0ab', fontSize: '35px',}}>&#8592;</span>
                    <h2 className="login-title" style={{margin: 0, textAlign: 'center',}}>
                        Äáº·t láº¡i máº­t kháº©u
                    </h2>
                </div>


                <form className="login-form" onSubmit={handleSubmit} id="recover_customer_password"
                      acceptCharset="UTF-8">
                    <input
                        type="email"
                        className="input-default"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <button type="submit">Gá»­i</button>


                </form>
                <div style={{marginTop: "30px"}}>
                    <p>ChĂºng tĂ´i sáº½ gá»­i cho báº¡n má»™t email Ä‘á»ƒ kĂ­ch hoáº¡t viá»‡c Ä‘áº·t láº¡i máº­t kháº©u.</p>
                </div>


            </div>
        </div>
    );
};

export default ForgotPasswordPage;



