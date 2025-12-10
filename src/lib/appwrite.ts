
import { Client, Account, Databases, Storage } from 'appwrite';
import {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT,
  DATABASE_ID,
  COLLECTION_ITEMS_ID,
  COLLECTION_BOOKINGS_ID,
  BUCKET_IMAGES_ID,
} from './appwriteIds';

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT || '6933d803000db497f286');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Re-export commonly used IDs for convenience
export { DATABASE_ID, COLLECTION_ITEMS_ID, COLLECTION_BOOKINGS_ID, BUCKET_IMAGES_ID };

