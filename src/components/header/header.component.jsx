import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TitleContainer } from './header.styles';
import CurrentUserContext from '../../contexts/current-user/current-user.context';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/pate-logo-white.svg';
const Header = () => {
    const currentUser = useContext(CurrentUserContext);
    const signout = () => {
        return null;
    };
    return (
        <div className='header'>
            <Link className='logo-container' to='/'>
                <Logo className='logo' />
            </Link>
            <div className='options'>
                {currentUser ? (
                    <div className='option' onClick={() => this.signOut()}>
                        SIGN OUT
                    </div>
                ) : (
                    <Link className='option' to='/signin'>
                        SIGN IN
                    </Link>
                )}
            </div>
        </div>
    );
};
export default Header;
