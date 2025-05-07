import { Link, useLocation } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useState, useEffect } from "react";
// Main Sidebar component
const SideBar = () => {
  const location = useLocation(); // Use the location from React Router
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Array of sidebar links
  const links = [
    { to: "/addjob", icon: IoMdAdd, label: "Post a Job" },
    { to: "/search", icon: FaSearch, label: "Find Jobs" },
    { to: "/dashboard", icon: MdDashboard, label: "Dashboard" },
    { to: "/userProfile", icon: CgProfile, label: "Profile" },
  ];

  // Handle window resize with a proper useEffect cleanup
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Toggle mobile menu
  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  // Logo component
  const Logo = () => (
    <div className={`flex ${collapsed ? "justify-center" : "justify-start px-4"} items-center h-16 border-b border-gray-200`}>
      {collapsed ? (
        <div className="text-xl font-bold text-blue-600"></div>
      ) : (
        <div className="text-sm font-bold text-blue-600 ">JobGo.Com</div>
      )
      }

    </div>
  );


  // SidebarLink component
  interface SidebarLinkProps {
    to: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    label: string;
  }
  const SidebarLink = ({ to, icon: Icon, label }:SidebarLinkProps) => {
    const isActive = location.pathname === to;
    
    return (
      <div 
        className={`group flex items-center px-4 py-3 hover:bg-blue-50 transition-all cursor-pointer
          ${isActive ? "bg-blue-100 border-l-4 border-blue-500" : "border-l-4 border-transparent"}`}
      >
        <Link to={to} className="flex items-center text-gray-700 w-full">
          <div className={`flex items-center justify-center ${collapsed ? "w-full" : "mr-3"}`}>
            <Icon size={collapsed ? 22 : 20} className={`${isActive ? "text-blue-600" : "text-gray-600"}`} />
          </div>
          {!collapsed && (
            <span className={`text-sm transition-all duration-200 ${isActive ? "font-bold text-blue-600" : "font-medium text-gray-700"}`}>
              {label}
            </span>
          )}
        </Link>
      </div>
    );
  };

  // Mobile sidebar
  if (isMobile) {
    return (
      <>
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobile}
          className="fixed z-50 top-4 left-4 p-2 rounded-md bg-gray-100 text-gray-700"
        >
          {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
        
        {/* Mobile Sidebar */}
        <div className={`fixed inset-0 z-40 transform ${mobileOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
          <div className="relative z-50 w-64 h-full bg-white shadow-lg">
            <Logo />
            
            <div className="py-2">
              {links.map((link) => (
                <div key={link.to} onClick={() => {
                  setMobileOpen(false);
                }}>
                  <SidebarLink {...link} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={toggleMobile}
          />
        </div>
      </>
    );
  }

  // Desktop sidebar
  return (
    <div className="relative h-full">
      {/* Sidebar Container */}
      <div 
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg transition-all duration-300 ease-in-out z-30 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Logo */}
        <Logo />

        {/* Toggle Button */}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-4 right-2 p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
        >
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* Sidebar Content */}
        <div className="flex flex-col py-4">          
          {links.map((link) => (
            <SidebarLink key={link.to} {...link} />
          ))}
        </div>
      </div>
      
      {/* Main content wrapper to push content away from sidebar */}
      <div className={`transition-all duration-300 ${collapsed ? "ml-16" : "ml-64"}`}>
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default SideBar;