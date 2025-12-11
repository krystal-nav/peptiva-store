"use client"

import { X } from "lucide-react"
import { useEffect } from "react"
import PriceRangeFilter from "../price-range-filter"
import { Category } from "../store-sidebar"

interface MobileFiltersProps {
  isOpen: boolean
  onClose: () => void
  categories: Category[]
  selectedCategories: string[]
  onCategoryChange: (categories: string[]) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  onClearFilters: () => void
}

const MobileFilters = ({
  isOpen,
  onClose,
  categories,
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  onClearFilters,
}: MobileFiltersProps) => {
  const handleCategoryToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoryChange(selectedCategories.filter(id => id !== categoryId))
    } else {
      onCategoryChange([...selectedCategories, categoryId])
    }
  }

  const hasActiveFilters = selectedCategories.length > 0 || 
    priceRange[0] > 0 || priceRange[1] < 200

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white z-50 lg:hidden overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-[#1A2A40]">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-[#6B7C8F]" />
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-6 space-y-8">
          {/* Price Range Filter - FIRST */}
          <PriceRangeFilter
            min={0}
            max={200}
            value={priceRange}
            onChange={onPriceRangeChange}
          />

          {/* Categories Filter - SECOND */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[#1A2A40] text-lg">Categories</h3>
            
            <div className="space-y-4">
              {/* All Products option */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedCategories.length === 0}
                  onChange={() => onCategoryChange([])}
                  className="w-5 h-5 text-[#C67D4E] border-gray-300 rounded focus:ring-[#C67D4E] focus:ring-offset-0"
                />
                <span className="text-[#1A2A40] group-hover:text-[#C67D4E] transition-colors font-medium">
                  All Products
                </span>
              </label>

              {/* Category checkboxes */}
              {categories.map((category) => (
                <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                    className="w-5 h-5 text-[#C67D4E] border-gray-300 rounded focus:ring-[#C67D4E] focus:ring-offset-0"
                  />
                  <span className="text-[#1A2A40] group-hover:text-[#C67D4E] transition-colors">
                    {category.name}
                  </span>
                </label>
              ))}
            </div>

            {selectedCategories.length > 0 && (
              <div className="flex items-center gap-2 pt-2">
                <span className="text-sm text-[#6B7C8F]">
                  {selectedCategories.length} selected
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 p-6 bg-white border-t border-gray-200 space-y-3">
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="w-full px-4 py-3 border border-gray-300 text-[#1A2A40] rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Clear All Filters
            </button>
          )}
          
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-[#1A2A40] text-white rounded-lg hover:bg-[#243448] transition-colors font-semibold"
          >
            View Results
          </button>
        </div>
      </div>
    </>
  )
}

export default MobileFilters