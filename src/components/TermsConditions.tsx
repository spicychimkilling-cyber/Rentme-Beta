import { FileText } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { motion } from "framer-motion";  


export function TermsConditions() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FileText className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl mb-4">Terms & Conditions</h1>
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
                <h2 className="text-2xl mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  By accessing or using RentMe ("Platform"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use the Platform. These Terms constitute a legally binding agreement between you and RentMe.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">2. Platform Description</h2>
                <p className="text-gray-700 leading-relaxed">
                  RentMe is an online marketplace platform that connects people who want to rent items ("Renters") with people who want to rent out items ("Owners") in Gelephu, Bhutan. We provide the platform but are not a party to the rental agreements between Users.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">3. User Eligibility and Registration</h2>
                <div className="space-y-3 text-gray-700 leading-relaxed">
                  <p><strong>3.1 Age Requirement:</strong> You must be at least 18 years old to use this Platform.</p>
                  <p><strong>3.2 Account Information:</strong> You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate.</p>
                  <p><strong>3.3 Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
                  <p><strong>3.4 Account Termination:</strong> We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent activity.</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl mb-4">4. User Responsibilities</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <div>
                    <h3 className="text-lg mb-2">4.1 For Owners</h3>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>You must own or have legal authority to rent out listed items</li>
                      <li>Provide accurate descriptions, photos, and pricing information</li>
                      <li>Maintain items in safe, working condition</li>
                      <li>Respond to rental requests in a timely manner</li>
                      <li>Comply with all applicable laws and regulations</li>
                      <li>Not list prohibited items (weapons, illegal substances, etc.)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg mb-2">4.2 For Renters</h3>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Treat rented items with reasonable care</li>
                      <li>Return items on time and in the same condition as received</li>
                      <li>Pay agreed-upon rental fees</li>
                      <li>Report any damages or issues immediately</li>
                      <li>Use items only for their intended purpose</li>
                      <li>Comply with all applicable laws and regulations</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg mb-2">4.3 For All Users</h3>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Communicate respectfully with other users</li>
                      <li>Not engage in fraudulent or deceptive practices</li>
                      <li>Not use the Platform for any illegal purposes</li>
                      <li>Not harass, abuse, or harm other users</li>
                      <li>Respect intellectual property rights</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl mb-4">5. Rental Transactions</h2>
                <div className="space-y-3 text-gray-700 leading-relaxed">
                  <p><strong>5.1 Platform Role:</strong> RentMe facilitates connections between Renters and Owners but is not a party to rental agreements. All rental agreements are made directly between Users.</p>
                  <p><strong>5.2 Payments:</strong> Payments are handled directly between Renters and Owners. We recommend meeting in person for exchanges and payments in Bhutanese Ngultrum (BTN).</p>
                  <p><strong>5.3 Insurance:</strong> RentMe does not provide insurance for rental transactions. Users are responsible for their own insurance coverage.</p>
                  <p><strong>5.4 Disputes:</strong> Users are responsible for resolving disputes among themselves. RentMe may provide assistance but is not obligated to mediate disputes.</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl mb-4">6. Prohibited Items</h2>
                <p className="text-gray-700 leading-relaxed mb-3">The following items may not be listed on the Platform:</p>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
                  <li>Weapons, explosives, or ammunition</li>
                  <li>Illegal drugs or controlled substances</li>
                  <li>Stolen property</li>
                  <li>Items that infringe on intellectual property rights</li>
                  <li>Hazardous materials</li>
                  <li>Items prohibited by local, state, or national law</li>
                  <li>Adult content or services</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl mb-4">7. Content and Intellectual Property</h2>
                <div className="space-y-3 text-gray-700 leading-relaxed">
                  <p><strong>7.1 User Content:</strong> You retain ownership of content you post but grant RentMe a license to use, display, and distribute such content on the Platform.</p>
                  <p><strong>7.2 Platform Content:</strong> All Platform content, including logos, design, and text, is owned by RentMe and protected by intellectual property laws.</p>
                  <p><strong>7.3 Restrictions:</strong> You may not copy, modify, distribute, or create derivative works from Platform content without permission.</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl mb-4">8. Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>IMPORTANT: PLEASE READ THIS SECTION CAREFULLY.</strong>
                </p>
                <div className="space-y-3 text-gray-700 leading-relaxed">
                  <p>RentMe provides the Platform "as is" and "as available" without warranties of any kind. To the maximum extent permitted by law:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>We are not responsible for the quality, safety, or legality of listed items</li>
                    <li>We do not guarantee the accuracy of user-provided information</li>
                    <li>We are not liable for damages, losses, or injuries arising from rental transactions</li>
                    <li>We are not responsible for disputes between users</li>
                    <li>We are not liable for any indirect, incidental, or consequential damages</li>
                  </ul>
                  <p className="mt-3">
                    Your use of the Platform is at your own risk. Users assume all risks associated with rental transactions.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl mb-4">9. Indemnification</h2>
                <p className="text-gray-700 leading-relaxed">
                  You agree to indemnify, defend, and hold harmless RentMe, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, or expenses arising from your use of the Platform, violation of these Terms, or violation of any rights of another party.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">10. Privacy</h2>
                <p className="text-gray-700 leading-relaxed">
                  Your use of the Platform is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information. By using the Platform, you consent to our Privacy Policy.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">11. Modifications to Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to modify these Terms at any time. We will notify users of material changes by posting the updated Terms on the Platform and updating the "Last updated" date. Your continued use of the Platform after changes constitutes acceptance of the modified Terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">12. Termination</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may suspend or terminate your access to the Platform at any time, with or without cause or notice, for any reason including violation of these Terms. Upon termination, your right to use the Platform will immediately cease.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">13. Governing Law</h2>
                <p className="text-gray-700 leading-relaxed">
                  These Terms are governed by the laws of Bhutan. Any disputes arising from these Terms or your use of the Platform shall be subject to the exclusive jurisdiction of the courts in Bhutan.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">14. Severability</h2>
                <p className="text-gray-700 leading-relaxed">
                  If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">15. Contact Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about these Terms, please contact us:
                </p>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700"><strong>Email:</strong> legal@rentme.bt</p>
                  <p className="text-gray-700"><strong>Phone:</strong> +975 17123456</p>
                  <p className="text-gray-700"><strong>Address:</strong> Gelephu Town, Sarpang District, Bhutan</p>
                </div>
              </div>

              <div className="pt-6 border-t">
                <p className="text-sm text-gray-600">
                  By using RentMe, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
