import { Shield, FileCheck, Truck, Lock, Clock } from "lucide-react"
import { cn } from "../../../../lib/utils"

interface TrustBadge {
  icon: React.ComponentType<{ className?: string }>
  label: string
  description: string
}

const TrustBadges = () => {
  const badges: TrustBadge[] = [
    {
      icon: Shield,
      label: "≥99% Purity",
      description: "Lab verified"
    },
    {
      icon: FileCheck,
      label: "Third-Party Tested",
      description: "Certified quality"
    },
    {
      icon: Truck,
      label: "EU-Wide Shipping",
      description: "All countries"
    },
    {
      icon: Lock,
      label: "Secure Payments",
      description: "SSL encrypted"
    },
    {
      icon: Clock,
      label: "Fast Dispatch",
      description: "Same day"
    }
  ]

  return (
    <section className="bg-cream border-t border-warm-gray/20 shadow-sm">
      <div className="content-container py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                <div className={cn(
                  "mb-2 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-white shadow-sm transition-all duration-200",
                  "group-hover:shadow-md group-hover:scale-105",
                  "flex items-center justify-center"
                )}>
                  <IconComponent 
                    className="text-copper transition-colors w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" 
                  />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-midnight mb-1">
                  {badge.label}
                </h3>
                <p className="text-xs sm:text-sm text-midnight-light">
                  {badge.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TrustBadges