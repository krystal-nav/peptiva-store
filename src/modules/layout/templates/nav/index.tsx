import { Suspense } from "react"
import { User, ShoppingCart } from "lucide-react"
import Image from "next/image"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SearchComponent from "@modules/layout/components/search"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-[#FAF8F5] border-gray-200 shadow-sm">
        <nav className="content-container flex items-center justify-between w-full h-full">
          {/* Left: Logo */}
          <div className="flex-1 basis-0 h-full flex items-center">
            <LocalizedClientLink
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity duration-200"
              data-testid="nav-logo-link"
            >
              <Image
                src="/images/peptiva-logo.png"
                alt="Peptiva"
                width={338}
                height={80}
                className="h-10 w-auto"
                priority
              />
            </LocalizedClientLink>
            
            {/* Mobile hamburger menu */}
            <div className="ml-4 lg:hidden">
              <SideMenu regions={regions} />
            </div>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-x-8 h-full">
            <LocalizedClientLink
              href="/store"
              className="text-[#1A2A40] hover:text-[#C67D4E] transition-colors duration-200 font-medium"
              data-testid="nav-store-link"
            >
              All Peptides
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/about"
              className="text-[#1A2A40] hover:text-[#C67D4E] transition-colors duration-200 font-medium"
              data-testid="nav-about-link"
            >
              About
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/contact"
              className="text-[#1A2A40] hover:text-[#C67D4E] transition-colors duration-200 font-medium"
              data-testid="nav-contact-link"
            >
              Contact
            </LocalizedClientLink>
          </div>

          {/* Right: Search, Account and Cart Icons */}
          <div className="flex items-center gap-x-4 h-full flex-1 basis-0 justify-end">
            <SearchComponent />
            
            <LocalizedClientLink
              className="flex items-center text-[#1A2A40] hover:text-[#C67D4E] transition-colors duration-200"
              href="/account"
              data-testid="nav-account-link"
            >
              <User size={20} />
            </LocalizedClientLink>
            
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex items-center text-[#1A2A40] hover:text-[#C67D4E] transition-colors duration-200"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <ShoppingCart size={20} />
                  <span className="ml-1">(0)</span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
