import Link from 'next/link'
 

function Footer() {
    return (
        <>
            <div className="outer_section footer_outer">
                <div className="inner_section">
                    <div className="section_wrapper">
                        <div className="main_footer_first">
                            <div className="footer_1">
                                <div className="logo">
                                    <img src="/Logo.png" alt="logo" />
                                </div>
                            </div>
                            <div className="footer_2">
                                <h3 className='footer_h'>Quick Links</h3>
                                <ul className='footer_nav'>
                                    <li className='nav-link-f'>
                                        <Link href='/'>Home</Link>
                                    </li>
                                    <li className='nav-link-f'>
                                        <Link href='/about-us'>About Us</Link>
                                    </li>
                                    <li className='nav-link-f'>
                                        <Link href='/contact-us'>Contact Us</Link>
                                    </li>
                                    <li className='nav-link-f'>
                                        <Link href='/'>Choose Your Solution</Link>
                                    </li>

                                </ul>
                            </div>

                            <div className="footer_3">
                                <h3 className='footer_h'>Contact Us</h3>

                                <ul className='footer_nav'>
                                    <li className='nav-link-f'>
                                        <a href="tel:+0 123 456 789">+0 123 456 789</a>
                                    </li>
                                    <li className='nav-link-f'>
                                        <a href="mailto:info123@gmail.com">info123@gmail.com</a>
                                    </li>
                                    <li className='nav-link-f'>
                                        <p>Address Ipsum is simply dummy text of the printing and typesetting.</p>
                                    </li>
                                </ul>
                            </div>

                            <div className="footer_4">
                                <h3 className='footer_h'>Help & Policies</h3>

                                <ul className='footer_nav'>
                                    <li className='nav-link-f'>
                                        <Link href='/privacy-policy'>Privacy Policy</Link>
                                    </li>
                                    <li className='nav-link-f'>
                                        <Link href='/term-and-conditions'>Terms & Conditions</Link>
                                    </li>
                                </ul>
                            </div>

                        </div>

                        <div className="main_footer_second">
                            <div className="second_footer_outer">
                                <div className="f_left_section">
                                    <p>© 2026 Innerwork — All Rights Reserved.</p>

                                </div>
                                <div className="f_right_section">
                                    <div className="social_links">
                                        <Link href='/'>
                                            <img src="/images/facebook.png" alt="facebook" />
                                        </Link>
                                    </div>
                                    <div className="social_links">
                                        <Link href='/'>
                                            <img src="/images/twitter.png" alt="twitter" />
                                        </Link>
                                    </div>
                                    <div className="social_links">
                                        <Link href='/'>
                                            <img src="/images/youtube.png" alt="youtube" />
                                        </Link>
                                    </div>
                                    <div className="social_links">
                                        <Link href='/'>
                                            <img src="/images/linkedin.png" alt="linkedin" />
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
