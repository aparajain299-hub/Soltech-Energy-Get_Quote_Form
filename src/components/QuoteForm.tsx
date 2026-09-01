import { useMemo, useState } from "react";

import { BillSelect, type BillOption } from "@/components/BillSelect";
import { QuoteHeader } from "@/components/SoltechHeader";
import { SuccessScreen } from "@/components/SuccessScreen";
import { supabase } from "@/integrations/supabase/client";
import { INDIAN_CITIES } from "@/lib/indian-cities";

type Errors = {
  fullName?: string;
  whatsapp?: string;
  city?: string;
  bill?: string;
  pinCode?: string;
  form?: string;
};

const fieldClass =
  "mt-2 h-12 w-full rounded-xl border border-input bg-card px-4 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40";

export function QuoteForm() {
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [cityOpen, setCityOpen] = useState(false);
  const [bill, setBill] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const filteredCities = useMemo(() => {
    const search = citySearch.trim().toLowerCase();

    if (!search) {
      return INDIAN_CITIES.slice(0, 50);
    }

    return INDIAN_CITIES.filter((cityName) =>
      cityName.toLowerCase().includes(search)
    ).slice(0, 50);
  }, [citySearch]);

  if (submittedName) {
    return (
      <SuccessScreen
        name={submittedName}
        onSubmitAgain={() => {
          setSubmittedName(null);
          setFullName("");
          setWhatsapp("");
          setCity("");
          setCitySearch("");
          setCityOpen(false);
          setBill("");
          setPinCode("");
          setErrors({});
        }}
      />
    );
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

    if (!city) {
      next.city = "Please select your city.";
    } else if (
      !INDIAN_CITIES.includes(city as (typeof INDIAN_CITIES)[number])
    ) {
      next.city = "Please select a valid city from the list.";
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
      <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
        <QuoteHeader />

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-7 space-y-5"
        >
          {/* Full Name */}
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

          {/* WhatsApp */}
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

          {/* City */}
          <div className="relative">
            <label
              htmlFor="city"
              className="text-sm font-semibold text-foreground"
            >
              City
            </label>

            <input
              id="city"
              name="city"
              type="text"
              autoComplete="off"
              placeholder="Search your city"
              value={cityOpen ? citySearch : city}
              onFocus={() => {
                setCityOpen(true);
                setCitySearch(city);
              }}
              onChange={(e) => {
                setCitySearch(e.target.value);
                setCity("");
                setCityOpen(true);

                if (errors.city) {
                  setErrors(({ city: _city, ...rest }) => rest);
                }
              }}
              onBlur={() => {
                setTimeout(() => {
                  setCityOpen(false);
                  setCitySearch("");
                }, 150);
              }}
              aria-invalid={!!errors.city}
              aria-describedby={
                errors.city
                  ? "city-error"
                  : undefined
              }
              className={fieldClass}
            />

            {cityOpen && (
              <div className="absolute left-0 right-0 z-50 mt-1 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                <div className="max-h-64 overflow-y-auto p-1">
                  {filteredCities.length > 0 ? (
                    filteredCities.map((cityName) => (
                      <button
                        key={cityName}
                        type="button"
                        className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-muted"
                        onMouseDown={(event) => {
                          event.preventDefault();
                        }}
                        onClick={() => {
                          setCity(cityName);
                          setCitySearch("");
                          setCityOpen(false);

                          setErrors(
                            ({ city: _city, ...rest }) => rest
                          );
                        }}
                      >
                        {cityName}
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-3 text-sm text-muted-foreground">
                      No city found.
                    </div>
                  )}
                </div>
              </div>
            )}

            {errors.city && (
              <p
                id="city-error"
                className="mt-1.5 text-sm text-destructive"
              >
                {errors.city}
              </p>
            )}
          </div>

          {/* Electricity Bill */}
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

          {/* PIN Code */}
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

          {/* Form Error */}
          {errors.form && (
            <p
              role="alert"
              className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              {errors.form}
            </p>
          )}

          {/* Submit */}
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
