
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Mail, KeyRound, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md shadow-xl rounded-lg">
        <CardHeader className="text-center">
          <KeyRound className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold">Recuperar Contraseña</CardTitle>
          <CardDescription>Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</CardDescription>
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
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6">
              Enviar Enlace de Recuperación
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center pt-6">
            <Button variant="link" asChild className="text-primary hover:text-primary/80">
                <Link href="/login">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Iniciar Sesión
                </Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
