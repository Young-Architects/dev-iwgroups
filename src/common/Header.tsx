"use client"

import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { FiPhone, FiMail } from "react-icons/fi"

function Header() {

  const [menuOpen, setMenuOpen] = useState(false)
  const [activeHeader, setActiveHeader] = useState(false)

  const lastScrollY = useRef(0)

useEffect(() => {
  const handleScroll = () => {
    const currentScroll = window.scrollY

    if (currentScroll > 150) {
      setActiveHeader(true)
    } else {
      setActiveHeader(false)
    }

    lastScrollY.current = currentScroll
  }

  window.addEventListener("scroll", handleScroll)
  return () => window.removeEventListener("scroll", handleScroll)
}, [])

  return (
    <>
      <div className={`main_header_outer ${activeHeader ? "active-header" : ""}`}>

 
        <div className="outer_section top_bar-header">
          <div className="inner_section">
            <div className="section_wrapper">
              <div className="top_bar">

                <div className="part_1">
                  <a href="tel:+9073672051">
                    <FiPhone className="top_icon" />
                    9073672051
                  </a>
                </div>

                <div className="part_2">
                  <p>Welcome to Innerwork Advisors LLP</p>
                </div>

                <div className="part_3">
                  <a href="mailto:info@innerworkadvisorsllp.com">
                    <FiMail className="top_icon" />
                    info@innerworkadvisorsllp.com
                  </a>
                </div>

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

      </div>
    </>
  )
}

export default Header