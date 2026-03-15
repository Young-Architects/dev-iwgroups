"use client"

import { fetchIndustryMenu } from '@/lib/wordpress'
import { HeaderFooterData, IndustryResponse } from '@/types/wordpress'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { FiPhone, FiMail, FiChevronDown, FiX } from "react-icons/fi"

interface HeaderProps {
  result?: HeaderFooterData
}

function Header({ result }:HeaderProps) {

 

  const [data, setData] = useState<IndustryResponse | null>(null)

  const [industryOpen, setIndustryOpen] = useState(false)
  const menuRef = useRef<HTMLLIElement | null>(null)

  const [menuOpen, setMenuOpen] = useState(false)

  const [activeHeader, setActiveHeader] = useState(false)
  const [hideHeader, setHideHeader] = useState(false)

  const lastScrollY = useRef(0)


  useEffect(() => {

    const fetchHomePage = async () => {
      const result = await fetchIndustryMenu()
      setData(result)
    }

    fetchHomePage()

  }, [])




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



  const industriesMenu = [
    {
      menu_name: "Innerwork Advisors LLP",
      children: [
        {
          menu_name: "Innerwork Advisors LLP",
          menu_link: "innerwork-advisors-llp"
        }
      ]
    },
    {
      menu_name: "Innerwork Financial & Accounting Advisors PVT LTD",
      children: [
        {
          menu_name: "Innerwork Financial & Accounting Advisors PVT LTD",
          menu_link: "innerwork-financial-accounting-advisors-pvt-ltd"
        }
      ]
    },
    {
      menu_name: "Innerwork Legal Services",
      children: [
        {
          menu_name: "Innerwork Legal Services",
          menu_link: "innerwork-legal-services"
        }
      ]
    },
    {
      menu_name: "Innerwork Advisors Limited UK",
      children: [
        {
          menu_name: "Innerwork Advisors Limited UK",
          menu_link: "innerwork-advisors-limited-uk"
        }
      ]
    }
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

                <p> {result?.top_bar || 'Welcome to Innerwork Advisors LLP'}</p>
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



                <div
                  className="menu_close"
                  onClick={() => setMenuOpen(false)}
                >
                  <FiX />
                </div>


                <ul className="nav_wrapper">

                  <li>
                    <Link href="/" onClick={() => setMenuOpen(false)}>
                      Home
                    </Link>
                  </li>



                  <li className="industry_menu" ref={menuRef}>

                    <div
                      className="menu_link"
                      onClick={() => setIndustryOpen(!industryOpen)}
                    >

                      <Link href="/industries" style={{ pointerEvents: 'none' }}>
                        Industries
                      </Link>



                      <FiChevronDown
                        className={`menu_arrow ${industryOpen ? "rotate" : ""}`}
                      />

                    </div>



                    {industryOpen && (

                      <div className="sub_menu_wrapper">

                        {industriesMenu.map((e, i) => (

                          <ul key={i} className="sub_menu">

                            <li className="submenu_title">
                              {e.menu_name}
                            </li>

                            {e.children.map((child, index) => (

                              <li key={index} className="sub_child-list">

                                <Link
                                  href={`/services/${child.menu_link}`}
                                  onClick={() => {
                                    setIndustryOpen(false)
                                    setMenuOpen(false)
                                  }}
                                >
                                  {child.menu_name}
                                </Link>

                              </li>

                            ))}

                          </ul>

                        ))}

                      </div>

                    )}

                  </li>



                  <li>
                    <Link href="/about-us" onClick={() => setMenuOpen(false)}>
                      About Us
                    </Link>
                  </li>



                  <li>
                    <Link href="/contact-us" onClick={() => setMenuOpen(false)}>
                      Contact Us
                    </Link>
                  </li>

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

  )
}

export default Header