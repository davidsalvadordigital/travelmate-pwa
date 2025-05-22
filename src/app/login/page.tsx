import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { LogIn, UserPlus, Mail, KeyRound } from "lucide-react";

// Placeholder for social login icons if needed
// import { FaGoogle, FaFacebook } from 'react-icons/fa';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <LogIn className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold">Welcome Back!</CardTitle>
          <CardDescription>Sign in to access your bookings and personalized recommendations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" required className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button variant="link" size="sm" asChild className="p-0 h-auto">
                  <Link href="/forgot-password">Forgot password?</Link>
                </Button>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" required className="pl-10" />
              </div>
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
              Sign In
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Placeholder for Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              {/* <FaGoogle className="mr-2 h-5 w-5" /> */}
              <span className="mr-2 text-lg">G</span> Google
            </Button>
            <Button variant="outline" className="w-full">
              {/* <FaFacebook className="mr-2 h-5 w-5" /> */}
              <span className="mr-2 text-lg">F</span> Facebook
            </Button>
          </div>

        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
            <p className="text-sm text-muted-foreground">
                Don't have an account?
            </p>
            <Button variant="link" asChild className="text-primary">
                <Link href="/signup">
                    <UserPlus className="mr-2 h-4 w-4" /> Create an account
                </Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
