import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Package, Calendar, User, Star, MapPin, Edit, Trash2, Eye, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useAuth } from '../contexts/AuthContext';
import { mockItems, type Booking, type Item } from '../lib/mockData';
import { motion } from "framer-motion"; 
import { databases, DATABASE_ID, COLLECTION_BOOKINGS_ID, COLLECTION_ITEMS_ID, storage, BUCKET_IMAGES_ID } from '../lib/appwrite';
import { toast } from 'sonner';
import { Query } from 'appwrite';

export function Dashboard() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'bookings';
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [ownerRequests, setOwnerRequests] = useState<Booking[]>([]);
  const [listedItems, setListedItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchUserBookings = async () => {
      if (!user) return;

      try {
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_BOOKINGS_ID, [Query.equal('userId', user.id)]);
        const fetchedBookings: Booking[] = (res.documents || []).map((doc: any) => ({
          id: doc.$id,
          itemId: doc.itemid || doc.itemId || '',
          itemTitle: doc.itemtTitle || doc.itemTitle || 'Unknown Item',
          itemImage: doc.itemImage || '',
          startDate: doc.startDate || new Date().toISOString(),
          endDate: doc.endDate || new Date().toISOString(),
          totalPrice: doc.totalPrice || 0,
          status: doc.status || 'pending',
          ownerId: doc.ownerId || '',
          renterId: doc.userId || '',
        }));

        // Exclude bookings where the current user is both owner and renter
        const onlyUserBookings = fetchedBookings.filter((b) => b.ownerId !== user.id);
        setBookings(onlyUserBookings);
      } catch (error) {
        // If Firebase fails, try to get bookings from localStorage
        const localBookings = JSON.parse(localStorage.getItem('rentme_bookings') || '[]');
        const userLocalBookings = localBookings
          .filter((booking: any) => booking.userId === user.id && booking.ownerId !== user.id)
          .map((booking: any) => ({
            id: booking.id,
            itemId: booking.itemId,
            itemTitle: booking.itemTitle,
            itemImage: booking.itemImage,
            startDate: new Date(booking.startDate),
            endDate: new Date(booking.endDate),
            totalPrice: booking.totalPrice,
            status: booking.status,
          }));
        setBookings(userLocalBookings);
      }
    };

    const fetchOwnerRequests = async () => {
      if (!user) return;

      try {
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_BOOKINGS_ID, [Query.equal('ownerId', user.id)]);
        const fetched: Booking[] = (res.documents || []).map((doc: any) => ({
          id: doc.$id,
          itemId: doc.itemid || doc.itemId || '',
          itemTitle: doc.itemtTitle || doc.itemTitle || 'Unknown Item',
          itemImage: doc.itemImage || '',
          startDate: doc.startDate || new Date().toISOString(),
          endDate: doc.endDate || new Date().toISOString(),
          totalPrice: doc.totalPrice || 0,
          status: doc.status || 'pending',
          ownerId: doc.ownerId || user.id,
          renterId: doc.userId || '',
        }));

        // Exclude requests that the owner themselves created
        const onlyIncoming = fetched.filter((b) => b.renterId !== user.id);
        setOwnerRequests(onlyIncoming);
      } catch (error) {
        // No server-side owner requests; fallback to localStorage (best-effort)
        const localBookings = JSON.parse(localStorage.getItem('rentme_bookings') || '[]');
        const incoming = localBookings
          .filter((b: any) => b.ownerId === user.id && b.userId !== user.id)
          .map((b: any) => ({
            id: b.id,
            itemId: b.itemId,
            itemTitle: b.itemTitle,
            itemImage: b.itemImage,
            startDate: b.startDate,
            endDate: b.endDate,
            totalPrice: b.totalPrice,
            status: b.status || 'pending',
            ownerId: b.ownerId,
            renterId: b.userId,
          }));
        setOwnerRequests(incoming);
      }
    };

    const fetchUserListings = async () => {
      if (!user) return;

      try {
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ITEMS_ID, [Query.equal('ownerId', user.id)]);
        const fetchedListings: Item[] = (res.documents || []).map((doc: any) => ({
          id: doc.$id,
          title: doc.title,
          description: doc.desc || '',
          category: doc.category,
          price: doc.price,
          images: (() => {
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
          features: doc.features || [],
        }));

        setListedItems(fetchedListings);
      } catch (error) {
        // Silently use empty array if Firebase is not configured
        setListedItems([]);
      }
    };

    fetchUserBookings();
    fetchUserListings();
    fetchOwnerRequests();
  }, [user]);

  const handleApprove = async (bookingId: string) => {
    try {
      // Update server
      try {
        await databases.updateDocument(DATABASE_ID, COLLECTION_BOOKINGS_ID, bookingId, { status: 'confirmed' });
      } catch (e) {
        // ignore server errors
      }

      setOwnerRequests((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: 'confirmed' } : b)));
      setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: 'confirmed' } : b)));

      // Notify owner
      try {
        toast.success('Booking approved');
      } catch {}

      // Update localStorage fallback
      try {
        const local = JSON.parse(localStorage.getItem('rentme_bookings') || '[]');
        const updated = local.map((lb: any) => (lb.id === bookingId ? { ...lb, status: 'confirmed' } : lb));
        localStorage.setItem('rentme_bookings', JSON.stringify(updated));
      } catch {}
    } catch (error) {
      // noop
    }
  };

  const handleReject = async (bookingId: string) => {
    try {
      try {
        await databases.updateDocument(DATABASE_ID, COLLECTION_BOOKINGS_ID, bookingId, { status: 'cancelled' });
      } catch (e) {
        // ignore
      }

      setOwnerRequests((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b)));
      setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b)));

      // Notify owner
      try {
        toast.error('Booking rejected');
      } catch {}

      try {
        const local = JSON.parse(localStorage.getItem('rentme_bookings') || '[]');
        const updated = local.map((lb: any) => (lb.id === bookingId ? { ...lb, status: 'cancelled' } : lb));
        localStorage.setItem('rentme_bookings', JSON.stringify(updated));
      } catch {}
    } catch (error) {
      // noop
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const deleteItem = async (itemId: string) => {
    if (!confirm('Delete this listing? This will also remove related bookings and images.')) return;

    // Optimistically update UI and localStorage
    try {
      setListedItems((prev) => prev.filter((item) => item.id !== itemId));
      setBookings((prev) => prev.filter((b) => b.itemId !== itemId));

      const allItems = JSON.parse(localStorage.getItem('rentme_items') || '[]');
      const updatedItems = allItems.filter((item: any) => item.id !== itemId);
      localStorage.setItem('rentme_items', JSON.stringify(updatedItems));

      const allBookings = JSON.parse(localStorage.getItem('rentme_bookings') || '[]');
      const updatedBookings = allBookings.filter((b: any) => b.itemId !== itemId);
      localStorage.setItem('rentme_bookings', JSON.stringify(updatedBookings));
    } catch (e) {
      // ignore local update errors
    }

    // Server-side cleanup: delete files, bookings and item document from Appwrite
    try {
      // Try to fetch the item to get file ids (if it exists)
      let fileIds: string[] = [];
      try {
        const itemDoc: any = await databases.getDocument(DATABASE_ID, COLLECTION_ITEMS_ID, itemId);
        if (itemDoc) {
          if (itemDoc.fileIds) {
            fileIds = Array.isArray(itemDoc.fileIds)
              ? itemDoc.fileIds
              : String(itemDoc.fileIds).split(',').map((s: string) => s.trim()).filter(Boolean);
          } else if (itemDoc.images) {
            fileIds = Array.isArray(itemDoc.images) ? itemDoc.images : [String(itemDoc.images)];
          }
        }
      } catch (e) {
        // item might not exist or already deleted
      }

      // Delete files from storage
      for (const fid of fileIds) {
        try {
          await storage.deleteFile(BUCKET_IMAGES_ID, fid);
        } catch (e) {
          // ignore individual file deletion errors
        }
      }

      // Delete any bookings referencing this item
      try {
        const bookingsRes: any = await databases.listDocuments(DATABASE_ID, COLLECTION_BOOKINGS_ID, [Query.equal('itemId', itemId)]);
        const bookingDocs = bookingsRes.documents || [];
        for (const b of bookingDocs) {
          try {
            await databases.deleteDocument(DATABASE_ID, COLLECTION_BOOKINGS_ID, b.$id);
          } catch (e) {
            // ignore
          }
        }
      } catch (e) {
        // ignore
      }

      // Finally delete the item document itself
      try {
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ITEMS_ID, itemId);
      } catch (e) {
        // ignore
      }
    } catch (error) {
      // If something goes wrong server-side, log for debugging
      // Consider showing a toast to user
      // console.error('Error deleting item and related resources', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Please login to view dashboard</h2>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </motion.div>

        <Tabs defaultValue={defaultTab} className="space-y-6">
          <TabsList className="w-full max-w-md">
            <TabsTrigger value="bookings">
              My Bookings
              {ownerRequests.length > 0 && (
                <Badge className="ml-2">{ownerRequests.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4">
            {/* Incoming requests for item owners (always show section) */}
            <div className="flex flex-col gap-3 items-start w-full">
              <h3 className="text-xl">Incoming Booking Requests</h3>
              {ownerRequests.length > 0 ? (
                ownerRequests.map((req, idx) => (
                  <motion.div key={req.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <img src={req.itemImage} alt={req.itemTitle} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-lg">{req.itemTitle}</h4>
                                <div className="text-sm text-gray-600">From: {(req as any).renterName || req.renterId || 'Unknown'}</div>
                                <Badge className={`mt-2 ${getStatusColor(req.status)}`}>{req.status}</Badge>
                              </div>
                              <div className="flex flex-col gap-2">
                                <div className="text-right text-sm text-gray-600">Nu. {req.totalPrice}</div>
                                <div className="flex gap-2 mt-2">
                                  <Button size="sm" onClick={() => handleApprove(req.id)}>Approve</Button>
                                  <Button size="sm" variant="outline" onClick={() => handleReject(req.id)}>Reject</Button>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 text-sm text-gray-600">
                              <div>Start: {new Date(req.startDate).toLocaleDateString()}</div>
                              <div>End: {new Date(req.endDate).toLocaleDateString()}</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <Card className="w-full">
                  <CardContent className="p-6 text-center w-full">
                    <div className="text-gray-600 mb-2">No incoming booking requests</div>
                    <div className="text-sm text-gray-500">You'll see booking requests here when renters request your listings.</div>
                  </CardContent>
                </Card>
              )}
            </div>

            {bookings.length > 0 ? (
              <div className="grid gap-4">
                {bookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <img
                              src={booking.itemImage}
                              alt={booking.itemTitle}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-xl mb-1">{booking.itemTitle}</h3>
                                <Badge className={getStatusColor(booking.status)}>
                                  {booking.status}
                                </Badge>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl text-blue-600">Nu. {booking.totalPrice}</div>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mt-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Start: {new Date(booking.startDate).toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                End: {new Date(booking.endDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl mb-2">No bookings yet</h3>
                  <p className="text-gray-600 mb-6">Start browsing items to make your first booking</p>
                  <Link to="/browse">
                    <Button>Browse Items</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Listings Tab */}
          <TabsContent value="listings" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl">Your Listed Items</h2>
              <Link to="/list-item">
                <Button>Add New Item</Button>
              </Link>
            </div>

            {listedItems.length > 0 ? (
              <div className="grid gap-4">
                {listedItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <img
                              src={item.images[0]}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-xl mb-1">{item.title}</h3>
                                <Badge>{item.category}</Badge>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl text-blue-600">Nu. {item.price}</div>
                                <div className="text-sm text-gray-600">/day</div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                            <div className="flex gap-2">
                              <Link to={`/item/${item.id}`}>
                                <Button variant="outline" size="sm" className="gap-2">
                                  <Eye className="w-4 h-4" />
                                  View
                                </Button>
                              </Link>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-2 text-red-600 hover:text-red-700"
                                onClick={() => deleteItem(item.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl mb-2">No items listed yet</h3>
                  <p className="text-gray-600 mb-6">Start earning by listing your items for rent</p>
                  <Link to="/list-item">
                    <Button>List an Item</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="text-2xl">{user?.name ? user.name.charAt(0) : 'U'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl">{user.name}</h3>
                    <p className="text-gray-600">Member since {new Date().getFullYear()}</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <p className="text-lg">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Phone</label>
                    <p className="text-lg">{(user as any)?.phone || ''}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Location</label>
                    <p className="text-lg flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {(user as any)?.location || ''}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg mb-4">Account Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl text-blue-600">{bookings.length}</div>
                      <div className="text-sm text-gray-600">Bookings</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl text-blue-600">{listedItems.length}</div>
                      <div className="text-sm text-gray-600">Listings</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}