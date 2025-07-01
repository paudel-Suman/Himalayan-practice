import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import PageHeader from "@/components/text/page-header";
import { getCompanyInfo } from "@/actions/fetchcompanydata";

export default async function TermsOfService() {
  const company = await getCompanyInfo();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <PageHeader title="Terms and Services" />
        </div>

        <Alert className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Please read these Terms of Service carefully before using our
            website or making any purchases. By accessing or using our services,
            you agree to be bound by these terms.
          </AlertDescription>
        </Alert>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Welcome to Himalaya Garment ("we," "our," "us," or "Company").
              These Terms of Service ("Terms") govern your use of our website,
              mobile application, and services (collectively, the "Service")
              operated by Himalaya Garment.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using our Service, you agree to be bound by these
              Terms. If you disagree with any part of these terms, then you may
              not access the Service. These Terms apply to all visitors, users,
              and others who access or use the Service.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">
              2. Description of Service
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Our Service provides an online platform for purchasing [product
              category/description]. We offer:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Online catalog of products and services</li>
              <li>Secure payment processing</li>
              <li>Order management and tracking</li>
              <li>Customer support services</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify, suspend, or discontinue any aspect
              of our Service at any time without prior notice.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">3. User Accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Account Creation
              </h3>
              <p className="text-gray-700 mb-3">
                To access certain features of our Service, you must create an
                account. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>
                  Accept responsibility for all activities under your account
                </li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Account Termination
              </h3>
              <p className="text-gray-700">
                We reserve the right to terminate or suspend your account at our
                sole discretion, without notice, for conduct that we believe
                violates these Terms or is harmful to other users, us, or third
                parties.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">4. Orders and Payments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Order Process
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>All orders are subject to acceptance and availability</li>
                <li>We reserve the right to refuse or cancel any order</li>
                <li>
                  Order confirmation does not guarantee product availability
                </li>
                <li>Prices are subject to change without notice</li>
                <li>
                  We may limit quantities purchased per person or household
                </li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Payment Terms
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Payment is due at the time of order placement</li>
                <li>
                  We accept major credit cards, debit cards, and other specified
                  payment methods
                </li>
                <li>
                  All prices include applicable taxes unless otherwise stated
                </li>
                <li>
                  You authorize us to charge your payment method for all fees
                  and charges
                </li>
                <li>Failed payments may result in order cancellation</li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Pricing and Errors
              </h3>
              <p className="text-gray-700">
                We strive to provide accurate pricing information. However,
                errors may occur. If we discover an error in the price of any
                goods you have ordered, we will inform you and give you the
                option to reconfirm your order at the correct price or cancel
                it.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">5. Shipping and Delivery</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Shipping costs and delivery times vary by location and shipping
                method
              </li>
              <li>Delivery estimates are approximate and not guaranteed</li>
              <li>
                Risk of loss and title pass to you upon delivery to the carrier
              </li>
              <li>
                You are responsible for providing accurate shipping information
              </li>
              <li>
                We are not liable for delays caused by shipping carriers or
                circumstances beyond our control
              </li>
              <li>
                International orders may be subject to customs duties and taxes
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">6. Returns and Refunds</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 mb-4">
              Our return and refund policy includes the following terms:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Returns must be initiated within 3 days of delivery</li>
              <li>
                Items must be in original condition with tags and packaging
              </li>
              <li>
                Certain items may be non-returnable (personalized, perishable,
                etc.)
              </li>
              <li>
                Return shipping costs may be the customer's responsibility
              </li>
              <li>Refunds will be processed to the original payment method</li>
              <li>
                Processing time for refunds is typically 3-6 business days
              </li>
            </ul>
            <p className="text-gray-700">
              For detailed return instructions, please refer to our separate
              Return Policy or contact customer service.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">7. User Conduct</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 mb-4">
              You agree not to use our Service to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit harmful, offensive, or inappropriate content</li>
              <li>Engage in fraudulent or deceptive practices</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>
                Use automated tools to access or interact with the Service
              </li>
              <li>Impersonate others or provide false information</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">8. Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              The Service and its original content, features, and functionality
              are and will remain the exclusive property of Himalaya Garement
              and its licensors. The Service is protected by copyright,
              trademark, and other laws. Our trademarks and trade dress may not
              be used without our prior written consent.
            </p>
            <p className="text-gray-700">
              You may not reproduce, distribute, modify, create derivative works
              of, publicly display, publicly perform, republish, download,
              store, or transmit any of the material on our Service without our
              prior written consent.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">9. Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Your privacy is important to us. Please review our Privacy Policy,
              which also governs your use of the Service, to understand our
              practices regarding the collection, use, and disclosure of your
              personal information.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">
              10. Disclaimers and Warranties
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-gray-700 font-semibold mb-2">
                IMPORTANT DISCLAIMER:
              </p>
              <p className="text-gray-700 text-sm">
                THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS.
                WE MAKE NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT
                LIMITATION IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                We do not warrant that the Service will be uninterrupted or
                error-free
              </li>
              <li>
                We do not guarantee the accuracy or completeness of any
                information
              </li>
              <li>
                We are not responsible for third-party content or services
              </li>
              <li>
                Product descriptions and images are for informational purposes
                only
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">
              11. Limitation of Liability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-gray-700 font-semibold mb-2">
                LIABILITY LIMITATION:
              </p>
              <p className="text-gray-700 text-sm">
                IN NO EVENT SHALL [YOUR COMPANY NAME] BE LIABLE FOR ANY
                INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
                DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA,
                USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>
            </div>
            <p className="text-gray-700">
              Our total liability to you for all damages, losses, and causes of
              action shall not exceed the amount you paid to us in the twelve
              (12) months preceding the claim.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">12. Indemnification</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              You agree to defend, indemnify, and hold harmless Himalaya Garment
              and its officers, directors, employees, and agents from and
              against any claims, liabilities, damages, judgments, awards,
              losses, costs, expenses, or fees arising out of or relating to
              your violation of these Terms or your use of the Service.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">13. Dispute Resolution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Governing Law
              </h3>
              <p className="text-gray-700">
                These Terms shall be governed by and construed in accordance
                with the laws without regard to its conflict of law provisions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Dispute Resolution Process
              </h3>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                <li>Contact our customer service team to attempt resolution</li>
                <li>
                  If unresolved, disputes may be subject to binding arbitration
                </li>
                <li>
                  Arbitration shall be conducted under the rules of Organization
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">14. Force Majeure</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              We shall not be liable for any failure or delay in performance
              under these Terms due to causes beyond our reasonable control,
              including but not limited to acts of God, natural disasters, war,
              terrorism, strikes, government actions, or technical failures.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">
              15. Modifications to Terms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              We reserve the right to modify or replace these Terms at any time.
              If a revision is material, we will try to provide at least 30
              days' notice prior to any new terms taking effect. Your continued
              use of the Service after such modifications constitutes acceptance
              of the updated Terms.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">16. Severability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              If any provision of these Terms is held to be invalid or
              unenforceable, the remaining provisions will remain in full force
              and effect. The invalid or unenforceable provision will be
              replaced with a valid provision that most closely matches the
              intent of the original provision.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">17. Entire Agreement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              These Terms, together with our Privacy Policy and any other legal
              notices published by us on the Service, constitute the entire
              agreement between you and us concerning the Service and supersede
              all prior or contemporaneous communications and proposals.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              If you have any questions or concerns about this Privacy Policy or
              how Himalayan Garment handles your data, feel free to reach out to
              us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong>{" "}
                <a href={`mailto:${company.contactEmail}`}>
                  {company.contactEmail}
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong>{" "}
                <a href={`tel:${company.phoneNumber}`}>{company.phoneNumber}</a>
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> {company.address}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
