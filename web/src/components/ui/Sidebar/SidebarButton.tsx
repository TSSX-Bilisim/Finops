import { NavLink } from 'react-router';

interface SidebarButtonProps {
  to: string;
  children: React.ReactNode;
}

export default function SidebarButton({ to, children }: SidebarButtonProps) {
  return (
    <NavLink 
      to={to} 
      className="text-white hover:text-gray-300 hover:bg-gray-600 px-3 py-2 rounded transition-colors"
    >
      {children}
    </NavLink>
  );
}
