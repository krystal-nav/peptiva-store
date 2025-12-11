"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { addToCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

interface ProductCardProps {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}

const ProductCard = ({ product, region }: ProductCardProps) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const router = useRouter()


  const variant = product.variants?.[0] || null
  const price = variant?.calculated_price

  // Map product handles to category labels - matching the screenshot
  const categoryMap: Record<string, string> = {
    'bpc-157': 'REGENERATION',
    'tb-500': 'REGENERATION', 
    'retatrutide': 'WEIGHT LOSS',
    'ghk-cu': 'ANTI-AGING',
    'pt-141': 'SEXUAL HEALTH',
    'bacteriostatic-water': 'ACCESSORIES',
  }

  const categoryLabel = categoryMap[product.handle] || (product.categories?.[0]?.name) || 'Peptides'

  // Temporary static price mapping until Medusa prices are fixed
  const priceMap: Record<string, string> = {
    'pt-141': '€39.99',
    'ghk-cu': '€54.99', 
    'retatrutide': '€129.99',
    'tb-500': '€44.99',
    'bacteriostatic-water': '€9.99',
    'bpc-157': '€39.99',
  }

  const formatPrice = (amount: number, currencyCode: string) => {
    // Use static mapping for now
    const staticPrice = priceMap[product.handle]
    if (staticPrice) {
      return staticPrice
    }
    
    // Fallback to calculated price
    console.log('Debug price amount:', amount, 'for product:', product.title)
    const priceInEuros = amount / 100
    return `€${priceInEuros.toFixed(2)}`
  }

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!variant || isAddingToCart) return

    setIsAddingToCart(true)
    try {
      await addToCart({
        variantId: variant.id,
        quantity: 1,
        countryCode: region.countries?.[0]?.iso_2 || 'de',
      })
      // Brief success state
      setTimeout(() => setIsAddingToCart(false), 1000)
    } catch (error) {
      console.error("Failed to add to cart:", error)
      setIsAddingToCart(false)
    }
  }

  const handleCardClick = () => {
    router.push(`/products/${product.handle}`)
  }

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 cursor-pointer relative"
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-[#FAF8F5] p-6">
        {/* Product Image */}
        <div className="relative w-full h-full">
          {(() => {
            // Try multiple image sources from Medusa product
            const imageUrl = product.thumbnail || 
                            product.images?.[0]?.url || 
                            product.images?.[0]?.image_url ||
                            (product.images?.[0] && typeof product.images[0] === 'string' ? product.images[0] : null)
            
            return imageUrl ? (
              <Image
                src={imageUrl}
                alt={product.title}
                fill
                className="object-contain z-10"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                onError={(e) => {
                  // Hide broken image and show fallback
                  e.currentTarget.style.display = 'none'
                }}
              />
            ) : (
              // Only show fallback when no image URL exists
              <div className="w-full h-full flex flex-col items-center justify-center text-center z-10">
                <div className="text-5xl mb-3 text-[#C67D4E]/60">🧪</div>
                <div className="text-sm font-semibold text-[#1A2A40]/60 max-w-[140px] leading-tight">
                  {product.title}
                </div>
              </div>
            )
          })()}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        {/* Product Name */}
        <h3 className="font-semibold text-[#1A2A40] text-lg leading-tight line-clamp-2">
          {product.title}
        </h3>

        {/* Variant Info */}
        {variant && variant.title !== "Default Title" && (
          <p className="text-[#6B7C8F] text-sm">
            Size: {variant.title}
          </p>
        )}

        {/* Price */}
        {price && price.calculated_amount && (
          <p className="text-[#1A2A40] text-xl font-bold">
            {formatPrice(price.calculated_amount, price.currency_code)}
          </p>
        )}

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={!variant || isAddingToCart}
          className="w-full bg-[#1A2A40] hover:bg-[#243448] text-white py-3 rounded-lg font-semibold transition-colors"
          size="lg"
        >
          {isAddingToCart ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Adding...
            </div>
          ) : (
            "Add to Cart"
          )}
        </Button>
      </div>
    </div>
  )
}

export default ProductCard