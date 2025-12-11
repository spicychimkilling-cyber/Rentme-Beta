import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Star, MapPin } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { categories, locations, mockItems, type Item } from '../lib/mockData';
import { DATABASE_ID, COLLECTION_ITEMS_ID, BUCKET_IMAGES_ID, storage, databases } from '../lib/appwrite';
import { motion } from "framer-motion"; 

export function BrowseItems() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      // Fetch items from Appwrite
      const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ITEMS_ID);
      const appwriteItems: Item[] = res.documents.map((doc: any) => {
        // Normalize images: prefer fileIds (CSV or array), fall back to images field
        let imageIds: string[] = [];
        if (doc.fileIds) {
          if (Array.isArray(doc.fileIds)) imageIds = doc.fileIds;
          else imageIds = String(doc.fileIds).split(',').map((s: string) => s.trim()).filter(Boolean);
        } else if (doc.images) {
          if (Array.isArray(doc.images)) imageIds = doc.images;
          else imageIds = [String(doc.images)];
        }

        const imageUrls = imageIds.map((id) => getAppwriteImageUrl(id));

        return {
          id: doc.$id,
          title: doc.title,
          description: doc.desc || '',
          category: doc.category || 'Uncategorized',
          price: typeof doc.price === 'number' ? doc.price : (doc.price ? Number(doc.price) : 0),
          images: imageUrls,
          location: doc.location || 'Unknown',
          ownerId: doc.ownerId || '',
          ownerName: doc.ownerName || '',
          features: Array.isArray(doc.features) ? doc.features : (doc.features ? String(doc.features).split(',').map((s: string) => s.trim()) : []),
          availability: doc.availability !== false,
        } as Item;
      });

      // Combine Appwrite items with mock items if needed
      const allItems = [...appwriteItems, ...mockItems];
      const computedMax = Math.max(1000, ...allItems.map((i) => (typeof i.price === 'number' ? i.price : Number(i.price) || 0)));
      setAllItems(allItems);
      setMaxPrice(computedMax);
      setPriceRange([0, computedMax]);
      setFilteredItems(allItems);
      setLoading(false);
    } catch (error: any) {
      // Silently use mock data if Appwrite is not configured
      setAllItems(mockItems);
      const fallbackMax = Math.max(1000, ...mockItems.map((i) => i.price || 0));
      setMaxPrice(fallbackMax);
      setPriceRange([0, fallbackMax]);
      setFilteredItems(mockItems);
      setLoading(false);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedCategory, selectedLocation, priceRange, allItems]);

  // Helper to get Appwrite image URL
  function getAppwriteImageUrl(fileId: string) {
    // storage.getFilePreview returns a URL string in the Web SDK
    try {
      // Use getFileView which returns a direct URL to the file (no transformations)
      return storage.getFileView(BUCKET_IMAGES_ID, fileId) as string;
    } catch (e) {
      // If view fails, return an empty string so image tag doesn't break
      return '';
    }
  }

  const normalize = (value: string | null | undefined) => (value ?? '').toString().trim().toLowerCase();

  const applyFilters = () => {
    const filtered = allItems.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || normalize(item.category) === normalize(selectedCategory);
      const matchesLocation = selectedLocation === 'all' || normalize(item.location) === normalize(selectedLocation);
      const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
    });

    setFilteredItems(filtered);
  };

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return ((b as any).rating || 0) - ((a as any).rating || 0);
    return 0; // featured
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl mb-2">Browse Items</h1>
          <p className="text-gray-600">Find the perfect item for your needs</p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button
              variant="outline"
              className="gap-2 md:w-auto"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t"
            >
              <div>
                <label className="text-sm mb-2 block">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.name} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm mb-2 block">Location</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm mb-2 block">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-3">
                <label className="text-sm mb-2 block">
                  Price Range: Nu. {priceRange[0]} - Nu. {priceRange[1]}
                </label>
                <Slider
                  min={0}
                  max={maxPrice}
                  step={Math.max(25, Math.round(maxPrice / 40))}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="w-full"
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {sortedItems.length} {sortedItems.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {/* Items Grid */}
        {sortedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/item/${item.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow group h-full">
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
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </div>
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
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl mb-2">No items found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
              <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedLocation('all');
                setPriceRange([0, maxPrice]);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}