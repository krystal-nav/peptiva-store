"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import StoreHeader from "../store-header"
import StoreSidebar, { Category } from "../store-sidebar"
import ProductGrid from "../product-grid"
import MobileFilters from "../mobile-filters"

interface StoreTemplateProps {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
  categories: Category[]
  collections?: HttpTypes.StoreCollection[]
  isLoading?: boolean
}

const StoreTemplate = ({ 
  products, 
  region, 
  categories, 
  collections = [],
  isLoading = false 
}: StoreTemplateProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // State from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'featured')
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('categories')?.split(',').filter(Boolean) || []
  )
  const [priceRange, setPriceRange] = useState<[number, number]>([
    parseInt(searchParams.get('min_price') || '0'),
    parseInt(searchParams.get('max_price') || '200')
  ])
  
  // Mobile filters state
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    
    if (searchQuery) params.set('q', searchQuery)
    if (sortBy !== 'featured') params.set('sort', sortBy)
    if (selectedCategories.length > 0) params.set('categories', selectedCategories.join(','))
    if (priceRange[0] > 0) params.set('min_price', priceRange[0].toString())
    if (priceRange[1] < 200) params.set('max_price', priceRange[1].toString())

    const newUrl = params.toString() ? `/store?${params.toString()}` : '/store'
    router.replace(newUrl, { scroll: false })
  }, [searchQuery, sortBy, selectedCategories, priceRange, router])

  // Filter products based on current filters
  const filteredProducts = products.filter((product) => {
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      const matchesTitle = product.title.toLowerCase().includes(searchLower)
      const matchesCategory = product.categories?.some(cat => 
        cat.name.toLowerCase().includes(searchLower)
      )
      if (!matchesTitle && !matchesCategory) return false
    }

    // Category filter - use actual collection membership
    if (selectedCategories.length > 0) {
      const hasMatchingCategory = selectedCategories.some(selectedCategoryId => {
        // Check if product belongs to any of the selected collections
        return product.collection && (
          product.collection.id === selectedCategoryId || 
          product.collection.handle === selectedCategoryId
        )
      })
      
      if (!hasMatchingCategory) return false
    }

    // Price filter - use static pricing
    const priceMap: Record<string, number> = {
      'pt-141': 39.99,
      'ghk-cu': 54.99, 
      'retatrutide': 129.99,
      'tb-500': 44.99,
      'bacteriostatic-water': 9.99,
      'bpc-157': 39.99,
    }
    
    const staticPrice = priceMap[product.handle]
    if (staticPrice) {
      if (staticPrice < priceRange[0] || staticPrice > priceRange[1]) return false
    } else {
      // Fallback to calculated price
      const variant = product.variants?.[0]
      if (variant?.calculated_price?.calculated_amount) {
        const price = variant.calculated_price.calculated_amount / 100
        if (price < priceRange[0] || price > priceRange[1]) return false
      }
    }

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        const priceA = a.variants?.[0]?.calculated_price?.calculated_amount || 0
        const priceB = b.variants?.[0]?.calculated_price?.calculated_amount || 0
        return priceA - priceB
      case 'price-desc':
        const priceDescA = a.variants?.[0]?.calculated_price?.calculated_amount || 0
        const priceDescB = b.variants?.[0]?.calculated_price?.calculated_amount || 0
        return priceDescB - priceDescA
      case 'newest':
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
        return dateB - dateA
      case 'featured':
      default:
        return 0
    }
  })

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedCategories([])
    setPriceRange([0, 200])
    setSortBy('featured')
    setIsMobileFiltersOpen(false)
  }

  const activeFilterCount = [
    searchQuery ? 1 : 0,
    selectedCategories.length,
    priceRange[0] > 0 || priceRange[1] < 200 ? 1 : 0
  ].reduce((sum, count) => sum + count, 0)

  return (
    <div className="min-h-screen bg-white">
      {/* Store Header */}
      <StoreHeader
        productCount={sortedProducts.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onMobileFiltersOpen={() => setIsMobileFiltersOpen(true)}
        activeFilterCount={activeFilterCount}
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
        categories={categories}
        collections={collections}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <StoreSidebar
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Products Grid */}
          <div className="min-w-0">
            <ProductGrid
              products={sortedProducts}
              region={region}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <MobileFilters
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        onClearFilters={handleClearFilters}
      />
    </div>
  )
}

export default StoreTemplate