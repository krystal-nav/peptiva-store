"use client"

import { HttpTypes } from "@medusajs/types"
import ProductCard from "../product-card"

interface ProductGridProps {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
  isLoading?: boolean
}

const ProductGrid = ({ products, region, isLoading = false }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 items-start">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 aspect-square rounded-2xl mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-6 bg-gray-200 rounded w-1/3" />
              <div className="h-10 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">🔬</div>
        <h3 className="text-xl font-semibold text-[#1A2A40] mb-2">
          No products found
        </h3>
        <p className="text-[#6B7C8F] mb-6 max-w-md">
          Try adjusting your filters or browse all products instead.
        </p>
        <button
          onClick={() => window.location.href = '/store'}
          className="px-6 py-3 bg-[#C67D4E] text-white rounded-lg font-semibold hover:bg-[#D4A574] transition-colors"
        >
          View All Products
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 items-start">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="animate-fade-in"
          style={{
            animationDelay: `${index * 50}ms`,
            animationFillMode: 'both'
          }}
        >
          <ProductCard product={product} region={region} />
        </div>
      ))}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}

export default ProductGrid