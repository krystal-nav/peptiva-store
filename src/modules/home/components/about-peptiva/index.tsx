import { CheckCircle } from "lucide-react"

const AboutPeptiva = () => {
  return (
    <section className="bg-midnight py-16">
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-copper px-4 py-2 rounded-full">
              <span className="text-white font-semibold text-sm">About Us</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              Your Trusted Partner for Peptide Research in Europe
            </h2>

            {/* Paragraph */}
            <p className="text-lg text-cream leading-relaxed">
              Peptiva provides research-grade peptides to scientists and institutions across Europe. 
              Every product undergoes rigorous quality control and independent testing to ensure 
              consistency and reliability. Based in the EU, we offer fast, secure shipping with 
              no customs complications.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-copper flex-shrink-0" />
                <span className="text-cream font-semibold">≥99% Purity Guaranteed</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-copper flex-shrink-0" />
                <span className="text-cream font-semibold">EU-Wide Delivery</span>
              </div>
            </div>
          </div>

          {/* Right side - Placeholder image */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md lg:max-w-lg h-80 bg-midnight-light rounded-lg flex items-center justify-center border border-midnight-dark">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-copper/20 rounded-full mx-auto flex items-center justify-center">
                  <svg 
                    className="w-8 h-8 text-copper" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                    />
                  </svg>
                </div>
                <p className="text-sm text-cream/60">Lab image placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPeptiva