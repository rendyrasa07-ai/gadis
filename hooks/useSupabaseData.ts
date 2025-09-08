import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { 
  Client, Project, TeamMember, Transaction, Card, FinancialPocket, 
  Lead, Asset, Contract, ClientFeedback, Notification, SocialMediaPost, 
  PromoCode, SOP, Package, AddOn, TeamProjectPayment, TeamPaymentRecord, 
  RewardLedgerEntry, Profile, User
} from '../types';

export const useSupabaseData = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  
  // Data states
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [pockets, setPockets] = useState<FinancialPocket[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [clientFeedback, setClientFeedback] = useState<ClientFeedback[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [socialMediaPosts, setSocialMediaPosts] = useState<SocialMediaPost[]>([]);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [sops, setSops] = useState<SOP[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [teamProjectPayments, setTeamProjectPayments] = useState<TeamProjectPayment[]>([]);
  const [teamPaymentRecords, setTeamPaymentRecords] = useState<TeamPaymentRecord[]>([]);
  const [rewardLedgerEntries, setRewardLedgerEntries] = useState<RewardLedgerEntry[]>([]);

  // Transform database row to application type
  const transformProfile = (row: any): Profile => ({
    id: row.id,
    adminUserId: row.user_id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    companyName: row.company_name,
    website: row.website,
    address: row.address,
    bankAccount: row.bank_account,
    authorizedSigner: row.authorized_signer,
    idNumber: row.id_number,
    bio: row.bio,
    incomeCategories: row.income_categories || [],
    expenseCategories: row.expense_categories || [],
    projectTypes: row.project_types || [],
    eventTypes: row.event_types || [],
    assetCategories: row.asset_categories || [],
    sopCategories: row.sop_categories || [],
    packageCategories: row.package_categories || [],
    projectStatusConfig: row.project_status_config || [],
    notificationSettings: row.notification_settings || {},
    securitySettings: row.security_settings || {},
    briefingTemplate: row.briefing_template,
    termsAndConditions: row.terms_and_conditions,
    contractTemplate: row.contract_template,
    logoBase64: row.logo_base64,
    brandColor: row.brand_color,
    publicPageConfig: row.public_page_config || {},
    packageShareTemplate: row.package_share_template,
    bookingFormTemplate: row.booking_form_template,
    chatTemplates: row.chat_templates || [],
  });

  const transformClient = (row: any): Client => ({
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    whatsapp: row.whatsapp,
    instagram: row.instagram,
    clientType: row.client_type,
    status: row.status,
    since: row.since,
    lastContact: row.last_contact,
    portalAccessId: row.portal_access_id,
  });

  const transformProject = (row: any): Project => ({
    id: row.id,
    clientId: row.client_id,
    projectName: row.project_name,
    clientName: row.client_name,
    projectType: row.project_type,
    packageName: row.package_name,
    packageId: row.package_id,
    addOns: row.add_ons || [],
    date: row.date,
    deadlineDate: row.deadline_date,
    location: row.location,
    progress: row.progress,
    status: row.status,
    activeSubStatuses: row.active_sub_statuses || [],
    totalCost: row.total_cost,
    amountPaid: row.amount_paid,
    paymentStatus: row.payment_status,
    team: row.team || [],
    notes: row.notes,
    accommodation: row.accommodation,
    driveLink: row.drive_link,
    clientDriveLink: row.client_drive_link,
    finalDriveLink: row.final_drive_link,
    startTime: row.start_time,
    endTime: row.end_time,
    image: row.image,
    revisions: row.revisions || [],
    promoCodeId: row.promo_code_id,
    discountAmount: row.discount_amount,
    shippingDetails: row.shipping_details,
    dpProofUrl: row.dp_proof_url,
    printingDetails: row.printing_details || [],
    printingCost: row.printing_cost,
    transportCost: row.transport_cost,
    isEditingConfirmedByClient: row.is_editing_confirmed_by_client,
    isPrintingConfirmedByClient: row.is_printing_confirmed_by_client,
    isDeliveryConfirmedByClient: row.is_delivery_confirmed_by_client,
    confirmedSubStatuses: row.confirmed_sub_statuses || [],
    clientSubStatusNotes: row.client_sub_status_notes || {},
    subStatusConfirmationSentAt: row.sub_status_confirmation_sent_at || {},
    completedDigitalItems: row.completed_digital_items || [],
    invoiceSignature: row.invoice_signature,
    customSubStatuses: row.custom_sub_statuses || [],
    bookingStatus: row.booking_status,
    rejectionReason: row.rejection_reason,
    chatHistory: row.chat_history || [],
  });

  // Load all data
  const loadData = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) {
        setLoading(false);
        return;
      }

      // Load user data
      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (userData) {
        setUser({
          id: userData.id,
          email: userData.email,
          fullName: userData.full_name,
          companyName: userData.company_name,
          role: userData.role as 'Admin' | 'Member',
          permissions: userData.permissions as any[],
          isApproved: userData.is_approved,
          password: '', // Not stored in database for security
        });
      }

      // Load profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', authUser.id)
        .single();

      if (profileData) {
        setProfile(transformProfile(profileData));
      }

      // Load all other data in parallel
      const [
        clientsRes, projectsRes, teamMembersRes, transactionsRes, cardsRes,
        pocketsRes, leadsRes, assetsRes, contractsRes, feedbackRes,
        notificationsRes, postsRes, promoCodesRes, sopsRes, packagesRes,
        addOnsRes, teamPaymentsRes, paymentRecordsRes, rewardEntriesRes
      ] = await Promise.all([
        supabase.from('clients').select('*').eq('user_id', authUser.id),
        supabase.from('projects').select('*').eq('user_id', authUser.id),
        supabase.from('team_members').select('*').eq('user_id', authUser.id),
        supabase.from('transactions').select('*').eq('user_id', authUser.id),
        supabase.from('cards').select('*').eq('user_id', authUser.id),
        supabase.from('pockets').select('*').eq('user_id', authUser.id),
        supabase.from('leads').select('*').eq('user_id', authUser.id),
        supabase.from('assets').select('*').eq('user_id', authUser.id),
        supabase.from('contracts').select('*').eq('user_id', authUser.id),
        supabase.from('client_feedback').select('*').eq('user_id', authUser.id),
        supabase.from('notifications').select('*').eq('user_id', authUser.id),
        supabase.from('social_media_posts').select('*').eq('user_id', authUser.id),
        supabase.from('promo_codes').select('*').eq('user_id', authUser.id),
        supabase.from('sops').select('*').eq('user_id', authUser.id),
        supabase.from('packages').select('*').eq('user_id', authUser.id),
        supabase.from('add_ons').select('*').eq('user_id', authUser.id),
        supabase.from('team_project_payments').select('*').eq('user_id', authUser.id),
        supabase.from('team_payment_records').select('*').eq('user_id', authUser.id),
        supabase.from('reward_ledger_entries').select('*').eq('user_id', authUser.id),
      ]);

      // Transform and set data
      if (clientsRes.data) setClients(clientsRes.data.map(transformClient));
      if (projectsRes.data) setProjects(projectsRes.data.map(transformProject));
      // Add more transformations as needed...

    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // CRUD operations
  const createClient = async (clientData: Omit<Client, 'id'>) => {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('clients')
      .insert({
        user_id: authUser.id,
        name: clientData.name,
        email: clientData.email,
        phone: clientData.phone,
        whatsapp: clientData.whatsapp,
        instagram: clientData.instagram,
        client_type: clientData.clientType,
        status: clientData.status,
        since: clientData.since,
        last_contact: clientData.lastContact,
        portal_access_id: clientData.portalAccessId,
      })
      .select()
      .single();

    if (error) throw error;
    const newClient = transformClient(data);
    setClients(prev => [newClient, ...prev]);
    return newClient;
  };

  const updateClient = async (id: string, updates: Partial<Client>) => {
    const { data, error } = await supabase
      .from('clients')
      .update({
        name: updates.name,
        email: updates.email,
        phone: updates.phone,
        whatsapp: updates.whatsapp,
        instagram: updates.instagram,
        client_type: updates.clientType,
        status: updates.status,
        since: updates.since,
        last_contact: updates.lastContact,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    const updatedClient = transformClient(data);
    setClients(prev => prev.map(c => c.id === id ? updatedClient : c));
    return updatedClient;
  };

  const deleteClient = async (id: string) => {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);

    if (error) throw error;
    setClients(prev => prev.filter(c => c.id !== id));
  };

  // Add similar CRUD operations for other entities...

  return {
    loading,
    user,
    profile,
    clients,
    projects,
    teamMembers,
    transactions,
    cards,
    pockets,
    leads,
    assets,
    contracts,
    clientFeedback,
    notifications,
    socialMediaPosts,
    promoCodes,
    sops,
    packages,
    addOns,
    teamProjectPayments,
    teamPaymentRecords,
    rewardLedgerEntries,
    // CRUD operations
    createClient,
    updateClient,
    deleteClient,
    // Add more CRUD operations...
  };
};