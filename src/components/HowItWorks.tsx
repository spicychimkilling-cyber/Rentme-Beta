import { Search, FileText, Handshake, Package, Shield, DollarSign } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { motion } from "framer-motion"; 

export function HowItWorks() {
  const renterSteps = [
    {
      icon: Search,
      title: 'Browse & Search',
      description: 'Find the perfect item from our wide selection of categories. Filter by location, price, and category.',
    },
    {
      icon: FileText,
      title: 'Request Booking',
      description: 'Select your rental dates and send a booking request to the owner. Provide any additional information needed.',
    },
    {
      icon: Handshake,
      title: 'Meet & Rent',
      description: 'Once approved, arrange pickup with the owner. Inspect the item and complete the rental agreement.',
    },
    {
      icon: Package,
      title: 'Return Item',
      description: 'Return the item on time in the same condition. Leave a review to help other renters.',
    },
  ];

  const ownerSteps = [
    {
      icon: FileText,
      title: 'List Your Item',
      description: 'Create a detailed listing with photos, description, and pricing. Set your availability and rental terms.',
    },
    {
      icon: Shield,
      title: 'Review Requests',
      description: 'Receive booking requests from renters. Review their profile and accept or decline requests.',
    },
    {
      icon: Handshake,
      title: 'Hand Over Item',
      description: 'Meet the renter, verify their identity, and hand over the item. Explain any usage instructions.',
    },
    {
      icon: DollarSign,
      title: 'Get Paid',
      description: 'Collect payment and get the item back. Earn money from items you rarely use.',
    },
  ];

  const rules = [
    {
      title: 'Verify Identity',
      description: 'Always verify the identity of renters/owners before transactions.',
    },
    {
      title: 'Inspect Items',
      description: 'Thoroughly inspect items before and after rental to document condition.',
    },
    {
      title: 'Clear Communication',
      description: 'Maintain clear communication about pickup/return times and item condition.',
    },
    {
      title: 'Respect Property',
      description: 'Treat rented items with care and return them in the same condition.',
    },
    {
      title: 'Report Issues',
      description: 'Immediately report any damages or issues during the rental period.',
    },
    {
      title: 'Local Meetups',
      description: 'Meet in safe, public locations for item exchange whenever possible.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl mb-4">How RentMe Works</h1>
            <p className="text-xl text-blue-100">
              A simple guide to renting and lending items in your community
            </p>
          </motion.div>
        </div>
      </section>

      {/* For Renters */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">For Renters</h2>
            <p className="text-gray-600">How to rent items on RentMe</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {renterSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                        {index + 1}
                      </div>
                      <h3 className="text-xl mb-3">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* For Owners */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">For Owners</h2>
            <p className="text-gray-600">How to list and rent out your items</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ownerSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-green-600" />
                      </div>
                      <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                        {index + 1}
                      </div>
                      <h3 className="text-xl mb-3">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rules & Responsibilities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Rules & Responsibilities</h2>
            <p className="text-gray-600">Important guidelines for a safe rental experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rules.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg mb-2">{rule.title}</h3>
                        <p className="text-sm text-gray-600">{rule.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <Shield className="w-12 h-12 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl mb-4">Safety First</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Always meet in public, well-lit locations during daylight hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Take photos/videos of items before and after rental</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Keep all communication and transactions documented</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Trust your instincts - if something feels wrong, cancel the transaction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Report any suspicious activity or policy violations immediately</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
