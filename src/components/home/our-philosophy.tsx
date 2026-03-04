import { OurPhilosophyProps } from '@/types/wordpress'


function OurPhilosophy({ philosophy }: OurPhilosophyProps) {

  console.log(philosophy)

  if (!philosophy) return null

  return (
    <div className="ph_wrapper">

      <h4 className='top_heading'>
        {philosophy?.title}
      </h4>

      <h3 className='section_m_heading'>
        {philosophy?.philop_heading}
      </h3>

      <div className="ph_grid">
        {philosophy?.our_philosophy_list?.map((e, i) => (
          <div className="ph_card" key={i}>

            <div className="p_icon">
              <img src="/images/Vector.webp" alt="" />
            </div>

            <div className="ph_content">
              <h3>{e?.heading}</h3>

              <p>{e?.paragraph}</p>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default OurPhilosophy