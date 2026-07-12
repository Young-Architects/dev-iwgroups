"use client"

import Menu from '@/components/services/menu'
import { SLUG } from '@/constant/constant'
import { HeaderFooterData } from '@/types/wordpress'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { FiPhone, FiMail, FiChevronDown, FiX, FiChevronRight } from "react-icons/fi"
import { usePathname } from 'next/navigation'

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

  const [insightsOpen, setInsightsOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  const servicesRef = useRef<HTMLLIElement | null>(null)
  const insightsRef = useRef<HTMLLIElement | null>(null)
  const moreRef = useRef<HTMLLIElement | null>(null)

  const lastScrollY = useRef(0)
  const pathname = usePathname()

  // State for active menu items
  const [activeInsight, setActiveInsight] = useState<string | null>(null)
  const [activeMore, setActiveMore] = useState<string | null>(null)

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
      if (
        servicesRef.current &&
        !servicesRef.current.contains(event.target as Node)
      ) {
        setIndustryOpen(false)
      }

      if (
        insightsRef.current &&
        !insightsRef.current.contains(event.target as Node)
      ) {
        setInsightsOpen(false)
      }

      if (
        moreRef.current &&
        !moreRef.current.contains(event.target as Node)
      ) {
        setMoreOpen(false)
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

  // Handlers to close other menus
  const handleInsightsToggle = () => {
    if (insightsOpen) {
      setInsightsOpen(false)
    } else {
      setInsightsOpen(true)
      setMoreOpen(false)
      setIndustryOpen(false)
    }
  }

  const handleMoreToggle = () => {
    if (moreOpen) {
      setMoreOpen(false)
    } else {
      setMoreOpen(true)
      setInsightsOpen(false)
      setIndustryOpen(false)
    }
  }

  // Handler for insight item click
  const handleInsightClick = (href: string) => {
    setActiveInsight(prev => prev === href ? null : href)
  }

  // Handler for more item click
  const handleMoreClick = (href: string) => {
    setActiveMore(prev => prev === href ? null : href)
  }

  const industriesMenu = [
    { menu_name: "Innerwork Advisors LLP", slugIndex: 4 },
    { menu_name: "Innerwork Financial & Accounting Advisors PVT LTD", slugIndex: 5 },
    { menu_name: "Innerwork Legal Services", slugIndex: 6 },
    { menu_name: "Innerwork Advisors Limited UK", slugIndex: 3 }
  ]

  const insightsMenu = [
    {
      title: "Blogs",
      href: "/insights/blog",
    },
    {
      title: "Guides & Checklists",
      href: "#",
    },
    {
      title: "Articles",
      href: "#",
    },
    {
      title: "Case Studies",
      href: "/insights/case-studies",
    },
    {
      title: "FAQs",
      href: "/insights/faqs",
    },
  ]

  const moreMenu = [
    {
      title: "Gallery",
      href: "/more/gallery",
    },
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

                  <li>
                    <Link href="/about-us" onClick={() => setMenuOpen(false)}>
                      About Innerwork
                    </Link>
                  </li>

                  <li
                    className="industry_menu"
                    ref={servicesRef}
                  >
                    <div
                      className="menu_link"
                      onClick={() => {
                        setIndustryOpen(!industryOpen)
                        setInsightsOpen(false)
                        setMoreOpen(false)
                      }}
                    >
                      <span style={{ color: "#fff", fontWeight: '600' }}>
                        Services
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
                                    <FiChevronRight className="industry_arrow" size={20}/>
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

                  {/* Insights Menu - Same structure as Services with active class */}
                  <li
                    className="industry_menu"
                    ref={insightsRef}
                  >
                    <div
                      className="menu_link"
                      onClick={handleInsightsToggle}
                    >
                      <span style={{ color: "#fff", fontWeight: 600 }}>
                        Insights
                      </span>
                      <FiChevronDown
                        className={`menu_arrow ${insightsOpen ? "rotate" : ""}`}
                      />
                    </div>

                    {insightsOpen && (
                      <div className="sub_menu_wrapper">
                        <div className="left_menu menu_settings">
                          <ul>
                            {insightsMenu.map((item, index) => {
                              const isActive = activeInsight === item.href || pathname === item.href
                              
                              return (
                                <li key={index}>
                                  <button
                                    className={`industry_btn ${isActive ? "active" : ""}`}
                                    onClick={() => handleInsightClick(item.href)}
                                  >
                                    <Link
                                      href={item.href}
                                      onClick={() => {
                                        setInsightsOpen(false)
                                        setMenuOpen(false)
                                      }}
                                    >
                                      <span className="industry_text">{item.title}</span>
                                    </Link>
                                    <FiChevronRight className="industry_arrow" size={20}/>
                                  </button>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      </div>
                    )}
                  </li>

                  {/* More Menu - Same structure as Services with active class */}
                  <li
                    className="industry_menu"
                    ref={moreRef}
                  >
                    <div
                      className="menu_link"
                      onClick={handleMoreToggle}
                    >
                      <span style={{ color: "#fff", fontWeight: 600 }}>
                        More
                      </span>
                      <FiChevronDown
                        className={`menu_arrow ${moreOpen ? "rotate" : ""}`}
                      />
                    </div>

                    {moreOpen && (
                      <div className="sub_menu_wrapper">
                        <div className="left_menu menu_settings">
                          <ul>
                            {moreMenu.map((item, index) => {
                              const isActive = activeMore === item.href || pathname === item.href
                              
                              return (
                                <li key={index}>
                                  <button
                                    className={`industry_btn ${isActive ? "active" : ""}`}
                                    onClick={() => handleMoreClick(item.href)}
                                  >
                                    <Link
                                      href={item.href}
                                      onClick={() => {
                                        setMoreOpen(false)
                                        setMenuOpen(false)
                                      }}
                                    >
                                      <span className="industry_text">{item.title}</span>
                                    </Link>
                                    <FiChevronRight className="industry_arrow" size={20}/>
                                  </button>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      </div>
                    )}
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