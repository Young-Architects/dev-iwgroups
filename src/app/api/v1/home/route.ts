
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch(
      `https://api.innerworkgroups.com/wp-json/wp/v2/pages?slug=home&acf_format=standard`,
      {
        cache: 'no-store',
      }
    )

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch from WordPress' },
        { status: res.status }
      )
    }

    const data = await res.json()

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}