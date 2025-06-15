import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Truck,
  Clock,
  Shield,
  AlertTriangle,
} from "lucide-react";
import PageHeader from "@/components/text/page-header";

export default function ShippingInfo() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Truck className="h-8 w-8 text-blue-600" />
            <PageHeader title="Shipping Policy" />
          </div>
          <p className="text-gray-600 text-center">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Alert className="mb-6">
          <Truck className="h-4 w-4" />
          <AlertDescription>
            We offer multiple shipping options to get your order to you quickly
            and safely. Free shipping is available on orders over $75 within the
            continental United States.
          </AlertDescription>
        </Alert>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Processing Time</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Standard Processing</h3>
                <p className="text-gray-700 mb-3">
                  Most orders are processed and shipped within 1-2 business days
                  after payment confirmation.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 text-sm">
                  <li>Orders placed before 2:00 PM EST ship the same day</li>
                  <li>
                    Orders placed after 2:00 PM EST ship the next business day
                  </li>
                  <li>Weekend orders are processed on the next business day</li>
                  <li>Holiday processing times may vary</li>
                </ul>
              </div>
            </div>

            <Separator />

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-1">
                    Extended Processing Items
                  </h4>
                  <p className="text-yellow-700 text-sm">
                    Some items may require additional processing time:
                  </p>
                  <ul className="list-disc pl-4 mt-2 text-yellow-700 text-sm space-y-1">
                    <li>Custom or personalized items: 3-5 business days</li>
                    <li>Pre-order items: Ships on release date</li>
                    <li>Large or oversized items: 2-3 business days</li>
                    <li>Items from multiple warehouses: 2-4 business days</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Delivery Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Delivery Requirements
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Signature may be required for orders over $200</li>
                <li>
                  Someone must be available to receive the package during
                  delivery hours
                </li>
                <li>Packages cannot be left unattended in unsecured areas</li>
                <li>
                  Delivery to PO Boxes available for standard shipping only
                </li>
                <li>
                  Business addresses may have different delivery schedules
                </li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Delivery Attempts
              </h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 mb-2">
                  <strong>What happens if you're not home?</strong>
                </p>
                <ul className="list-disc pl-6 space-y-1 text-yellow-700 text-sm">
                  <li>
                    First attempt: Package left if secure location available
                  </li>
                  <li>
                    Second attempt: Delivery notice left with pickup
                    instructions
                  </li>
                  <li>
                    Third attempt: Package held at local facility for pickup
                  </li>
                  <li>After 5 days: Package returned to sender</li>
                </ul>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Special Delivery Instructions
              </h3>
              <p className="text-gray-700 mb-3">
                You can provide special delivery instructions during checkout:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600 text-sm">
                <li>Leave at front door, back door, or specific location</li>
                <li>Deliver to building concierge or front desk</li>
                <li>Ring doorbell or knock</li>
                <li>Do not ring doorbell (for sleeping babies, etc.)</li>
                <li>Call upon arrival</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Shipping Restrictions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  Items We Cannot Ship
                </h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 text-sm">
                  <li>Hazardous materials</li>
                  <li>Flammable liquids</li>
                  <li>Perishable items (unless specified)</li>
                  <li>Live animals or plants</li>
                  <li>Weapons or ammunition</li>
                  <li>Illegal substances</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  Address Restrictions
                </h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 text-sm">
                  <li>Military APO/FPO addresses (contact us)</li>
                  <li>Some remote rural areas</li>
                  <li>Certain international destinations</li>
                  <li>Areas with shipping embargoes</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Packaging & Protection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Secure Packaging</h3>
                <p className="text-gray-700 mb-3">
                  We take great care in packaging your orders to ensure they
                  arrive safely:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 text-sm">
                  <li>Eco-friendly packaging materials when possible</li>
                  <li>Bubble wrap and padding for fragile items</li>
                  <li>Waterproof packaging for weather protection</li>
                  <li>Tamper-evident sealing for security</li>
                  <li>Proper labeling and handling instructions</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">
                Sustainability Commitment
              </h4>
              <p className="text-green-700 text-sm">
                We're committed to reducing our environmental impact through
                recyclable packaging materials, right-sized boxes to minimize
                waste, and carbon-neutral shipping options.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">
              Shipping Issues & Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Common Issues
              </h3>
              <div className="space-y-3">
                <div className="border-l-4 border-red-400 pl-4">
                  <h4 className="font-semibold text-red-800">
                    Damaged Package
                  </h4>
                  <p className="text-red-700 text-sm">
                    Contact us immediately with photos. We'll arrange a
                    replacement or refund.
                  </p>
                </div>
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="font-semibold text-yellow-800">
                    Lost Package
                  </h4>
                  <p className="text-yellow-700 text-sm">
                    We'll investigate with the carrier and provide a replacement
                    if confirmed lost.
                  </p>
                </div>
                <div className="border-l-4 border-blue-400 pl-4">
                  <h4 className="font-semibold text-blue-800">
                    Delayed Delivery
                  </h4>
                  <p className="text-blue-700 text-sm">
                    Check tracking first. Contact us if significantly delayed
                    beyond estimated delivery.
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Contact Shipping Support
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700">
                      <strong>Email:</strong> shipping@yourcompany.com
                    </p>
                    <p className="text-gray-700">
                      <strong>Phone:</strong> (555) 123-4567
                    </p>
                    <p className="text-gray-700">
                      <strong>Live Chat:</strong> Available 9 AM - 6 PM EST
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <strong>Response Time:</strong> Within 24 hours
                    </p>
                    <p className="text-gray-700">
                      <strong>Business Hours:</strong> Mon-Fri, 9 AM - 6 PM EST
                    </p>
                    <p className="text-gray-700">
                      <strong>Weekend Support:</strong> Limited availability
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">
              Holiday & Peak Season Shipping
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                During peak seasons (Black Friday, Christmas, etc.), processing
                and delivery times may be extended. We recommend ordering early
                to ensure timely delivery.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500 mt-8">
          <p>
            This Shipping Information page is effective as of{" "}
            {new Date().toLocaleDateString()} and was last updated on{" "}
            {new Date().toLocaleDateString()}.
          </p>
          <p className="mt-2">
            For the most current shipping rates and delivery times, please check
            during checkout or contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
