
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, MessageSquare, Smartphone, CreditCard } from 'lucide-react'; // Smartphone y CreditCard añadidos

// Estructura de enlaces del pie de página inspirada en Civitatis
const footerSections = [
  {
    title: 'Travely',
    links: [
      { label: 'Quiénes somos', href: '/about' },
      { label: 'Trabaja con nosotros', href: '/careers' },
      { label: 'Programa de Afiliados', href: '/affiliates' },
    ],
  },
  {
    title: 'Inspiración',
    links: [
      { label: 'Travely Blog', href: '/blog' },
      { label: 'Guías de Destinos', href: '/guias' },
    ],
  },
  {
    title: 'Soporte',
    links: [
      { label: 'Ayuda / FAQ', href: '/help' },
      { label: 'Contacto', href: '/contact' },
      { label: 'Modificar o cancelar reserva', href: '/bookings' }, 
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Condiciones generales', href: '/terms' },
      { label: 'Política de privacidad', href: '/privacy' },
      { label: 'Política de cookies', href: '/cookies' },
    ],
  },
];

const socialMedia = [
  { label: 'Facebook', icon: Facebook, href: 'https://facebook.com/travely', color: 'hover:text-[#1877F2]' },
  { label: 'Instagram', icon: Instagram, href: 'https://instagram.com/travely', color: 'hover:text-[#E4405F]' },
  { label: 'Twitter', icon: Twitter, href: 'https://twitter.com/travely', color: 'hover:text-[#1DA1F2]' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/travely', color: 'hover:text-[#0A66C2]' },
  { label: 'Youtube', icon: Youtube, href: 'https://youtube.com/travely', color: 'hover:text-[#FF0000]' },
];

export function AppFooter() {
  return (
    // Fondo gris oscuro #333333 y texto blanco/gris claro #F1F1F1
    <footer className="bg-[#333333] text-[#F1F1F1]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-primary transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Sección "Cómo nos valoran", "Descarga la App", "Medios de pago", "Síguenos" */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10 pt-8 border-t border-gray-700">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Cómo nos valoran</h3>
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8 text-green-400" /> {/* Color ajustado para mejor contraste */}
              <div>
                <p className="text-sm font-medium">¡Excelente!</p>
                <p className="text-xs">Basado en +10.000 opiniones.</p>
              </div>
            </div>
            {/* Aquí iría un widget de Trustpilot o similar, por ahora un placeholder */}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Descarga nuestra App</h3>
            <div className="flex items-center space-x-2">
              <Smartphone className="h-8 w-8 text-gray-400" />
              <div>
                <p className="text-sm">Disponible próximamente</p>
                <p className="text-xs">App Store & Google Play</p>
              </div>
            </div>
            {/* Placeholder para íconos de tiendas de apps */}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Medios de pago</h3>
            <div className="flex items-center space-x-2">
                <CreditCard className="h-8 w-8 text-gray-400" />
                <div>
                    <p className="text-sm">Pagos seguros</p>
                    <p className="text-xs">Visa, Mastercard, PayPal...</p>
                </div>
            </div>
            {/* Placeholder para íconos de medios de pago */}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Síguenos</h3>
            <div className="flex space-x-3">
              {socialMedia.map((social) => (
                <Link key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} 
                      className={`text-gray-400 ${social.color} transition-colors`}>
                  <social.icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Travely. Todos los derechos reservados.
          </p>
          <p className="text-xs mt-1 text-gray-400">Tu agencia de viajes online para actividades y tours en español.</p>
        </div>
      </div>
    </footer>
  );
}
