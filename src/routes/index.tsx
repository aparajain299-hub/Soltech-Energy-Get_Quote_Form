import { createFileRoute } from "@tanstack/react-router";

import { QuoteForm } from "@/components/QuoteForm";

const title = "Get Free Quote | Soltech Energy Solar Enquiry";
const description =
  "Share your details and monthly electricity bill to get personalised solar guidance from Soltech Energy — 8+ years of experience, 1,800+ solar sites.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen justify-center bg-background px-4 py-8 sm:items-center sm:py-14">
      <QuoteForm />
    </main>
  );
}
