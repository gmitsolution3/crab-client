import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Information | GMIT Solution",
  description:
    "Learn about shipping methods, delivery timelines, charges, and tracking at GMIT Solution.",
  alternates: {
    canonical: "https://www.gmitsolution.net/shipping-info",
  },
  openGraph: {
    title: "Shipping Information | GMIT Solution",
    description:
      "Details about shipping methods, delivery time, and tracking at GMIT Solution.",
    url: "https://www.gmitsolution.net/shipping-info",
    siteName: "GMIT Solution",
    type: "website",
  },
};

export default function ShippingInfoPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Shipping Information
        </h1>
        <p className="text-sm text-gray-500 mt-2">Last updated: January 2026</p>
      </header>

      {/* Content */}
      <section className="space-y-8 text-gray-700 leading-relaxed">
        <p>
          At <strong>GMIT Solution</strong>, we aim to provide fast and reliable
          delivery to our customers. Here’s everything you need to know about
          our shipping services.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            1. Shipping Methods
          </h2>
          <p>We offer the following shipping options:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Standard Shipping: 3–7 business days</li>
            <li>Express Shipping: 1–3 business days</li>
            <li>Cash on Delivery (COD) available in select locations</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            2. Shipping Charges
          </h2>
          <p>
            Shipping charges depend on the weight, size of the order, and
            delivery location. You can see the shipping charges at checkout
            before placing the order.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            3. Delivery Time
          </h2>
          <p>
            Delivery timelines vary depending on your location and the chosen
            shipping method. While we strive to meet the estimated delivery
            time, delays may occur due to unforeseen circumstances such as
            weather or logistic issues.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            4. Order Tracking
          </h2>
          <p>
            Once your order is shipped, you will receive a tracking number via
            email or SMS. You can use this number to track your order on our
            website or through the courier service.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            5. International Shipping
          </h2>
          <p>
            We currently ship to select international locations. Shipping
            charges and delivery times may vary. Please check the shipping
            options during checkout for international orders.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            6. Shipping Issues
          </h2>
          <p>
            If your order is delayed, lost, or damaged during shipment, please
            contact our support team immediately for assistance.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            7. Contact Us
          </h2>
          <p>
            For any questions regarding shipping, please contact us:
            <br />
            📧 Email: <strong>support@gmitsolution.net</strong>
            <br />
            🌐 Website: <strong>https://www.gmitsolution.net</strong>
          </p>
        </div>
      </section>
    </main>
  );
}
