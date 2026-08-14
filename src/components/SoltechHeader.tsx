import logoAsset from "@/assets/soltech-logo.png.asset.json";

export function SoltechLogo({ className = "h-20 w-20" }: { className?: string }) {
  return (
    <img
      src="/soltech-logo.png"
      alt="Soltech Energy logo"
      width={512}
      height={512}
      className={`${className} shrink-0 object-contain`}
    />
  );
}

export function CredentialsLine({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs font-medium tracking-wide text-muted-foreground ${className}`}>
    </p>
  );
}

export function QuoteHeader() {
  return (
    <header className="flex flex-col items-center text-center">
      <SoltechLogo />
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
        Get Free Quote
      </h1>
      <div className="mt-2 h-1 w-12 rounded-full bg-accent" aria-hidden="true" />
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
        Get personalised guidance for your solar.
      </p>
      <CredentialsLine className="mt-4" />
    </header>
  );
}
