import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import SecuredUser from '../secured-user/secured-user.component';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/pate-logo-white.svg';

const Header = ({currentUser}) => {
    
    return (
        <div className='header'>
            <Link className='logo-container' to='/'>
                <Logo className='logo' />
            </Link>
            <div className='options'>
                { currentUser?.isLoggedIn ? <span>LOGOUT</span> :
                <Link to="/signin"><CustomButton>Login</CustomButton></Link>
            }
               
            </div>
        </div>
    );
};
const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});
export default connect(mapStateToProps)(Header);

//this was the logout button section that worked
// <div className='options'>
//     { loggedIn ? <CustomButton onClick={onClick} >Logout</CustomButton> :
//     <Link to="/signin"><CustomButton onClick={onClick} >Login</CustomButton></Link>
//     }
// </div>