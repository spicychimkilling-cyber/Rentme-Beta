import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, User, Calendar, Shield, ArrowLeft, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Calendar as CalendarComponent } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { mockItems, type Item } from '../lib/mockData';
import { databases, DATABASE_ID, COLLECTION_ITEMS_ID, COLLECTION_BOOKINGS_ID, storage, BUCKET_IMAGES_ID } from '../lib/appwrite';
import { useAuth } from '../contexts/AuthContext';
import { motion } from "framer-motion"; 
import { toast } from 'sonner';
import { ID } from 'appwrite';

export function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      // Fetch item document from Appwrite
      const doc = await databases.getDocument(DATABASE_ID, COLLECTION_ITEMS_ID, id!);
      if (doc) {
        setItem({
          id: doc.$id,
          title: doc.title,
          description: doc.desc || '',
          category: doc.category,
          price: doc.price,
          images: (() => {
            // fileIds may be stored as CSV or array — normalize and map to Appwrite view URLs
            const ids = doc.fileIds
              ? (Array.isArray(doc.fileIds) ? doc.fileIds : String(doc.fileIds).split(',').map((s: string) => s.trim()).filter(Boolean))
              : (doc.images ? (Array.isArray(doc.images) ? doc.images : [String(doc.images)]) : []);
            return ids.map((fid: string) => {
              try {
                return storage.getFileView(BUCKET_IMAGES_ID, fid) as string;
              } catch {
                return '';
              }
            }).filter(Boolean);
          })(),
          location: doc.location,
          ownerId: doc.ownerId,
          ownerName: doc.ownerName,
          availability: doc.availability !== false,
          rating: doc.rating || 0,
          reviews: doc.reviews || 0,
          features: Array.isArray(doc.features)
            ? doc.features
            : doc.features
            ? String(doc.features).split(',').map((s: string) => s.trim()).filter(Boolean)
            : [],
        });
      } else {
        const mockItem = mockItems.find((i) => i.id === id);
        setItem(mockItem || null);
      }
      setLoading(false);
    } catch (error: any) {
      // Silently fallback to mock items if Appwrite is not configured
      const mockItem = mockItems.find((i) => i.id === id);
      setItem(mockItem || null);
      setLoading(false);
    }
  };

  if (!item && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Item not found</h2>
          <Link to="/browse">
            <Button>Browse Items</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading || !item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to book items');
      navigate('/login');
      return;
    }

    if (!startDate || !endDate) {
      toast.error('Please select start and end dates');
      return;
    }

    if (!item) return;

    const totalPrice = item.price * Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const bookingData = {
      id: `booking_${Date.now()}`,
      itemId: item.id,
      itemTitle: item.title,
      itemImage: item.images[0] || '',
      totalPrice,
      userId: user?.id || '',
      renterName: user?.name || '',
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    };

    try {
      toast.info('Processing booking...');

      let savedToFirebase = false;
      
      // Save booking to Appwrite
      try {
        await databases.createDocument(DATABASE_ID, COLLECTION_BOOKINGS_ID, ID.unique(), {
          itemid: item.id,
          itemtTitle: item.title,
          itemImage: item.images[0] || '',
          totalPrice,
          userId: user?.id || '',
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          status: 'pending',
          ownerId: item.ownerId || '',
          createdAt: new Date().toISOString(),
        });
      } catch (err) {
        // On failure, fall back to localStorage and include owner info so owners can see requests
        const existingBookings = JSON.parse(localStorage.getItem('rentme_bookings') || '[]');
        existingBookings.push({
          ...bookingData,
          ownerId: item.ownerId || '',
          ownerName: item.ownerName || '',
        });
        localStorage.setItem('rentme_bookings', JSON.stringify(existingBookings));
      }

      toast.success('Booking request sent successfully!');
      navigate('/dashboard?tab=bookings');
    } catch (error) {
      // Silently handle any other errors
      toast.error('Failed to create booking. Please check your connection and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/browse" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Browse
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image Gallery */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4"
            >
              <img
                src={item.images[selectedImage]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
            {item.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {item.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 transition-colors ${
                      selectedImage === idx ? 'border-blue-600' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`${item.title} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div>
            <Badge className="mb-3 bg-blue-600">{item.category}</Badge>
            <h1 className="text-3xl md:text-4xl mb-4">{item.title}</h1>
            
            <div className="flex items-center gap-2 text-gray-600 mb-6">
              <MapPin className="w-4 h-4" />
              {item.location}
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl text-blue-600">Nu. {item.price}</span>
                <span className="text-gray-600">/day</span>
              </div>
              {item.availability ? (
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="w-4 h-4" />
                  <span className="text-sm">Available</span>
                </div>
              ) : (
                <span className="text-sm text-red-600">Currently unavailable</span>
              )}
            </div>

            <div className="mb-6">
              <h2 className="text-xl mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">{item.description}</p>
            </div>

            {item.features.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl mb-3">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {item.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Owner Info */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{item.ownerName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-gray-600">Listed by</p>
                    <p>{item.ownerName}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Booking Section */}
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <h2 className="text-2xl mb-6">Book this Item</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm mb-2 block">Start Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Calendar className="w-4 h-4" />
                      {startDate ? startDate.toLocaleDateString() : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="text-sm mb-2 block">End Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Calendar className="w-4 h-4" />
                      {endDate ? endDate.toLocaleDateString() : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      disabled={(date) => !startDate || date <= startDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {startDate && endDate && (
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">
                    Nu. {item.price} × {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                  </span>
                  <span className="text-xl">
                    Nu. {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) * item.price}
                  </span>
                </div>
              </div>
            )}

            <Button
              size="lg"
              className="w-full"
              onClick={handleBooking}
              disabled={!item.availability}
            >
              Request Booking
            </Button>

            <div className="flex items-start gap-2 mt-4 text-sm text-gray-600">
              <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>Your booking request will be sent to the owner for approval. You won't be charged until the owner confirms.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}