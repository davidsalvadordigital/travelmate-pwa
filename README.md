
# TravelMate PWA (Travely)

Travely es una Aplicación Web Progresiva (PWA) en **español** para reservar actividades turísticas, inspirada en Civitatis.com. Esta aplicación Next.js proporciona una experiencia moderna, responsiva e instalable para usuarios que buscan descubrir y reservar experiencias de viaje.

## Paleta de Colores (Rosa Travely - Inspirada en Civitatis)

-   **Acento Principal / CTA / Header (Rosa Travely):** `#E60073` (HSL: `327 100% 45.1%`)
-   **Texto sobre Acento Principal:** `#FFFFFF` (HSL: `0 0% 100%`)
-   **Fondo Principal Cuerpo:** `#FFFFFF` (HSL: `0 0% 100%`)
-   **Fondo Secciones Claras (ej. "Principales Destinos"):** `#F8F9FA` (HSL: `210 40% 98%`)
-   **Fondo Footer:** `#333333` (HSL: `0 0% 20%`)
-   **Texto Principal (sobre fondos claros):** `#212529` (HSL: `210 10% 16.5%`)
-   **Texto Secundario/Subtítulos (sobre fondos claros):** `#6C757D` (HSL: `208 7% 46.5%`)
-   **Texto Footer (sobre fondo oscuro):** `#F1F1F1` (HSL: `0 0% 94.5%`)
-   **Éxito:** `#28A745` (HSL: `134 61% 40%`)

## File Structure (Key Components)

```
.
├── public/
│   ├── manifest.json           # PWA Manifest (Configurado para Travely en español)
│   ├── service-worker.js       # PWA Service Worker (Con comentarios en español)
│   └── icons/                  # Iconos PWA (ej. icon-192x192.png, icon-512x512.png)
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
│   │   ├── globals.css         # Global styles (Paleta Rosa Travely) y Tailwind directives
│   │   └── layout.tsx          # Root layout (Configurado en español)
│   ├── components/
│   │   ├── layout/             # Layout components (Header, Footer, AppLayout)
│   │   │   ├── app-header.tsx  # Cabecera con tema Rosa Travely
│   │   │   ├── app-footer.tsx  # Pie de página con tema oscuro y enlaces actualizados
│   │   │   └── app-layout.tsx
│   │   ├── home/               # Homepage specific sections (Hero, PopularDestinations, etc.)
│   │   ├── activities/         # Activities list specific components (ActivityCard, Filters)
│   │   ├── activity-detail/    # Activity detail specific components (ImageGallery, BookingSection, DetailTabs)
│   │   ├── ui/                 # ShadCN UI components
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
    -   Define las características de la app: `name` ("Travely - Tu Viaje Lleno de Experiencias"), `short_name` ("Travely"), `description` (en español), `start_url` ("."), `display` ("standalone"), `background_color` ("#FFFFFF"), `theme_color` ("#E60073" - Rosa Travely), `lang` ("es").
    -   Incluye referencias a iconos 192x192 y 512x512 con propósito "any maskable".
-   **Service Worker (`public/service-worker.js`):**
    -   Implementa cacheo básico para assets estáticos fundamentales (App Shell) y estrategias de red/caché para navegaciones y otros recursos.
    -   Incluye listeners para eventos `install`, `activate`, y `fetch` con comentarios detallados en español.
    -   El service worker se registra en el lado del cliente mediante `src/components/pwa/service-worker-registration.tsx`.
-   **Instalabilidad:** La app puede ser instalada en dispositivos compatibles.
-   **Capacidades Offline:** Acceso offline básico al shell y assets cacheados. Las navegaciones a páginas visitadas previamente pueden funcionar offline si la red falla.

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
-   ShadCN UI Components (Estilizados con la paleta Rosa Travely)
-   Lucide React Icons
-   Progressive Web App (PWA) features (Manifest, Service Worker)
