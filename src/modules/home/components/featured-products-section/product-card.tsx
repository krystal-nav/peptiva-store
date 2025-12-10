"use client"

import { HttpTypes } from "@medusajs/types"
import { addToCart } from "@lib/data/cart"
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"
import { useParams } from "next/navigation"

export default function ProductCard({ 
  product, 
  region 
}: { 
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion 
}) {
  const [isAdding, setIsAdding] = useState(false)
  const params = useParams()
  const countryCode = params.countryCode as string

  const { cheapestPrice } = getProductPrice({ product })
  
  // Get the first variant for add to cart
  const selectedVariant = product.variants?.[0]

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return

    setIsAdding(true)

    try {
      await addToCart({
        variantId: selectedVariant.id,
        quantity: 1,
        countryCode,
      })
    } catch (error) {
      console.error('Error adding to cart:', error)
    }

    setIsAdding(false)
  }

  return (
    <div className="relative flex flex-col overflow-hidden rounded-large shadow-medium bg-white">
      <div className="relative bg-white p-4 flex items-center justify-center" style={{height: "240px"}}>
        <div className="flex items-center justify-center" style={{width: "150px", height: "207px"}}>
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="small"
            className="!p-0 !bg-transparent !shadow-none w-full h-full"
          />
        </div>
        <p className="absolute top-2 left-2 flex items-center gap-1 rounded-[4px] bg-white p-1 px-2 text-xs" 
           style={{boxShadow: "rgba(197, 207, 227, 0.5) 2px 2px 10px"}}>
          Popular
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
            <path fill="rgb(198, 125, 78)" d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182c.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506c-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452c-.347 0-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882c.293-.941 1.523-1.22 3.983-1.776l.636-.144c.699-.158 1.048-.237 1.329-.45c.28-.213.46-.536.82-1.182z"></path>
          </svg>
        </p>
      </div>
      <div className="flex flex-grow flex-col p-3 bg-white">
        <div className="mb-3 min-h-10">
          <p className="line-clamp-2 text-sm font-semibold text-midnight">
            {product.title}
          </p>
        </div>
        <div className="flex items-center justify-between mt-auto mb-2">
          <p className="text-base font-semibold text-midnight-light">
            {cheapestPrice?.calculated_price || 'Price on request'}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <LocalizedClientLink 
            href={`/products/${product.handle}`}
            className="inline-flex items-center justify-center transition focus:outline-none font-semibold ring-1 ring-copper text-copper hover:bg-copper hover:text-white px-4 py-2 gap-1.5 rounded-[8px] text-sm w-full"
          >
            <span className="inline-flex items-center justify-center gap-[inherit] [&>svg]:shrink-0">
              Learn More
            </span>
          </LocalizedClientLink>
          <button 
            type="button" 
            onClick={handleAddToCart}
            disabled={isAdding || !selectedVariant}
            className="inline-flex items-center justify-center transition focus:outline-none font-semibold border-none px-4 py-2 gap-1.5 rounded-[8px] text-sm w-full disabled:opacity-50" style={{backgroundColor: '#0D1A2A'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#1a2e42'} onMouseLeave={(e) => e.target.style.backgroundColor = '#0D1A2A'}
          >
            <span className="inline-flex items-center justify-center gap-[inherit] [&>svg]:shrink-0">
              <span className="flex text-white">
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}