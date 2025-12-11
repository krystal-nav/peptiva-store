"use client"

import { Search } from "lucide-react"
import { useState, useEffect } from "react"
import SortDropdown from "../sort-dropdown"

interface StoreHeaderProps {
  productCount: number
  searchQuery: string
  onSearchChange: (query: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
  onMobileFiltersOpen: () => void
  activeFilterCount: number
  selectedCategories: string[]
  onCategoryChange: (categories: string[]) => void
  categories: Array<{ id: string; name: string; handle: string }>
}

const StoreHeader = ({
  productCount,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onMobileFiltersOpen,
  activeFilterCount,
  selectedCategories,
  onCategoryChange,
  categories,
}: StoreHeaderProps) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [localSearchQuery, onSearchChange])

  return (
    <div className="bg-[#FAF8F5] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-[#6B7C8F]">
        <a href="/" className="hover:text-[#C67D4E] transition-colors">
          Home
        </a>
        <span className="mx-2">&gt;</span>
        <span>All Peptides</span>
      </nav>

      {/* Header Content */}
      <div>
        <h1 className="text-4xl font-bold text-[#1A2A40] mb-2" style={{ fontFamily: 'Archivo, sans-serif' }}>
          Research Peptides
        </h1>
        <p className="text-[#6B7C8F]">
          Showing {productCount} products • Premium research-grade compounds
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2.5">
        <button 
          onClick={() => onCategoryChange([])}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
            selectedCategories.length === 0
              ? 'bg-[#C67D4E] text-white shadow-lg'
              : 'bg-white text-[#3D4F63] shadow-md hover:shadow-lg hover:bg-[#F0EBE5]'
          }`}
        >
          All Products
        </button>
        
        {/* Static category pills for now - replace with dynamic ones later */}
        {[
          { id: 'regeneration', name: 'Regeneration' },
          { id: 'weight-management', name: 'Weight Management' },
          { id: 'anti-aging', name: 'Anti-Aging' },
          { id: 'sexual-health', name: 'Sexual Health' },
          { id: 'accessories', name: 'Accessories' },
        ].map((category) => {
          const isActive = selectedCategories.includes(category.id)
          return (
            <button 
              key={category.id}
              onClick={() => {
                if (isActive) {
                  onCategoryChange(selectedCategories.filter(id => id !== category.id))
                } else {
                  onCategoryChange([...selectedCategories, category.id])
                }
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-[#C67D4E] text-white shadow-lg'
                  : 'bg-white text-[#3D4F63] shadow-md hover:shadow-lg hover:bg-[#F0EBE5]'
              }`}
            >
              {category.name}
            </button>
          )
        })}
      </div>

      {/* Filters and Sort Row */}
      <div className="flex items-center justify-between pt-2">
        {/* Mobile Filter Button */}
        <button
          onClick={onMobileFiltersOpen}
          className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-[#C67D4E] text-white text-xs font-semibold px-2 py-1 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Desktop: Empty space for filter alignment */}
        <div className="hidden lg:block flex-1" />

        {/* Sort Dropdown */}
        <div className="ml-auto">
          <SortDropdown value={sortBy} onChange={onSortChange} />
        </div>
      </div>
      </div>
    </div>
  )
}

export default StoreHeader