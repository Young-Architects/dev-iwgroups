import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <>
    <div className="outer_section top_bar-header">
        <div className="inner_section">
            <div className="section_wrapper">
                <div className="top_bar">
                    <p>Welcome to Innerwork Advisors LLP</p>
                </div>
            </div>
        </div>
    </div>
    <div className="outer_section main_header">
        <div className="inner_section">
            <div className="section_wrapper">
                <div className="header">
                    <div className="header_1">
                        <div className="img">
                            <Link href='/'>
                            <img src="./Logo.png" alt="logo" />
                            </Link>
                        </div>
                    </div>
                    <div className="header_2">
                        <ul className="nav_wrapper">
                            <li className='nav_link'>
                                <Link href='/'>Home</Link>
                            </li>
                            <li className='nav_link'>
                                <Link href='/about-us'>About Us</Link>
                            </li>
                            <li className='nav_link'>
                                <Link href='/services'>Services</Link>
                            </li>
                            <li className='nav_link'>
                                <Link href='/blog'>Blog</Link>
                            </li>
                            <li className='nav_link'>
                                <Link href='/contact-us'>Contact Us</Link>
                            </li>
                             
                        </ul>
                    </div>
                    <div className="header_3">
                        <button>
                            <Link href='/contact-us'>contact us</Link>
                            
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Header
