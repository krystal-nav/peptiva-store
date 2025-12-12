import { Suspense } from "react"
import { listProductsWithSort } from "@lib/data/products"
import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "../components/store-template"

async function StoreTemplateWrapper({
  sortBy,
  page,
  countryCode,
  query,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  query?: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  // Fetch region
  const region = await getRegion(countryCode)
  if (!region) {
    return <div>Region not found</div>
  }

  // Fetch products
  const queryParams: any = {
    limit: 100, // Get all products for client-side filtering
  }

  if (sort === "created_at") {
    queryParams["order"] = "created_at"
  }

  if (query) {
    queryParams["title"] = query
  }

  const {
    response: { products },
  } = await listProductsWithSort({
    page: 1,
    queryParams,
    sortBy: sort,
    countryCode,
  })

  // Fetch collections (for filtering)
  const { collections } = await listCollections().catch(() => ({ collections: [] }))
  
  // Transform collections to match our interface
  const transformedCategories = collections.map(collection => ({
    id: collection.id,
    name: collection.title,
    handle: collection.handle
  }))

  // Fetch categories (legacy - keeping for compatibility)
  const categories = await listCategories().catch(() => [])

  return (
    <StoreTemplate
      products={products}
      region={region}
      categories={transformedCategories}
      collections={collections}
      isLoading={false}
    />
  )
}

export default StoreTemplateWrapper
