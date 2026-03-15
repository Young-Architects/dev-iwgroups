'use client'

import { useEffect, useState } from "react"
import { fetchPageBySlug } from "@/lib/wordpress"
import { CardItem } from "@/types/wordpress"

function Menu({ slug }: { slug: string }) {

    const [data, setData] = useState<CardItem | null>(null)

    useEffect(() => {

        async function load() {

            const result = await fetchPageBySlug(slug)

            setData(result)

        }

        load()

    }, [slug])

    if (!data) return <p style={{color:'#fff',padding:'16px 20px'}}>Please wait loading....</p>

    //@ts-expect-error ignore this acf warning
    const services: ServiceCardProps[] = data?.acf?.services_card ?? []

    return (

        <div className="service_nested">

            {services.map((s, i) => (

                <ul key={i}>

                    <li>
                        <a href={s.link} target="_blank" rel="noopener noreferrer">
                            {s.heading}
                        </a>
                    </li>

                </ul>

            ))}

        </div>

    )

}

export default Menu