"use client"

import Link from 'next/link'
import React, { useState } from 'react'

function Header() {

  const [menuOpen, setMenuOpen] = useState(false)

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
                <Link href='/'>
                  <img src="/Logo.png" alt="logo" />
                </Link>
              </div>

             
              <div className={`header_2 ${menuOpen ? "active" : ""}`}>
                <ul className="nav_wrapper">
                  <li><Link href='/'>Home</Link></li>
                  <li><Link href='/about-us'>About Us</Link></li>
                  <li><Link href='/services'>Services</Link></li>
                  <li><Link href='/blog'>Blog</Link></li>
                  <li><Link href='/contact-us'>Contact Us</Link></li>
                </ul>
              </div>

               
              <div className="header_3">
                <button>
                <Link href='/contact-us'>
                  Contact Us
                </Link>
                </button>
              </div>

            
              <div 
                className="hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                ☰
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header