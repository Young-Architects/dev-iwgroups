import { HeaderFooterData } from "@/types/wordpress"
import Link from "next/link"
 

interface FooterProps {
  result?: HeaderFooterData
}

function Footer({ result }: FooterProps) {

  return (

    <div className="outer_section footer_outer">

      <div className="inner_section">

        <div className="section_wrapper">

          <div className="main_footer_first">

            <div className="footer_1">
              <div className="logo">
                <img src={result?.footer_logo || "/Logo.png"} alt="logo" />
              </div>
            </div>

            <div className="footer_2">
              <h3 className="footer_h">Quick Links</h3>
              <ul className="footer_nav">

                <li className="nav-link-f">
                  <Link href="/">Home</Link>
                </li>

                <li className="nav-link-f">
                  <Link href="/about-us">About Us</Link>
                </li>

                <li className="nav-link-f">
                  <Link href="/contact-us">Contact Us</Link>
                </li>

              </ul>
            </div>

            <div className="footer_3">

              <h3 className="footer_h">Contact Us</h3>

              <ul className="footer_nav">

                <li className="nav-link-f">
                  <a href={`tel:${result?.phones?.[0] || "+999999999"}`}>
                    {result?.phones?.[0] || "+999999999"}
                  </a>
                </li>

                <li className="nav-link-f">
                  <a href={`mailto:${result?.emails?.[0] || "info123@gmail.com"}`}>
                    {result?.emails?.[0] || "info123@gmail.com"}
                  </a>
                </li>

                <li className="nav-link-f">
                  <p>
                    {result?.address?.[0] || "Address Ipsum is simply dummy text"}
                  </p>
                </li>

              </ul>

            </div>

            <div className="footer_4">

              <h3 className="footer_h">Help & Policies</h3>

              <ul className="footer_nav">

                <li className="nav-link-f">
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>

                <li className="nav-link-f">
                  <Link href="/term-and-conditions">Terms & Conditions</Link>
                </li>

              </ul>

            </div>

          </div>

          <div className="main_footer_second">

            <div className="second_footer_outer">

              <div className="f_left_section">

                <p>
                  {result?.copyright?.[0] || "© 2026 Innerwork — All Rights Reserved."}
                </p>

              </div>

              <div className="f_right_section">

                {result?.socialicons?.map((e, i) => (

                  <div className="social_links" key={i}>
                    <a href={e.link} target="_blank">
                      <img src={e.icon} alt="icons" />
                    </a>
                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  )
}

export default Footer