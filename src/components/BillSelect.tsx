export const BILL_OPTIONS = [
  "Less than ₹1,500",
  "₹1,500 – ₹2,500",
  "₹2,500 – ₹4,000",
  "₹4,000 – ₹8,000",
  "More than ₹8,000",
] as const;

export type BillOption = (typeof BILL_OPTIONS)[number];

type Props = {
  value: string;
  onChange: (value: BillOption) => void;
  invalid?: boolean;
};

export function BillSelect({ value, onChange, invalid }: Props) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-foreground">
        What is your average monthly electricity bill?
      </legend>
      <div
        className={`mt-3 grid gap-2 rounded-xl ${invalid ? "ring-2 ring-destructive/60 ring-offset-2 ring-offset-card" : ""}`}
        role="radiogroup"
        aria-label="Average monthly electricity bill"
      >
        {BILL_OPTIONS.map((option) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option)}
              className={`flex min-h-12 items-center justify-between rounded-xl border px-4 py-3 text-left text-[0.95rem] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                selected
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-secondary"
              }`}
            >
              <span>{option}</span>
              <span
                aria-hidden="true"
                className={`ml-3 flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  selected ? "border-primary bg-accent" : "border-input"
                }`}
              >
                {selected ? <span className="size-2 rounded-full bg-primary" /> : null}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
