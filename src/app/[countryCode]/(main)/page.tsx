import { Metadata } from "next"

import AboutPeptiva from "@modules/home/components/about-peptiva"
import FeaturedProducts from "@modules/home/components/featured-products"
import FeaturedProductsSection from "@modules/home/components/featured-products-section"
import Hero from "@modules/home/components/hero"
import TrustBadges from "@modules/home/components/trust-badges"
import WhatSetsUsApart from "@modules/home/components/what-sets-us-apart"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Peptiva - Research-Grade Peptides | EU Delivery",
  description:
    "Premium quality peptides for scientific research. Third-party tested, EU-wide delivery.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <TrustBadges />
      <FeaturedProductsSection region={region} countryCode={countryCode} />
      <WhatSetsUsApart />
      <AboutPeptiva />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
