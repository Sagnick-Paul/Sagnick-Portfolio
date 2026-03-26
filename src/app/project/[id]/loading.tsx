import { ArrowLeft } from "lucide-react";

export default function Loading() {
  return (
    <article className="min-h-screen bg-background pb-24 animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="relative pt-32 pb-20 border-b border-border/50 bg-black/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8 text-muted-foreground/50">
            <ArrowLeft className="w-4 h-4" />
            <div className="h-4 w-32 bg-secondary rounded" />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <div className="h-6 w-24 bg-secondary rounded-full" />
            <div className="h-6 w-20 bg-secondary rounded-full" />
            <div className="h-6 w-28 bg-secondary rounded-full" />
          </div>

          <div className="h-16 w-3/4 bg-secondary rounded-lg mb-6" />
          
          <div className="space-y-4 mb-8">
            <div className="h-4 w-full bg-secondary rounded" />
            <div className="h-4 w-5/6 bg-secondary rounded" />
            <div className="h-4 w-4/6 bg-secondary rounded" />
          </div>

          <div className="flex gap-4">
            <div className="h-12 w-40 bg-secondary rounded-full" />
            <div className="h-12 w-40 bg-secondary rounded-full" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="space-y-20">
          {[1, 2, 3].map((i) => (
            <section key={i}>
              <div className="h-8 w-48 bg-secondary rounded mb-6" />
              <div className="p-6 rounded-2xl bg-secondary/50 border border-border/50 space-y-4">
                <div className="h-4 w-full bg-secondary/80 rounded" />
                <div className="h-4 w-full bg-secondary/80 rounded" />
                <div className="h-4 w-3/4 bg-secondary/80 rounded" />
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
