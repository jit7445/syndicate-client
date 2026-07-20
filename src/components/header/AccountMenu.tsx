import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/authUtils";
import { APP_ROUTES } from "../../constants/appRoutes";

type AccountMenuProps = {
  userName: string | null;
};

export default function AccountMenu({ userName }: AccountMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const menuItems = [
    { text: "Profile", onClick: () => navigate(APP_ROUTES.profile) },
    { text: "Logout", onClick: logout, hasDivider: true },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <div
        className="flex cursor-pointer items-center rounded-full bg-white py-1 pl-1 pr-4"
        style={{
          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#333]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <span className="mr-1 text-sm font-medium text-[#333]">
          {userName || "User"}
        </span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#555">
          <path d="M7 10l5 5 5-5H7z" />
        </svg>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 top-full z-[1200] mt-2 w-[180px] overflow-hidden rounded bg-white"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
        >
          {menuItems.map((item) => (
            <div
              key={item.text}
              className={`cursor-pointer px-4 py-3 text-sm text-[#333] transition-colors hover:bg-gray-100 ${item.hasDivider ? "border-t border-gray-100" : ""}`}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
            >
              {item.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
