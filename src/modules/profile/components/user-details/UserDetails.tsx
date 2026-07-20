type UserDetailsProps = {
  userName: string | null;
  email: string | null;
};

export default function UserDetails({ userName, email }: UserDetailsProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-main-background p-6">
      <h3 className="text-base font-bold text-text-primary border-b border-gray-200 pb-3 mb-4">
        My Profile
      </h3>

      <div className="grid grid-cols-1 gap-y-3 text-sm">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 items-center">
          <span className="font-semibold text-text-primary">Name</span>
          <span className="col-span-2 sm:col-span-3 md:col-span-5 text-text-secondary">
            {userName || "N/A"}
          </span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 items-center">
          <span className="font-semibold text-text-primary">Email</span>
          <span className="col-span-2 sm:col-span-3 md:col-span-5 text-text-secondary">
            {email || "N/A"}
          </span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 items-center">
          <span className="font-semibold text-text-primary">Mobile</span>
          <span className="col-span-2 sm:col-span-3 md:col-span-5 text-text-secondary">
            —
          </span>
        </div>
      </div>
    </div>
  );
}
