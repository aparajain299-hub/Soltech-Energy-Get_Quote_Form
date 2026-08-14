import { useState } from "react";

import { BillSelect, type BillOption } from "@/components/BillSelect";
import { QuoteHeader } from "@/components/SoltechHeader";
import { SuccessScreen } from "@/components/SuccessScreen";
import { supabase } from "@/integrations/supabase/client";

type Errors = {
  fullName?: string;
  whatsapp?: string;
  bill?: string;
  pinCode?: string;
  form?: string;
};

type QuoteFormProps = {
  onBack?: () => void;
  onClose?: () => void;
};

const fieldClass =
  "mt-2 h-12 w-full rounded-xl border border-input bg-card px-4 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40";

export function QuoteForm({
  onBack,
  onClose,
}: QuoteFormProps) {
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bill, setBill] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  if (submittedName) {
    return <SuccessScreen name={submittedName} />;
  }

  const validate = () => {
    const next: Errors = {};

    if (!fullName.trim()) {
      next.fullName = "Please enter your name.";
    }

    const digits = whatsapp
      .replace(/\D/g, "")
      .replace(/^(0|91)(?=\d{10}$)/, "");

    if (!whatsapp.trim()) {
      next.whatsapp = "Please enter your WhatsApp number.";
    } else if (!/^[6-9]\d{9}$/.test(digits)) {
      next.whatsapp = "Please enter a valid 10-digit mobile number.";
    }

    if (!bill) {
      next.bill = "Please select your monthly electricity bill range.";
    }

    if (!/^[1-9]\d{5}$/.test(pinCode.trim())) {
      next.pinCode = "Please enter a valid 6-digit PIN code.";
    }

    setErrors(next);

    return {
      ok: Object.keys(next).length === 0,
      digits,
    };
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (submitting) return;

    const { ok, digits } = validate();

    if (!ok) return;

    setSubmitting(true);
    setErrors({});

    try {
      const { data, error } = await supabase.rpc(
        "submit_quote_enquiry",
        {
          p_full_name: fullName.trim(),
          p_whatsapp_number: digits,
          p_monthly_electricity_bill: bill,
          p_pin_code: pinCode.trim(),
        }
      );

      if (error) {
        console.error("SOLTECH SUPABASE RPC ERROR:", {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        });

        setErrors({
          form: "We couldn't submit your enquiry. Please try again.",
        });

        return;
      }

      console.log(
        "SOLTECH: enquiry successfully saved:",
        data
      );

      const firstName =
        fullName.trim().split(/\s+/)[0] ||
        fullName.trim();

      setSubmittedName(firstName);
    } catch (error) {
      console.error(
        "SOLTECH UNEXPECTED SUBMISSION ERROR:",
        error
      );

      setErrors({
        form: "We couldn't submit your enquiry. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">

      {/* Back and Close buttons */}
      <div className="mb-4 flex items-center justify-between">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            ← Back
          </button>
        ) : (
          <div />
        )}

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            ×
          </button>
        )}
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
        <QuoteHeader />

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-7 space-y-5"
        >
          <div>
            <label
              htmlFor="fullName"
              className="text-sm font-semibold text-foreground"
            >
              Full Name
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              aria-invalid={!!errors.fullName}
              aria-describedby={
                errors.fullName
                  ? "fullName-error"
                  : undefined
              }
              className={fieldClass}
            />

            {errors.fullName && (
              <p
                id="fullName-error"
                className="mt-1.5 text-sm text-destructive"
              >
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="whatsapp"
              className="text-sm font-semibold text-foreground"
            >
              WhatsApp Number
            </label>

            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              maxLength={15}
              placeholder="Enter your WhatsApp number"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              aria-invalid={!!errors.whatsapp}
              aria-describedby={
                errors.whatsapp
                  ? "whatsapp-error"
                  : undefined
              }
              className={fieldClass}
            />

            {errors.whatsapp && (
              <p
                id="whatsapp-error"
                className="mt-1.5 text-sm text-destructive"
              >
                {errors.whatsapp}
              </p>
            )}
          </div>

          <div>
            <BillSelect
              value={bill}
              onChange={(value: BillOption) => {
                setBill(value);

                setErrors(
                  ({ bill: _bill, ...rest }) => rest
                );
              }}
              invalid={!!errors.bill}
            />

            {errors.bill && (
              <p className="mt-1.5 text-sm text-destructive">
                {errors.bill}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="pinCode"
              className="text-sm font-semibold text-foreground"
            >
              PIN Code
            </label>

            <input
              id="pinCode"
              name="pinCode"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={6}
              placeholder="Enter your PIN code"
              value={pinCode}
              onChange={(e) =>
                setPinCode(
                  e.target.value.replace(/\D/g, "")
                )
              }
              aria-invalid={!!errors.pinCode}
              aria-describedby={
                errors.pinCode
                  ? "pinCode-error"
                  : undefined
              }
              className={fieldClass}
            />

            {errors.pinCode && (
              <p
                id="pinCode-error"
                className="mt-1.5 text-sm text-destructive"
              >
                {errors.pinCode}
              </p>
            )}
          </div>

          {errors.form && (
            <p
              role="alert"
              className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              {errors.form}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="flex min-h-14 w-full items-center justify-center rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-soft transition-all hover:bg-primary-dark active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-70"
          >
            {submitting
              ? "Submitting..."
              : "Get My Free Quote"}
          </button>
        </form>
      </div>
    </div>
  );
}
