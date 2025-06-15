"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Mail, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FAQPage() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "How do I place an order on Himalayan Garment?",
      answer:
        "To place an order, browse products, add items to your cart, and proceed to checkout. You'll need to provide shipping details and select a payment method to complete your order. Once confirmed, you'll receive an email with your order details.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "Himalayan Garment accepts payments through Khalti, eSewa, Cash on Delivery (COD), and major debit/credit cards. You can select your preferred method during checkout.",
    },
    {
      question: "Can I track my order?",
      answer:
        "Yes! Once your order is confirmed and shipped, you’ll receive a tracking number via email or SMS. You can also check your order status from the 'My Orders' section in your account dashboard.",
    },
    {
      question: "How do I return or exchange a product?",
      answer:
        "If you're not satisfied with your purchase, visit the 'My Orders' section, select the item, and choose the return/exchange option. Follow the instructions provided. Make sure the item is unused and in original packaging.",
    },
    {
      question: "How do I edit or remove my listed products?",
      answer:
        "Log in to your vendor dashboard, go to the 'Products' section, and select the item you want to edit or remove. Make your changes and click 'Save'. The updates will reflect after a quick review if necessary.",
    },
    {
      question: "How do I update my account information?",
      answer:
        "To update your email, phone number, address, or password, log in and go to your profile settings. Make the necessary changes and save your updates.",
    },
    {
      question: "Is my personal and payment information secure?",
      answer:
        "Yes, Himalayan Garment prioritizes your privacy and data security. We use encryption and secure payment gateways to ensure your personal and financial information is protected at all times.",
    },
  ];

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

            <div
              className="mt-12 bg-navy-100 p-6 rounded-lg"
              data-aos="zoom-in"
            >
              <h3 className="text-lg font-semibold text-navy-700 mb-3 text-center">
                Still have questions?
              </h3>
              <div className="flex items-center justify-center">
                <Mail className="text-navy-600 mr-2 h-5 w-5" />
                <p className="text-navy-700">
                  Contact our support team at
                  <span className="text-navy-600 font-bold ml-1">
                    info@himalayagarment.com
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
