CREATE TABLE public.quote_enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  monthly_electricity_bill TEXT NOT NULL,
  pin_code TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.quote_enquiries TO anon;
GRANT INSERT ON public.quote_enquiries TO authenticated;
GRANT ALL ON public.quote_enquiries TO service_role;

ALTER TABLE public.quote_enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a quote enquiry"
  ON public.quote_enquiries FOR INSERT TO anon, authenticated WITH CHECK (true);