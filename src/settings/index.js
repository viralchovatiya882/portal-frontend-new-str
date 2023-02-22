const siteConfig = {
  appName: "DUNCAN TAYLOR",
  appShortName: "DT",
};

const AppRoutes = {
    Home: "/",
    NotFound: "404",
    NoAccess: "403",
    Dashboard: "dashboard",
    Taxonomy: "taxonomy",
    OrderManagement: "order-management",
    CasedGoods: "cased-goods",
    CustomerData: "customer-data",
    Users: "users",
    ViewInventory: "view-live-inventory",
    AddCases: "add-new-cases",
    CasesChangeLog: "inventory-change-log",
    ViewDeletedInventory: "view-archived-inventory",
    NewSalesOrder: "create-new-order",
    TrackOrder: "track-order",
    ManageOrders: "manage-orders",
    CompletedOrders: "completed-orders",
    CancelledOrders: "cancelled-orders",
    CompletedLeads: "completed-leads",
    CustomerList: "customer-list",
    ActiveLeads: "active-leads",
    OrderDetails: "order-details",
    LeadDetails: "lead-details",
    MisReports: "mis-reports",
    CustomerDetails: "customer-details",
    ViewOrderDocuments: "view-order-documents",
    HelpTickets: "help-tickets",
    SalesOrderManagement: "sales-order-management",
    ViewSalesOrders: "view-sales-orders",
    AddNewStore: "add-new-store",
    EditStore: "add-new-store/:id",
    ViewStores: "view-stores",
    ViewStoreCategory: "view-store-category",
    ViewProductFilter: "view-product-filter",
    CallInList: "call-in-list",
    TransportJobs: "transport-jobs",
    AddNewCask: "add-new-cask",
    viewCaskProfile: "view-cask-profile",
    viewPassportDetails: "view-passport-details",
    AddNewTask: "add-new-task",
    GateEntry: "gate-entry/add-new",
    LogGateEntry: "log-gate-entry",
    LogGateEntrySummary: "log-gate-entry-summary",
    SamplingData: "sampling",
    ViewSamplingData: "sampling/view-details",
    AddSampling: "sampling/add-new",
    Regauging: "regauging",
    ViewRegauging: "regauging/view-details",
    AddNewRegauging: "regauging/add-new",
    CompleteRegauging: "regauging/complete",
    CRRListing: "gate-entry/crr-listing",
    CRRDetails: "gate-entry/crr-details",
    CaskMasterListing: "cask-master-listing",
    PassportMasterListing: "passport-master-listing",
    AddNewPassport: "add-new-passport",
    CompleteSampling: "sampling/complete"
};

const SidebarList = {
  Home: "/",
  Dashboard: "Dashboard",
  Taxonomy: "Taxonomy",
  OrderManagement: "Order Management",
  Users: "User Management",
  CasedGoods: "Cased Goods",
  CustomerData: "Customer Data",
  ViewInventory: "Live Inventory",
  ViewDeletedInventory: "Archived Inventory",
  AddCases: "Add New Cases",
  CasesChangeLog: "Inventory Change Log",
  SalesOrder: "Sales Order",
  Leads: "Customer Data",
  ActiveLeads: "Active Leads",
  CustomerList: "Customer List",
  NewSalesOrder: "Create New Order",
  ViewOrders: "View Orders",
  HelpTickets: "Help Tickets",
  TrackOrder: "Track Your Order",
  ManageOrders: "Manage Orders",
  CompletedOrders: "Completed Orders",
  CancelledOrders: "Cancelled Orders",
  CompletedLeads: "Completed Leads",
  OrderDetails: "Order Details",
  LeadDetails: "Lead Details",
  MisReports: "MIS Reports",
  CustomerDetails: "Customer Details",
  SalesOrderManagement: "Order Management",
  ViewSalesOrders: "View Sales Orders",
  StoreLocator: "Store Locator",
  AddNewStore: "Add New Store",
  ViewStores: "View Stores",
  ViewStoreCategory: "Veiw Store Category",
  ViewProductFilter: "View Product Filters",
  CallInList: "Call In List",
  TransportJobs: "Transport Jobs",
  AddNewCask: "Add New Cask",
  AddNewTask: "Add New Task",
  GateEntry: "Gate Entry",
  SamplingData: "Sampling Data",
  AddNewSamplingData: "Add New Sampling Data",
  Regauging: "Regauging",
  AddNewRegauging: "Add New Regauging",
  TaskManagement: "Task Management",
  CaskManagement: "Masterlists",
  CRRListing: "CRR Listing",
  CaskMasterListing: "Casks",
  PassportMasterListing: "Passports",
  MovementJobs: "Movement Jobs",
};

const defaultRequestOptions = {
  page: "all",
  // "security_key": process.env.REACT_APP_SECURITY_KEY
};

const defaultRequestKey = {
  security_key: process.env.REACT_APP_SECURITY_KEY,
};

export { siteConfig, SidebarList, AppRoutes, defaultRequestOptions, defaultRequestKey };
