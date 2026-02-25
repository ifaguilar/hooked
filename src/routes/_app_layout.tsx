import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app_layout")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="flex flex-col min-h-svh">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
