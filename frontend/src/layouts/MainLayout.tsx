
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Database,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    {
      label: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      label: "Registros",
      path: "/registros",
      icon: Database,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-16 items-center justify-between border-b border-border bg-card px-5 md:px-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-label="Alternar menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>

          <div>
            <h1 className="font-display text-2xl font-bold tracking-wider text-primary">
              PARADOXON
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Systems / AT2 LDW
            </p>
          </div>
        </div>

        <span className="hidden text-xs uppercase tracking-widest text-muted-foreground sm:block">
          Management System
        </span>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">
        {menuOpen && (
          <button
            type="button"
            aria-label="Fechar menu"
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-sidebar text-sidebar-foreground transition-transform md:static md:translate-x-0 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="border-b border-sidebar-border p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-sidebar-foreground/60">
              PXN / SYS
            </p>
            <h2 className="mt-2 font-display text-3xl">
              Workspace
            </h2>
          </div>

          <nav className="flex flex-col gap-2 p-4">
            {links.map(({ label, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 border-t border-sidebar-border p-6">
            <p className="font-display text-xl italic text-sidebar-foreground">
              A perfeição encerra.
              <br />
              A criação continua.
            </p>

            <a
              href="https://lucaslisan.github.io/paradoxon/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-xs text-sidebar-foreground/70 hover:text-sidebar-foreground"
            >
              Conhecer Paradoxon
              <ArrowUpRight size={14} />
            </a>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <main className="flex-1 p-5 md:p-8">
            <Outlet />
          </main>

          <footer className="border-t border-border px-6 py-4">
            <p className="text-center text-xs text-muted-foreground">
              PARADOXON Systems · A complexidade por trás.
              A simplicidade à frente.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
