import React from "react";

interface Firm {
  firm_title: string;
  firm_image: string;
  description: string;
  visit_firm: string;
}

interface FirmsProps {
  firms?: Firm[];
  firms_description?: string;
}

function Firms({
  firms = [],
  firms_description = "",
}: FirmsProps) {
  return (
    <div className="firms-section">
      <div className="container">
        
         <h4 className="top_heading">Our Firms</h4>
        <h3 className="section_m_heading">Our Firms</h3>
        <p>{firms_description}</p>

       

        <div className="firms-grid">
          {firms.map((firm, index) => (
            <div key={index} className="firm-card">
              {firm.firm_image && (
                <img
                  src={firm.firm_image}
                  alt={firm.firm_title}
                  width={300}
                />
              )}

              <h3>{firm.firm_title}</h3>

              <p>{firm.description}</p>

              <a
                href={firm.visit_firm}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Firm
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Firms;