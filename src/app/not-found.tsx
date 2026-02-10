import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="max-w-md text-center shadow-lg">
        <CardContent className="p-8">
          <h1 className="text-7xl font-extrabold tracking-tight text-primary">
            404
          </h1>

          <h2 className="mt-4 text-2xl font-semibold">Page not found</h2>

          <p className="mt-2 text-muted-foreground">
            Sorry, the page you’re looking for doesn’t exist or has been moved.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link href="/">Go back home</Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="/contact">Contact support</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
