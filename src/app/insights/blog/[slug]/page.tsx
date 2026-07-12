import React from 'react'
import Blogsingle from '../components/blogsingle'

async function Page({ params }: { params: Promise<{ slug: string }> }) {

  const slug=(await params).slug


  return (
    <>
    <Blogsingle slug={slug}/>
    </>
  )
}

export default Page