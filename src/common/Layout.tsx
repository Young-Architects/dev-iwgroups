'use client'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { fetchHeaderFooter } from '@/lib/wordpress';

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const [data, setData] = useState<any>(null)
 

  const loadHeaderFooter = async () => {
    try {
      const result = await fetchHeaderFooter()
      if (!result) {
        throw new Error('No data')
      }
      setData(result)

    } catch (err) {
      console.error(err)
    }  

  }
  useEffect(() => {
    loadHeaderFooter()
  }, [])

 





  return (

 
    <>
      <Header result={data}/>
      {children}
      <Footer result={data}/>
    </>
  )
}

export default Layout
