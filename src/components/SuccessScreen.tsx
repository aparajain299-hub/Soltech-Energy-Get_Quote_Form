import { CredentialsLine, SoltechLogo } from "@/components/SoltechHeader";

type SuccessScreenProps = {
  name: string;
  onSubmitAgain?: () => void;
};

export function SuccessScreen({
  name,
  onSubmitAgain,
}: SuccessScreenProps) {
  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center rounded-3xl border border-border bg-card p-8 text-center shadow-card">
        <SoltechLogo className="h-16 w-16" />

        <h1 className="mt-5 text-2xl font-bold tracking-tight text-primary">
          Thank you, {name}!
        </h1>

        <div
          className="mt-2 h-1 w-12 rounded-full bg-accent"
          aria-hidden="true"
        />

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          We've received your details. Our Soltech Energy team will review
          your requirements and get in touch with you shortly.
        </p>

        {onSubmitAgain && (
          <button
            type="button"
            onClick={onSubmitAgain}
            className="mt-6 flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:bg-primary-dark active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Submit Another Enquiry
          </button>
        )}

        <CredentialsLine className="mt-6" />
      </div>
    </div>
  );
}
