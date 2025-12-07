// TypeScript interfaces and field-name constants for Appwrite collections
// Generated to match your provided Items and Bookings collection schemas.

// Items collection field-name constants
export const ITEM_FIELDS = {
  $id: '$id',
  title: 'title',
  category: 'category',
  location: 'location',
  ownerId: 'ownerId',
  ownerName: 'ownerName',
  images: 'images',
  features: 'features',
  desc: 'desc',
  price: 'price',
  fileIds: 'fileIds',
  $createdAt: '$createdAt',
  $updatedAt: '$updatedAt',
} as const;

export type ItemField = (typeof ITEM_FIELDS)[keyof typeof ITEM_FIELDS];

// Item interface matching your schema
export interface Item {
  $id?: string;
  title: string; // required, string, max size 255
  category: string; // required, string, max size 100
  location: string; // required, string, max size 100
  ownerId: string; // required, string, max size 255
  ownerName?: string | null; // optional, string, nullable
  images: string; // required, string, size 500 (could be comma-separated ids)
  features: string; // required, string, size 500
  desc?: string | null; // optional
  price?: number | null; // integer, Min:1 Max:4000
  fileIds?: string | null; // optional string (csv of file ids)
  $createdAt?: string;
  $updatedAt?: string;
}

// Bookings collection field-name constants
export const BOOKING_FIELDS = {
  $id: '$id',
  itemid: 'itemid',
  itemtTitle: 'itemtTitle',
  itemImage: 'itemImage',
  totalPrice: 'totalPrice',
  userId: 'userId',
  startDate: 'startDate',
  endDate: 'endDate',
  status: 'status',
  ownerId: 'ownerId',
  $createdAt: '$createdAt',
  $updatedAt: '$updatedAt',
} as const;

export type BookingField = (typeof BOOKING_FIELDS)[keyof typeof BOOKING_FIELDS];

// Booking interface matching your schema (keeps original field names exactly)
export interface Booking {
  $id?: string;
  itemid: string; // required, string, size 250
  itemtTitle?: string | null; // note: original schema lists "itemtTitle"
  itemImage?: string | null;
  totalPrice?: number | null; // double
  userId: string; // required
  startDate?: string | null;
  endDate?: string | null;
  status?: string | null;
  ownerId?: string | null;
  $createdAt?: string;
  $updatedAt?: string;
}

// Convenience types for create/update payloads (omit metadata)
export type NewItem = Omit<Item, '$id' | '$createdAt' | '$updatedAt'>;
export type NewBooking = Omit<Booking, '$id' | '$createdAt' | '$updatedAt'>;
