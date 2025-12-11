"use client"

import { useState, useEffect } from "react"

interface PriceRangeFilterProps {
  min: number
  max: number
  value: [number, number]
  onChange: (value: [number, number]) => void
}

const PriceRangeFilter = ({ min, max, value, onChange }: PriceRangeFilterProps) => {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), localValue[1])
    setLocalValue([newMin, localValue[1]])
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), localValue[0])
    setLocalValue([localValue[0], newMax])
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, index: 0 | 1) => {
    const newValue = Number(e.target.value)
    const newRange: [number, number] = [...localValue]
    newRange[index] = newValue
    
    // Ensure min doesn't exceed max and vice versa
    if (index === 0) {
      newRange[0] = Math.min(newValue, newRange[1])
    } else {
      newRange[1] = Math.max(newValue, newRange[0])
    }
    
    setLocalValue(newRange)
  }

  const handleApply = () => {
    onChange(localValue)
  }

  const percentage = {
    min: ((localValue[0] - min) / (max - min)) * 100,
    max: ((localValue[1] - min) / (max - min)) * 100,
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-[#1A2A40] text-lg">Price Range</h3>
      
      {/* Range Inputs */}
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-sm text-[#6B7C8F] mb-1">Min</label>
          <input
            type="number"
            min={min}
            max={max}
            value={localValue[0]}
            onChange={handleMinChange}
            onBlur={handleApply}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C67D4E]"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-[#6B7C8F] mb-1">Max</label>
          <input
            type="number"
            min={min}
            max={max}
            value={localValue[1]}
            onChange={handleMaxChange}
            onBlur={handleApply}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C67D4E]"
          />
        </div>
      </div>

      {/* Dual Range Slider */}
      <div className="relative h-6 rounded-full">
        {/* Background track */}
        <div className="absolute h-2 bg-gray-200 rounded-full top-2 w-full" />
        
        {/* Active range track */}
        <div
          className="absolute h-2 bg-[#C67D4E] rounded-full top-2 z-10"
          style={{
            left: `${percentage.min}%`,
            width: `${percentage.max - percentage.min}%`,
          }}
        />
        
        {/* Max slider - place first so min slider can be on top when needed */}
        <input
          type="range"
          min={min}
          max={max}
          value={localValue[1]}
          onChange={(e) => handleSliderChange(e, 1)}
          onInput={handleApply}
          className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer top-2 range-slider"
          style={{
            background: 'transparent',
            zIndex: localValue[1] - localValue[0] < 5 ? 25 : 20
          }}
        />
        
        {/* Min slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={localValue[0]}
          onChange={(e) => handleSliderChange(e, 0)}
          onInput={handleApply}
          className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer top-2 range-slider"
          style={{
            background: 'transparent',
            zIndex: localValue[1] - localValue[0] < 5 ? 30 : 25
          }}
        />
      </div>

      {/* Price Display */}
      <div className="flex justify-between text-sm text-[#6B7C8F]">
        <span>€{localValue[0]}</span>
        <span>€{localValue[1]}</span>
      </div>

      <style jsx>{`
        .range-slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          background: #C67D4E;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        .range-slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          background: #C67D4E;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  )
}

export default PriceRangeFilter