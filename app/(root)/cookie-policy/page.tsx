import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Cookie } from "lucide-react";
import PageHeader from "@/components/text/page-header";
import { getCompanyInfo } from "@/actions/fetchcompanydata";

export default async function CookiePolicy() {
  const company = await getCompanyInfo();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cookie className="h-8 w-8 text-amber-600" />
            <PageHeader title="Cookie Policy" />
          </div>
        </div>

        <Alert className="mb-6">
          <Cookie className="h-4 w-4" />
          <AlertDescription>
            This Cookie Policy explains how Himalaya Garment uses cookies and
            similar technologies when you visit our website. It explains what
            these technologies are and why we use them, as well as your rights
            to control our use of them.
          </AlertDescription>
        </Alert>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">What Are Cookies?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Cookies are small data files that are placed on your computer or
              mobile device when you visit a website. Cookies are widely used by
              website owners to make their websites work, or to work more
              efficiently, as well as to provide reporting information.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Cookies set by the website owner are called "first-party cookies."
              Cookies set by parties other than the website owner are called
              "third-party cookies." Third-party cookies enable third-party
              features or functionality to be provided on or through the
              website.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Why Do We Use Cookies?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              We use cookies for several reasons:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>To ensure our website functions properly and securely</li>
              <li>To remember your preferences and settings</li>
              <li>
                To analyze how you use our website and improve our services
              </li>
              <li>To personalize your experience and show relevant content</li>
              <li>To provide social media features and analyze our traffic</li>
              <li>
                To deliver targeted advertising and measure its effectiveness
              </li>
              <li>To prevent fraud and enhance security</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">
              Detailed Cookie Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Cookie Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Purpose
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Duration
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono">
                      role
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Maintains Role
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Session
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Essential
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono">
                      cart_items
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Stores shopping cart contents
                    </td>
                    <td className="border border-gray-300 px-4 py-2">7 days</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Essential
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono">
                      wishlist_items
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      stores wishlisted content
                    </td>
                    <td className="border border-gray-300 px-4 py-2">7 days</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Essential
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono">
                      token
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      stores session of user
                    </td>
                    <td className="border border-gray-300 px-4 py-2">7 days</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Essential
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">
              Updates to This Cookie Policy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              We may update this Cookie Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. We will notify you of any material changes by
              posting the updated policy on our website and updating the "Last
              updated" date.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              If you have any questions about our use of cookies or this Cookie
              Policy, please contact us:
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
