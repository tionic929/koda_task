import React, { useState, useRef, useEffect } from "react";
import { User, LogOut, ChevronDown, ShieldCheck, Mail } from "lucide-react";
import type { AuthUser } from "../../context/AuthContext";

interface ProfileDropdownProps {
  user: AuthUser;
  onLogoutClick: () => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  user,
  onLogoutClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2.5 bg-white border border-slate-200 hover:border-slate-300 px-3 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
        aria-label="User profile settings"
      >
        <div className="flex items-center justify-center w-7 h-7 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-600 font-bold text-xs">
          {user.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-semibold text-slate-900 leading-tight">
            {user.name || user.email.split("@")[0]}
          </span>
          <span className="text-[10px] font-medium text-slate-500 capitalize">
            {user.role || "ADMIN"}
          </span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Floating Popover Dropdown (z-[100]) */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-[100] animate-in fade-in zoom-in-95 duration-100 space-y-2">
          {/* Header User Profile Info */}
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 truncate max-w-[150px]">
                {user.name || "Administrator"}
              </span>
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 text-indigo-700 border border-indigo-200/70">
                <ShieldCheck className="w-3 h-3 mr-0.5" />
                {user.role || "ADMIN"}
              </span>
            </div>
            <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 font-medium truncate">
              <Mail className="w-3 h-3 text-slate-400 flex-shrink-0" />
              <span className="truncate">{user.email}</span>
            </div>
          </div>

          <div className="border-t border-slate-100 my-1"></div>

          {/* Action Items */}
          <button
            onClick={() => {
              setIsOpen(false);
              onLogoutClick();
            }}
            className="w-full flex items-center space-x-2 px-3 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-500" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};
