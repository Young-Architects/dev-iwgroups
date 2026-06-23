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

    console.log(`industry`)
    console.log(industry)
  return (
    <section>
      <h2>Industries We Serve</h2>

      <p>{industry_description}</p>

      {industry?.map((item, index) => (
        <div key={index}>
          <h3>{item.industry_name}</h3>
          <p>{item.short_description}</p>

          <a href={item.industry_link}>
            Learn More
          </a>
        </div>
      ))}
    </section>
  );
}

export default Industries;