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
    <section>
      {/* Community Section */}
      <div className="community-section">
        <h2>{cta?.com_heading}</h2>

        <div
          dangerouslySetInnerHTML={{
            __html: cta?.com_paragraph || "",
          }}
        />
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <h2>{cta?.cta_title}</h2>

        <h4>{cta?.cta_subtitle}</h4>

        <p>{cta?.cta_description}</p>

        <button>Contact Us</button>
      </div>
    </section>
  );
}

export default Calltoaction;