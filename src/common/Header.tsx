"use client"

import { fetchIndustryMenu } from '@/lib/wordpress'
import { IndustryResponse } from '@/types/wordpress'
import { ul } from 'framer-motion/client'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { FiPhone, FiMail, FiChevronDown } from "react-icons/fi"

function Header() {


  const [data, setData] = useState<IndustryResponse | null>(null);
  const [industryOpen, setIndustryOpen] = useState(false)
  const menuRef = useRef<HTMLLIElement | null>(null)
  useEffect(() => {
    const fetchHomePage = async () => {
      const result = await fetchIndustryMenu();
      console.log(result)
      setData(result);
    };

    fetchHomePage();
  }, []);

  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIndustryOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }

  }, [])




  console.log(`data`)
  console.log(data)

  const [menuOpen, setMenuOpen] = useState(false)
  const [activeHeader, setActiveHeader] = useState(false)
  const [hideHeader, setHideHeader] = useState(false)

  const lastScrollY = useRef(0)

  useEffect(() => {

    const handleScroll = () => {

      const currentScroll = window.scrollY

      if (currentScroll > 150) {
        setActiveHeader(true)

        if (currentScroll > lastScrollY.current) {
          setHideHeader(true)
        } else {
          setHideHeader(false)
        }

      } else {
        setActiveHeader(false)
        setHideHeader(false)
      }

      lastScrollY.current = currentScroll
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)

  }, [])

  return (
    <>

      <div className={`main_header_outer ${activeHeader ? "active-header" : ""} ${hideHeader ? "hide-header" : ""}`}>

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
                    <li className="industry_menu" ref={menuRef}>

                      <div
                        className="menu_link"
                        onClick={() => setIndustryOpen(!industryOpen)}
                      >

                        <Link href="/industries">Industries</Link>

                        <FiChevronDown
                          className={`menu_arrow ${industryOpen ? "rotate" : ""}`}
                        />

                      </div>

                      {industryOpen && (

                        <div className="sub_menu_wrapper">

                          {data?.industries_menu?.map((e, i) => (
                            <ul key={i} className="sub_menu">

                              <li className="submenu_title">
                                {e?.menu_name}
                              </li>

                              {e?.children?.map((child, index) => (
                                <li key={index} className="sub_child-list">
                                  <a href={child?.menu_link} target="_blank">
                                    {child?.menu_name}
                                  </a>
                                </li>
                              ))}

                            </ul>
                          ))}

                        </div>

                      )}

                    </li>

                    <li><Link href='/about-us'>About Us</Link></li>
                    <li><Link href='/services'>Services</Link></li>

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