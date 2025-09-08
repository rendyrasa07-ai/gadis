

import React, { useState, useEffect } from 'react';
import { ViewType, NavigationAction } from './types';
import { HomeIcon, FolderKanbanIcon, UsersIcon, DollarSignIcon, darkenColor, hexToHsl } from './constants';
import { AuthProvider, useAuth } from './components/AuthProvider';
import { useSupabaseData } from './hooks/useSupabaseData';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { Leads } from './components/Leads';
import Booking from './components/Booking';
import Clients from './components/Clients';
import { Projects } from './components/Projects';
import { Freelancers } from './components/Freelancers';
import Finance from './components/Finance';
import Packages from './components/Packages';
import { Assets } from './components/Assets';
import Settings from './components/Settings';
import { CalendarView } from './components/CalendarView';
import Login from './components/Login';
import Signup from './components/Signup';
import PublicBookingForm from './components/PublicBookingForm';
import PublicPackages from './components/PublicPackages';
import PublicFeedbackForm from './components/PublicFeedbackForm';
import PublicRevisionForm from './components/PublicRevisionForm';
import PublicLeadForm from './components/PublicLeadForm';
import Header from './components/Header';
import SuggestionForm from './components/SuggestionForm';
import ClientReports from './components/ClientKPI';
import GlobalSearch from './components/GlobalSearch';
import Contracts from './components/Contracts';
import ClientPortal from './components/ClientPortal';
import FreelancerPortal from './components/FreelancerPortal';
import { SocialPlanner } from './components/SocialPlanner';
import PromoCodes from './components/PromoCodes';
import SOPManagement from './components/SOP';
import Homepage from './components/Homepage';

const AccessDenied: React.FC<{ onBackToDashboard: () => void }> = ({ onBackToDashboard }) => (
    <div className="
        flex flex-col items-center justify-center 
        h-full 
        text-center 
        p-4 sm:p-6 md:p-8
        animate-fade-in
    ">
        <div className="
            w-16 h-16 sm:w-20 sm:h-20
            rounded-full 
            bg-red-100 dark:bg-red-900/20
            flex items-center justify-center
            mb-4 sm:mb-6
        ">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
        </div>
        <h2 className="
            text-xl sm:text-2xl 
            font-bold 
            text-red-600 dark:text-red-400 
            mb-2 sm:mb-3
        ">
            Akses Ditolak
        </h2>
        <p className="
            text-brand-text-secondary 
            mb-6 sm:mb-8 
            max-w-md
            leading-relaxed
        ">
            Anda tidak memiliki izin untuk mengakses halaman ini.
        </p>
        <button 
            onClick={onBackToDashboard} 
            className="button-primary"
        >
            Kembali ke Dashboard
        </button>
    </div>
);

const BottomNavBar: React.FC<{ activeView: ViewType; handleNavigation: (view: ViewType) => void }> = ({ activeView, handleNavigation }) => {
    const navItems = [
        { view: ViewType.DASHBOARD, label: 'Beranda', icon: HomeIcon },
        { view: ViewType.PROJECTS, label: 'Proyek', icon: FolderKanbanIcon },
        { view: ViewType.CLIENTS, label: 'Klien', icon: UsersIcon },
        { view: ViewType.FINANCE, label: 'Keuangan', icon: DollarSignIcon },
    ];

    return (
        <nav className="
            bottom-nav 
            xl:hidden
            bg-brand-surface/95 
            backdrop-blur-xl
            border-t border-brand-border/50
        ">
            <div className="
                flex justify-around items-center 
                h-16
                px-2
            " 
            style={{
                paddingBottom: 'var(--safe-area-inset-bottom, 0px)'
            }}>
                {navItems.map(item => (
                    <button
                        key={item.view}
                        onClick={() => handleNavigation(item.view)}
                        className={`
                            flex flex-col items-center justify-center 
                            w-full h-full
                            px-2 py-2
                            rounded-xl
                            transition-all duration-200 
                            min-w-[64px] min-h-[48px]
                            relative
                            group
                            ${activeView === item.view 
                                ? 'text-brand-accent bg-brand-accent/10' 
                                : 'text-brand-text-secondary hover:text-brand-text-primary hover:bg-brand-input/50 active:bg-brand-input'
                            }
                        `}
                        aria-label={item.label}
                    >
                        {/* Enhanced Icon */}
                        <div className="
                            relative
                            mb-1
                        ">
                            <item.icon className={`
                                w-5 h-5 sm:w-6 sm:h-6
                                transition-all duration-200
                                ${activeView === item.view ? 'transform scale-110' : 'group-active:scale-95'}
                            `} />
                            
                            {/* Active indicator dot */}
                            {activeView === item.view && (
                                <div className="
                                    absolute -top-1 -right-1
                                    w-2 h-2
                                    bg-brand-accent
                                    animate-pulse-soft
                                " />
                            )}
                        </div>
                        
                        {/* Enhanced Label */}
                        <span className={`
                            text-xs font-semibold
                            leading-tight
                            transition-all duration-200
                            ${activeView === item.view ? 'font-bold' : ''}
                        `}>
                            {item.label}
                        </span>
                        
                        {/* Background highlight */}
                        <div className={`
                            absolute inset-0
                            rounded-xl
                            transition-all duration-300
                            ${activeView === item.view 
                                ? 'bg-gradient-to-t from-brand-accent/10 to-transparent' 
                                : 'bg-transparent group-hover:bg-brand-input/30'
                            }
                        `} />
                    </button>
                ))}
            </div>
        </nav>
    );
};

const AppContent: React.FC = () => {
  const { user: currentUser, loading: authLoading } = useAuth();
  const {
    loading: dataLoading,
    profile,
    clients, setClients,
    projects, setProjects,
    teamMembers, setTeamMembers,
    transactions, setTransactions,
    cards, setCards,
    pockets, setPockets,
    leads, setLeads,
    assets, setAssets,
    contracts, setContracts,
    clientFeedback, setClientFeedback,
    notifications, setNotifications,
    socialMediaPosts, setSocialMediaPosts,
    promoCodes, setPromoCodes,
    sops, setSops,
    packages, setPackages,
    addOns, setAddOns,
    teamProjectPayments, setTeamProjectPayments,
    teamPaymentRecords, setTeamPaymentRecords,
    rewardLedgerEntries, setRewardLedgerEntries,
  } = useSupabaseData();

  const [activeView, setActiveView] = useState<ViewType>(ViewType.HOMEPAGE);
  const [notification, setNotification] = useState<string>('');
  const [initialAction, setInitialAction] = useState<NavigationAction | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [route, setRoute] = useState(window.location.hash || '#/home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isAuthenticated = !!currentUser;
  const loading = authLoading || dataLoading;

    // --- [NEW] MOCK EMAIL SERVICE ---
    const sendEmailNotification = (recipientEmail: string, notification: any) => {
        console.log(`
        ========================================
        [SIMULASI EMAIL] Mengirim notifikasi ke: ${recipientEmail}
        ----------------------------------------
        Judul: ${notification.title}
        Pesan: ${notification.message}
        Waktu: ${new Date().toLocaleString('id-ID')}
        ========================================
        `);
    };

    // --- [NEW] CENTRALIZED NOTIFICATION HANDLER ---
    const addNotification = async (newNotificationData: any) => {
        try {
            const { data: { user: authUser } } = await supabase.auth.getUser();
            if (!authUser) return;

            const { data, error } = await supabase
                .from('notifications')
                .insert({
                    user_id: authUser.id,
                    title: newNotificationData.title,
                    message: newNotificationData.message,
                    icon: newNotificationData.icon,
                    link_view: newNotificationData.link?.view,
                    link_action: newNotificationData.link?.action,
                })
                .select()
                .single();

            if (error) throw error;

            const newNotification = {
                id: data.id,
                title: data.title,
                message: data.message,
                timestamp: data.created_at,
                isRead: data.is_read,
                icon: data.icon,
                link: data.link_view ? {
                    view: data.link_view,
                    action: data.link_action
                } : undefined
            };

            setNotifications(prev => [newNotification, ...prev]);

            if (profile?.email) {
                sendEmailNotification(profile.email, newNotification);
            }
        } catch (error) {
            console.error('Error adding notification:', error);
        }
    };

  // Show loading screen while authenticating or loading data
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-brand-bg">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brand-text-secondary">Memuat aplikasi...</p>
        </div>
      </div>
    );
  }

  // Show error if profile is missing for authenticated user
  if (currentUser && !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-brand-bg p-4">
        <div className="text-center bg-brand-surface p-8 rounded-2xl shadow-lg border border-brand-border max-w-md">
          <h2 className="text-xl font-bold text-brand-text-light mb-4">Profil Tidak Ditemukan</h2>
          <p className="text-brand-text-secondary mb-6">
            Akun Anda belum memiliki profil bisnis. Silakan hubungi administrator untuk mengatur profil Anda.
          </p>
          <button 
            onClick={() => supabase.auth.signOut()} 
            className="button-primary"
          >
            Keluar
          </button>
        </div>
      </div>
    );
  }

  // If no profile data, provide defaults
  const safeProfile = profile || {
    id: '',
    adminUserId: currentUser?.id || '',
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || '',
    phone: '',
    companyName: 'Vena Pictures',
    website: '',
    address: '',
    bankAccount: '',
    authorizedSigner: '',
    bio: '',
    incomeCategories: ['DP Proyek', 'Pelunasan Proyek', 'Lainnya'],
    expenseCategories: ['Operasional', 'Peralatan', 'Transport', 'Lainnya'],
    projectTypes: ['Pernikahan', 'Lamaran', 'Prewedding'],
    eventTypes: ['Meeting Klien', 'Survey Lokasi', 'Libur'],
    assetCategories: ['Kamera', 'Lensa', 'Lighting', 'Audio'],
    sopCategories: ['Fotografi', 'Videografi', 'Editing'],
    packageCategories: ['Pernikahan', 'Lamaran', 'Prewedding'],
    projectStatusConfig: [],
    notificationSettings: { newProject: true, paymentConfirmation: true, deadlineReminder: true },
    securitySettings: { twoFactorEnabled: false },
    briefingTemplate: '',
    brandColor: '#3b82f6',
    publicPageConfig: {
      template: 'modern',
      title: 'Paket Layanan Kami',
      introduction: 'Pilih paket yang sesuai dengan kebutuhan acara Anda.',
      galleryImages: []
    },
    chatTemplates: []
  };

  useEffect(() => {
    const handleHashChange = () => {
      const newRoute = window.location.hash || '#/home';
      setRoute(newRoute);
      if (!isAuthenticated) {
        const isPublicRoute = newRoute.startsWith('#/public') || newRoute.startsWith('#/feedback') || newRoute.startsWith('#/suggestion-form') || newRoute.startsWith('#/revision-form') || newRoute.startsWith('#/portal') || newRoute.startsWith('#/freelancer-portal') || newRoute.startsWith('#/login') || newRoute.startsWith('#/signup') || newRoute === '#/home' || newRoute === '#';
        if (!isPublicRoute) {
          window.location.hash = '#/home';
        }
      } else {
        const isAuthLandingPage = newRoute.startsWith('#/login') || newRoute.startsWith('#/signup') || newRoute === '#/home' || newRoute === '#';
        if (isAuthLandingPage) {
          window.location.hash = '#/dashboard';
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAuthenticated]);

  useEffect(() => {
    const path = (route.split('?')[0].split('/')[1] || 'home').toLowerCase();
    const newView = Object.values(ViewType).find(v => 
      v.toLowerCase().replace(/ /g, '-') === path
    );
    if (newView) {
      setActiveView(newView);
    } else if (path === 'team') {
      setActiveView(ViewType.TEAM);
    }
  }, [route]);

  useEffect(() => {
    const styleElement = document.getElementById('public-theme-style');
    const isPublicRoute = route.startsWith('#/public') || route.startsWith('#/portal') || route.startsWith('#/freelancer-portal');
    
    document.body.classList.toggle('app-theme', !isPublicRoute);
    document.body.classList.toggle('public-page-body', isPublicRoute);

    if (isPublicRoute) {
      const brandColor = safeProfile.brandColor || '#3b82f6';
      
      if (styleElement) {
        const hoverColor = darkenColor(brandColor, 10);
        const brandHsl = hexToHsl(brandColor);
        styleElement.innerHTML = `
          :root {
            --public-accent: ${brandColor};
            --public-accent-hover: ${hoverColor};
            --public-accent-hsl: ${brandHsl};
          }
        `;
      }
    } else if (styleElement) {
      styleElement.innerHTML = '';
    }
  }, [route, safeProfile.brandColor]);

  const showNotification = (message: string, duration: number = 3000) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, duration);
  };

  const handleSetProfile = (value: React.SetStateAction<any>) => {
    // This will be handled by Supabase operations
    console.log('Profile update requested:', value);
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);
      
      setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };
  
  const handleMarkAllAsRead = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) return;

      await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', authUser.id)
        .eq('is_read', false);
      
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const handleNavigation = (view: ViewType, action?: NavigationAction, notificationId?: string) => {
    const pathMap: { [key in ViewType]: string } = {
      [ViewType.HOMEPAGE]: 'home',
      [ViewType.DASHBOARD]: 'dashboard',
      [ViewType.PROSPEK]: 'prospek',
      [ViewType.BOOKING]: 'booking',
      [ViewType.CLIENTS]: 'clients',
      [ViewType.PROJECTS]: 'projects',
      [ViewType.TEAM]: 'team',
      [ViewType.FINANCE]: 'finance',
      [ViewType.CALENDAR]: 'calendar',
      [ViewType.SOCIAL_MEDIA_PLANNER]: 'social-media-planner',
      [ViewType.PACKAGES]: 'packages',
      [ViewType.ASSETS]: 'assets',
      [ViewType.CONTRACTS]: 'contracts',
      [ViewType.PROMO_CODES]: 'promo-codes',
      [ViewType.SOP]: 'sop',
      [ViewType.CLIENT_REPORTS]: 'client-reports',
      [ViewType.SETTINGS]: 'settings',
    };

    const newRoute = `#/${pathMap[view] || view.toLowerCase().replace(/ /g, '-')}`;
    window.location.hash = newRoute;
    setActiveView(view);
    setInitialAction(action || null);
    setIsSidebarOpen(false);
    setIsSearchOpen(false);
    if (notificationId) {
      handleMarkAsRead(notificationId);
    }
  };

  const hasPermission = (view: ViewType) => {
    if (!currentUser) return false;
    if (currentUser.role === 'Admin') return true;
    if (view === ViewType.DASHBOARD) return true;
    return currentUser.permissions?.includes(view) || false;
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      window.location.hash = '#/home';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const renderView = () => {
    if (!hasPermission(activeView)) {
      return <AccessDenied onBackToDashboard={() => setActiveView(ViewType.DASHBOARD)} />;
    }
    
    switch (activeView) {
      case ViewType.DASHBOARD:
        return <Dashboard 
          projects={projects} 
          clients={clients} 
          transactions={transactions} 
          teamMembers={teamMembers}
          cards={cards}
          pockets={pockets}
          handleNavigation={handleNavigation}
          leads={leads}
          teamProjectPayments={teamProjectPayments}
          packages={packages}
          assets={assets}
          clientFeedback={clientFeedback}
          contracts={contracts}
          currentUser={currentUser}
          projectStatusConfig={safeProfile.projectStatusConfig}
        />;
      // Add other cases...
      default:
        return <div className="text-center py-20 text-brand-text-secondary">View not implemented yet</div>;
    }
  };

  // Routing logic for public pages
  if (route.startsWith('#/home') || route === '#/') return <Homepage />;
  if (route.startsWith('#/login')) return <Login />;
  if (route.startsWith('#/signup')) return <Signup />;
  
  // Public forms and portals would go here...

  if (!isAuthenticated) return <Login />;

  return (
    <div className="flex h-screen bg-brand-bg text-brand-text-primary overflow-hidden">
      <Sidebar 
        activeView={activeView} 
        setActiveView={(view) => handleNavigation(view)} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        currentUser={currentUser}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          pageTitle={activeView} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          setIsSearchOpen={setIsSearchOpen}
          notifications={notifications}
          handleNavigation={handleNavigation}
          handleMarkAllAsRead={handleMarkAllAsRead}
          currentUser={currentUser}
          profile={safeProfile}
          handleLogout={handleLogout}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8 pb-20 xl:pb-8 overscroll-contain" 
          style={{ 
            WebkitOverflowScrolling: 'touch',
            paddingBottom: 'calc(5rem + var(--safe-area-inset-bottom, 0px))'
          }}>
          <div className="animate-fade-in">
            {renderView()}
          </div>
        </main>
      </div>
      
      {notification && (
        <div className="fixed top-4 right-4 sm:top-6 sm:right-6 bg-brand-accent text-white py-3 px-4 sm:py-4 sm:px-6 rounded-xl shadow-2xl z-50 animate-fade-in-out backdrop-blur-sm border border-brand-accent-hover/20 max-w-sm break-words"
          style={{
            top: 'calc(1rem + var(--safe-area-inset-top, 0px))',
            right: 'calc(1rem + var(--safe-area-inset-right, 0px))'
          }}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse-soft" />
            <span className="font-medium text-sm sm:text-base">{notification}</span>
          </div>
        </div>
      )}
      
      <GlobalSearch 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        clients={clients}
        projects={projects}
        teamMembers={teamMembers}
        handleNavigation={handleNavigation}
      />
      
      <BottomNavBar activeView={activeView} handleNavigation={handleNavigation} />
    </div>
  );
};

// Simple Login component for now
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600">Login</h1>
            <p className="text-sm text-slate-500 mt-2">Masuk ke akun Vena Pictures Anda</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div>
              <input
                type="email"
                required
                className="w-full h-12 px-4 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="w-full h-12 px-4 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div className="text-center mt-6 text-sm">
            <p className="text-slate-500">
              Belum punya akun?{' '}
              <button 
                onClick={() => window.location.hash = '#/signup'} 
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Daftar di sini
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Signup component for now
const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Create user record
        await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email,
            full_name: fullName,
            role: 'Member',
            permissions: ['Manajemen Klien', 'Proyek', 'Kalender'],
            is_approved: false,
          });
        
        setSuccess(true);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
        <div className="w-full max-w-sm mx-auto text-center bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
          <h1 className="text-2xl font-bold text-blue-600">Pendaftaran Berhasil!</h1>
          <p className="text-slate-600 mt-4">
            Akun Anda telah dibuat. Silakan login untuk melanjutkan.
          </p>
          <button 
            onClick={() => window.location.hash = '#/login'} 
            className="w-full h-12 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 mt-6"
          >
            Kembali ke Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600">Daftar</h1>
            <p className="text-sm text-slate-500 mt-2">Buat akun Vena Pictures baru</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div>
              <input
                type="text"
                required
                className="w-full h-12 px-4 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                placeholder="Nama Lengkap"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="email"
                required
                className="w-full h-12 px-4 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="w-full h-12 px-4 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Daftar'}
            </button>
          </form>
          
          <div className="text-center mt-6 text-sm">
            <p className="text-slate-500">
              Sudah punya akun?{' '}
              <button 
                onClick={() => window.location.hash = '#/login'} 
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Login di sini
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
        } else {
            console.warn('[SIMULASI EMAIL] Gagal: Alamat email vendor tidak diatur di Pengaturan Profil.');
        }
    };

  useEffect(() => {
    const handleHashChange = () => {
        const newRoute = window.location.hash || '#/home';
        setRoute(newRoute);
        if (!isAuthenticated) {
            const isPublicRoute = newRoute.startsWith('#/public') || newRoute.startsWith('#/feedback') || newRoute.startsWith('#/suggestion-form') || newRoute.startsWith('#/revision-form') || newRoute.startsWith('#/portal') || newRoute.startsWith('#/freelancer-portal') || newRoute.startsWith('#/login') || newRoute.startsWith('#/signup') || newRoute === '#/home' || newRoute === '#';
            if (!isPublicRoute) {
                window.location.hash = '#/home';
            }
        } else {
            const isAuthLandingPage = newRoute.startsWith('#/login') || newRoute.startsWith('#/signup') || newRoute === '#/home' || newRoute === '#';
            if (isAuthLandingPage) {
                window.location.hash = '#/dashboard';
            }
        }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAuthenticated]);

  useEffect(() => {
      const path = (route.split('?')[0].split('/')[1] || 'home').toLowerCase();
      const newView = Object.values(ViewType).find(v => 
          v.toLowerCase().replace(/ /g, '-') === path
      );
      if (newView) {
          setActiveView(newView);
      } else if (path === 'team') { // Handle 'Freelancer' mapping to 'team' route
          setActiveView(ViewType.TEAM);
      }
  }, [route]);
  
  useEffect(() => {
        const styleElement = document.getElementById('public-theme-style');
        const isPublicRoute = route.startsWith('#/public') || route.startsWith('#/portal') || route.startsWith('#/freelancer-portal');
        
        document.body.classList.toggle('app-theme', !isPublicRoute);
        document.body.classList.toggle('public-page-body', isPublicRoute);

        if (isPublicRoute) {
            const brandColor = profile.brandColor || '#3b82f6';
            
            if (styleElement) {
                const hoverColor = darkenColor(brandColor, 10);
                const brandHsl = hexToHsl(brandColor);
                styleElement.innerHTML = `
                    :root {
                        --public-accent: ${brandColor};
                        --public-accent-hover: ${hoverColor};
                        --public-accent-hsl: ${brandHsl};
                    }
                `;
            }
        } else if (styleElement) {
            styleElement.innerHTML = '';
        }

    }, [route, profile.brandColor]);

  const showNotification = (message: string, duration: number = 3000) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, duration);
  };

  const handleSetProfile = (value: React.SetStateAction<Profile>) => {
    setProfile(value);
  };

  const handleLoginSuccess = (user: User) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    window.location.hash = '#/dashboard';
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    window.location.hash = '#/home';
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n));
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleNavigation = (view: ViewType, action?: NavigationAction, notificationId?: string) => {
        const pathMap: { [key in ViewType]: string } = {
            [ViewType.HOMEPAGE]: 'home',
            [ViewType.DASHBOARD]: 'dashboard',
            [ViewType.PROSPEK]: 'prospek',
            [ViewType.BOOKING]: 'booking',
            [ViewType.CLIENTS]: 'clients',
            [ViewType.PROJECTS]: 'projects',
            [ViewType.TEAM]: 'team',
            [ViewType.FINANCE]: 'finance',
            [ViewType.CALENDAR]: 'calendar',
            [ViewType.SOCIAL_MEDIA_PLANNER]: 'social-media-planner',
            [ViewType.PACKAGES]: 'packages',
            [ViewType.ASSETS]: 'assets',
            [ViewType.CONTRACTS]: 'contracts',
            [ViewType.PROMO_CODES]: 'promo-codes',
            [ViewType.SOP]: 'sop',
            [ViewType.CLIENT_REPORTS]: 'client-reports',
            [ViewType.SETTINGS]: 'settings',
        };

    const newRoute = `#/${pathMap[view] || view.toLowerCase().replace(/ /g, '-')}`;

    window.location.hash = newRoute;

    setActiveView(view);
    setInitialAction(action || null);
    setIsSidebarOpen(false); // Close sidebar on navigation
    setIsSearchOpen(false); // Close search on navigation
    if (notificationId) {
        handleMarkAsRead(notificationId);
    }
  };

  const hasPermission = (view: ViewType) => {
    if (!currentUser) return false;
    if (currentUser.role === 'Admin') return true;
    if (view === ViewType.DASHBOARD) return true;
    return currentUser.permissions?.includes(view) || false;
  };
  
  const renderView = () => {
    if (!hasPermission(activeView)) {
        return <AccessDenied onBackToDashboard={() => setActiveView(ViewType.DASHBOARD)} />;
    }
    switch (activeView) {
      case ViewType.DASHBOARD:
        return <Dashboard 
          projects={projects} 
          clients={clients} 
          transactions={transactions} 
          teamMembers={teamMembers}
          cards={cards}
          pockets={pockets}
          handleNavigation={handleNavigation}
          leads={leads}
          teamProjectPayments={teamProjectPayments}
          packages={packages}
          assets={assets}
          clientFeedback={clientFeedback}
          contracts={contracts}
          currentUser={currentUser}
          projectStatusConfig={profile.projectStatusConfig}
        />;
      case ViewType.PROSPEK:
        return <Leads
            leads={leads} setLeads={setLeads}
            clients={clients} setClients={setClients}
            projects={projects} setProjects={setProjects}
            packages={packages} addOns={addOns}
            transactions={transactions} setTransactions={setTransactions}
            userProfile={profile} setProfile={handleSetProfile} showNotification={showNotification}
            cards={cards} setCards={setCards}
            pockets={pockets} setPockets={setPockets}
            promoCodes={promoCodes} setPromoCodes={setPromoCodes}
        />;
      case ViewType.BOOKING:
        return <Booking
            leads={leads}
            clients={clients}
            projects={projects}
            setProjects={setProjects}
            packages={packages}
            userProfile={profile}
            setProfile={setProfile}
            handleNavigation={handleNavigation}
            showNotification={showNotification}
        />;
      case ViewType.CLIENTS:
        return <Clients
          clients={clients} setClients={setClients}
          projects={projects} setProjects={setProjects}
          packages={packages} addOns={addOns}
          transactions={transactions} setTransactions={setTransactions}
          userProfile={profile}
          showNotification={showNotification}
          initialAction={initialAction} setInitialAction={setInitialAction}
          cards={cards} setCards={setCards}
          pockets={pockets} setPockets={setPockets}
          contracts={contracts}
          handleNavigation={handleNavigation}
          clientFeedback={clientFeedback}
          promoCodes={promoCodes} setPromoCodes={setPromoCodes}
          onSignInvoice={(pId, sig) => setProjects(prev => prev.map(p => p.id === pId ? { ...p, invoiceSignature: sig } : p))}
          onSignTransaction={(tId, sig) => setTransactions(prev => prev.map(t => t.id === tId ? { ...t, vendorSignature: sig } : t))}
          addNotification={addNotification}
        />;
      case ViewType.PROJECTS:
        return <Projects 
          projects={projects} setProjects={setProjects}
          clients={clients}
          packages={packages}
          teamMembers={teamMembers}
          teamProjectPayments={teamProjectPayments} setTeamProjectPayments={setTeamProjectPayments}
          transactions={transactions} setTransactions={setTransactions}
          initialAction={initialAction} setInitialAction={setInitialAction}
          profile={profile}
          showNotification={showNotification}
          cards={cards}
          setCards={setCards}
        />;
      case ViewType.TEAM:
        return (
          <Freelancers
            teamMembers={teamMembers}
            setTeamMembers={setTeamMembers}
            teamProjectPayments={teamProjectPayments}
            setTeamProjectPayments={setTeamProjectPayments}
            teamPaymentRecords={teamPaymentRecords}
            setTeamPaymentRecords={setTeamPaymentRecords}
            transactions={transactions}
            setTransactions={setTransactions}
            userProfile={profile}
            showNotification={showNotification}
            initialAction={initialAction}
            setInitialAction={setInitialAction}
            projects={projects}
            setProjects={setProjects}
            rewardLedgerEntries={rewardLedgerEntries}
            setRewardLedgerEntries={setRewardLedgerEntries}
            pockets={pockets}
            setPockets={setPockets}
            cards={cards}
            setCards={setCards}
            onSignPaymentRecord={(rId, sig) => setTeamPaymentRecords(prev => prev.map(r => r.id === rId ? { ...r, vendorSignature: sig } : r))}
          />
        );
      case ViewType.FINANCE:
        return <Finance 
          transactions={transactions} setTransactions={setTransactions}
          pockets={pockets} setPockets={setPockets}
          projects={projects}
          profile={profile}
          cards={cards} setCards={setCards}
          teamMembers={teamMembers}
          rewardLedgerEntries={rewardLedgerEntries}
        />;
      case ViewType.PACKAGES:
        return <Packages packages={packages} setPackages={setPackages} addOns={addOns} setAddOns={setAddOns} projects={projects} profile={profile} />;
      case ViewType.ASSETS:
        return <Assets assets={assets} setAssets={setAssets} profile={profile} showNotification={showNotification} />;
      case ViewType.CONTRACTS:
        return <Contracts 
            contracts={contracts} setContracts={setContracts}
            clients={clients} projects={projects} profile={profile}
            showNotification={showNotification}
            initialAction={initialAction} setInitialAction={setInitialAction}
            packages={packages}
            onSignContract={(cId, sig, signer) => setContracts(prev => prev.map(c => c.id === cId ? { ...c, [signer === 'vendor' ? 'vendorSignature' : 'clientSignature']: sig } : c))}
        />;
      case ViewType.SOP:
        return <SOPManagement sops={sops} setSops={setSops} profile={profile} showNotification={showNotification} />;
      case ViewType.SETTINGS:
        return <Settings 
          profile={profile} setProfile={handleSetProfile} 
          transactions={transactions} setTransactions={setTransactions}
          projects={projects} setProjects={setProjects}
          packages={packages} setPackages={setPackages}
          sops={sops} setSops={setSops}
          users={users}
          setUsers={setUsers}
          currentUser={currentUser}
          showNotification={showNotification}
        />;
      case ViewType.CALENDAR:
        return <CalendarView projects={projects} setProjects={setProjects} teamMembers={teamMembers} profile={profile} />;
      case ViewType.CLIENT_REPORTS:
        return <ClientReports 
            clients={clients}
            leads={leads}
            projects={projects}
            feedback={clientFeedback}
            setFeedback={setClientFeedback}
            showNotification={showNotification}
        />;
      case ViewType.SOCIAL_MEDIA_PLANNER:
        return <SocialPlanner posts={socialMediaPosts} setPosts={setSocialMediaPosts} projects={projects} showNotification={showNotification} />;
      case ViewType.PROMO_CODES:
        return <PromoCodes promoCodes={promoCodes} setPromoCodes={setPromoCodes} projects={projects} showNotification={showNotification} />;
      default:
        return <div />;
    }
  };
  
  // --- ROUTING LOGIC ---
  if (route.startsWith('#/home') || route === '#/') return <Homepage />;
  if (route.startsWith('#/login')) return <Login onLoginSuccess={handleLoginSuccess} users={users} />;
  if (route.startsWith('#/signup')) return <Signup users={users} setUsers={setUsers} />;
  
  if (route.startsWith('#/public-packages')) {
    return <PublicPackages
        packages={packages}
        addOns={addOns}
        userProfile={profile}
        showNotification={showNotification}
        setClients={setClients}
        setProjects={setProjects}
        setTransactions={setTransactions}
        setCards={setCards}
        setLeads={setLeads}
        addNotification={addNotification}
        cards={cards}
        promoCodes={promoCodes}
        setPromoCodes={setPromoCodes}
    />;
  }
  if (route.startsWith('#/public-booking')) {
    const allDataForForm = { clients, projects, teamMembers, transactions, teamProjectPayments, teamPaymentRecords, pockets, profile, leads, rewardLedgerEntries, cards, assets, contracts, clientFeedback, notifications, socialMediaPosts, promoCodes, sops, packages, addOns };
    return <PublicBookingForm {...allDataForForm} userProfile={profile} showNotification={showNotification} setClients={setClients} setProjects={setProjects} setTransactions={setTransactions} setCards={setCards} setPockets={setPockets} setPromoCodes={setPromoCodes} setLeads={setLeads} addNotification={addNotification} />;
  }
  if (route.startsWith('#/public-lead-form')) {
    // FIX: Pass addNotification prop to PublicLeadForm
    return <PublicLeadForm setLeads={setLeads} userProfile={profile} showNotification={showNotification} addNotification={addNotification} />;
  }
  
  if (route.startsWith('#/feedback')) return <PublicFeedbackForm setClientFeedback={setClientFeedback} />;
  if (route.startsWith('#/suggestion-form')) return <SuggestionForm setLeads={setLeads} />;
  if (route.startsWith('#/revision-form')) return <PublicRevisionForm projects={projects} teamMembers={teamMembers} onUpdateRevision={(pId, rId, data) => setProjects(prev => prev.map(p => p.id === pId ? {...p, revisions: p.revisions?.map(r => r.id === rId ? {...r, ...data, completedDate: new Date().toISOString()} : r)} : p))} />;
  if (route.startsWith('#/portal/')) {
    const accessId = route.split('/portal/')[1];
    return <ClientPortal accessId={accessId} clients={clients} projects={projects} setClientFeedback={setClientFeedback} showNotification={showNotification} contracts={contracts} transactions={transactions} userProfile={profile} packages={packages} onClientConfirmation={(pId, stage) => setProjects(prev => prev.map(p => p.id === pId ? {...p, [`is${stage.charAt(0).toUpperCase() + stage.slice(1)}ConfirmedByClient`]: true} : p))} onClientSubStatusConfirmation={(pId, sub, note) => setProjects(prev => prev.map(p => p.id === pId ? {...p, confirmedSubStatuses: [...(p.confirmedSubStatuses || []), sub], clientSubStatusNotes: {...(p.clientSubStatusNotes || {}), [sub]: note}} : p))} onSignContract={(cId, sig, signer) => setContracts(prev => prev.map(c => c.id === cId ? {...c, [signer === 'vendor' ? 'vendorSignature' : 'clientSignature']: sig} : c))} />;
  }
  if (route.startsWith('#/freelancer-portal/')) {
     const accessId = route.split('/freelancer-portal/')[1];
     // FIX: Pass addNotification prop to FreelancerPortal
     return <FreelancerPortal accessId={accessId} teamMembers={teamMembers} projects={projects} teamProjectPayments={teamProjectPayments} teamPaymentRecords={teamPaymentRecords} rewardLedgerEntries={rewardLedgerEntries} showNotification={showNotification} onUpdateRevision={(pId, rId, data) => setProjects(prev => prev.map(p => p.id === pId ? {...p, revisions: p.revisions?.map(r => r.id === rId ? {...r, ...data, completedDate: new Date().toISOString()} : r)} : p))} sops={sops} userProfile={profile} addNotification={addNotification} />;
  }

  if (!isAuthenticated) return <Login onLoginSuccess={handleLoginSuccess} users={users} />;

  return (
    <div className="
        flex h-screen 
        bg-brand-bg 
        text-brand-text-primary
        overflow-hidden
    ">
      <Sidebar 
        activeView={activeView} 
        setActiveView={(view) => handleNavigation(view)} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        currentUser={currentUser}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
            pageTitle={activeView} 
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            setIsSearchOpen={setIsSearchOpen}
            notifications={notifications}
            handleNavigation={handleNavigation}
            handleMarkAllAsRead={handleMarkAllAsRead}
            currentUser={currentUser}
            profile={profile}
            handleLogout={handleLogout}
        />
        
        <main className="
            flex-1 
            overflow-x-hidden 
            overflow-y-auto 
            p-3 sm:p-4 md:p-6 lg:p-8 
            pb-20 xl:pb-8
            overscroll-contain
        " 
        style={{ 
            WebkitOverflowScrolling: 'touch',
            paddingBottom: 'calc(5rem + var(--safe-area-inset-bottom, 0px))'
        }}>
            <div className="animate-fade-in">
                {renderView()}
            </div>
        </main>
      </div>
      
      {/* Enhanced Notification Toast */}
      {notification && (
        <div className="
            fixed top-4 right-4 
            sm:top-6 sm:right-6
            bg-brand-accent 
            text-white 
            py-3 px-4 sm:py-4 sm:px-6
            rounded-xl 
            shadow-2xl 
            z-50 
            animate-fade-in-out
            backdrop-blur-sm
            border border-brand-accent-hover/20
            max-w-sm
            break-words
        "
        style={{
            top: 'calc(1rem + var(--safe-area-inset-top, 0px))',
            right: 'calc(1rem + var(--safe-area-inset-right, 0px))'
        }}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse-soft" />
            <span className="font-medium text-sm sm:text-base">{notification}</span>
          </div>
        </div>
      )}
      
      <GlobalSearch 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        clients={clients}
        projects={projects}
        teamMembers={teamMembers}
        handleNavigation={handleNavigation}
      />
      
      <BottomNavBar activeView={activeView} handleNavigation={handleNavigation} />
    </div>
  );
};

export default App;