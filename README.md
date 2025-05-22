# TravelMate PWA (Travely)

Travely es una Aplicación Web Progresiva (PWA) para reservar actividades turísticas, inspirada en Civitatis.com. Esta aplicación Next.js proporciona una experiencia moderna, responsiva e instalable para usuarios que buscan descubrir y reservar experiencias de viaje.

## Paleta de Colores (Inspirada en Civitatis)

-   **Acento Principal / CTA / Header (Rosa Travely):** `#E60073` (HSL: `327 100% 45.1%`)
-   **Texto sobre Acento Principal:** `#FFFFFF` (HSL: `0 0% 100%`)
-   **Fondo Principal Cuerpo:** `#FFFFFF` (HSL: `0 0% 100%`)
-   **Fondo Secciones Claras (ej. "Principales Destinos"):** `#F8F9FA` (HSL: `210 40% 98%`)
-   **Fondo Footer:** `#333333` (HSL: `0 0% 20%`)
-   **Texto Principal (sobre fondos claros):** `#212529` (HSL: `210 10% 16.5%`)
-   **Texto Secundario/Subtítulos (sobre fondos claros):** `#6C757D` (HSL: `208 7% 46.5%`)
-   **Texto Footer (sobre fondo oscuro):** `#F1F1F1` (HSL: `0 0% 94.5%`)

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
    -   Define las características de la app: `name`, `short_name` (Travely), `description`, `start_url`, `display` (standalone), `background_color`, `theme_color`.
    -   Incluye referencias a iconos placeholder con propósito "any maskable".
-   **Service Worker (`public/service-worker.js`):**
    -   Implementa cacheo básico para assets estáticos (App Shell) usando una estrategia de "Network Falling Back to Cache" para navegaciones y "Cache First" para assets conocidos.
    -   Incluye listeners para eventos `install`, `activate`, y `fetch` con comentarios en español.
    -   El service worker se registra en el lado del cliente mediante `src/components/pwa/service-worker-registration.tsx`.
-   **Instalabilidad:** La app puede ser instalada en dispositivos compatibles.
-   **Capacidades Offline:** Acceso offline básico al shell y assets cacheados.

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