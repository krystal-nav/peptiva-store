import { Beaker, ClipboardCheck, Truck, Headset } from "lucide-react"

interface FeatureCard {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

const WhatSetsUsApart = () => {
  const features: FeatureCard[] = [
    {
      icon: Beaker,
      title: "Rigorous Quality Standards",
      description: "Every peptide meets ≥99% purity standards verified through comprehensive testing protocols."
    },
    {
      icon: ClipboardCheck,
      title: "Third-Party Lab Testing", 
      description: "Independent laboratory analysis using HPLC and mass spectrometry confirms purity and identity."
    },
    {
      icon: Truck,
      title: "European Fulfillment",
      description: "Fast shipping from within the EU to all 27 member states. No customs delays or import fees."
    },
    {
      icon: Headset,
      title: "Dedicated Support",
      description: "Expert guidance and responsive customer service to support your research needs."
    }
  ]

  return (
    <section className="bg-cream py-16">
      <div className="content-container">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-midnight mb-4">
            What Sets Us Apart
          </h2>
          <p className="text-lg text-body-gray max-w-2xl mx-auto">
            Premium research peptides backed by transparency and quality
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-copper/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-copper" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-midnight mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-body-gray leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhatSetsUsApart