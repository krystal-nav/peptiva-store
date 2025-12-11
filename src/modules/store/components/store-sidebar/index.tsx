"use client"

import { X } from "lucide-react"
import PriceRangeFilter from "../price-range-filter"

export interface Category {
  id: string
  name: string
  handle: string
}

interface StoreSidebarProps {
  categories: Category[]
  selectedCategories: string[]
  onCategoryChange: (categories: string[]) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  onClearFilters: () => void
  className?: string
}

const StoreSidebar = ({
  categories,
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  onClearFilters,
  className = "",
}: StoreSidebarProps) => {
  const handleCategoryToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoryChange(selectedCategories.filter(id => id !== categoryId))
    } else {
      onCategoryChange([...selectedCategories, categoryId])
    }
  }

  const hasActiveFilters = selectedCategories.length > 0 || 
    priceRange[0] > 0 || priceRange[1] < 200

  // Static category list with counts for now
  const staticCategories = [
    { id: 'regeneration', name: 'Regeneration', count: 2 },
    { id: 'weight-management', name: 'Weight Management', count: 1 },
    { id: 'anti-aging', name: 'Anti-Aging', count: 1 },
    { id: 'sexual-health', name: 'Sexual Health', count: 1 },
    { id: 'accessories', name: 'Accessories', count: 1 },
  ]

  return (
    <div className={`bg-white rounded-2xl p-7 shadow-lg space-y-7 h-fit sticky top-24 ${className}`}>
      {/* Price Range Filter - FIRST */}
      <PriceRangeFilter
        min={0}
        max={200}
        value={priceRange}
        onChange={onPriceRangeChange}
      />

      {/* Categories Filter - SECOND */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-[#1A2A40] text-lg">Categories</h3>
          {selectedCategories.length > 0 && (
            <span className="bg-[#C67D4E] text-white text-xs font-bold px-2 py-1 rounded-full">
              {selectedCategories.length}
            </span>
          )}
        </div>
        
        <div className="space-y-4">
          {/* All Products option */}
          <label className="flex items-center justify-between cursor-pointer group py-1">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedCategories.length === 0}
                onChange={() => onCategoryChange([])}
                className="w-4 h-4 text-[#C67D4E] border-gray-300 rounded focus:ring-[#C67D4E] focus:ring-offset-0"
              />
              <span className="text-[#1A2A40] group-hover:text-[#C67D4E] transition-colors text-sm font-medium">
                All Products
              </span>
            </div>
            <span className="text-sm text-[#6B7C8F] font-medium">(6)</span>
          </label>

          {/* Category checkboxes */}
          {staticCategories.map((category) => (
            <label key={category.id} className="flex items-center justify-between cursor-pointer group py-1">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryToggle(category.id)}
                  className="w-4 h-4 text-[#C67D4E] border-gray-300 rounded focus:ring-[#C67D4E] focus:ring-offset-0"
                />
                <span className="text-[#1A2A40] group-hover:text-[#C67D4E] transition-colors text-sm font-medium">
                  {category.name}
                </span>
              </div>
              <span className="text-sm text-[#6B7C8F] font-medium">({category.count})</span>
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

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="w-full px-4 py-3 border border-[#F0EBE5] text-[#1A2A40] rounded-lg hover:border-[#1A2A40] hover:bg-[#1A2A40] hover:text-white transition-all duration-200 font-semibold text-sm"
        >
          Clear All Filters
        </button>
      )}
    </div>
  )
}

export default StoreSidebar