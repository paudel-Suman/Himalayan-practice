import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Cookie, Settings, Shield, BarChart3 } from "lucide-react";
import PageHeader from "@/components/text/page-header";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cookie className="h-8 w-8 text-amber-600" />
            <PageHeader title="Cookie Policy" />
          </div>
          <p className="text-gray-600 text-center">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Alert className="mb-6">
          <Cookie className="h-4 w-4" />
          <AlertDescription>
            This Cookie Policy explains how [Your Company Name] uses cookies and
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
              Cookies set by the website owner (in this case, [Your Company
              Name]) are called "first-party cookies." Cookies set by parties
              other than the website owner are called "third-party cookies."
              Third-party cookies enable third-party features or functionality
              to be provided on or through the website.
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
            <CardTitle className="text-2xl">Types of Cookies We Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Essential Cookies
                  </h3>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  These cookies are strictly necessary for the website to
                  function and cannot be switched off.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Authentication and security</li>
                  <li>• Shopping cart functionality</li>
                  <li>• Form submission</li>
                  <li>• Load balancing</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Analytics Cookies
                  </h3>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  These cookies help us understand how visitors interact with
                  our website.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Google Analytics</li>
                  <li>• Page view tracking</li>
                  <li>• User behavior analysis</li>
                  <li>• Performance monitoring</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Functional Cookies
                  </h3>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  These cookies enable enhanced functionality and
                  personalization.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Language preferences</li>
                  <li>• Theme settings</li>
                  <li>• Recently viewed items</li>
                  <li>• Chat widget functionality</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Cookie className="h-5 w-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Marketing Cookies
                  </h3>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  These cookies track visitors across websites to display
                  relevant advertisements.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Google Ads</li>
                  <li>• Facebook Pixel</li>
                  <li>• Retargeting campaigns</li>
                  <li>• Conversion tracking</li>
                </ul>
              </div>
            </div>
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
                      session_id
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Maintains user session
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
                      _ga
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Google Analytics tracking
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      2 years
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Analytics
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono">
                      _gid
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Google Analytics session tracking
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      24 hours
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Analytics
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono">
                      preferences
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Stores user preferences
                    </td>
                    <td className="border border-gray-300 px-4 py-2">1 year</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Functional
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono">
                      _fbp
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Facebook Pixel tracking
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      3 months
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Marketing
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Third-Party Cookies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              In addition to our own cookies, we may also use various
              third-party cookies to report usage statistics, deliver
              advertisements, and provide social media features:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Google Analytics</h4>
                <p className="text-sm text-gray-600 mb-2">
                  We use Google Analytics to analyze website usage and improve
                  our services.
                </p>
                <a
                  href="https://policies.google.com/privacy"
                  className="text-blue-600 text-sm hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Privacy Policy
                </a>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Facebook Pixel</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Used for advertising and conversion tracking on Facebook and
                  Instagram.
                </p>
                <a
                  href="https://www.facebook.com/privacy/policy/"
                  className="text-blue-600 text-sm hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook Privacy Policy
                </a>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Payment Processors</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Stripe, PayPal, and other payment providers may set cookies
                  for fraud prevention.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Customer Support</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Live chat widgets and support tools may use cookies for
                  functionality.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">
              Managing Your Cookie Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Cookie Settings
              </h3>
              <p className="text-gray-700 mb-4">
                You can manage your cookie preferences at any time by clicking
                the "Cookie Settings" button below or using our cookie banner
                when you first visit our site.
              </p>
              <Button className="mb-4">
                <Settings className="h-4 w-4 mr-2" />
                Manage Cookie Preferences
              </Button>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Browser Settings
              </h3>
              <p className="text-gray-700 mb-3">
                You can also control cookies through your browser settings.
                Here's how to manage cookies in popular browsers:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <strong>Chrome:</strong> Settings → Privacy and security →
                  Cookies and other site data
                </li>
                <li>
                  <strong>Firefox:</strong> Settings → Privacy & Security →
                  Cookies and Site Data
                </li>
                <li>
                  <strong>Safari:</strong> Preferences → Privacy → Manage
                  Website Data
                </li>
                <li>
                  <strong>Edge:</strong> Settings → Cookies and site permissions
                  → Cookies and site data
                </li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Opt-Out Links
              </h3>
              <p className="text-gray-700 mb-3">
                You can opt out of specific third-party cookies:
              </p>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Analytics Opt-out
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/settings?tab=ads"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook Ad Preferences
                  </a>
                </li>
                <li>
                  <a
                    href="http://optout.networkadvertising.org/"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Network Advertising Initiative Opt-out
                  </a>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">
              Impact of Disabling Cookies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertDescription>
                <strong>Please note:</strong> If you disable or refuse cookies,
                some parts of our website may become inaccessible or not
                function properly. Essential cookies cannot be disabled as they
                are necessary for the website to function.
              </AlertDescription>
            </Alert>
            <div className="mt-4 space-y-2 text-gray-700">
              <p>Disabling different types of cookies may affect:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your ability to log in and maintain your session</li>
                <li>Shopping cart functionality</li>
                <li>Personalized content and recommendations</li>
                <li>Website performance and loading times</li>
                <li>Our ability to provide customer support</li>
              </ul>
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
                <strong>Email:</strong> privacy@yourcompany.com
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> (555) 123-4567
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> 123 Business Street, City, State 12345
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500 mt-8">
          <p>
            This Cookie Policy is effective as of{" "}
            {new Date().toLocaleDateString()} and was last updated on{" "}
            {new Date().toLocaleDateString()}.
          </p>
        </div>
      </div>
    </div>
  );
}
