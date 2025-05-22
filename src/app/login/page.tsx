import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { LogIn, UserPlus, Mail, KeyRound } from "lucide-react";

// Placeholder para iconos de inicio de sesión social si es necesario
// import { FaGoogle, FaFacebook } from 'react-icons/fa'; // Podríamos usar Lucide icons o SVGs si preferimos no añadir más dependencias

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md shadow-xl rounded-lg">
        <CardHeader className="text-center">
          <LogIn className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold">¡Bienvenido de Nuevo!</CardTitle>
          <CardDescription>Inicia sesión para acceder a tus reservas y recomendaciones personalizadas.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Dirección de Correo Electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="email" type="email" placeholder="tu@ejemplo.com" required className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Button variant="link" size="sm" asChild className="p-0 h-auto text-primary hover:text-primary/80">
                  <Link href="/forgot-password">¿Olvidaste tu contraseña?</Link>
                </Button>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" required className="pl-10" />
              </div>
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6">
              Iniciar Sesión
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                O continuar con
              </span>
            </div>
          </div>

          {/* Placeholder para Inicios de Sesión Sociales */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full hover:border-primary hover:text-primary">
              {/* <FaGoogle className="mr-2 h-5 w-5" /> */}
              <span className="mr-2 text-lg font-semibold">G</span> Google
            </Button>
            <Button variant="outline" className="w-full hover:border-primary hover:text-primary">
              {/* <FaFacebook className="mr-2 h-5 w-5" /> */}
              <span className="mr-2 text-lg font-semibold">F</span> Facebook
            </Button>
          </div>

        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2 pt-6">
            <p className="text-sm text-muted-foreground">
                ¿No tienes una cuenta?
            </p>
            <Button variant="link" asChild className="text-primary hover:text-primary/80">
                <Link href="/signup">
                    <UserPlus className="mr-2 h-4 w-4" /> Crear una cuenta
                </Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
