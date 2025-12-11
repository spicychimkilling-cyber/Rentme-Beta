import { Link } from 'react-router-dom';
import { Search, ArrowRight, Star, Shield, Clock, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { categories, mockItems } from '../lib/mockData';
import { motion } from "framer-motion"; 
import { useState } from 'react';
import * as LucideIcons from 'lucide-react';

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const featuredItems = mockItems.slice(0, 4);

  const categoriesWithCounts = categories.map((category) => ({
    ...category,
    count:
      (category as any).count ??
      mockItems.filter((item) => item.category === category.name).length,
  }));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/browse?search=${searchQuery}`;
  };

  const stats = [
    { icon: Users, label: 'Active Users', value: '500+' },
    { icon: Shield, label: 'Verified Items', value: '200+' },
    { icon: Clock, label: 'Avg Response', value: '< 2hrs' },
    { icon: Star, label: 'Avg Rating', value: '4.8/5' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl mb-4">
              Rent & Share in Gelephu
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Your trusted platform for borrowing and lending items
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto">
              <div className="flex gap-2 bg-white rounded-lg p-2 shadow-lg">
                <Input
                  type="text"
                  placeholder="Search for items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 focus-visible:ring-0 text-gray-900"
                />
                <Button type="submit" className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <Search className="w-4 h-4" />
                  Search
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Browse by Category</h2>
            <p className="text-gray-600">Find exactly what you need from our wide range of categories</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categoriesWithCounts.map((category, index) => {
              const Icon = (LucideIcons as any)[category.icon] || LucideIcons.Package;
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/browse?category=${category.name}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                      <CardContent className="p-6 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <Icon className="w-8 h-8" />
                        </div>
                        <h3 className="mb-1">{category.name}</h3>
                        <p className="text-sm text-gray-600">
                          {category.count ?? 'New'} {category.count === 1 ? 'item' : 'items'}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl mb-2">Featured Items</h2>
              <p className="text-gray-600">Popular items available for rent right now</p>
            </div>
            <Link to="/browse">
              <Button variant="outline" className="gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/item/${item.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge className="mb-2">{item.category}</Badge>
                      <h3 className="mb-2 line-clamp-1">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl text-blue-600">Nu. {item.price}</span>
                          <span className="text-sm text-gray-600">/day</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-4">Have Items to Rent Out?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Turn your unused items into income. List them on RentMe today!
            </p>
            <Link to="/list-item">
              <Button size="lg" variant="secondary" className="gap-2">
                List Your Item
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}