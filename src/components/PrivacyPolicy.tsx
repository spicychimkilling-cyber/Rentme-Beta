import { Shield } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { motion } from "framer-motion"; 

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Shield className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl mb-4">Privacy Policy</h1>
            <p className="text-xl text-blue-100">
              Last updated: December 3, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8 space-y-8">
              <div>
                <h2 className="text-2xl mb-4">1. Introduction</h2>
                <p className="text-gray-700 leading-relaxed">
                  Welcome to RentMe ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our rental platform located at RentMe.bt and our mobile application.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">2. Information We Collect</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <div>
                    <h3 className="text-lg mb-2">2.1 Personal Information</h3>
                    <p>We collect personal information that you voluntarily provide to us when you register on the platform, including:</p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>Name and contact information (email, phone number)</li>
                      <li>Location information (city/town in Gelephu state)</li>
                      <li>Account credentials (username and password)</li>
                      <li>Profile information and photos</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg mb-2">2.2 Item Information</h3>
                    <p>When you list items for rent, we collect:</p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>Item descriptions, photos, and pricing</li>
                      <li>Availability and rental terms</li>
                      <li>Location where items are available</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg mb-2">2.3 Transaction Information</h3>
                    <p>We collect information about your rental transactions, including:</p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>Booking dates and rental periods</li>
                      <li>Communication between renters and owners</li>
                      <li>Reviews and ratings</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg mb-2">2.4 Automatically Collected Information</h3>
                    <p>When you access our platform, we automatically collect:</p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>Device information (IP address, browser type, operating system)</li>
                      <li>Usage data (pages visited, time spent, features used)</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-700 leading-relaxed mb-3">We use the information we collect to:</p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
                  <li>Provide, operate, and maintain our rental platform</li>
                  <li>Process and manage rental transactions</li>
                  <li>Facilitate communication between renters and owners</li>
                  <li>Send you notifications about bookings, messages, and platform updates</li>
                  <li>Improve and personalize your experience on our platform</li>
                  <li>Prevent fraud and ensure platform security</li>
                  <li>Comply with legal obligations</li>
                  <li>Analyze usage patterns and optimize platform performance</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl mb-4">4. Information Sharing and Disclosure</h2>
                <div className="space-y-3 text-gray-700 leading-relaxed">
                  <p>We may share your information in the following circumstances:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li><strong>With Other Users:</strong> Your profile information, listed items, and reviews are visible to other platform users</li>
                    <li><strong>With Service Providers:</strong> We may share information with third-party service providers who help us operate our platform</li>
                    <li><strong>For Legal Reasons:</strong> We may disclose your information if required by law or to protect our rights and safety</li>
                    <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
                  </ul>
                  <p className="mt-3">We will never sell your personal information to third parties.</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl mb-4">5. Data Security</h2>
                <p className="text-gray-700 leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">6. Data Retention</h2>
                <p className="text-gray-700 leading-relaxed">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. When you delete your account, we will delete or anonymize your personal information within 30 days.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">7. Your Privacy Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-3">You have the right to:</p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
                  <li>Access and obtain a copy of your personal information</li>
                  <li>Correct or update inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to or restrict certain processing of your information</li>
                  <li>Withdraw consent where processing is based on consent</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-3">
                  To exercise these rights, please contact us at privacy@rentme.bt
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">8. Cookies and Tracking</h2>
                <p className="text-gray-700 leading-relaxed">
                  We use cookies and similar tracking technologies to enhance your experience, analyze platform usage, and deliver personalized content. You can control cookies through your browser settings, but disabling cookies may limit platform functionality.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">9. Children's Privacy</h2>
                <p className="text-gray-700 leading-relaxed">
                  RentMe is not intended for users under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">10. Changes to This Policy</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">11. Contact Us</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700"><strong>Email:</strong> privacy@rentme.bt</p>
                  <p className="text-gray-700"><strong>Phone:</strong> +975 17123456</p>
                  <p className="text-gray-700"><strong>Address:</strong> Gelephu Town, Sarpang District, Bhutan</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
