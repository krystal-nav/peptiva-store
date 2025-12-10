import { HttpTypes } from "@medusajs/types"
import { listProducts } from "@lib/data/products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductCard from "./product-card"

export default async function FeaturedProductsSection({
  region,
  countryCode,
}: {
  region: HttpTypes.StoreRegion
  countryCode: string
}) {
  // Fetch featured products (limit to 10 for homepage)
  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      limit: 10,
      fields: "*variants.calculated_price",
    },
  })

  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="bg-cream py-16">
      <div className="content-container">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold leading-[2.375rem] text-midnight mb-2">
            Our Products
          </h2>
          <p className="text-sm text-midnight-light">
            Research-grade peptides for scientific applications
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-2 sm:grid-cols-3 md:grid-cols-4 md:gap-x-4 md:gap-y-8 lg:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} region={region} />
          ))}
        </div>

        {/* View All Products Button - Below Grid */}
        <div className="mt-8 flex justify-center">
          <LocalizedClientLink 
            href="/store" 
            className="inline-flex items-center justify-center transition focus:outline-none font-semibold ring-1 ring-copper text-copper hover:bg-copper hover:text-white px-8 py-3 gap-1.5 rounded-[10px] text-sm"
          >
            <span className="inline-flex items-center justify-center gap-[inherit] [&>svg]:shrink-0">
              View All Products
            </span>
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}