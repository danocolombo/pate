import React from 'react';
import { Link } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import SecuredUser from '../secured-user/secured-user.component';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/pate-logo-white.svg';

const Header = ({loggedIn, onClick}) => {
    
    return (
        <div className='header'>
            <Link className='logo-container' to='/'>
                <Logo className='logo' />
            </Link>
            <div className='options'>
                { loggedIn ? <SecuredUser onLogOut={onClick} >Logout</SecuredUser> :
                <Link to="/signin"><CustomButton onClick={onClick} >Login</CustomButton></Link>
            }
               
            </div>
        </div>
    );
};
export default Header;

//this was the logout button section that worked
// <div className='options'>
//     { loggedIn ? <CustomButton onClick={onClick} >Logout</CustomButton> :
//     <Link to="/signin"><CustomButton onClick={onClick} >Login</CustomButton></Link>
//     }
// </div>