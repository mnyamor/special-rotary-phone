import React from 'react';
import './Navbar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAnchor} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';

const Navbar: React.FC<any> = () => {

    return <div className='navbar navbar-expand-lg navbar-light bg-light fixed-top' data-testid='Navbar'>
        <div className='container-fluid'>
            <a className='navbar-brand mb-0 h1' href='/'>
                <FontAwesomeIcon icon={faAnchor}/>
                <span className='mx-2'>Anchor Repairs</span>
            </a>
            <button className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbar'
                    aria-controls='navbar'
                    aria-expanded='false'
                    aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'/>
            </button>
        </div>
        <div className='collapse navbar-collapse' id='navbar'>
            <Link to='/' className='nav-link'> Orders</Link>
            <Link to='/invoices' className='nav-link'> Invoices</Link>
        </div>
    </div>
}

export default Navbar;
