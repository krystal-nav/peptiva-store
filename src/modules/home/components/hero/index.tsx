import { CheckCircle } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="bg-midnight min-h-[50vh] lg:min-h-[55vh] w-full relative">
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center py-4 sm:py-6 lg:py-8">
          {/* Left side - Text content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-midnight-light rounded-full px-4 py-2 text-sm text-white border border-midnight-dark">
              <span>🇪🇺</span>
              <span>Serving European Researchers</span>
            </div>

            {/* Main headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white font-sans leading-tight">
              Research-Grade
              <br />
              <span className="text-copper">Peptides</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-cream leading-relaxed max-w-lg">
              Premium quality peptides for scientific research. Third-party tested, EU-wide delivery.
            </p>

            {/* Bullet points */}
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-cream">
                <CheckCircle className="w-5 h-5 text-copper flex-shrink-0" />
                <span>Third-party tested for purity</span>
              </li>
              <li className="flex items-center gap-3 text-cream">
                <CheckCircle className="w-5 h-5 text-copper flex-shrink-0" />
                <span>Fast EU-wide shipping</span>
              </li>
              <li className="flex items-center gap-3 text-cream">
                <CheckCircle className="w-5 h-5 text-copper flex-shrink-0" />
                <span>Secure payment options</span>
              </li>
            </ul>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <LocalizedClientLink
                href="/store"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-copper to-copper-light text-white font-semibold rounded-lg hover:from-copper-dark hover:to-copper transition-all duration-200 text-center"
              >
                Shop Peptides
              </LocalizedClientLink>
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-copper text-copper font-semibold rounded-lg hover:bg-copper hover:text-white transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>

          {/* Right side - Product image */}
          <div className="flex justify-center lg:justify-end px-4 sm:px-0">
            <img 
              src="/images/homepage-hero-v2_placeholder.avif"
              alt="Research-grade peptide bottles"
              className="w-full max-w-xs sm:max-w-md lg:max-w-xl h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero