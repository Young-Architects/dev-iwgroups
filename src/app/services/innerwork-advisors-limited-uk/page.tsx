import Services from '@/components/services/services'
import { SLUG } from '@/constant/constant'
 


function page() {
  const slug=SLUG[3]
  return (
    <>
    <Services slug={slug}/>
    </>
  )
}

export default page