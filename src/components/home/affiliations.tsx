import React from "react";

interface Affiliation {
  organization_name: string;
  organization_logo: string;
  short_description: string;
  website_link: string;
}

interface AffiliationsProps {
  affiliations?: Affiliation[];
  affiliations_description?: string;
}

function Affiliations({
  affiliations = [],
  affiliations_description = "",
}: AffiliationsProps) {
  return (
    <section className="affiliations-section">
      <div className="container">
           <h4 className="top_heading">Affiliations</h4>
        <h2>Affiliations</h2>

        <p>{affiliations_description}</p>

        <div className="affiliations-grid">
          {affiliations.map((item, index) => (
            <div key={index} className="affiliation-card">
              <div className="aff_img">

              {item.organization_logo && (
                <img
                  src={item.organization_logo}
                  alt={item.organization_name}
                  width={120}
                  height={120}
                />
              )}
              </div>

              <div className="aff_contect">


              <h3>{item.organization_name}</h3>

              <p>{item.short_description}</p>

              <a
                href={item.website_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website
              </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Affiliations;