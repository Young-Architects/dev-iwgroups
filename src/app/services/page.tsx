import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function ServicesPage() {

  console.log()

  const cookieStore = await cookies()

  const lastSlug = cookieStore.get("lastServiceSlug")?.value

  if (lastSlug) {
    redirect(`/services/${lastSlug}`)
  }

  // fallback
  redirect("/services/innerwork-financial-accounting-advisors-pvt-ltd")
}