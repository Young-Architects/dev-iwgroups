import Link from "next/link";
import React from "react";

interface CTAData {
  com_heading?: string;
  com_paragraph?: string;
  cta_title?: string;
  cta_subtitle?: string;
  cta_description?: string;
}

interface CalltoactionProps {
  cta?: CTAData;
}

function Calltoaction({ cta }: CalltoactionProps) {
  return (
    <div className="c_action_wrapper">
         <h4 className="top_heading">Call To Action</h4>
         

       
      <div className="cta-section">
        <h2>{cta?.cta_title}</h2>

        <h4>{cta?.cta_subtitle}</h4>

        <p>{cta?.cta_description}</p>

        
        <Link href={'/contact-us'}>Contact us</Link>
      </div>
    </div>
  );
}

export default Calltoaction;