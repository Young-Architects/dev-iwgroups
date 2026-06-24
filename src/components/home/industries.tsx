interface Industry {
  industry_name: string;
  industry_logo: any;
  short_description: string;
  industry_link: string;
}

interface IndustriesProps {
  industry: Industry[];
  industry_description: string;
}

function Industries({
  industry,
  industry_description,
}: IndustriesProps) {
 
  return (
    <div className='ind_wrapper'>
      

        <h4 className="top_heading">Our Industries</h4>
        <h3 className="section_m_heading">Our Industries</h3>
          <p>{industry_description}</p>

    
<div className="ind_grid_card">

      {industry?.map((item, index) => (
        <div key={index} className="in_cards">
          <h3>{item.industry_name}</h3>
          <p>{item.short_description}</p>

          <a href={item.industry_link}>
            Learn More
          </a>
        </div>
      ))}
</div>
    </div>
  );
}

export default Industries;