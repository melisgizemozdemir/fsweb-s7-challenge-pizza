import React from 'react';
import Logo from '../Assets/mile1-assets/logo.svg';
import styled from 'styled-components';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #CE2829;
    color: white;
`;

const LogoImage = styled.img`
    margin:auto;
`;

const Title = styled.h1`
    text-align: center;
`;

export default function ConfirmationPage() {
    return (
        <PageContainer>
            <LogoImage src={Logo} alt="Logo" />
            <Title>Tebrikler! Siparişiniz Alındı!</Title>
        </PageContainer>
    );
}
