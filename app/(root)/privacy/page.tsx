import { getCompanyInfo } from "@/actions/fetchcompanydata";
import PageHeader from "@/components/text/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function Component() {
  const company = await getCompanyInfo();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <PageHeader title="Privacy Policy" />
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Introduction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Welcome to Himalayan Garment ("we," "our," or "us"). We are
              dedicated to safeguarding your privacy and ensuring the protection
              of your personal information. This Privacy Policy explains how we
              collect, use, and protect your data when you visit our website or
              shop from our online store.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using our website, you agree to the practices described in this
              policy. If you do not agree, we recommend that you do not use our
              services.
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
                We may collect the following details when you interact with
                Himalayan Garment:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Name and contact information (email, phone, address)</li>
                <li>Billing and shipping details</li>
                <li>Payment information</li>
                <li>Account login credentials</li>
                <li>Order history and garment preferences</li>
                <li>Communication and newsletter preferences</li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Automatically Collected Information
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>IP address and general location</li>
                <li>Browser and device type</li>
                <li>Usage data and website activity</li>
                <li>Cookies and tracking technologies</li>
                <li>Referral and traffic sources</li>
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
              We use your information for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>To process and ship your garment orders</li>
              <li>To provide customer service and support</li>
              <li>To send order updates and delivery notifications</li>
              <li>To improve our website and product offerings</li>
              <li>To personalize your shopping experience</li>
              <li>To send promotional emails (if subscribed)</li>
              <li>To prevent fraud and maintain website security</li>
              <li>To meet legal and regulatory obligations</li>
              <li>To analyze website performance</li>
            </ul>
          </CardContent>
        </Card>

        {/* ...rest remains the same, just replacing 'our company' or 'we' with Himalayan Garment wherever needed... */}

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
