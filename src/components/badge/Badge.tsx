type BadgeProps = {
  label: string;
};

export default function Badge({ label }: BadgeProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-text-primary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="h-5 w-5 text-accent-2"
      >
        <circle cx="12" cy="12" r="9" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m8.5 12.5 2.5 2.5 4.5-5"
        />
      </svg>
      <span>{label}</span>
    </div>
  );
}
