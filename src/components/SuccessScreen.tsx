import { CredentialsLine, SoltechLogo } from "@/components/SoltechHeader";

type SuccessScreenProps = {
  name: string;
  onSubmitAgain?: () => void;
};

export function SuccessScreen({
  name,
  onSubmitAgain,
}: SuccessScreenProps) {
  const handleClose = () => {
    // Try to close the current browser window/tab.
    window.close();

    // If the browser blocks window.close(), go back instead.
    setTimeout(() => {
      if (!document.hidden) {
        window.history.back();
      }
    }, 100);
  };

  return (
    <div className="w-full max-w-md">
      <div className="relative flex flex-col items-center rounded-3xl border border-border bg-card p-8 text-center shadow-card">

        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-2xl leading-none text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          ×
        </button>

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

        {/* Submit Again */}
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
