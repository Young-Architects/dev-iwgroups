'use client'

import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'

interface Props {
  indiaLat: number
  indiaLng: number
  ukLat: number
  ukLng: number
}

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap()

  useEffect(() => {
    map.fitBounds(positions, { padding: [50, 50] })
  }, [positions, map])

  return null
}

export default function GlobalMap({
  indiaLat,
  indiaLng,
  ukLat,
  ukLng,
}: Props) {

  if (
    isNaN(indiaLat) ||
    isNaN(indiaLng) ||
    isNaN(ukLat) ||
    isNaN(ukLng)
  ) {
    return null
  }

  const india: [number, number] = [indiaLat, indiaLng]
  const uk: [number, number] = [ukLat, ukLng]

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: '384px', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitBounds positions={[india, uk]} />

      <Marker position={india} icon={DefaultIcon}>
        <Popup>India</Popup>
      </Marker>

      <Marker position={uk} icon={DefaultIcon}>
        <Popup>United Kingdom</Popup>
      </Marker>

      <Polyline positions={[india, uk]} color="blue" />

    </MapContainer>
  )
}