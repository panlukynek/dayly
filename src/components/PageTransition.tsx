import * as React from "react";

type VTProps = { children: React.ReactNode; name?: string };

/**
 * React's <ViewTransition> — shipped (stable name) in the React canary
 * that Next 16 vendors, but absent from @types/react, hence the cast.
 * Falls back to a plain passthrough if the export ever disappears.
 */
const ViewTransition =
  ((React as unknown as Record<string, unknown>).ViewTransition as
    | React.ComponentType<VTProps>
    | undefined) ?? (({ children }: VTProps) => <>{children}</>);

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition name="page">
      {/* single DOM child so the transition name lands on exactly one node */}
      <div>{children}</div>
    </ViewTransition>
  );
}
