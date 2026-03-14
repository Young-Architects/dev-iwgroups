import React from 'react'
 
import { SLUG } from '@/constant/constant'
import Services from '@/components/services/services'


function page() {
     const slug=SLUG[6]
 
  
  return (
    <>
    <Services slug={slug}/>
    </>
   
  )
}

export default page