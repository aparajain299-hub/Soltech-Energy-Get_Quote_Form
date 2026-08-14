import { createServerFn } from "@tanstack/react-start";

export type Lead = {
  id: string;
  full_name: string;
  whatsapp_number: string;
  monthly_electricity_bill: string;
  pin_code: string;
  submitted_at: string;
};

export const getLeads = createServerFn({ method: "GET" }).handler(async (): Promise<Lead[]> => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("quote_enquiries")
    .select("id, full_name, whatsapp_number, monthly_electricity_bill, pin_code, submitted_at")
    .order("submitted_at", { ascending: false });

  if (error) throw new Error("Unable to load enquiries");
  return (data ?? []) as Lead[];
});
