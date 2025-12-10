"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const listRegions = async () => {
  const next = {
    ...(await getCacheOptions("regions")),
  }

  return sdk.client
    .fetch<{ regions: HttpTypes.StoreRegion[] }>(`/store/regions`, {
      method: "GET",
      next,
      cache: "force-cache",
    })
    .then(({ regions }) => regions)
    .catch(medusaError)
}

export const retrieveRegion = async (id: string) => {
  const next = {
    ...(await getCacheOptions(["regions", id].join("-"))),
  }

  return sdk.client
    .fetch<{ region: HttpTypes.StoreRegion }>(`/store/regions/${id}`, {
      method: "GET",
      next,
      cache: "force-cache",
    })
    .then(({ region }) => region)
    .catch(medusaError)
}

const regionMap = new Map<string, HttpTypes.StoreRegion>()

export const getRegion = async (countryCode?: string) => {
  try {
    // Default to DE (Germany) for EU region
    const defaultCountryCode = "de"
    const targetCountryCode = countryCode || defaultCountryCode
    
    if (regionMap.has(targetCountryCode)) {
      return regionMap.get(targetCountryCode)
    }

    const regions = await listRegions()

    if (!regions) {
      return null
    }

    regions.forEach((region) => {
      region.countries?.forEach((c) => {
        regionMap.set(c?.iso_2 ?? "", region)
      })
    })

    // Try to get the specified region, fallback to DE, then any available region
    const region = regionMap.get(targetCountryCode) || 
                   regionMap.get(defaultCountryCode) ||
                   regions[0] // fallback to first available region

    return region
  } catch (e: any) {
    return null
  }
}

// Helper function to get EU region directly
export const getEURegion = async () => {
  return getRegion("de") // Use Germany as EU representative
}
