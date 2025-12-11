"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"

const SearchComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/store?q=${encodeURIComponent(query.trim())}`)
      setIsOpen(false)
      setQuery("")
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setQuery("")
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center text-[#1A2A40] hover:text-[#C67D4E] transition-colors duration-200"
        data-testid="nav-search-button"
      >
        <Search size={20} />
      </button>
    )
  }

  return (
    <div className="relative">
      {/* Mobile/Desktop Search Form */}
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-64 pl-10 pr-8 py-2 border border-gray-300 rounded-md text-sm text-[#1A2A40] bg-white focus:outline-none focus:ring-2 focus:ring-[#C67D4E] focus:border-transparent"
            data-testid="search-input"
          />
          <Search
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#C67D4E] transition-colors"
            data-testid="search-close"
          >
            <X size={16} />
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchComponent