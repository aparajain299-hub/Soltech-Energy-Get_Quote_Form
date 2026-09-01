import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building,
  Building2,
  CheckCircle2,
  Home,
  MapPin,
  Ruler,
  Store,
  Sun,
  X,
  Zap,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { INDIAN_CITIES } from "@/lib/indian-cities";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Get a Free Solar Quote | Soltech Energy" },
      {
        name: "description",
        content:
          "Answer a few quick questions and Soltech Energy sends you a personalised rooftop solar savings quote — free and fast.",
      },
      {
        property: "og:title",
        content: "Get a Free Solar Quote | Soltech Energy",
      },
      {
        property: "og:description",
        content:
          "Personalised rooftop solar quote in under a minute from Soltech Energy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuotePage,
});

const BILL_OPTIONS = [
  "Less than ₹1,500",
  "₹1,500 – ₹2,500",
  "₹2,500 – ₹4,000",
  "₹4,000 – ₹8,000",
  "More than ₹8,000",
];

const PROPERTY_OPTIONS = [
  { label: "Own house", icon: Home },
  { label: "Rented", icon: Building },
  { label: "Society / Apartment", icon: Building2 },
  { label: "Commercial", icon: Store },
];

const TOTAL_STEPS = 2;

type Errors = {
  name?: string | undefined;
  phone?: string | undefined;
  pin?: string | undefined;
  city?: string | undefined;
  propertyType?: string | undefined;
  bill?: string | undefined;
  rooftop?: string | undefined;
};

function QuotePage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [city, setCity] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [cityOpen, setCityOpen] = useState(false);
  const [propertyType, setPropertyType] = useState("");
  const [bill, setBill] = useState("");
  const [rooftop, setRooftop] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const filteredCities = useMemo(() => {
    const search = citySearch.trim().toLowerCase();

    if (!search) {
      return INDIAN_CITIES;
    }

    return INDIAN_CITIES.filter((cityName) =>
      cityName.toLowerCase().includes(search)
    );
  }, [citySearch]);

  function validateStep(current: number): Errors {
    const next: Errors = {};

    if (current === 1) {
      if (name.trim().length < 2) {
        next.name = "Please enter your full name";
      }

      if (phone.replace(/\D/g, "").length !== 10) {
        next.phone = "Enter a valid 10-digit number";
      }

      if (!/^\d{6}$/.test(pin)) {
        next.pin = "Enter a valid 6-digit PIN code";
      }

      if (!city) {
        next.city = "Please select your city from the list";
      } else if (
        !INDIAN_CITIES.includes(city as (typeof INDIAN_CITIES)[number])
      ) {
        next.city = "Please select a valid city from the list";
      }

      if (!propertyType) {
        next.propertyType = "Please select a property type";
      }
    }

    if (current === 2) {
      if (!bill) {
        next.bill = "Please select an option";
      }

      if (!rooftop || Number(rooftop) <= 0) {
        next.rooftop = "Enter a valid rooftop area";
      }
    }

    return next;
  }

  function goNext() {
    const next = validateStep(step);
    setErrors(next);

    if (Object.keys(next).length > 0) return;

    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (step < TOTAL_STEPS) {
      goNext();
      return;
    }

    const next = validateStep(TOTAL_STEPS);
    setErrors(next);

    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    setErrors({});

    try {
      const digits = phone.replace(/\D/g, "");

      const { data, error } = await supabase.rpc(
        "submit_quote_enquiry",
        {
          p_full_name: name.trim(),
          p_whatsapp_number: digits,
          p_city: city,
          p_monthly_electricity_bill: bill,
          p_pin_code: pin.trim(),
        }
      );

      if (error) {
        console.error("Supabase error:", error);
        setErrors({
          rooftop: "We couldn't submit your enquiry. Please try again.",
        });
        return;
      }

      console.log("Quote enquiry submitted:", data);
      setDone(true);
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({
        rooftop: "We couldn't submit your enquiry. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10"
      style={{
        background: `
        radial-gradient(circle at 0% 15%, rgba(125, 150, 215, 0.75) 0%, rgba(160, 185, 230, 0.55) 28%, transparent 55%),
        radial-gradient(circle at 100% 80%, rgba(255, 207, 80, 0.75) 0%, rgba(247, 220, 150, 0.55) 30%, transparent 58%),
        linear-gradient(135deg, #dbeafe 0%, #f0f9ff 48%, #fef3c7 100%)
        `,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-accent-soft opacity-70 blur-3xl animate-float-soft" />
        <div className="absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-secondary opacity-80 blur-3xl animate-float-soft [animation-delay:2s]" />
      </div>

      <section className="animate-rise w-full max-w-md overflow-hidden rounded-4xl border border-border/70 bg-card shadow-premium">
        {/* Header with gradient inside the card */}
        <div className="surface-hero relative px-6 pb-8 pt-8 text-center text-primary-foreground">
          <button
            type="button"
            onClick={() => window.close()}
            aria-label="Close"
            className="absolute right-4 top-4 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-muted hover:text-foreground hover:shadow-md active:translate-y-0"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            aria-hidden
            className="surface-sun absolute -right-14 -top-14 h-44 w-44 rounded-full opacity-25 blur-2xl animate-sun-spin"
          />

          <img
            src="/soltech-logo.png"
            alt="Soltech Energy logo"
            className="relative mx-auto h-24 w-24 rounded-3xl bg-card p-2 shadow-sun"
          />

          <h1 className="relative mt-5 font-display text-2xl font-semibold">
            Get your free quote
          </h1>

          <p className="relative mt-1.5 text-sm text-primary-foreground/80">
            Takes less than 60 seconds
          </p>

          {!done && (
            <div className="relative mt-6 flex items-center gap-2">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    i < step
                      ? "surface-sun"
                      : "bg-primary-foreground/25"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-7 sm:px-8">
          {done ? (
            <div className="flex flex-col items-center py-6 text-center">
              <span className="animate-pop-check surface-sun flex h-18 w-18 items-center justify-center rounded-full shadow-sun">
                <CheckCircle2
                  className="h-9 w-9 text-accent-foreground"
                  strokeWidth={2.2}
                />
              </span>

              <h2 className="mt-5 font-display text-xl font-semibold text-primary-deep">
                Quote Request Submitted!
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Thanks {name.split(" ")[0]} — our solar advisor will reach
                you on WhatsApp shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <p className="mb-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Step {step} of {TOTAL_STEPS}
              </p>

              {step === 1 && (
                <div key="s1" className="animate-rise space-y-5">
                  {/* Full name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-primary-deep"
                    >
                      Full name
                    </label>

                    <input
                      id="name"
                      autoFocus
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);

                        if (errors.name) {
                          setErrors(
                            ({ name: _error, ...rest }) => rest
                          );
                        }
                      }}
                      placeholder="Enter your full name"
                      className={`field-base ${
                        errors.name ? "field-error" : ""
                      }`}
                    />

                    {errors.name && (
                      <ErrorText>{errors.name}</ErrorText>
                    )}
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-semibold text-primary-deep"
                    >
                      WhatsApp number
                    </label>

                    <div className="relative">
                      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                        +91
                      </span>

                      <input
                        id="phone"
                        required
                        inputMode="numeric"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => {
                          setPhone(
                            e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 10)
                          );

                          if (errors.phone) {
                            setErrors(
                              ({ phone: _error, ...rest }) => rest
                            );
                          }
                        }}
                        placeholder="98765 43210"
                        className={`field-base pl-14 ${
                          errors.phone ? "field-error" : ""
                        }`}
                      />
                    </div>

                    {errors.phone && (
                      <ErrorText>{errors.phone}</ErrorText>
                    )}
                  </div>

                  {/* PIN + City */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* PIN */}
                    <div>
                      <label
                        htmlFor="pin"
                        className="mb-2 block text-sm font-semibold text-primary-deep"
                      >
                        PIN code
                      </label>

                      <div className="relative">
                        <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                        <input
                          id="pin"
                          required
                          inputMode="numeric"
                          maxLength={6}
                          value={pin}
                          onChange={(e) => {
                            setPin(
                              e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 6)
                            );

                            if (errors.pin) {
                              setErrors(
                                ({ pin: _error, ...rest }) => rest
                              );
                            }
                          }}
                          placeholder="302020"
                          className={`field-base pl-9 tracking-[0.2em] ${
                            errors.pin ? "field-error" : ""
                          }`}
                        />
                      </div>

                      {errors.pin && (
                        <ErrorText>{errors.pin}</ErrorText>
                      )}
                    </div>

                    {/* City */}
                    <div className="relative">
                      <label
                        htmlFor="city"
                        className="mb-2 block text-sm font-semibold text-primary-deep"
                      >
                        City
                      </label>

                      <input
                        id="city"
                        required
                        autoComplete="off"
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
                            setErrors(
                              ({ city: _error, ...rest }) => rest
                            );
                          }
                        }}
                        onBlur={() => {
                          setTimeout(() => {
                            setCityOpen(false);
                            setCitySearch("");
                          }, 150);
                        }}
                        placeholder="Search city"
                        className={`field-base ${
                          errors.city ? "field-error" : ""
                        }`}
                      />

                      {cityOpen && (
                        <div className="absolute left-0 right-0 top-full z-[100] mt-1 max-h-60 overflow-y-auto rounded-xl border border-border bg-card p-1 shadow-xl">
                          {filteredCities.length > 0 ? (
                            filteredCities.map((cityName) => (
                              <button
                                key={cityName}
                                type="button"
                                onMouseDown={(event) => {
                                  event.preventDefault();
                                }}
                                onClick={() => {
                                  setCity(cityName);
                                  setCitySearch("");
                                  setCityOpen(false);

                                  setErrors(
                                    ({ city: _error, ...rest }) => rest
                                  );
                                }}
                                className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-muted"
                              >
                                {cityName}
                              </button>
                            ))
                          ) : (
                            <div className="px-3 py-3 text-sm text-muted-foreground">
                              No city found
                            </div>
                          )}
                        </div>
                      )}

                      {errors.city && (
                        <ErrorText>{errors.city}</ErrorText>
                      )}
                    </div>
                  </div>

                  {/* Property type */}
                  <fieldset>
                    <legend className="mb-3 text-sm font-semibold text-primary-deep">
                      Property type
                    </legend>

                    <div className="grid grid-cols-2 gap-2.5">
                      {PROPERTY_OPTIONS.map(({ label, icon: Icon }) => {
                        const active = propertyType === label;

                        return (
                          <button
                            type="button"
                            key={label}
                            onClick={() => {
                              setPropertyType(label);
                              setErrors((prev) => ({
                                ...prev,
                                propertyType: undefined,
                              }));
                            }}
                            aria-pressed={active}
                            className={`cursor-pointer flex flex-col items-center justify-center gap-2 rounded-lg border-[1.5px] px-3 py-3.5 text-center text-xs font-semibold transition-all duration-300 ${
                              active
                                ? "-translate-y-0.5 border-primary bg-secondary text-primary-deep shadow-sun"
                                : "border-input bg-card text-foreground hover:-translate-y-0.5 hover:border-primary/40 hover:bg-muted"
                            }`}
                          >
                            <Icon
                              className={`h-5 w-5 ${
                                active
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />

                            <span>{label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {errors.propertyType && (
                      <ErrorText>{errors.propertyType}</ErrorText>
                    )}
                  </fieldset>
                </div>
              )}

              {step === 2 && (
                <div key="s2" className="animate-rise space-y-5">
                  <fieldset>
                    <legend className="mb-3 text-sm font-semibold text-primary-deep">
                      Average monthly electricity bill
                    </legend>

                    <div className="grid gap-2.5">
                      {BILL_OPTIONS.map((option) => {
                        const active = bill === option;

                        return (
                          <button
                            type="button"
                            key={option}
                            onClick={() => {
                              setBill(option);
                              setErrors((prev) => ({
                                ...prev,
                                bill: undefined,
                              }));
                            }}
                            aria-pressed={active}
                            className={`flex items-center justify-between rounded-lg border-[1.5px] px-4 py-3.5 text-left text-sm font-medium transition-all duration-300 ${
                              active
                                ? "-translate-y-0.5 border-primary bg-secondary text-primary-deep shadow-sun"
                                : "border-input bg-card text-foreground hover:-translate-y-0.5 hover:border-primary/40 hover:bg-muted"
                            }`}
                          >
                            <span>{option}</span>

                            <span
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                                active
                                  ? "surface-sun border-primary"
                                  : "border-input"
                              }`}
                            >
                              {active && (
                                <span className="animate-pop-check h-2 w-2 rounded-full bg-primary-deep" />
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {errors.bill && (
                      <ErrorText>{errors.bill}</ErrorText>
                    )}
                  </fieldset>

                  {/* Rooftop */}
                  <div>
                    <label
                      htmlFor="rooftop"
                      className="mb-2 block text-sm font-semibold text-primary-deep"
                    >
                      Approx. rooftop area
                    </label>

                    <div className="relative">
                      <Ruler className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground" />

                      <input
                        id="rooftop"
                        required
                        inputMode="numeric"
                        value={rooftop}
                        onChange={(e) =>
                          setRooftop(
                            e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 5)
                          )
                        }
                        placeholder="e.g. 800"
                        className={`field-base pl-11 ${
                          errors.rooftop ? "field-error" : ""
                        }`}
                      />

                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                        sq ft
                      </span>
                    </div>

                    {errors.rooftop && (
                      <ErrorText>{errors.rooftop}</ErrorText>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-7 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setStep((s) => Math.max(1, s - 1))
                  }
                  disabled={step === 1}
                  aria-label="Previous step"
                  className="flex h-13 w-13 items-center justify-center rounded-lg border-[1.5px] border-input bg-card text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="shine-sweep surface-hero flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-5 font-display text-base font-semibold text-primary-foreground shadow-premium transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.015] hover:brightness-105 hover:shadow-[0_14px_32px_rgba(0,0,0,0.20)] active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <Sun className="h-5 w-5 animate-sun-spin" />
                      Sending…
                    </>
                  ) : step < TOTAL_STEPS ? (
                    <>
                      Continue
                      <ArrowRight
                        className="h-4.5 w-4.5 text-sun"
                        strokeWidth={2.4}
                      />
                    </>
                  ) : (
                    <>Get my free quote</>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p className="animate-rise mt-2 text-xs font-medium text-destructive">
      {children}
    </p>
  );
}
