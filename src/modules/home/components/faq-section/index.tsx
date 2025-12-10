"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs: FAQItem[] = [
    {
      question: "What are your peptides used for?",
      answer: "Our peptides are sold exclusively for in vitro research and laboratory experimentation. They are not intended for human or animal use, and are only available to qualified researchers and institutions."
    },
    {
      question: "How do you ensure peptide quality?",
      answer: "Every batch undergoes third-party laboratory testing using HPLC and mass spectrometry analysis. We guarantee ≥99% purity on all products, with certificates of analysis available upon request."
    },
    {
      question: "Which countries do you ship to?",
      answer: "We ship to all 27 European Union member states. Orders are dispatched from within the EU, so there are no customs delays or additional import fees."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We currently accept bank transfers (SEPA) for secure payments. Additional payment options will be available soon."
    },
    {
      question: "How should peptides be stored?",
      answer: "Lyophilized peptides should be stored at -20°C for long-term storage. Once reconstituted, store at 2-8°C and use within 2-4 weeks for optimal stability."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-cream py-16">
      <div className="content-container">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-midnight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-body-gray">
              Everything you need to know about ordering research peptides
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-bold text-midnight pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-copper transition-transform duration-200" />
                    ) : (
                      <Plus className="w-5 h-5 text-copper transition-transform duration-200" />
                    )}
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-4">
                    <p className="text-body-gray leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection