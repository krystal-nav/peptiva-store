import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  return (
    <footer className="bg-midnight border-t border-midnight-dark w-full">
      <div className="content-container">
        {/* Main Footer Content - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Column 1 - Brand */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-white">Peptiva</h3>
            <p className="text-sm text-gray-300">
              Research-grade peptides for European scientists
            </p>
            <a 
              href="mailto:info@peptiva.eu" 
              className="text-sm text-gray-300 hover:text-copper transition-colors"
            >
              info@peptiva.eu
            </a>
          </div>

          {/* Column 2 - Shop */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-semibold mb-2">Shop</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <LocalizedClientLink
                  href="/store"
                  className="text-sm text-gray-400 hover:text-copper transition-colors"
                >
                  All Products
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/products/bpc-157"
                  className="text-sm text-gray-400 hover:text-copper transition-colors"
                >
                  BPC-157
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/products/tb-500"
                  className="text-sm text-gray-400 hover:text-copper transition-colors"
                >
                  TB-500
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/products/retatrutide"
                  className="text-sm text-gray-400 hover:text-copper transition-colors"
                >
                  Retatrutide
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Column 3 - Information */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-semibold mb-2">Information</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <LocalizedClientLink
                  href="/about"
                  className="text-sm text-gray-400 hover:text-copper transition-colors"
                >
                  About Us
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/faq"
                  className="text-sm text-gray-400 hover:text-copper transition-colors"
                >
                  FAQ
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/shipping-returns"
                  className="text-sm text-gray-400 hover:text-copper transition-colors"
                >
                  Shipping & Returns
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/contact"
                  className="text-sm text-gray-400 hover:text-copper transition-colors"
                >
                  Contact
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Column 4 - Legal */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-semibold mb-2">Legal</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <LocalizedClientLink
                  href="/terms-conditions"
                  className="text-sm text-gray-400 hover:text-copper transition-colors"
                >
                  Terms & Conditions
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/privacy-policy"
                  className="text-sm text-gray-400 hover:text-copper transition-colors"
                >
                  Privacy Policy
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/research-disclaimer"
                  className="text-sm text-gray-400 hover:text-copper transition-colors"
                >
                  Research Disclaimer
                </LocalizedClientLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="border-t border-midnight-light py-6">
          <p className="text-xs text-gray-400 leading-relaxed">
            All products sold by Peptiva are intended strictly for in vitro research and laboratory use only. 
            Products are not for human or animal consumption, nor for diagnostic, therapeutic, or medicinal purposes. 
            The statements made on this website have not been evaluated by the European Medicines Agency (EMA) or 
            any EU member state regulatory authority. Products are not intended to diagnose, treat, cure, or prevent 
            any disease. Peptiva is a research chemical supplier and is not a pharmacy, compounding facility, or 
            manufacturer of medicinal products as defined under Directive 2001/83/EC. By placing an order, you 
            confirm that you are a qualified researcher or represent an institution conducting legitimate scientific research.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-midnight-light py-6">
          <div className="flex justify-center items-center text-sm text-gray-400">
            <p>© 2025 Peptiva. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}