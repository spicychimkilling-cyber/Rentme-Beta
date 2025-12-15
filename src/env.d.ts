/// <reference types="vite/client" />

// Extend ImportMeta to include env properties used in this project
interface ImportMetaEnv {
  readonly VITE_APPWRITE_ENDPOINT?: string;
  readonly VITE_APPWRITE_PROJECT?: string;
  readonly VITE_APPWRITE_DATABASE_ID?: string;
  readonly VITE_APPWRITE_COLLECTION_ITEMS?: string;
  readonly VITE_APPWRITE_COLLECTION_BOOKINGS?: string;
  readonly VITE_APPWRITE_BUCKET_IMAGES?: string;
  // add other VITE_... vars as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
