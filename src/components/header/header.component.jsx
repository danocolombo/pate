import React from 'react';
import { Link } from 'react-router-dom';
import { TitleContainer } from './header.styles';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/pate-logo-white.svg';
const Header = () => {
    return (
        <div className='header'>
            <Link className='logo-container' to='/'>
                <Logo className='logo' />
            </Link>
            <TitleContainer>JATE</TitleContainer>
        </div>
    );
};
export default Header;
