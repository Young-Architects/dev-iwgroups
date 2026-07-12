import Link from "next/link";
interface ContactUsCTAData {
  contact_us_cta_heading?: string;
  contact_us_cta_sub_heading?: string;
  contact_us_cta_para?: string;
}
interface ContactusctaProps {
  contact_us_cta?: ContactUsCTAData;
}
function Contactuscta({ contact_us_cta }: ContactusctaProps) {
  return (
    <div className="c_action_wrapper">
      <h4 className="top_heading">CALL TO ACTION</h4>

      <div className="cta-section">
        <h2>{contact_us_cta?.contact_us_cta_heading || "Let's Connect"}</h2>

        <h4>{contact_us_cta?.contact_us_cta_sub_heading || "Ready to Transform Your Business?"}</h4>

        <p>{contact_us_cta?.contact_us_cta_para || "Partner with our team to build innovative digital solutions that drive growth, improve efficiency, and deliver measurable results. Let's discuss your project today."}</p>

        <Link href={'/contact-us'}>Contact Us</Link>
      </div>
    </div>
  );
}

export default Contactuscta;