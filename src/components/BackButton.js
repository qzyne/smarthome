import { ArrowBendUpLeft } from 'phosphor-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Quay về trang trước
    };

    return (
        <button onClick={handleGoBack} style={{ display:'flex', alignItems:'center', padding: '10px', backgroundColor: 'white', color: 'var(--bold-brown)', border: '2px solid var(--light-brown)', borderRadius: '10px', cursor: 'pointer', height: '1.875em'}}>
            <ArrowBendUpLeft size= '0.9375em' style={{paddingRight:'0.3125em'}}/>
            Trở về
        </button>
    );
};

export default BackButton;
