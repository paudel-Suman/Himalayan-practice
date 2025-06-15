import PageHeader from "@/components/text/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Component() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
        <PageHeader title="Privacy Policy"/>
          <p className="text-gray-600 text-center">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Introduction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Welcome to [Your Company Name] ("we," "our," or "us"). We are
              committed to protecting your privacy and ensuring the security of
              your personal information. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              visit our website and make purchases from our online store.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using our website, you consent to the data practices described
              in this policy. If you do not agree with the practices described
              in this policy, please do not use our website.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Personal Information
              </h3>
              <p className="text-gray-700 mb-3">
                We may collect the following personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  Name and contact information (email address, phone number,
                  mailing address)
                </li>
                <li>Billing and shipping addresses</li>
                <li>
                  Payment information (credit card details, billing address)
                </li>
                <li>Account credentials (username, password)</li>
                <li>Purchase history and preferences</li>
                <li>Communication preferences</li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Automatically Collected Information
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Website usage data and analytics</li>
                <li>Cookies and tracking technologies</li>
                <li>Referral sources</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">
              How We Use Your Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Process and fulfill your orders</li>
              <li>Provide customer service and support</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Improve our website and services</li>
              <li>Personalize your shopping experience</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
              <li>Analyze website usage and performance</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">
              Information Sharing and Disclosure
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information in the following
              circumstances:
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Service Providers
                </h4>
                <p className="text-gray-700">
                  We work with trusted third-party service providers who assist
                  us in operating our website and conducting business,
                  including:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                  <li>Payment processors</li>
                  <li>Shipping and logistics companies</li>
                  <li>Email marketing services</li>
                  <li>Analytics providers</li>
                  <li>Customer service platforms</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Legal Requirements
                </h4>
                <p className="text-gray-700">
                  We may disclose your information when required by law or to
                  protect our rights, property, or safety.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Business Transfers
                </h4>
                <p className="text-gray-700">
                  In the event of a merger, acquisition, or sale of assets, your
                  information may be transferred as part of the transaction.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Data Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              We implement appropriate technical and organizational security
              measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction. These measures
              include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>SSL encryption for data transmission</li>
              <li>Secure payment processing</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication</li>
              <li>Employee training on data protection</li>
            </ul>
            <p className="text-gray-700">
              However, no method of transmission over the internet or electronic
              storage is 100% secure. While we strive to protect your
              information, we cannot guarantee absolute security.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">
              Cookies and Tracking Technologies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              We use cookies and similar tracking technologies to enhance your
              browsing experience and analyze website usage. Types of cookies we
              use include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Essential Cookies:</strong> Necessary for website
                functionality
              </li>
              <li>
                <strong>Performance Cookies:</strong> Help us understand how
                visitors use our site
              </li>
              <li>
                <strong>Functional Cookies:</strong> Remember your preferences
                and settings
              </li>
              <li>
                <strong>Marketing Cookies:</strong> Used to deliver relevant
                advertisements
              </li>
            </ul>
            <p className="text-gray-700">
              You can control cookie settings through your browser preferences.
              However, disabling certain cookies may affect website
              functionality.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Your Rights and Choices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Access:</strong> Request a copy of the personal
                information we hold about you
              </li>
              <li>
                <strong>Correction:</strong> Request correction of inaccurate or
                incomplete information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal
                information (subject to legal requirements)
              </li>
              <li>
                <strong>Portability:</strong> Request transfer of your data to
                another service provider
              </li>
              <li>
                <strong>Opt-out:</strong> Unsubscribe from marketing
                communications at any time
              </li>
              <li>
                <strong>Restriction:</strong> Request limitation of processing
                in certain circumstances
              </li>
            </ul>
            <p className="text-gray-700">
              To exercise these rights, please contact us using the information
              provided in the "Contact Us" section below.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Data Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              We retain your personal information for as long as necessary to
              fulfill the purposes outlined in this Privacy Policy, unless a
              longer retention period is required or permitted by law. When we
              no longer need your information, we will securely delete or
              anonymize it.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Third-Party Links</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices or content of these external
              sites. We encourage you to review the privacy policies of any
              third-party websites you visit.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Our website is not intended for children under the age of 13. We
              do not knowingly collect personal information from children under
              13. If we become aware that we have collected personal information
              from a child under 13, we will take steps to delete such
              information promptly.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">
              International Data Transfers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Your information may be transferred to and processed in countries
              other than your own. We ensure that such transfers comply with
              applicable data protection laws and implement appropriate
              safeguards to protect your information.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">
              Changes to This Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or applicable laws. We will notify you of
              any material changes by posting the updated policy on our website
              and updating the "Last updated" date. Your continued use of our
              website after such changes constitutes acceptance of the updated
              policy.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> privacy@yourcompany.com
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> (555) 123-4567
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> 123 Business Street, City, State 12345
              </p>
              <p className="text-gray-700">
                <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 5:00
                PM EST
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500 mt-8">
          <p>
            This privacy policy is effective as of{" "}
            {new Date().toLocaleDateString()} and was last updated on{" "}
            {new Date().toLocaleDateString()}.
          </p>
        </div>
      </div>
    </div>
  );
}
