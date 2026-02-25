import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingView() {
  const skeletonCards = Array.from({ length: 6 });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skeletonCards.map((_, i) => (
        <Card key={i} className="overflow-hidden border-none shadow-sm bg-white rounded-3xl">
          <Skeleton className="aspect-4/5 w-full rounded-none" />
          
          <CardContent className="p-5 space-y-4">
            <div className="flex justify-between items-start">
              <Skeleton className="h-6 w-1/2 rounded-lg" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="h-4 w-1/3 rounded-lg" />
          </CardContent>

          <CardFooter className="px-5 pb-5 pt-0">
            <div className="space-y-2 w-full">
              <Skeleton className="h-3 w-full rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}