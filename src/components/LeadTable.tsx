import type { Lead } from "@/lib/leads.functions";

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function LeadTable({ leads }: { leads: Lead[] }) {
  if (leads.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground shadow-soft">
        No enquiries yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[42rem] text-left text-sm">
          <caption className="sr-only">Submitted quote enquiries</caption>
          <thead className="bg-secondary text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">Full Name</th>
              <th scope="col" className="px-4 py-3 font-semibold">WhatsApp Number</th>
              <th scope="col" className="px-4 py-3 font-semibold">Monthly Bill</th>
              <th scope="col" className="px-4 py-3 font-semibold">PIN Code</th>
              <th scope="col" className="px-4 py-3 font-semibold">Date &amp; Time</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-t border-border">
                <td className="px-4 py-3 font-medium text-foreground">{lead.full_name}</td>
                <td className="px-4 py-3 text-foreground">
                  <a href={`tel:+91${lead.whatsapp_number}`} className="hover:text-primary">
                    +91 {lead.whatsapp_number}
                  </a>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{lead.monthly_electricity_bill}</td>
                <td className="px-4 py-3 text-muted-foreground">{lead.pin_code}</td>
                <td className="px-4 py-3 text-muted-foreground">{formatDate(lead.submitted_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
