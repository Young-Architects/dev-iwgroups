"use client"

import { AddressProps } from "@/types/wordpress"

function Address({ result }: AddressProps) {

  return (
    <div className="c_address_wrapper">

      {result?.address?.map((e, i: number) => {

        return (
          <div className="address_w" key={i}>

            <h4>{e?.address_title}</h4>
            <p>{e?.address}</p>

         
            {e?.map_iframe && (
              <div
                className="address_map"
                dangerouslySetInnerHTML={{ __html: e.map_iframe }}
              />
            )}
 
            {e?.map_link && (
              <a
                href={e.map_link}
                target="_blank"
                rel="noopener noreferrer"
                className="map_btn"
              >
                Open in Google Maps
              </a>
            )}

          </div>
        )
      })}

    </div>
  )
}

export default Address