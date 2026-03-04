'use client'

import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-curve'
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
    map.fitBounds(positions, {
      padding: [120, 120],  
    })
    map.setZoom(3)
  }, [positions, map])

  return null
}

 

function CurvedLine({
  from,
  to,
}: {
  from: [number, number]
  to: [number, number]
}) {
  const map = useMap()

  useEffect(() => {
    const latlngs = [
      'M',
      from,
      'Q',
      [(from[0] + to[0]) / 2 + 25, (from[1] + to[1]) / 2],
      to,
    ]

    // @ts-ignore (leaflet-curve has no TS types)
    const curve = L.curve(latlngs, {
      color: 'blue',
      weight: 2,
      dashArray: '6 8',  
    }).addTo(map)

    return () => {
      map.removeLayer(curve)
    }
  }, [from, to, map])

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
      style={{ height: '384px', width: '100%' }}
      scrollWheelZoom={true}
     
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

    
      <FitBounds positions={[india, uk]} />

    
      <Marker position={india} icon={DefaultIcon}>
        <Tooltip permanent direction="top">
          India
        </Tooltip>
      </Marker>

     
      <Marker position={uk} icon={DefaultIcon}>
        <Tooltip permanent direction="top">
          United Kingdom
        </Tooltip>
      </Marker>

      
      <CurvedLine from={india} to={uk} />
    </MapContainer>
  )
}