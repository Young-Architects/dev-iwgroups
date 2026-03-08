"use client"

import { useEffect } from "react"
import dynamic from "next/dynamic"
import { AddressProps } from "@/types/wordpress"

const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then(m => m.Popup), { ssr: false })
const Tooltip = dynamic(() => import("react-leaflet").then(m => m.Tooltip), { ssr: false })

function Address({ result }: AddressProps) {

  useEffect(() => {
    const loadLeaflet = async () => {
      const L = await import("leaflet")

      delete (L.Icon.Default.prototype as any)._getIconUrl

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      })
    }

    loadLeaflet()
  }, [])

  return (
    <div className="c_address_wrapper">

      {result?.address?.map((e, i: number) => {

        const lat = Number(e?.address_lat)
        const lng = Number(e?.address_long)

        if (!lat || !lng) return null

        return (
          <div className="address_w" key={i}>

            <h4>{e?.address_title}</h4>
            <p>{e?.address}</p>

            <div style={{ height: "350px", width: "100%", marginTop: "20px" }} className="map_wrapper">

              <MapContainer
                center={[lat, lng]}
                zoom={15}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >

                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={[lat, lng]}>

                  <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                    {e?.address_title}
                  </Tooltip>

                  <Popup>
                    <strong>{e?.address_title}</strong>
                    <br />
                    {e?.address}
                  </Popup>

                </Marker>

              </MapContainer>

            </div>

          </div>
        )
      })}

    </div>
  )
}

export default Address