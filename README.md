
  # Rental Website Design

  This is a code bundle for Rental Website Design. The original project is available at https://www.figma.com/design/VmSuAMiZcwTqltAu5Ps5Gx/Rental-Website-Design.

  ## Running the code

  ## Running the code

  1. Install dependencies:

  ```bash
  npm i
  ```

  2. Start the development server:

  ```bash
  npm run dev
  ```

  ## Deploying to Netlify (recommended)

  Quick summary: Netlify builds your site from your GitHub repository and serves the static `dist/` output. You must provide Appwrite configuration as environment variables in the Netlify site settings so the built frontend can connect to your Appwrite backend.

  Steps:

  1. Push your repo to GitHub (if you haven't already).
  2. Go to https://app.netlify.com and sign in. Click "New site from Git" and choose your GitHub repo.
  3. In the "Build settings" set:
    - **Build command**: `npm run build`
    - **Publish directory**: `dist`
  4. Before deploying, add the required environment variables to Netlify: Site settings → Build & deploy → Environment → Environment variables. Add the following keys (values come from your Appwrite project / console):
    - `VITE_APPWRITE_ENDPOINT`
    - `VITE_APPWRITE_PROJECT`
    - `VITE_DATABASE_ID`
    - `VITE_COLLECTION_ITEMS_ID`
    - `VITE_COLLECTION_BOOKINGS_ID`
    - `VITE_BUCKET_IMAGES_ID`
  5. Deploy the site. Netlify will build and publish; the site URL will be shown in the Netlify dashboard.

  Notes and tips:
  - Make sure the deployed domain is allowed in your Appwrite project's CORS / allowed origins settings.
  - Bucket read permissions must allow the public (or the site users must be authenticated) to view images.
  - Do not commit real `.env` files. Store sensitive values in Netlify environment settings or GitHub Secrets.

  Optional: Add a `netlify.toml` to customize headers, redirects or caching. Example minimal `netlify.toml` is not required but can be added later.

  If you'd like, I can create a `.env.example` in the repo and a short `netlify.toml` template — tell me if you'd like those and whether to include any custom headers or redirects.
  