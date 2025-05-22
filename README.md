# TravelMate PWA (Travely)

Travely is a Progressive Web Application (PWA) for booking tourist activities, similar to Civitatis.com. This Next.js application provides a modern, responsive, and installable experience for users looking to discover and book travel experiences.

## Color Palette

-   **Primary Color (Travel Blue):** `#0A74DA` (HSL: `208 90% 45%`) - Used for main interactive elements, branding, and to reflect trust and reliability.
-   **Accent Color (Adventure Turquoise):** `#17A2B8` (HSL: `188 78% 40%`) - Used for highlighting important calls to action and secondary interactive elements.
-   **Background Color (Light Gray):** `#F8F9FA` (HSL: `210 40% 98%`) - Provides a neutral backdrop for readability and visual comfort.
-   **Foreground Color (Dark Gray):** `#212529` (HSL: `240 10% 3.9%` or similar dark gray) - Used for text and general UI elements on light backgrounds.

## File Structure (Key Components)

```
.
├── public/
│   ├── manifest.json           # PWA Manifest
│   ├── service-worker.js       # PWA Service Worker
│   └── icons/                  # Placeholder for PWA icons (e.g., icon-192x192.png, icon-512x512.png)
├── src/
│   ├── app/
│   │   ├── (pages)/            # Route groups for pages
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── destinations/
│   │   │   │   └── page.tsx    # Destinations listing
│   │   │   ├── activities/
│   │   │   │   ├── page.tsx    # Activities list
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx # Activity detail
│   │   │   ├── bookings/
│   │   │   │   └── page.tsx    # User's bookings
│   │   │   ├── help/
│   │   │   │   └── page.tsx    # Help/FAQ page
│   │   │   └── login/
│   │   │       └── page.tsx    # Login page
│   │   ├── globals.css         # Global styles and Tailwind directives
│   │   └── layout.tsx          # Root layout
│   ├── components/
│   │   ├── layout/             # Layout components (Header, Footer, AppLayout)
│   │   │   ├── app-header.tsx
│   │   │   ├── app-footer.tsx
│   │   │   └── app-layout.tsx
│   │   ├── home/               # Homepage specific sections (Hero, PopularDestinations, etc.)
│   │   ├── activities/         # Activities list specific components (ActivityCard, Filters)
│   │   ├── activity-detail/    # Activity detail specific components (ImageGallery, BookingSection, DetailTabs)
│   │   ├── ui/                 # ShadCN UI components (Button, Card, etc.)
│   │   └── pwa/                # PWA related components (ServiceWorkerRegistration)
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   ├── hooks/                  # Custom React hooks
│   └── ...                     # Other directories (e.g. data, types)
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## PWA Features Summary

-   **Manifest (`public/manifest.json`):**
    -   Defines app characteristics: `name`, `short_name` (Travely), `description`, `start_url`, `display` (standalone), `background_color`, `theme_color`.
    -   Includes references to placeholder icons for different sizes.
-   **Service Worker (`public/service-worker.js`):**
    -   Implements basic caching for static assets (app shell: `/`, `/manifest.json`, icons) using a 'Cache First' strategy for these assets.
    -   Uses a 'Network Falling Back to Cache' strategy for navigation requests to ensure users get fresh content when online but can access cached versions offline.
    -   Includes `install`, `activate`, and `fetch` event listeners.
    -   The service worker is registered client-side via `src/components/pwa/service-worker-registration.tsx`.
-   **Installability:** The app can be installed on supported devices, providing an app-like experience.
-   **Offline Capabilities:** Basic offline access to cached shell and assets. More robust offline data handling would require advanced service worker strategies or libraries like `next-pwa`.

## Getting Started

This is a Next.js project bootstrapped with Firebase Studio.

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) (or your configured port) with your browser to see the result.

3.  **Build for production:**
    ```bash
    npm run build
    ```

4.  **Start the production server:**
    ```bash
    npm start
    ```

## Technologies Used

-   Next.js (App Router)
-   React
-   TypeScript
-   Tailwind CSS
-   ShadCN UI Components
-   Lucide React Icons
-   Progressive Web App (PWA) features (Manifest, Service Worker)
```