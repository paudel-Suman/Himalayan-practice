"use client";
import { useEffect, useState } from "react";
import { ChevronDown, HelpCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getFaq } from "@/actions/fetchfaq";
import { faqType } from "@/types/faq";

export default function FAQPage() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [faqs, setFaq] = useState<faqType[]>([]);

  useEffect(() => {
    const fetchtestimonial = async () => {
      try {
        const faq = await getFaq();
        setFaq(faq);
      } catch (error) {
        console.error("Failed to fetch faq:", error);
      }
    };

    fetchtestimonial();
  }, []);

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen  poppins-text">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="rounded-lg shadow-sm border overflow-hidden">
          <div
            className="bg-navy-700 text-primary/80 md:p-8 p-4"
            data-aos="fade-down"
          >
            <h1 className="md:text-3xl text-xl font-bold text-center text-primarymain">
              Frequently Asked Questions
            </h1>
            <p className="text-primary/50 text-center mt-2 md:text-base text-sm">
              Find answers to common questions about Himalaya Garment
            </p>
          </div>

          <div className="md:p-8 p-4" data-aos="fade-up">
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navy-400" />
                <Input
                  type="text"
                  placeholder="Search for questions..."
                  className="pl-10 border-navy-200 focus:border-navy-600 focus:ring-navy-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-navy-200 rounded-lg overflow-hidden"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <button
                      className={`w-full text-left p-4 flex justify-between items-center transition-colors ${
                        openQuestion === index ? "bg-navy-100" : "bg-white"
                      }`}
                      onClick={() => toggleQuestion(index)}
                    >
                      <div className="flex items-center">
                        <HelpCircle className="text-navy-600 mr-3 h-5 w-5 shrink-0" />
                        <span className="font-medium text-navy-800">
                          {faq.question}
                        </span>
                      </div>
                      <ChevronDown
                        className={`text-navy-600 h-5 w-5 transition-transform ${
                          openQuestion === index ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openQuestion === index && (
                      <div className="p-4 bg-white border-t border-navy-200">
                        <p className="text-navy-700 whitespace-pre-line pl-8">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8" data-aos="fade-in">
                  <p className="text-navy-600">
                    No results found for "{searchQuery}"
                  </p>
                  <p className="text-navy-400 mt-2">
                    Try a different search term or browse all questions
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 text-navy-600 border-navy-600 hover:bg-navy-50"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
