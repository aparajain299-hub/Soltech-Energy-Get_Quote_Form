import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { BILL_OPTIONS } from "@/components/BillSelect";
import { LeadTable } from "@/components/LeadTable";
import { SoltechLogo } from "@/components/SoltechHeader";
import { getLeads } from "@/lib/leads.functions";

const leadsQueryOptions = queryOptions({
  queryKey: ["leads"],
  queryFn: () => getLeads(),
});

const title = "Leads Dashboard | Soltech Energy";
const description = "Internal Soltech Energy dashboard for reviewing submitted solar quote enquiries.";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminDashboard,
  errorComponent: () => (
    <main className="flex min-h-screen items-center justify-center px-4 text-center">
      <p className="text-sm text-muted-foreground">
        We couldn't load the enquiries right now. Please refresh the page.
      </p>
    </main>
  ),
});

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-bold text-primary">{value}</p>
    </div>
  );
}

function AdminDashboard() {
  const { data: leads } = useSuspenseQuery(leadsQueryOptions);
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [billFilter, setBillFilter] = useState("all");

  const stats = useMemo(() => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const weekAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;
    return {
      total: leads.length,
      today: leads.filter((l) => new Date(l.submitted_at).getTime() >= startOfToday).length,
      week: leads.filter((l) => new Date(l.submitted_at).getTime() >= weekAgo).length,
    };
  }, [leads]);

  const visible = useMemo(() => {
    const filtered =
      billFilter === "all"
        ? leads
        : leads.filter((l) => l.monthly_electricity_bill === billFilter);
    return [...filtered].sort((a, b) =>
      sort === "newest"
        ? new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime()
        : new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime(),
    );
  }, [leads, billFilter, sort]);

  const selectClass =
    "h-11 rounded-xl border border-input bg-card px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40";

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-8 sm:py-12">
      <header className="flex items-center gap-3">
        <SoltechLogo className="h-12 w-12" />
        <div>
          <h1 className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
            Enquiries Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">Soltech Energy — Get Free Quote leads</p>
        </div>
      </header>

      <section aria-label="Overview" className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard label="Total enquiries" value={stats.total} />
        <StatCard label="Today" value={stats.today} />
        <StatCard label="This week" value={stats.week} />
      </section>

      <section aria-label="Leads" className="mt-8">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col">
            <label htmlFor="sort" className="text-xs font-semibold text-muted-foreground">
              Sort by
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
              className={`mt-1 ${selectClass}`}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="bill" className="text-xs font-semibold text-muted-foreground">
              Monthly bill
            </label>
            <select
              id="bill"
              value={billFilter}
              onChange={(e) => setBillFilter(e.target.value)}
              className={`mt-1 ${selectClass}`}
            >
              <option value="all">All ranges</option>
              {BILL_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <LeadTable leads={visible} />
        </div>
      </section>
    </main>
  );
}
