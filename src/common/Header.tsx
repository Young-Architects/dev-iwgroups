"use client"

import Menu from '@/components/services/menu'
import { SLUG } from '@/constant/constant'
import { HeaderFooterData } from '@/types/wordpress'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { FiPhone, FiMail, FiChevronDown, FiX, FiChevronRight } from "react-icons/fi"

interface HeaderProps {
  result?: HeaderFooterData
}

function Header({ result }: HeaderProps) {

  const [industryOpen, setIndustryOpen] = useState(false)
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const menuRef = useRef<HTMLLIElement | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const [activeHeader, setActiveHeader] = useState(false)
  const [hideHeader, setHideHeader] = useState(false)

  const lastScrollY = useRef(0)

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 991)
    }

    checkScreen()
    window.addEventListener("resize", checkScreen)

    return () => window.removeEventListener("resize", checkScreen)
  }, [])


  useEffect(() => {
    if (!isMobile) {
      setActiveSlug(SLUG[4])
    } else {
      setActiveSlug(null)
    }
  }, [isMobile])


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


  const handleIndustryClick = (slug: string) => {
    if (isMobile) {
      setActiveSlug(prev => prev === slug ? null : slug)
    } else {
      setActiveSlug(slug)
    }
  }


  const industriesMenu = [
    { menu_name: "Innerwork Advisors LLP", slugIndex: 4 },
    { menu_name: "Innerwork Financial & Accounting Advisors PVT LTD", slugIndex: 5 },
    { menu_name: "Innerwork Legal Services", slugIndex: 6 },
    { menu_name: "Innerwork Advisors Limited UK", slugIndex: 3 }
  ]


  return (

    <div className={`main_header_outer ${activeHeader ? "active-header" : ""} ${hideHeader ? "hide-header" : ""}`}>


      <div className="outer_section top_bar-header">
        <div className="inner_section">
          <div className="section_wrapper">

            <div className="top_bar">

              <div className="part_1">
                <a href={`tel:${result?.phones?.[0] || '9073672051'}`}>
                  <FiPhone className="top_icon" />
                  {result?.phones?.[0] || '9073672051'}
                </a>
              </div>

              <div className="part_2">
                <p>{result?.top_bar || 'Welcome to Innerwork Advisors LLP'}</p>
              </div>

              <div className="part_3">
                <a href={`mailto:${result?.emails?.[0] || 'info@innerworkadvisorsllp.com'}`}>
                  <FiMail className="top_icon" />
                  {result?.emails?.[0] || 'info@innerworkadvisorsllp.com'}
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
                <Link href="/">
                  <img src={result?.header_logo || "/Logo.png"} alt="logo" />
                </Link>
              </div>



              <div className={`header_2 ${menuOpen ? "active" : ""}`}>

                <div className="menu_close" onClick={() => setMenuOpen(false)}>
                  <FiX />
                </div>

                <ul className="nav_wrapper">

                  <li>
                    <Link href="/" onClick={() => setMenuOpen(false)}>
                      Home
                    </Link>
                  </li>



                  <li
                    className="industry_menu"
                    ref={menuRef}
                  >

                    <div
                      className="menu_link"
                      onClick={() => setIndustryOpen(!industryOpen)}
                    >
                      <span style={{ color: "#fff", fontWeight: '600' }}>
                        Industries
                      </span>

                      <FiChevronDown
                        className={`menu_arrow ${industryOpen ? "rotate" : ""}`}
                      />
                    </div>


                    {industryOpen && (

                      <div className="sub_menu_wrapper">

                        <div className="left_menu menu_settings">
                          <ul>

                            {industriesMenu.map((item, i) => {

                              const slug = SLUG[item.slugIndex]
                              const isActive = activeSlug === slug

                              return (
                                <li
                                  key={i}
                                  onMouseEnter={() => !isMobile && setActiveSlug(slug)}
                                >

                                  <button
                                    className={`industry_btn ${isActive ? "active" : ""}`}
                                    onClick={() => handleIndustryClick(slug)}
                                  >
                                    <Link
                                      href={`/services/${slug}`}
                                      onClick={() => {
                                        setIndustryOpen(false)
                                        setMenuOpen(false)
                                      }}
                                    >
                                      <span className="industry_text">{item.menu_name}</span>

                                    </Link>
                                    <FiChevronRight className="industry_arrow" />
                                  </button>


                                  {isMobile && isActive && (
                                    <div className="mobile_services">
                                      <Menu slug={slug} />
                                    </div>
                                  )}

                                </li>
                              )
                            })}

                          </ul>
                        </div>



                        {!isMobile && activeSlug && (
                          <div className="right_menu menu_settings">
                            <Menu slug={activeSlug} />
                          </div>
                        )}

                      </div>

                    )}

                  </li>


                  <li>
                    <Link href="/about-us" onClick={() => setMenuOpen(false)}>
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" onClick={() => setMenuOpen(false)}>
                      Blog
                    </Link>
                  </li>



                </ul>

              </div>

              <div className="header_3">
                <button>
                  <Link href='/contact-us'>contact us</Link>

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

    </div>

  )
}

export default Header