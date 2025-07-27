import { Navigation } from "@/components/Navigation";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      {children}
    </div>
  );
}
