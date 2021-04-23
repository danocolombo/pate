import React from 'react';
import { Link } from 'react-router-dom';
import './footers.styles.scss';
export const MainFooter = () => {
    return (
        <div className='main-footer'>
            <nav>
                <ul className='main-footer_links'>
                    <li className='main-footer_link'>
                        <Link to='/faq'>FAQ</Link>
                    </li>
                    <li className='main-footer_link'>
                        <Link to='/help'>Help</Link>
                    </li>
                    <li className='main-footer_link'>
                        <Link to='/support'>Support</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
