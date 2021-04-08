import React from 'react'

import './footers.styles.scss';
export const MainFooter = () => {
    return (
        <div className='main-footer'>
        <nav>
            <ul className='main-footer_links'>
            <li className='main-footer_link'><a href="/">FAQ</a></li>
            <li className='main-footer_link'><a href="/">Support</a></li>
            </ul>
        </nav>
        </div>
    )
}
