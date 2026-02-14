import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy | Echofex",
  description: "Learn how Echofex collects, uses, and protects your personal information. Our privacy policy explains our commitment to your data security.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: February 14, 2026</p>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg mb-4">
              At Echofex ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <Link href="/" className="text-primary hover:underline">www.echofex.me</Link>.
            </p>
            <p className="mb-4">
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          {/* Amazon Associates Disclosure */}
          <section className="mb-8 p-6 bg-muted/50 rounded-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4">Amazon Associates Program Participation</h2>
            <p className="mb-4">
              Echofex is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com and other Amazon websites.
            </p>
            <p className="mb-4">
              As an Amazon Associate, we earn from qualifying purchases. This means that when you click on certain links on our website and make a purchase, we may receive a commission at no additional cost to you.
            </p>
            <p>
              We use cookies and similar technologies as part of the Amazon Associates Program to track referrals and attribute purchases to our site.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>

            <h3 className="text-xl font-semibold mb-3">Personal Data</h3>
            <p className="mb-4">
              We may collect personally identifiable information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Subscribe to our newsletter</li>
              <li>Contact us through our contact form</li>
              <li>Leave comments on our articles</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p className="mb-4">
              This information may include:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Automatically Collected Information</h3>
            <p className="mb-4">
              When you visit our website, we automatically collect certain information about your device, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referring URLs</li>
              <li>Pages viewed and time spent on pages</li>
              <li>Device information (e.g., mobile device identifier)</li>
            </ul>
          </section>

          {/* Cookies and Tracking Technologies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that are sent to your browser from a website and stored on your device.
            </p>

            <h3 className="text-xl font-semibold mb-3">Types of Cookies We Use:</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Affiliate Cookies:</strong> Used to track referrals through the Amazon Associates Program</li>
              <li><strong>Advertising Cookies:</strong> Used to deliver personalized advertisements</li>
            </ul>

            <p className="mb-4">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
            </p>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>To provide, operate, and maintain our website</li>
              <li>To improve, personalize, and expand our website</li>
              <li>To understand and analyze how you use our website</li>
              <li>To develop new products, services, features, and functionality</li>
              <li>To communicate with you, including sending newsletters and marketing materials (with your consent)</li>
              <li>To process your transactions and send you related information</li>
              <li>To send you updates about products you've shown interest in</li>
              <li>To track affiliate referrals and attribute sales through the Amazon Associates Program</li>
              <li>To detect, prevent, and address technical issues</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          {/* Third-Party Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <p className="mb-4">
              We may employ third-party companies and services for the following reasons:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>To facilitate our website</li>
              <li>To provide services on our behalf</li>
              <li>To perform website-related services</li>
              <li>To assist us in analyzing how our website is used</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Third-Party Services We Use:</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Amazon Associates:</strong> Affiliate tracking and commissions</li>
              <li><strong>Google Analytics:</strong> Website analytics and performance monitoring</li>
              <li><strong>Sanity.io:</strong> Content management</li>
            </ul>

            <p className="mb-4">
              These third parties have access to your personal data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
          </section>

          {/* Data Sharing and Disclosure */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Sharing and Disclosure</h2>
            <p className="mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>With service providers:</strong> To help us operate our website and provide services</li>
              <li><strong>For legal purposes:</strong> When required by law or to protect our rights</li>
              <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>With your consent:</strong> When you explicitly agree to share information</li>
            </ul>
          </section>

          {/* Your Rights and Choices */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Rights and Choices</h2>
            <p className="mb-4">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Objection:</strong> Object to processing of your personal information</li>
              <li><strong>Restriction:</strong> Request restriction of processing your personal information</li>
              <li><strong>Data portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Withdraw consent:</strong> Withdraw your consent at any time</li>
            </ul>

            <p className="mb-4">
              To exercise these rights, please contact us at <a href="mailto:privacy@echofex.com" className="text-primary hover:underline">privacy@echofex.com</a>.
            </p>
          </section>

          {/* California Privacy Rights (CCPA) */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">California Privacy Rights (CCPA)</h2>
            <p className="mb-4">
              If you are a California resident, you have specific rights regarding your personal information under the California Consumer Privacy Act (CCPA):
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Right to know what personal information is collected</li>
              <li>Right to know if personal information is sold or disclosed and to whom</li>
              <li>Right to say no to the sale of personal information</li>
              <li>Right to access your personal information</li>
              <li>Right to equal service and price, even if you exercise your privacy rights</li>
            </ul>
          </section>

          {/* GDPR Compliance */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">GDPR Compliance (European Users)</h2>
            <p className="mb-4">
              If you are located in the European Economic Area (EEA), we process your personal data based on the following legal grounds:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Consent:</strong> When you have given consent for processing</li>
              <li><strong>Contract:</strong> When processing is necessary for a contract</li>
              <li><strong>Legal obligation:</strong> When we must comply with legal requirements</li>
              <li><strong>Legitimate interests:</strong> When we have a legitimate interest in processing</li>
            </ul>
            <p className="mb-4">
              You have the right to lodge a complaint with a supervisory authority if you believe we have not complied with GDPR requirements.
            </p>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure server infrastructure</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
              <li>Regular backups</li>
            </ul>
            <p className="mb-4">
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>
          </section>

          {/* Data Retention */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
            <p className="mb-4">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
            <p className="mb-4">
              Our website is not intended for children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can delete it.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this policy.
            </p>
            <p className="mb-4">
              We encourage you to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </section>

          {/* Contact Us */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-none space-y-2">
              <li><strong>Email:</strong> <a href="mailto:privacy@echofex.com" className="text-primary hover:underline"></a></li>
              <li><strong>Website:</strong> <Link href="/" className="text-primary hover:underline">www.echofex.me</Link></li>
            </ul>
          </section>

          {/* Acknowledgment */}
          <section className="mb-8 p-6 bg-muted/50 rounded-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4">Acknowledgment</h2>
            <p>
              By using our website, you acknowledge that you have read and understood this Privacy Policy and agree to its terms and conditions.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
