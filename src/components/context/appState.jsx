import React, { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import AppContext from './appContext';

// const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const API_BASE = "https://sbc-marketplace-dot-arched-gear-433017-u9.de.r.appspot.com";

const pakistanCities = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta',
  'Hyderabad', 'Gujranwala', 'Sialkot', 'Sargodha', 'Bahawalpur', 'Sukkur', 'Larkana', 'Abbottabad',
  'Mardan', 'Gujrat', 'Rahim Yar Khan', 'Sheikhupura', 'Kasur', 'Jhelum', 'Mingora', 'Dera Ghazi Khan',
];

const truckBrands = [
  'Hino', 'Isuzu', 'Mitsubishi Fuso', 'UD Trucks', 'Volvo Trucks', 'Mercedes-Benz', 'Scania', 'MAN',
  'HOWO (Sinotruk)', 'Shacman', 'FAW', 'Dongfeng', 'Foton', 'JAC', 'CAMC', 'Beiben (North Benz)',
  'SANY', 'XCMG', 'Hyundai', 'Daewoo (Tata Daewoo)', 'Tata', 'Ashok Leyland', 'Others',
];

const materialSellerTypes = [
  'Manufacturer',
  'Authorized Dealer',
  'Distributor',
  'Wholesaler',
  'Retailer / Shop',
  'Quarry Owner',
  'River Supplier',
  'Mine Owner',
  'Stockist',
  'Factory',
  'Local Manufacturer',
  'Importer',
  'Exporter',
];

const materialGrades = ['Premium', 'Grade A', 'Grade B', 'Grade C', 'Commercial', 'Economy'];
const materialUnits = ['Bag', 'Kg', 'Ton', 'Piece', 'CFT', 'Cubic Meter', 'Meter', 'Foot', 'Roll', 'Sheet', 'Box', 'Drum', 'Truck', 'Dumper'];
const machineryBrands = [
  'Caterpillar (CAT)', 'Komatsu', 'Hitachi', 'Kobelco', 'Sumitomo', 'Kubota', 'Yanmar', 'Tadano', 'Kato', 'Sakai',
  'Hyundai', 'HD Hyundai', 'Develon (Doosan)', 'Daewoo', 'SANY', 'XCMG', 'LiuGong', 'SDLG', 'Shantui', 'Zoomlion',
  'XGMA', 'Sunward', 'Lovol', 'Lonking', 'Xinyuan', 'Rukee', 'Yuchai', 'SINOMACH', 'SEM', 'Foton Lovol', 'Volvo',
  'JCB', 'Liebherr', 'CASE', 'New Holland', 'Wirtgen', 'Hamm', 'BOMAG', 'Ammann', 'Dynapac', 'John Deere', 'Terex',
  'Bobcat', 'Manitou', 'Bell Equipment', 'Takeuchi', 'Mecalac', 'Other',
];
const machineryStatuses = ['Ready to Work', 'Excellent', 'Good', 'Average', 'Needs Repair'];
const constructionServiceCompanyTypes = ['Main Contractor', 'Subcontractor', 'Consultant', 'Engineering Firm', 'Individual'];
const serviceCategoryTypes = ['truck', 'machinery', 'material', 'spareParts'];
const countryOptions = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
  'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
  'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
  'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
  'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt',
  'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon',
  'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
  'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel',
  'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos',
  'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi',
  'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova',
  'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands',
  'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau',
  'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia',
  'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia',
  'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan',
  'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania',
  'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda',
  'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
  'Yemen', 'Zambia', 'Zimbabwe',
];

const truckInitialForm = {
  category: '',
  subcategory: '',
  title: '',
  description: '',
  condition: 'used',
  quantity: '',
  brand: '',
  wheelType: '',
  driveType: '',
  capacity: { payloadCapacity: '', grossVehicleWeight: '', bodyCapacity: '', tankCapacity: '', drumCapactiy: '' },
  engineTransmission: { engineBrand: '', engineModel: '', engineCapactiy: '', engineHorsepower: '', torque: '', emissionStandard: '', fuelType: '', transmission: '', driveType: '' },
  dimensions: { length: '', width: '', height: '', wheelBase: '', groundClearance: '' },
  tyres: { tyreSize: '', numberOfTires: '', tyreCondition: '' },
  body: { bodyType: '', bodyMaterial: '', chassisNumber: '', cabinType: 'day', steering: 'LHD' },
  usage: { mileage: '', numberOfOwners: '', registrationCity: '', registrationStatus: 'registered' },
  originalDocuments: false,
  price: '',
  images: [],
  documentImages: [],
  features: { ac: false, powerSteering: false, abs: false, differentialLock: false, pto: false, reverseCamera: false, gpsTracker: false, cruiseControl: false },
  manufacturingYear: '',
  modelYear: '',
  importYear: '',
  location: '',
  city: '',
  deliveryProvided: false,
  deliveryLocations: [],
  approvalStatus: 'pending',
  rejectionReason: '',
};

const financeTruckInitialForm = {
  categories: [],
  financeAmount: '',
  financeCities: [],
};

const materialInitialForm = {
  category: '',
  subcategory: '',
  title: '',
  description: '',
  sellerType: '',
  brand: 'local',
  grade: '',
  quantity: '',
  unit: '',
  price: '',
  images: [],
  location: '',
  city: '',
  deliveryProvided: false,
  deliveryLocations: [],
  approvalStatus: 'pending',
  rejectionReason: '',
};

const machineryInitialForm = {
  category: '',
  subcategory: '',
  title: '',
  description: '',
  brand: '',
  manufacturingYear: '',
  countryOfManufacture: '',
  importYear: '',
  condition: 'used',
  capacity: {
    operatingWeightTon: '',
    bucketCapacityM3: '',
    maximumDiggingDepth: '',
    maximumDiggingReach: '',
    maximumDumpingHeight: '',
    liftCapacity: '',
    boomLength: '',
    bladeWidth: '',
    drumWidth: '',
    drumCapacity: '',
    forkLength: '',
  },
  mechanical: {
    engineBrand: '',
    engineModel: '',
    horsepowerHp: '',
    engineCapacityCc: '',
    fuelType: '',
    transmission: '',
    driveType: '',
    hydraulicPumpBrand: '',
    hydraulicSystem: false,
  },
  tyres: {
    trackType: 'Steel',
    trackShoeWidth: '',
    trackCondition: '',
    tyreSize: '',
    numberOfTyres: '',
    tyreCondition: '',
  },
  workingHours: '',
  machineStatus: 'Ready to Work',
  features: {
    airConditioner: false,
    cabin: 'ROPS Cabin',
    joystickControls: false,
    gpsTracking: false,
    reverseCamera: false,
    autoGreasing: false,
    ledWorkLights: false,
    auxiliaryHydraulics: false,
    autoIdle: false,
    quickHitch: false,
  },
  documentImages: [],
  images: [],
  location: '',
  city: '',
  deliveryProvided: false,
  deliveryLocations: [],
  approvalStatus: 'pending',
  rejectionReason: '',
  price: '',
  quantity: '',
};

const sparePartInitialForm = {
  category: '',
  subcategory: '',
  title: '',
  description: '',
  brand: '',
  manufacturingYear: '',
  countryOfManufacture: '',
  importYear: '',
  condition: 'used',
  partNumber: '',
  quantity: '',
  compatibleBrands: [{ brand: '' }],
  warrantyProvided: false,
  images: [],
  location: '',
  city: '',
  deliveryProvided: false,
  deliveryLocations: [],
  approvalStatus: 'pending',
  rejectionReason: '',
  price: '',
};

const constructionServiceInitialForm = {
  category: '',
  subcategory: [],
  title: '',
  description: '',
  companyType: '',
  yearsOfExperience: '',
  teamSize: '',
  images: [],
  certificationsImages: [],
  location: '',
  city: '',
  offerOnsiteService: false,
  serviceAreas: [],
  approvalStatus: 'pending',
  rejectionReason: '',
};

const inspectionServiceInitialForm = {
  category: [],
  title: '',
  description: '',
  yearsOfExperience: '',
  teamSize: '',
  images: [],
  certificationsImages: [],
  location: '',
  city: '',
  offerOnsiteInspection: false,
  inspectionAreas: [],
  approvalStatus: 'pending',
  rejectionReason: '',
};

const repairServiceInitialForm = {
  category: [],
  title: '',
  description: '',
  yearsOfExperience: '',
  teamSize: '',
  images: [],
  certificationsImages: [],
  location: '',
  city: '',
  offerOnsiteRepair: false,
  repairAreas: [],
  approvalStatus: 'pending',
  rejectionReason: '',
};

const basicInfoInitialForm = {
  advancePercentage: 0.1,
  platformFeePercentage: 0.02,
};

const rentalTruckInitialForm = {
  category: '',
  subcategory: '',
  title: '',
  description: '',
  brand: '',
  wheelType: '',
  driveType: '',
  capacity: { payloadCapacity: '', grossVehicleWeight: '', bodyCapacity: '', tankCapacity: '', drumCapactiy: '' },
  engineTransmission: { engineBrand: '', engineModel: '', engineCapactiy: '', engineHorsepower: '', torque: '', emissionStandard: '', fuelType: '', transmission: '', driveType: '' },
  dimensions: { length: '', width: '', height: '', wheelBase: '', groundClearance: '' },
  tyres: { tyreSize: '', numberOfTires: '', tyreCondition: '' },
  body: { bodyType: '', bodyMaterial: '', chassisNumber: '', cabinType: 'day', steering: 'LHD' },
  usage: { mileage: '', numberOfOwners: '', registrationCity: '', registrationStatus: 'registered' },
  originalDocuments: false,
  availableRentalDuration: { fromDate: '', toDate: '' },
  perHourRentalCharges: '',
  truckStatus: 'available',
  images: [],
  documentImages: [],
  features: { ac: false, powerSteering: false, abs: false, differentialLock: false, pto: false, reverseCamera: false, gpsTracker: false, cruiseControl: false },
  manufacturingYear: '',
  modelYear: '',
  importYear: '',
  location: '',
  city: '',
  deliveryProvided: false,
  deliveryLocations: [],
  approvalStatus: 'pending',
  rejectionReason: '',
};

const rentalMachineryInitialForm = {
  category: '',
  subcategory: '',
  title: '',
  description: '',
  brand: '',
  manufacturingYear: '',
  countryOfManufacture: '',
  importYear: '',
  condition: 'used',
  capacity: {
    operatingWeightTon: '',
    bucketCapacityM3: '',
    maximumDiggingDepth: '',
    maximumDiggingReach: '',
    maximumDumpingHeight: '',
    liftCapacity: '',
    boomLength: '',
    bladeWidth: '',
    drumWidth: '',
    drumCapacity: '',
    forkLength: '',
  },
  mechanical: {
    engineBrand: '',
    engineModel: '',
    horsepowerHp: '',
    engineCapacityCc: '',
    fuelType: '',
    transmission: '',
    driveType: '',
    hydraulicPumpBrand: '',
    hydraulicSystem: false,
  },
  tyres: {
    trackType: 'Steel',
    trackShoeWidth: '',
    trackCondition: '',
    tyreSize: '',
    numberOfTyres: '',
    tyreCondition: '',
  },
  workingHours: '',
  machineStatus: 'available',
  features: {
    airConditioner: false,
    cabin: 'ROPS Cabin',
    joystickControls: false,
    gpsTracking: false,
    reverseCamera: false,
    autoGreasing: false,
    ledWorkLights: false,
    auxiliaryHydraulics: false,
    autoIdle: false,
    quickHitch: false,
  },
  documentImages: [],
  images: [],
  location: '',
  city: '',
  deliveryProvided: false,
  deliveryLocations: [],
  approvalStatus: 'pending',
  rejectionReason: '',
  availableRentalDuration: { fromDate: '', toDate: '' },
  perHourRentalCharges: '',
  quantity: '',
};

const parseJson = async (response) => {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch (error) {
    return { message: text };
  }
};

const AppState = ({ children }) => {
  const [userToken, setUserToken] = useState(localStorage.getItem('sbc_auth_token') || '');
  const [adminToken, setAdminToken] = useState(localStorage.getItem('sbc_admin_auth_token') || '');
  const [currentUser, setCurrentUser] = useState(null);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [marketplaceSubCategories, setMarketplaceSubCategories] = useState([]);
  const [userTrucks, setUserTrucks] = useState([]);
  const [allTrucks, setAllTrucks] = useState([]);
  const [userRentalTrucks, setUserRentalTrucks] = useState([]);
  const [allRentalTrucks, setAllRentalTrucks] = useState([]);
  const [userMaterials, setUserMaterials] = useState([]);
  const [allMaterials, setAllMaterials] = useState([]);
  const [userMachineries, setUserMachineries] = useState([]);
  const [allMachineries, setAllMachineries] = useState([]);
  const [userRentalMachineries, setUserRentalMachineries] = useState([]);
  const [allRentalMachineries, setAllRentalMachineries] = useState([]);
  const [userSpareParts, setUserSpareParts] = useState([]);
  const [allSpareParts, setAllSpareParts] = useState([]);
  const [userConstructionServices, setUserConstructionServices] = useState([]);
  const [allConstructionServices, setAllConstructionServices] = useState([]);
  const [userInspectionServices, setUserInspectionServices] = useState([]);
  const [allInspectionServices, setAllInspectionServices] = useState([]);
  const [userRepairServices, setUserRepairServices] = useState([]);
  const [allRepairServices, setAllRepairServices] = useState([]);
  const [basicInfo, setBasicInfo] = useState(basicInfoInitialForm);
  const [userTruckNegotiations, setUserTruckNegotiations] = useState([]);
  const [allTruckNegotiations, setAllTruckNegotiations] = useState([]);
  const [userFinanceTrucks, setUserFinanceTrucks] = useState([]);
  const [allFinanceTrucks, setAllFinanceTrucks] = useState([]);
  const [userFinanceTruckNegotiations, setUserFinanceTruckNegotiations] = useState([]);
  const [userFinanceTruckInstallmentNegotiations, setUserFinanceTruckInstallmentNegotiations] = useState([]);
  const [allFinanceTruckNegotiations, setAllFinanceTruckNegotiations] = useState([]);
  const [allFinanceTruckInstallmentNegotiations, setAllFinanceTruckInstallmentNegotiations] = useState([]);
  const [userRentalTruckNegotiations, setUserRentalTruckNegotiations] = useState([]);
  const [allRentalTruckNegotiations, setAllRentalTruckNegotiations] = useState([]);
  const [userRentalConstructionMachineryNegotiations, setUserRentalConstructionMachineryNegotiations] = useState([]);
  const [allRentalConstructionMachineryNegotiations, setAllRentalConstructionMachineryNegotiations] = useState([]);
  const [userMachineryNegotiations, setUserMachineryNegotiations] = useState([]);
  const [allMachineryNegotiations, setAllMachineryNegotiations] = useState([]);
  const [userConstructionMaterialNegotiations, setUserConstructionMaterialNegotiations] = useState([]);
  const [allConstructionMaterialNegotiations, setAllConstructionMaterialNegotiations] = useState([]);
  const [userRepairServiceNegotiations, setUserRepairServiceNegotiations] = useState([]);
  const [allRepairServiceNegotiations, setAllRepairServiceNegotiations] = useState([]);
  const [userConstructionServiceNegotiations, setUserConstructionServiceNegotiations] = useState([]);
  const [allConstructionServiceNegotiations, setAllConstructionServiceNegotiations] = useState([]);
  const [userTruckInspectionServiceNegotiations, setUserTruckInspectionServiceNegotiations] = useState([]);
  const [allTruckInspectionServiceNegotiations, setAllTruckInspectionServiceNegotiations] = useState([]);
  const [userTruckInspectionReports, setUserTruckInspectionReports] = useState([]);
  const [allTruckInspectionReports, setAllTruckInspectionReports] = useState([]);
  const [userMachineryInspectionNegotiations, setUserMachineryInspectionNegotiations] = useState([]);
  const [allMachineryInspectionNegotiations, setAllMachineryInspectionNegotiations] = useState([]);
  const [userMachineryInspectionReports, setUserMachineryInspectionReports] = useState([]);
  const [allMachineryInspectionReports, setAllMachineryInspectionReports] = useState([]);
  const [userSparePartInspectionNegotiations, setUserSparePartInspectionNegotiations] = useState([]);
  const [allSparePartInspectionNegotiations, setAllSparePartInspectionNegotiations] = useState([]);
  const [userSparePartInspectionReports, setUserSparePartInspectionReports] = useState([]);
  const [allSparePartInspectionReports, setAllSparePartInspectionReports] = useState([]);
  const [userConstructionMaterialInspectionNegotiations, setUserConstructionMaterialInspectionNegotiations] = useState([]);
  const [allConstructionMaterialInspectionNegotiations, setAllConstructionMaterialInspectionNegotiations] = useState([]);
  const [userConstructionMaterialInspectionReports, setUserConstructionMaterialInspectionReports] = useState([]);
  const [allConstructionMaterialInspectionReports, setAllConstructionMaterialInspectionReports] = useState([]);
  const [userSparePartNegotiations, setUserSparePartNegotiations] = useState([]);
  const [allSparePartNegotiations, setAllSparePartNegotiations] = useState([]);
  const [userTruckMeetings, setUserTruckMeetings] = useState([]);
  const [allTruckMeetings, setAllTruckMeetings] = useState([]);
  const [dashboardKpis] = useState([
    { label: 'Active Listings', value: '18' },
    { label: 'Approved Leads', value: '09' },
    { label: 'Pending Reviews', value: '05' },
    { label: 'Messages', value: '21' },
  ]);

  const [globalLoader, setGlobalLoader] = useState(false)

  const request = useCallback(async (path, options = {}) => {
    setGlobalLoader(true);
    try {
      const response = await fetch(`${API_BASE}${path}`, options);
      const data = await parseJson(response);
      if (!response.ok) {
        throw new Error(data?.error || data?.message || 'Request failed');
      }
      return data;
    } finally {
      setGlobalLoader(false);
    }
  }, []);

  const uploadImage = useCallback(async (file) => {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', 'for_migration');
    setGlobalLoader(true);
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/fgsymafc/image/upload', {
        method: 'POST',
        body: fd,
      });
      const data = await parseJson(response);
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      return data.secure_url || data.url;
    } finally {
      setGlobalLoader(false);
    }
  }, []);

  const loginUser = useCallback(async ({ email, password }) => {
    const data = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email.trim(), password }),
    });
    localStorage.setItem('sbc_auth_token', data.authToken);
    setUserToken(data.authToken);
    toast.success('Login successful');
    return data;
  }, [request]);

  const signupUser = useCallback(async ({ email, password }) => {
    const data = await request('/api/auth/createuser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email.trim(), password }),
    });
    localStorage.setItem('sbc_auth_token', data.authToken);
    setUserToken(data.authToken);
    toast.success('Signup successful');
    return data;
  }, [request]);

  const fetchUser = useCallback(async () => {
    if (!userToken) return null;
    const data = await request('/api/auth/get-user', {
      headers: { 'auth-token': userToken },
    });
    setCurrentUser(data);
    return data;
  }, [request, userToken]);

  const updateUserProfile = useCallback(async (payload) => {
    const data = await request('/api/auth/update-user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    setCurrentUser(data);
    toast.success('Profile updated');
    return data;
  }, [request, userToken]);

  const logoutUser = useCallback(() => {
    localStorage.removeItem('sbc_auth_token');
    setUserToken('');
    setCurrentUser(null);
    toast.info('Logged out');
  }, []);

  const loginAdmin = useCallback(async ({ email, password }) => {
    const data = await request('/api/admin-auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email.trim(), password }),
    });
    localStorage.setItem('sbc_admin_auth_token', data.authToken);
    setAdminToken(data.authToken);
    toast.success('Admin login successful');
    return data;
  }, [request]);

  const fetchAdmin = useCallback(async () => {
    if (!adminToken) return null;
    const data = await request('/api/admin-auth/me', {
      headers: { 'auth-token': adminToken },
    });
    setCurrentAdmin(data);
    return data;
  }, [adminToken, request]);

  const logoutAdmin = useCallback(() => {
    localStorage.removeItem('sbc_admin_auth_token');
    setAdminToken('');
    setCurrentAdmin(null);
    toast.info('Admin logged out');
  }, []);

  const getCategories = useCallback(async (categoryType = '') => {
    const suffix = categoryType ? `?categoryType=${encodeURIComponent(categoryType)}` : '';
    const data = await request(`/api/category/get-all-categories${suffix}`);
    setCategories(Array.isArray(data) ? data : []);
    return data;
  }, [request]);

  const getCategoryById = useCallback((id) => request(`/api/category/get-category/${id}`), [request]);
  const createCategory = useCallback(async (payload) => {
    const data = await request('/api/category/create-category', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Category created');
    return data;
  }, [request]);
  const updateCategory = useCallback(async (id, payload) => {
    const data = await request(`/api/category/update-category/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Category updated');
    return data;
  }, [request]);
  const deleteCategory = useCallback(async (id) => {
    const data = await request(`/api/category/delete-category/${id}`, { method: 'DELETE' });
    toast.success('Category deleted');
    return data;
  }, [request]);

  const getSubCategories = useCallback(async (categoryId) => {
    const data = await request(`/api/subcategory/get-subcategories/${categoryId}`);
    setSubCategories(Array.isArray(data) ? data : []);
    return data;
  }, [request]);
  const getSubCategoriesByCategoryType = useCallback(async (categoryType) => {
    const data = await request(`/api/subcategory/get-subcategories-by-category-type/${categoryType}`);
    setMarketplaceSubCategories(Array.isArray(data) ? data : []);
    return data;
  }, [request]);
  const getSubCategoryById = useCallback((id) => request(`/api/subcategory/get-subcategory/${id}`), [request]);
  const createSubCategory = useCallback(async (payload) => {
    const data = await request('/api/subcategory/create-subcategory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Subcategory created');
    return data;
  }, [request]);
  const updateSubCategory = useCallback(async (id, payload) => {
    const data = await request(`/api/subcategory/update-subcategory/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Subcategory updated');
    return data;
  }, [request]);
  const deleteSubCategory = useCallback(async (id) => {
    const data = await request(`/api/subcategory/delete-subcategory/${id}`, { method: 'DELETE' });
    toast.success('Subcategory deleted');
    return data;
  }, [request]);

  const getBasicInfo = useCallback(async () => {
    const data = await request('/api/basic-info/get-basic-info');
    setBasicInfo(data || basicInfoInitialForm);
    return data;
  }, [request]);

  const updateBasicInfo = useCallback(async (id, payload) => {
    const data = await request(`/api/basic-info/update-basic-info/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setBasicInfo(data || basicInfoInitialForm);
    toast.success('Basic info updated');
    return data;
  }, [request]);

  const getUserTruckNegotiations = useCallback(async () => {
    const data = await request('/api/truck-negotiation/get-my-truck-negotiations', {
      headers: { 'auth-token': userToken },
    });
    setUserTruckNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);

  const getAllTruckNegotiations = useCallback(async () => {
    const data = await request('/api/truck-negotiation/get-truck-negotiations');
    setAllTruckNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request]);

  const getTruckNegotiationById = useCallback(async (id) => (
    request(`/api/truck-negotiation/get-truck-negotiation/${id}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const createTruckNegotiation = useCallback(async (payload) => {
    const data = await request('/api/truck-negotiation/create-truck-negotiation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Negotiation submitted');
    return data;
  }, [request, userToken]);

  const createTruckRequirement = useCallback(async (payload) => {
    const data = await request('/api/truck-negotiation/truck-requirement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Requirement submitted');
    return data;
  }, [request, userToken]);

  const createMachineryRequirement = useCallback(async (payload) => {
    const data = await request('/api/machinery-negotiation/machinery-requirement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Requirement submitted');
    return data;
  }, [request, userToken]);

  const createSparePartRequirement = useCallback(async (payload) => {
    const data = await request('/api/spare-part-negotiation/spare-part-requirement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Requirement submitted');
    return data;
  }, [request, userToken]);

  const createConstructionMaterialRequirement = useCallback(async (payload) => {
    const data = await request('/api/construction-material-negotiation/construction-material-requirement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Requirement submitted');
    return data;
  }, [request, userToken]);

  const addTruckCounterOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/truck-negotiation/add-counter-offer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Counter offer submitted');
    return data;
  }, [request, userToken]);

  const acceptTruckOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/truck-negotiation/accept-offer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Offer accepted');
    return data;
  }, [request, userToken]);

  const submitAdvanceProof = useCallback(async (id, payload) => {
    const data = await request(`/api/truck-negotiation/submit-advance-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Advance payment proof submitted');
    return data;
  }, [request, userToken]);

  const submitFinalProof = useCallback(async (id, payload) => {
    const data = await request(`/api/truck-negotiation/submit-final-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Final payment proof submitted');
    return data;
  }, [request, userToken]);

  const updateTruckNegotiationStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/truck-negotiation/update-truck-negotiation-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Negotiation status updated');
    return data;
  }, [request]);

  const getUserFinanceTrucks = useCallback(async () => {
    const data = await request('/api/finance-truck/get-finance-trucks/me', {
      headers: { 'auth-token': userToken },
    });
    setUserFinanceTrucks(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);

  const getAllFinanceTrucks = useCallback(async () => {
    const data = await request('/api/finance-truck/get-finance-trucks');
    setAllFinanceTrucks(Array.isArray(data) ? data : []);
    return data;
  }, [request]);

  const getFinanceTruckById = useCallback(async (id) => (
    request(`/api/finance-truck/get-finance-truck/${id}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const createFinanceTruck = useCallback(async (payload) => {
    const data = await request('/api/finance-truck/create-finance-truck', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Truck finance listing created');
    return data;
  }, [request, userToken]);

  const updateFinanceTruck = useCallback(async (id, payload) => {
    const data = await request(`/api/finance-truck/update-finance-truck/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Truck finance listing updated');
    return data;
  }, [request, userToken]);

  const deleteFinanceTruck = useCallback(async (id) => {
    const data = await request(`/api/finance-truck/delete-finance-truck/${id}`, {
      method: 'DELETE',
      headers: { 'auth-token': userToken || adminToken },
    });
    toast.success('Truck finance listing deleted');
    return data;
  }, [adminToken, request, userToken]);

  const createFinanceTruckRequest = useCallback(async (payload) => {
    const data = await request('/api/finance-truck-negotiation/create-finance-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Finance request sent');
    return data;
  }, [request, userToken]);

  const getUserFinanceTruckNegotiations = useCallback(async () => {
    const data = await request('/api/finance-truck-negotiation/get-my-finance-truck-negotiations', {
      headers: { 'auth-token': userToken },
    });
    setUserFinanceTruckNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);

  const getUserFinanceTruckInstallmentNegotiations = useCallback(async () => {
    const data = await request('/api/finance-truck-negotiation/get-my-installment-truck-negotiations', {
      headers: { 'auth-token': userToken },
    });
    setUserFinanceTruckInstallmentNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);

  const getAllFinanceTruckNegotiations = useCallback(async () => {
    const data = await request('/api/finance-truck-negotiation/get-finance-truck-negotiations');
    setAllFinanceTruckNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request]);

  const getAllFinanceTruckInstallmentNegotiations = useCallback(async () => {
    const data = await request('/api/finance-truck-negotiation/get-installment-truck-negotiations');
    setAllFinanceTruckInstallmentNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request]);

  const getFinanceTruckNegotiationById = useCallback(async (id) => (
    request(`/api/finance-truck-negotiation/get-finance-truck-negotiation/${id}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const addFinanceTruckCounterOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/finance-truck-negotiation/add-counter-offer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Counter offer submitted');
    return data;
  }, [request, userToken]);

  const confirmFinanceTruckCost = useCallback(async (id, payload) => {
    const data = await request(`/api/finance-truck-negotiation/confirm-cost/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Truck cost confirmed');
    return data;
  }, [request, userToken]);

  const acceptFinanceTruckOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/finance-truck-negotiation/accept-offer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Offer accepted');
    return data;
  }, [request, userToken]);

  const submitFinanceTruckAdvanceProof = useCallback(async (id, payload) => {
    const data = await request(`/api/finance-truck-negotiation/submit-advance-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Advance payment proof submitted');
    return data;
  }, [request, userToken]);

  const submitFinanceTruckFinalProof = useCallback(async (id, payload) => {
    const data = await request(`/api/finance-truck-negotiation/submit-final-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Final payment proof submitted');
    return data;
  }, [request, userToken]);

  const submitFinanceTruckInstallmentProof = useCallback(async (id, payload) => {
    const data = await request(`/api/finance-truck-negotiation/submit-installment-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Installment proof submitted');
    return data;
  }, [request, userToken]);

  const updateFinanceTruckNegotiationStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/finance-truck-negotiation/update-finance-truck-negotiation-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Negotiation status updated');
    return data;
  }, [request]);

  const updateFinanceTruckInstallmentStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/finance-truck-negotiation/update-installment-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Installment status updated');
    return data;
  }, [request]);

  const getUserRentalTruckNegotiations = useCallback(async () => {
    const data = await request('/api/rental-truck-negotiation/get-my-rental-truck-negotiations', {
      headers: { 'auth-token': userToken },
    });
    setUserRentalTruckNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);

  const getAllRentalTruckNegotiations = useCallback(async () => {
    const data = await request('/api/rental-truck-negotiation/get-rental-truck-negotiations');
    setAllRentalTruckNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request]);

  const getRentalTruckNegotiationById = useCallback(async (id) => (
    request(`/api/rental-truck-negotiation/get-rental-truck-negotiation/${id}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const createRentalTruckNegotiation = useCallback(async (payload) => {
    const data = await request('/api/rental-truck-negotiation/create-rental-truck-negotiation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Negotiation submitted');
    return data;
  }, [request, userToken]);

  const addRentalTruckCounterOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/rental-truck-negotiation/add-counter-offer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Counter offer submitted');
    return data;
  }, [request, userToken]);

  const acceptRentalTruckOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/rental-truck-negotiation/accept-offer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Offer accepted');
    return data;
  }, [request, userToken]);

  const submitRentalTruckAdvanceProof = useCallback(async (id, payload) => {
    const data = await request(`/api/rental-truck-negotiation/submit-advance-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Advance payment proof submitted');
    return data;
  }, [request, userToken]);

  const submitRentalTruckFinalProof = useCallback(async (id, payload) => {
    const data = await request(`/api/rental-truck-negotiation/submit-final-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Final payment proof submitted');
    return data;
  }, [request, userToken]);

  const updateRentalTruckNegotiationStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/rental-truck-negotiation/update-rental-truck-negotiation-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Negotiation status updated');
    return data;
  }, [request]);

  const getUserRentalConstructionMachineryNegotiations = useCallback(async () => {
    const data = await request('/api/rental-construction-machinery-negotiation/get-my-rental-construction-machinery-negotiations', {
      headers: { 'auth-token': userToken },
    });
    setUserRentalConstructionMachineryNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);

  const getAllRentalConstructionMachineryNegotiations = useCallback(async () => {
    const data = await request('/api/rental-construction-machinery-negotiation/get-rental-construction-machinery-negotiations');
    setAllRentalConstructionMachineryNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request]);

  const getRentalConstructionMachineryNegotiationById = useCallback(async (id) => (
    request(`/api/rental-construction-machinery-negotiation/get-rental-construction-machinery-negotiation/${id}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const createRentalConstructionMachineryNegotiation = useCallback(async (payload) => {
    const data = await request('/api/rental-construction-machinery-negotiation/create-rental-construction-machinery-negotiation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Negotiation submitted');
    return data;
  }, [request, userToken]);

  const addRentalConstructionMachineryCounterOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/rental-construction-machinery-negotiation/add-counter-offer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Counter offer submitted');
    return data;
  }, [request, userToken]);

  const acceptRentalConstructionMachineryOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/rental-construction-machinery-negotiation/accept-offer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Offer accepted');
    return data;
  }, [request, userToken]);

  const submitRentalConstructionMachineryAdvanceProof = useCallback(async (id, payload) => {
    const data = await request(`/api/rental-construction-machinery-negotiation/submit-advance-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Advance payment proof submitted');
    return data;
  }, [request, userToken]);

  const submitRentalConstructionMachineryFinalProof = useCallback(async (id, payload) => {
    const data = await request(`/api/rental-construction-machinery-negotiation/submit-final-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Final payment proof submitted');
    return data;
  }, [request, userToken]);

  const updateRentalConstructionMachineryNegotiationStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/rental-construction-machinery-negotiation/update-rental-construction-machinery-negotiation-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Negotiation status updated');
    return data;
  }, [request]);

  const getUserMachineryNegotiations = useCallback(async () => {
    const data = await request('/api/machinery-negotiation/get-my-construction-machinery-negotiations', {
      headers: { 'auth-token': userToken },
    });
    setUserMachineryNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);

  const getAllMachineryNegotiations = useCallback(async () => {
    const data = await request('/api/machinery-negotiation/get-construction-machinery-negotiations');
    setAllMachineryNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request]);

  const getMachineryNegotiationById = useCallback(async (id) => (
    request(`/api/machinery-negotiation/get-construction-machinery-negotiation/${id}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const createMachineryNegotiation = useCallback(async (payload) => {
    const data = await request('/api/machinery-negotiation/create-construction-machinery-negotiation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Negotiation submitted');
    return data;
  }, [request, userToken]);

  const addMachineryCounterOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/machinery-negotiation/add-counter-offer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Counter offer submitted');
    return data;
  }, [request, userToken]);

  const acceptMachineryOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/machinery-negotiation/accept-offer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Offer accepted');
    return data;
  }, [request, userToken]);

  const submitMachineryAdvanceProof = useCallback(async (id, payload) => {
    const data = await request(`/api/machinery-negotiation/submit-advance-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Advance payment proof submitted');
    return data;
  }, [request, userToken]);

  const submitMachineryFinalProof = useCallback(async (id, payload) => {
    const data = await request(`/api/machinery-negotiation/submit-final-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Final payment proof submitted');
    return data;
  }, [request, userToken]);

  const updateMachineryNegotiationStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/machinery-negotiation/update-construction-machinery-negotiation-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Negotiation status updated');
    return data;
  }, [request]);

  const getUserConstructionMaterialNegotiations = useCallback(async () => {
    const data = await request('/api/material-negotiation/get-my-construction-material-negotiations', {
      headers: { 'auth-token': userToken },
    });
    setUserConstructionMaterialNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);

  const getAllConstructionMaterialNegotiations = useCallback(async () => {
    const data = await request('/api/material-negotiation/get-construction-material-negotiations');
    setAllConstructionMaterialNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request]);

  const getConstructionMaterialNegotiationById = useCallback(async (id) => (
    request(`/api/material-negotiation/get-construction-material-negotiation/${id}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const createConstructionMaterialNegotiation = useCallback(async (payload) => {
    const data = await request('/api/material-negotiation/create-construction-material-negotiation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Negotiation submitted');
    return data;
  }, [request, userToken]);

  const addConstructionMaterialCounterOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/material-negotiation/add-counter-offer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Counter offer submitted');
    return data;
  }, [request, userToken]);

  const acceptConstructionMaterialOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/material-negotiation/accept-offer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Offer accepted');
    return data;
  }, [request, userToken]);

  const submitConstructionMaterialAdvanceProof = useCallback(async (id, payload) => {
    const data = await request(`/api/material-negotiation/submit-advance-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Advance payment proof submitted');
    return data;
  }, [request, userToken]);

  const submitConstructionMaterialFinalProof = useCallback(async (id, payload) => {
    const data = await request(`/api/material-negotiation/submit-final-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Final payment proof submitted');
    return data;
  }, [request, userToken]);

  const updateConstructionMaterialNegotiationStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/material-negotiation/update-construction-material-negotiation-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Negotiation status updated');
    return data;
  }, [request]);

  const getUserRepairServiceNegotiations = useCallback(async () => {
    const data = await request('/api/repair-service-negotiation/get-my-repair-service-negotiations', {
      headers: { 'auth-token': userToken },
    });
    setUserRepairServiceNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);

  const getAllRepairServiceNegotiations = useCallback(async () => {
    const data = await request('/api/repair-service-negotiation/get-repair-service-negotiations');
    setAllRepairServiceNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request]);

  const getRepairServiceNegotiationById = useCallback(async (id) => (
    request(`/api/repair-service-negotiation/get-repair-service-negotiation/${id}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const createRepairServiceNegotiation = useCallback(async (payload) => {
    const data = await request('/api/repair-service-negotiation/create-repair-service-negotiation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Negotiation submitted');
    return data;
  }, [request, userToken]);

  const addRepairServiceCounterOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/repair-service-negotiation/add-counter-offer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Counter offer submitted');
    return data;
  }, [request, userToken]);

  const acceptRepairServiceOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/repair-service-negotiation/accept-offer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Offer accepted');
    return data;
  }, [request, userToken]);

  const submitRepairServiceAdvanceProof = useCallback(async (id, payload) => {
    const data = await request(`/api/repair-service-negotiation/submit-advance-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Advance payment proof submitted');
    return data;
  }, [request, userToken]);

  const submitRepairServiceFinalProof = useCallback(async (id, payload) => {
    const data = await request(`/api/repair-service-negotiation/submit-final-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Final payment proof submitted');
    return data;
  }, [request, userToken]);

  const updateRepairServiceNegotiationStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/repair-service-negotiation/update-repair-service-negotiation-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Negotiation status updated');
    return data;
  }, [request]);

  const getUserConstructionServiceNegotiations = useCallback(async () => {
    const data = await request('/api/construction-service-negotiation/get-my-construction-service-negotiations', {
      headers: { 'auth-token': userToken },
    });
    setUserConstructionServiceNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);

  const getAllConstructionServiceNegotiations = useCallback(async () => {
    const data = await request('/api/construction-service-negotiation/get-construction-service-negotiations');
    setAllConstructionServiceNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request]);

  const getConstructionServiceNegotiationById = useCallback(async (id) => (
    request(`/api/construction-service-negotiation/get-construction-service-negotiation/${id}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const createConstructionServiceNegotiation = useCallback(async (payload) => {
    const data = await request('/api/construction-service-negotiation/create-construction-service-negotiation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Negotiation submitted');
    return data;
  }, [request, userToken]);

  const addConstructionServiceCounterOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/construction-service-negotiation/add-counter-offer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Counter offer submitted');
    return data;
  }, [request, userToken]);

  const acceptConstructionServiceOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/construction-service-negotiation/accept-offer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Offer accepted');
    return data;
  }, [request, userToken]);

  const submitConstructionServiceAdvanceProof = useCallback(async (id, payload) => {
    const data = await request(`/api/construction-service-negotiation/submit-advance-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Advance payment proof submitted');
    return data;
  }, [request, userToken]);

  const submitConstructionServiceFinalProof = useCallback(async (id, payload) => {
    const data = await request(`/api/construction-service-negotiation/submit-final-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Final payment proof submitted');
    return data;
  }, [request, userToken]);

  const updateConstructionServiceMilestone = useCallback(async (id, payload) => {
    const data = await request(`/api/construction-service-negotiation/update-milestone/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Milestone updated');
    return data;
  }, [request, userToken]);

  const updateConstructionServiceNegotiationStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/construction-service-negotiation/update-construction-service-negotiation-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Negotiation status updated');
    return data;
  }, [request]);

  const getUserTruckInspectionServiceNegotiations = useCallback(async () => {
    const data = await request('/api/truck-inspection-service-negotiation/get-visible-truck-inspection-service-negotiations', {
      headers: { 'auth-token': userToken },
    });
    setUserTruckInspectionServiceNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);

  const getAllTruckInspectionServiceNegotiations = useCallback(async () => {
    const data = await request('/api/truck-inspection-service-negotiation/get-truck-inspection-service-negotiations');
    setAllTruckInspectionServiceNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request]);

  const getTruckInspectionServiceNegotiationById = useCallback(async (id) => (
    request(`/api/truck-inspection-service-negotiation/get-truck-inspection-service-negotiation/${id}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const searchNegotiationEligibleTrucks = useCallback(async (inspectionServiceId, query = '') => (
    request(`/api/truck-inspection-service-negotiation/search-trucks?inspectionServiceId=${encodeURIComponent(inspectionServiceId || '')}&q=${encodeURIComponent(query)}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const createTruckInspectionServiceNegotiation = useCallback(async (payload) => {
    const data = await request('/api/truck-inspection-service-negotiation/create-truck-inspection-service-negotiation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Inspection negotiation submitted');
    return data;
  }, [request, userToken]);

  const addTruckInspectionServiceCounterOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/truck-inspection-service-negotiation/add-counter-offer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Counter offer submitted');
    return data;
  }, [request, userToken]);

  const acceptTruckInspectionServiceOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/truck-inspection-service-negotiation/accept-offer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Offer accepted');
    return data;
  }, [request, userToken]);

  const submitTruckInspectionServiceAdvanceProof = useCallback(async (id, payload) => {
    const data = await request(`/api/truck-inspection-service-negotiation/submit-advance-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Advance payment proof submitted');
    return data;
  }, [request, userToken]);

  const submitTruckInspectionServiceFinalProof = useCallback(async (id, payload) => {
    const data = await request(`/api/truck-inspection-service-negotiation/submit-final-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Final payment proof submitted');
    return data;
  }, [request, userToken]);

  const updateTruckInspectionServiceNegotiationStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/truck-inspection-service-negotiation/update-truck-inspection-service-negotiation-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Negotiation status updated');
    return data;
  }, [request]);

  const getUserTruckInspectionReports = useCallback(async () => {
    const data = await request('/api/truck-inspection-report/get-visible-truck-inspection-reports', {
      headers: { 'auth-token': userToken },
    });
    setUserTruckInspectionReports(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);

  const getAllTruckInspectionReports = useCallback(async () => {
    const data = await request('/api/truck-inspection-report/get-truck-inspection-reports');
    setAllTruckInspectionReports(Array.isArray(data) ? data : []);
    return data;
  }, [request]);

  const getTruckInspectionReportById = useCallback(async (id) => (
    request(`/api/truck-inspection-report/get-truck-inspection-report/${id}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const searchEligibleTruckInspectionNegotiations = useCallback(async (query = '') => (
    request(`/api/truck-inspection-report/search-eligible-negotiations?q=${encodeURIComponent(query)}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const createTruckInspectionReport = useCallback(async (payload) => {
    const data = await request('/api/truck-inspection-report/create-truck-inspection-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Truck inspection report created');
    return data;
  }, [request, userToken]);

  const updateTruckInspectionReportStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/truck-inspection-report/update-truck-inspection-report-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Inspection report status updated');
    return data;
  }, [request]);

  const getUserMachineryInspectionNegotiations = useCallback(async () => {
    const data = await request('/api/machinery-inspection-negotiation/get-visible-machinery-inspection-negotiations', {
      headers: { 'auth-token': userToken },
    });
    setUserMachineryInspectionNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);

  const getAllMachineryInspectionNegotiations = useCallback(async () => {
    const data = await request('/api/machinery-inspection-negotiation/get-machinery-inspection-negotiations');
    setAllMachineryInspectionNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request]);

  const getMachineryInspectionNegotiationById = useCallback(async (id) => (
    request(`/api/machinery-inspection-negotiation/get-machinery-inspection-negotiation/${id}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const searchNegotiationEligibleMachineries = useCallback(async (inspectionServiceId, query = '') => (
    request(`/api/machinery-inspection-negotiation/search-machineries?inspectionServiceId=${encodeURIComponent(inspectionServiceId || '')}&q=${encodeURIComponent(query)}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const createMachineryInspectionNegotiation = useCallback(async (payload) => {
    const data = await request('/api/machinery-inspection-negotiation/create-machinery-inspection-negotiation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Machinery inspection negotiation submitted');
    return data;
  }, [request, userToken]);

  const addMachineryInspectionCounterOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/machinery-inspection-negotiation/add-counter-offer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Counter offer submitted');
    return data;
  }, [request, userToken]);

  const acceptMachineryInspectionOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/machinery-inspection-negotiation/accept-offer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Offer accepted');
    return data;
  }, [request, userToken]);

  const submitMachineryInspectionAdvanceProof = useCallback(async (id, payload) => {
    const data = await request(`/api/machinery-inspection-negotiation/submit-advance-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Advance payment proof submitted');
    return data;
  }, [request, userToken]);

  const submitMachineryInspectionFinalProof = useCallback(async (id, payload) => {
    const data = await request(`/api/machinery-inspection-negotiation/submit-final-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Final payment proof submitted');
    return data;
  }, [request, userToken]);

  const updateMachineryInspectionNegotiationStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/machinery-inspection-negotiation/update-machinery-inspection-negotiation-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Negotiation status updated');
    return data;
  }, [request]);

  const getUserMachineryInspectionReports = useCallback(async () => {
    const data = await request('/api/machinery-inspection-report/get-visible-machinery-inspection-reports', {
      headers: { 'auth-token': userToken },
    });
    setUserMachineryInspectionReports(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);

  const getAllMachineryInspectionReports = useCallback(async () => {
    const data = await request('/api/machinery-inspection-report/get-machinery-inspection-reports');
    setAllMachineryInspectionReports(Array.isArray(data) ? data : []);
    return data;
  }, [request]);

  const getMachineryInspectionReportById = useCallback(async (id) => (
    request(`/api/machinery-inspection-report/get-machinery-inspection-report/${id}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const searchEligibleMachineryInspectionNegotiations = useCallback(async (query = '') => (
    request(`/api/machinery-inspection-report/search-eligible-negotiations?q=${encodeURIComponent(query)}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const createMachineryInspectionReport = useCallback(async (payload) => {
    const data = await request('/api/machinery-inspection-report/create-machinery-inspection-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Machinery inspection report created');
    return data;
  }, [request, userToken]);

  const updateMachineryInspectionReportStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/machinery-inspection-report/update-machinery-inspection-report-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Inspection report status updated');
    return data;
  }, [request]);

  const getUserSparePartInspectionNegotiations = useCallback(async () => {
    const data = await request('/api/spare-part-inspection-negotiation/get-visible-spare-part-inspection-negotiations', {
      headers: { 'auth-token': userToken },
    });
    setUserSparePartInspectionNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);

  const getAllSparePartInspectionNegotiations = useCallback(async () => {
    const data = await request('/api/spare-part-inspection-negotiation/get-spare-part-inspection-negotiations');
    setAllSparePartInspectionNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request]);

  const getSparePartInspectionNegotiationById = useCallback(async (id) => (
    request(`/api/spare-part-inspection-negotiation/get-spare-part-inspection-negotiation/${id}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const searchNegotiationEligibleSpareParts = useCallback(async (inspectionServiceId, query = '') => (
    request(`/api/spare-part-inspection-negotiation/search-spare-parts?inspectionServiceId=${encodeURIComponent(inspectionServiceId || '')}&q=${encodeURIComponent(query)}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const createSparePartInspectionNegotiation = useCallback(async (payload) => {
    const data = await request('/api/spare-part-inspection-negotiation/create-spare-part-inspection-negotiation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Spare part inspection negotiation submitted');
    return data;
  }, [request, userToken]);

  const addSparePartInspectionCounterOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/spare-part-inspection-negotiation/add-counter-offer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Counter offer submitted');
    return data;
  }, [request, userToken]);

  const acceptSparePartInspectionOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/spare-part-inspection-negotiation/accept-offer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Offer accepted');
    return data;
  }, [request, userToken]);

  const submitSparePartInspectionAdvanceProof = useCallback(async (id, payload) => {
    const data = await request(`/api/spare-part-inspection-negotiation/submit-advance-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Advance payment proof submitted');
    return data;
  }, [request, userToken]);

  const submitSparePartInspectionFinalProof = useCallback(async (id, payload) => {
    const data = await request(`/api/spare-part-inspection-negotiation/submit-final-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Final payment proof submitted');
    return data;
  }, [request, userToken]);

  const updateSparePartInspectionNegotiationStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/spare-part-inspection-negotiation/update-spare-part-inspection-negotiation-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Negotiation status updated');
    return data;
  }, [request]);

  const getUserSparePartInspectionReports = useCallback(async () => {
    const data = await request('/api/spare-part-inspection-report/get-visible-spare-part-inspection-reports', {
      headers: { 'auth-token': userToken },
    });
    setUserSparePartInspectionReports(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);

  const getAllSparePartInspectionReports = useCallback(async () => {
    const data = await request('/api/spare-part-inspection-report/get-spare-part-inspection-reports');
    setAllSparePartInspectionReports(Array.isArray(data) ? data : []);
    return data;
  }, [request]);

  const getSparePartInspectionReportById = useCallback(async (id) => (
    request(`/api/spare-part-inspection-report/get-spare-part-inspection-report/${id}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const searchEligibleSparePartInspectionNegotiations = useCallback(async (query = '') => (
    request(`/api/spare-part-inspection-report/search-eligible-negotiations?q=${encodeURIComponent(query)}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const createSparePartInspectionReport = useCallback(async (payload) => {
    const data = await request('/api/spare-part-inspection-report/create-spare-part-inspection-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Spare part inspection report created');
    return data;
  }, [request, userToken]);

  const updateSparePartInspectionReportStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/spare-part-inspection-report/update-spare-part-inspection-report-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Inspection report status updated');
    return data;
  }, [request]);

  const getUserConstructionMaterialInspectionNegotiations = useCallback(async () => {
    const data = await request('/api/construction-material-inspection-negotiation/get-visible-construction-material-inspection-negotiations', {
      headers: { 'auth-token': userToken },
    });
    setUserConstructionMaterialInspectionNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);

  const getAllConstructionMaterialInspectionNegotiations = useCallback(async () => {
    const data = await request('/api/construction-material-inspection-negotiation/get-construction-material-inspection-negotiations');
    setAllConstructionMaterialInspectionNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request]);

  const getConstructionMaterialInspectionNegotiationById = useCallback(async (id) => (
    request(`/api/construction-material-inspection-negotiation/get-construction-material-inspection-negotiation/${id}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const searchNegotiationEligibleConstructionMaterials = useCallback(async (inspectionServiceId, query = '') => (
    request(`/api/construction-material-inspection-negotiation/search-construction-materials?inspectionServiceId=${encodeURIComponent(inspectionServiceId || '')}&q=${encodeURIComponent(query)}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const createConstructionMaterialInspectionNegotiation = useCallback(async (payload) => {
    const data = await request('/api/construction-material-inspection-negotiation/create-construction-material-inspection-negotiation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Construction material inspection negotiation submitted');
    return data;
  }, [request, userToken]);

  const addConstructionMaterialInspectionCounterOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/construction-material-inspection-negotiation/add-counter-offer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Counter offer submitted');
    return data;
  }, [request, userToken]);

  const acceptConstructionMaterialInspectionOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/construction-material-inspection-negotiation/accept-offer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Offer accepted');
    return data;
  }, [request, userToken]);

  const submitConstructionMaterialInspectionAdvanceProof = useCallback(async (id, payload) => {
    const data = await request(`/api/construction-material-inspection-negotiation/submit-advance-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Advance payment proof submitted');
    return data;
  }, [request, userToken]);

  const submitConstructionMaterialInspectionFinalProof = useCallback(async (id, payload) => {
    const data = await request(`/api/construction-material-inspection-negotiation/submit-final-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Final payment proof submitted');
    return data;
  }, [request, userToken]);

  const updateConstructionMaterialInspectionNegotiationStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/construction-material-inspection-negotiation/update-construction-material-inspection-negotiation-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Negotiation status updated');
    return data;
  }, [request]);

  const getUserConstructionMaterialInspectionReports = useCallback(async () => {
    const data = await request('/api/construction-material-inspection-report/get-visible-construction-material-inspection-reports', {
      headers: { 'auth-token': userToken },
    });
    setUserConstructionMaterialInspectionReports(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);

  const getAllConstructionMaterialInspectionReports = useCallback(async () => {
    const data = await request('/api/construction-material-inspection-report/get-construction-material-inspection-reports');
    setAllConstructionMaterialInspectionReports(Array.isArray(data) ? data : []);
    return data;
  }, [request]);

  const getConstructionMaterialInspectionReportById = useCallback(async (id) => (
    request(`/api/construction-material-inspection-report/get-construction-material-inspection-report/${id}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const searchEligibleConstructionMaterialInspectionNegotiations = useCallback(async (query = '') => (
    request(`/api/construction-material-inspection-report/search-eligible-negotiations?q=${encodeURIComponent(query)}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const createConstructionMaterialInspectionReport = useCallback(async (payload) => {
    const data = await request('/api/construction-material-inspection-report/create-construction-material-inspection-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Construction material inspection report created');
    return data;
  }, [request, userToken]);

  const updateConstructionMaterialInspectionReportStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/construction-material-inspection-report/update-construction-material-inspection-report-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Inspection report status updated');
    return data;
  }, [request]);

  const getUserSparePartNegotiations = useCallback(async () => {
    const data = await request('/api/spare-part-negotiation/get-my-spare-part-negotiations', {
      headers: { 'auth-token': userToken },
    });
    setUserSparePartNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);

  const getAllSparePartNegotiations = useCallback(async () => {
    const data = await request('/api/spare-part-negotiation/get-spare-part-negotiations');
    setAllSparePartNegotiations(Array.isArray(data) ? data : []);
    return data;
  }, [request]);

  const getSparePartNegotiationById = useCallback(async (id) => (
    request(`/api/spare-part-negotiation/get-spare-part-negotiation/${id}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const createSparePartNegotiation = useCallback(async (payload) => {
    const data = await request('/api/spare-part-negotiation/create-spare-part-negotiation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Negotiation submitted');
    return data;
  }, [request, userToken]);

  const addSparePartCounterOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/spare-part-negotiation/add-counter-offer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Counter offer submitted');
    return data;
  }, [request, userToken]);

  const acceptSparePartOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/spare-part-negotiation/accept-offer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Offer accepted');
    return data;
  }, [request, userToken]);

  const submitSparePartAdvanceProof = useCallback(async (id, payload) => {
    const data = await request(`/api/spare-part-negotiation/submit-advance-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Advance payment proof submitted');
    return data;
  }, [request, userToken]);

  const submitSparePartFinalProof = useCallback(async (id, payload) => {
    const data = await request(`/api/spare-part-negotiation/submit-final-proof/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Final payment proof submitted');
    return data;
  }, [request, userToken]);

  const updateSparePartNegotiationStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/spare-part-negotiation/update-spare-part-negotiation-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Negotiation status updated');
    return data;
  }, [request]);

  const getUserTruckMeetings = useCallback(async () => {
    const data = await request('/api/truck-meeting/get-my-truck-meetings', {
      headers: { 'auth-token': userToken },
    });
    setUserTruckMeetings(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);

  const getAllTruckMeetings = useCallback(async () => {
    const data = await request('/api/truck-meeting/get-truck-meetings');
    setAllTruckMeetings(Array.isArray(data) ? data : []);
    return data;
  }, [request]);

  const getTruckMeetingById = useCallback(async (id) => (
    request(`/api/truck-meeting/get-truck-meeting/${id}`, {
      headers: { 'auth-token': userToken || adminToken },
    })
  ), [adminToken, request, userToken]);

  const createTruckMeeting = useCallback(async (payload) => {
    const data = await request('/api/truck-meeting/create-truck-meeting', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Meeting request submitted');
    return data;
  }, [request, userToken]);

  const addTruckMeetingCounterOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/truck-meeting/add-counter-meeting/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Counter meeting submitted');
    return data;
  }, [request, userToken]);

  const acceptTruckMeetingOffer = useCallback(async (id, payload) => {
    const data = await request(`/api/truck-meeting/accept-meeting/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify(payload),
    });
    toast.success('Meeting schedule accepted');
    return data;
  }, [request, userToken]);

  const updateTruckMeetingStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/truck-meeting/update-truck-meeting-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Meeting status updated');
    return data;
  }, [request]);

  const getApprovedTrucks = useCallback(async () => {
    const data = await request('/api/truck/get-trucks?approvalStatus=approved');
    setAllTrucks(Array.isArray(data) ? data : []);
    return data;
  }, [request]);
  const getMarketplaceTrucks = useCallback(async (filters = {}) => {
    const params = new URLSearchParams();
    (filters.category || []).forEach((item) => params.append('category', item));
    (filters.city || []).forEach((item) => params.append('city', item));
    if (filters.modelYearFrom !== '' && filters.modelYearFrom !== undefined) params.set('modelYearFrom', filters.modelYearFrom);
    if (filters.modelYearTo !== '' && filters.modelYearTo !== undefined) params.set('modelYearTo', filters.modelYearTo);
    if (filters.priceFrom !== '' && filters.priceFrom !== undefined) params.set('priceFrom', filters.priceFrom);
    if (filters.priceTo !== '' && filters.priceTo !== undefined) params.set('priceTo', filters.priceTo);
    const suffix = params.toString() ? `?${params.toString()}` : '';
    const data = await request(`/api/truck/get-marketplace-trucks${suffix}`);
    setAllTrucks(Array.isArray(data) ? data : []);
    return data;
  }, [request]);
  const getMarketplaceMachineries = useCallback(async (filters = {}) => {
    const params = new URLSearchParams();
    (filters.category || []).forEach((item) => params.append('category', item));
    (filters.city || []).forEach((item) => params.append('city', item));
    if (filters.modelYearFrom !== '' && filters.modelYearFrom !== undefined) params.set('modelYearFrom', filters.modelYearFrom);
    if (filters.modelYearTo !== '' && filters.modelYearTo !== undefined) params.set('modelYearTo', filters.modelYearTo);
    if (filters.priceFrom !== '' && filters.priceFrom !== undefined) params.set('priceFrom', filters.priceFrom);
    if (filters.priceTo !== '' && filters.priceTo !== undefined) params.set('priceTo', filters.priceTo);
    const suffix = params.toString() ? `?${params.toString()}` : '';
    const data = await request(`/api/machinery/get-marketplace-machineries${suffix}`);
    setAllMachineries(Array.isArray(data) ? data : []);
    return data;
  }, [request]);
  const getMarketplaceSpareParts = useCallback(async (filters = {}) => {
    const params = new URLSearchParams();
    (filters.category || []).forEach((item) => params.append('category', item));
    (filters.subcategory || []).forEach((item) => params.append('subcategory', item));
    (filters.city || []).forEach((item) => params.append('city', item));
    if (filters.priceFrom !== '' && filters.priceFrom !== undefined) params.set('priceFrom', filters.priceFrom);
    if (filters.priceTo !== '' && filters.priceTo !== undefined) params.set('priceTo', filters.priceTo);
    const suffix = params.toString() ? `?${params.toString()}` : '';
    const data = await request(`/api/spare-part/get-marketplace-spare-parts${suffix}`);
    setAllSpareParts(Array.isArray(data) ? data : []);
    return data;
  }, [request]);
  const getMarketplaceMaterials = useCallback(async (filters = {}) => {
    const params = new URLSearchParams();
    (filters.category || []).forEach((item) => params.append('category', item));
    (filters.subcategory || []).forEach((item) => params.append('subcategory', item));
    (filters.city || []).forEach((item) => params.append('city', item));
    if (filters.priceFrom !== '' && filters.priceFrom !== undefined) params.set('priceFrom', filters.priceFrom);
    if (filters.priceTo !== '' && filters.priceTo !== undefined) params.set('priceTo', filters.priceTo);
    const suffix = params.toString() ? `?${params.toString()}` : '';
    const data = await request(`/api/material/get-marketplace-materials${suffix}`);
    setAllMaterials(Array.isArray(data) ? data : []);
    return data;
  }, [request]);
  const getAllTrucks = useCallback(async () => {
    const data = await request('/api/truck/get-trucks');
    setAllTrucks(Array.isArray(data) ? data : []);
    return data;
  }, [request]);
  const getUserTrucks = useCallback(async () => {
    const data = await request('/api/truck/get-trucks/me', {
      headers: { 'auth-token': userToken },
    });
    setUserTrucks(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);
  const getTruckById = useCallback((id) => request(`/api/truck/get-truck/${id}`), [request]);
  const createTruck = useCallback(async (payload) => {
    const data = await request('/api/truck/create-truck', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify({ ...payload, approvalStatus: 'pending', rejectionReason: '' }),
    });
    toast.success('Truck listing created');
    return data;
  }, [request, userToken]);
  const updateTruck = useCallback(async (id, payload) => {
    const data = await request(`/api/truck/update-truck/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify({ ...payload, approvalStatus: 'pending', rejectionReason: '' }),
    });
    toast.success('Truck listing updated');
    return data;
  }, [request, userToken]);
  const deleteTruck = useCallback(async (id) => {
    const data = await request(`/api/truck/delete-truck/${id}`, {
      method: 'DELETE',
      headers: { 'auth-token': userToken || adminToken },
    });
    toast.success('Truck listing deleted');
    return data;
  }, [adminToken, request, userToken]);
  const updateTruckStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/truck/update-truck-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Truck status updated');
    return data;
  }, [request]);

  const getApprovedRentalTrucks = useCallback(async () => {
    const data = await request('/api/rental-truck/get-rental-trucks?approvalStatus=approved');
    setAllRentalTrucks(Array.isArray(data) ? data : []);
    return data;
  }, [request]);
  const getAllRentalTrucks = useCallback(async () => {
    const data = await request('/api/rental-truck/get-rental-trucks');
    setAllRentalTrucks(Array.isArray(data) ? data : []);
    return data;
  }, [request]);
  const getUserRentalTrucks = useCallback(async () => {
    const data = await request('/api/rental-truck/get-rental-trucks/me', {
      headers: { 'auth-token': userToken },
    });
    setUserRentalTrucks(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);
  const getRentalTruckById = useCallback((id) => request(`/api/rental-truck/get-rental-truck/${id}`), [request]);
  const createRentalTruck = useCallback(async (payload) => {
    const data = await request('/api/rental-truck/create-rental-truck', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify({ ...payload, approvalStatus: 'pending', rejectionReason: '' }),
    });
    toast.success('Rental truck listing created');
    return data;
  }, [request, userToken]);
  const updateRentalTruck = useCallback(async (id, payload) => {
    const data = await request(`/api/rental-truck/update-rental-truck/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify({ ...payload, approvalStatus: 'pending', rejectionReason: '' }),
    });
    toast.success('Rental truck listing updated');
    return data;
  }, [request, userToken]);
  const deleteRentalTruck = useCallback(async (id) => {
    const data = await request(`/api/rental-truck/delete-rental-truck/${id}`, {
      method: 'DELETE',
      headers: { 'auth-token': userToken || adminToken },
    });
    toast.success('Rental truck listing deleted');
    return data;
  }, [adminToken, request, userToken]);
  const updateRentalTruckStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/rental-truck/update-rental-truck-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Rental truck status updated');
    return data;
  }, [request]);

  const getApprovedMaterials = useCallback(async () => {
    const data = await request('/api/material/get-materials?approvalStatus=approved');
    setAllMaterials(Array.isArray(data) ? data : []);
    return data;
  }, [request]);
  const getAllMaterials = useCallback(async () => {
    const data = await request('/api/material/get-materials');
    setAllMaterials(Array.isArray(data) ? data : []);
    return data;
  }, [request]);
  const getUserMaterials = useCallback(async () => {
    const data = await request('/api/material/get-materials/me', {
      headers: { 'auth-token': userToken },
    });
    setUserMaterials(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);
  const getMaterialById = useCallback((id) => request(`/api/material/get-material/${id}`), [request]);
  const createMaterial = useCallback(async (payload) => {
    const data = await request('/api/material/create-material', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify({ ...payload, approvalStatus: 'pending', rejectionReason: '' }),
    });
    toast.success('Construction material listing created');
    return data;
  }, [request, userToken]);
  const updateMaterial = useCallback(async (id, payload) => {
    const data = await request(`/api/material/update-material/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify({ ...payload, approvalStatus: 'pending', rejectionReason: '' }),
    });
    toast.success('Construction material listing updated');
    return data;
  }, [request, userToken]);
  const deleteMaterial = useCallback(async (id) => {
    const data = await request(`/api/material/delete-material/${id}`, {
      method: 'DELETE',
      headers: { 'auth-token': userToken || adminToken },
    });
    toast.success('Construction material listing deleted');
    return data;
  }, [adminToken, request, userToken]);
  const updateMaterialStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/material/update-material-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Construction material status updated');
    return data;
  }, [request]);

  const getApprovedMachineries = useCallback(async () => {
    const data = await request('/api/machinery/get-machineries?approvalStatus=approved');
    setAllMachineries(Array.isArray(data) ? data : []);
    return data;
  }, [request]);
  const getAllMachineries = useCallback(async () => {
    const data = await request('/api/machinery/get-machineries');
    setAllMachineries(Array.isArray(data) ? data : []);
    return data;
  }, [request]);
  const getUserMachineries = useCallback(async () => {
    const data = await request('/api/machinery/get-machineries/me', {
      headers: { 'auth-token': userToken },
    });
    setUserMachineries(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);
  const getMachineryById = useCallback((id) => request(`/api/machinery/get-machinery/${id}`), [request]);
  const createMachinery = useCallback(async (payload) => {
    const data = await request('/api/machinery/create-machinery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify({ ...payload, approvalStatus: 'pending', rejectionReason: '' }),
    });
    toast.success('Construction machinery listing created');
    return data;
  }, [request, userToken]);
  const updateMachinery = useCallback(async (id, payload) => {
    const data = await request(`/api/machinery/update-machinery/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify({ ...payload, approvalStatus: 'pending', rejectionReason: '' }),
    });
    toast.success('Construction machinery listing updated');
    return data;
  }, [request, userToken]);
  const deleteMachinery = useCallback(async (id) => {
    const data = await request(`/api/machinery/delete-machinery/${id}`, {
      method: 'DELETE',
      headers: { 'auth-token': userToken || adminToken },
    });
    toast.success('Construction machinery listing deleted');
    return data;
  }, [adminToken, request, userToken]);
  const updateMachineryStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/machinery/update-machinery-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Construction machinery status updated');
    return data;
  }, [request]);

  const getApprovedRentalMachineries = useCallback(async () => {
    const data = await request('/api/rental-machinery/get-rental-machineries?approvalStatus=approved');
    setAllRentalMachineries(Array.isArray(data) ? data : []);
    return data;
  }, [request]);
  const getAllRentalMachineries = useCallback(async () => {
    const data = await request('/api/rental-machinery/get-rental-machineries');
    setAllRentalMachineries(Array.isArray(data) ? data : []);
    return data;
  }, [request]);
  const getUserRentalMachineries = useCallback(async () => {
    const data = await request('/api/rental-machinery/get-rental-machineries/me', {
      headers: { 'auth-token': userToken },
    });
    setUserRentalMachineries(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);
  const getRentalMachineryById = useCallback((id) => request(`/api/rental-machinery/get-rental-machinery/${id}`), [request]);
  const createRentalMachinery = useCallback(async (payload) => {
    const data = await request('/api/rental-machinery/create-rental-machinery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify({ ...payload, approvalStatus: 'pending', rejectionReason: '' }),
    });
    toast.success('Rental construction machinery listing created');
    return data;
  }, [request, userToken]);
  const updateRentalMachinery = useCallback(async (id, payload) => {
    const data = await request(`/api/rental-machinery/update-rental-machinery/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify({ ...payload, approvalStatus: 'pending', rejectionReason: '' }),
    });
    toast.success('Rental construction machinery listing updated');
    return data;
  }, [request, userToken]);
  const deleteRentalMachinery = useCallback(async (id) => {
    const data = await request(`/api/rental-machinery/delete-rental-machinery/${id}`, {
      method: 'DELETE',
      headers: { 'auth-token': userToken || adminToken },
    });
    toast.success('Rental construction machinery listing deleted');
    return data;
  }, [adminToken, request, userToken]);
  const updateRentalMachineryStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/rental-machinery/update-rental-machinery-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Rental construction machinery status updated');
    return data;
  }, [request]);

  const getApprovedSpareParts = useCallback(async () => {
    const data = await request('/api/spare-part/get-spare-parts?approvalStatus=approved');
    setAllSpareParts(Array.isArray(data) ? data : []);
    return data;
  }, [request]);
  const getAllSpareParts = useCallback(async () => {
    const data = await request('/api/spare-part/get-spare-parts');
    setAllSpareParts(Array.isArray(data) ? data : []);
    return data;
  }, [request]);
  const getUserSpareParts = useCallback(async () => {
    const data = await request('/api/spare-part/get-spare-parts/me', {
      headers: { 'auth-token': userToken },
    });
    setUserSpareParts(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);
  const getSparePartById = useCallback((id) => request(`/api/spare-part/get-spare-part/${id}`), [request]);
  const createSparePart = useCallback(async (payload) => {
    const data = await request('/api/spare-part/create-spare-part', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify({ ...payload, approvalStatus: 'pending', rejectionReason: '' }),
    });
    toast.success('Spare part listing created');
    return data;
  }, [request, userToken]);
  const updateSparePart = useCallback(async (id, payload) => {
    const data = await request(`/api/spare-part/update-spare-part/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify({ ...payload, approvalStatus: 'pending', rejectionReason: '' }),
    });
    toast.success('Spare part listing updated');
    return data;
  }, [request, userToken]);
  const deleteSparePart = useCallback(async (id) => {
    const data = await request(`/api/spare-part/delete-spare-part/${id}`, {
      method: 'DELETE',
      headers: { 'auth-token': userToken || adminToken },
    });
    toast.success('Spare part listing deleted');
    return data;
  }, [adminToken, request, userToken]);
  const updateSparePartStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/spare-part/update-spare-part-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Spare part status updated');
    return data;
  }, [request]);

  const getApprovedConstructionServices = useCallback(async () => {
    const data = await request('/api/construction-service/get-construction-services?approvalStatus=approved');
    setAllConstructionServices(Array.isArray(data) ? data : []);
    return data;
  }, [request]);
  const getAllConstructionServices = useCallback(async () => {
    const data = await request('/api/construction-service/get-construction-services');
    setAllConstructionServices(Array.isArray(data) ? data : []);
    return data;
  }, [request]);
  const getUserConstructionServices = useCallback(async () => {
    const data = await request('/api/construction-service/get-construction-services/me', {
      headers: { 'auth-token': userToken },
    });
    setUserConstructionServices(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);
  const getConstructionServiceById = useCallback((id) => request(`/api/construction-service/get-construction-service/${id}`), [request]);
  const createConstructionService = useCallback(async (payload) => {
    const data = await request('/api/construction-service/create-construction-service', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify({ ...payload, approvalStatus: 'pending', rejectionReason: '' }),
    });
    toast.success('Construction service listing created');
    return data;
  }, [request, userToken]);
  const updateConstructionService = useCallback(async (id, payload) => {
    const data = await request(`/api/construction-service/update-construction-service/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify({ ...payload, approvalStatus: 'pending', rejectionReason: '' }),
    });
    toast.success('Construction service listing updated');
    return data;
  }, [request, userToken]);
  const deleteConstructionService = useCallback(async (id) => {
    const data = await request(`/api/construction-service/delete-construction-service/${id}`, {
      method: 'DELETE',
      headers: { 'auth-token': userToken || adminToken },
    });
    toast.success('Construction service listing deleted');
    return data;
  }, [adminToken, request, userToken]);
  const updateConstructionServiceStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/construction-service/update-construction-service-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Construction service status updated');
    return data;
  }, [request]);

  const getApprovedInspectionServices = useCallback(async () => {
    const data = await request('/api/inspection-service/get-inspection-services?approvalStatus=approved');
    setAllInspectionServices(Array.isArray(data) ? data : []);
    return data;
  }, [request]);
  const getAllInspectionServices = useCallback(async () => {
    const data = await request('/api/inspection-service/get-inspection-services');
    setAllInspectionServices(Array.isArray(data) ? data : []);
    return data;
  }, [request]);
  const getUserInspectionServices = useCallback(async () => {
    const data = await request('/api/inspection-service/get-inspection-services/me', {
      headers: { 'auth-token': userToken },
    });
    setUserInspectionServices(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);
  const getInspectionServiceById = useCallback((id) => request(`/api/inspection-service/get-inspection-service/${id}`), [request]);
  const createInspectionService = useCallback(async (payload) => {
    const data = await request('/api/inspection-service/create-inspection-service', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify({ ...payload, approvalStatus: 'pending', rejectionReason: '' }),
    });
    toast.success('Inspection service listing created');
    return data;
  }, [request, userToken]);
  const updateInspectionService = useCallback(async (id, payload) => {
    const data = await request(`/api/inspection-service/update-inspection-service/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify({ ...payload, approvalStatus: 'pending', rejectionReason: '' }),
    });
    toast.success('Inspection service listing updated');
    return data;
  }, [request, userToken]);
  const deleteInspectionService = useCallback(async (id) => {
    const data = await request(`/api/inspection-service/delete-inspection-service/${id}`, {
      method: 'DELETE',
      headers: { 'auth-token': userToken || adminToken },
    });
    toast.success('Inspection service listing deleted');
    return data;
  }, [adminToken, request, userToken]);
  const updateInspectionServiceStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/inspection-service/update-inspection-service-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Inspection service status updated');
    return data;
  }, [request]);

  const getApprovedRepairServices = useCallback(async () => {
    const data = await request('/api/repair-service/get-repair-services?approvalStatus=approved');
    setAllRepairServices(Array.isArray(data) ? data : []);
    return data;
  }, [request]);
  const getAllRepairServices = useCallback(async () => {
    const data = await request('/api/repair-service/get-repair-services');
    setAllRepairServices(Array.isArray(data) ? data : []);
    return data;
  }, [request]);
  const getUserRepairServices = useCallback(async () => {
    const data = await request('/api/repair-service/get-repair-services/me', {
      headers: { 'auth-token': userToken },
    });
    setUserRepairServices(Array.isArray(data) ? data : []);
    return data;
  }, [request, userToken]);
  const getRepairServiceById = useCallback((id) => request(`/api/repair-service/get-repair-service/${id}`), [request]);
  const createRepairService = useCallback(async (payload) => {
    const data = await request('/api/repair-service/create-repair-service', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify({ ...payload, approvalStatus: 'pending', rejectionReason: '' }),
    });
    toast.success('Repair service listing created');
    return data;
  }, [request, userToken]);
  const updateRepairService = useCallback(async (id, payload) => {
    const data = await request(`/api/repair-service/update-repair-service/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'auth-token': userToken },
      body: JSON.stringify({ ...payload, approvalStatus: 'pending', rejectionReason: '' }),
    });
    toast.success('Repair service listing updated');
    return data;
  }, [request, userToken]);
  const deleteRepairService = useCallback(async (id) => {
    const data = await request(`/api/repair-service/delete-repair-service/${id}`, {
      method: 'DELETE',
      headers: { 'auth-token': userToken || adminToken },
    });
    toast.success('Repair service listing deleted');
    return data;
  }, [adminToken, request, userToken]);
  const updateRepairServiceStatus = useCallback(async (id, payload) => {
    const data = await request(`/api/repair-service/update-repair-service-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    toast.success('Repair service status updated');
    return data;
  }, [request]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const contextValue = useMemo(() => ({
    globalLoader,
    API_BASE,
    adminToken,
    allConstructionServices,
    allConstructionMaterialNegotiations,
    allConstructionServiceNegotiations,
    allInspectionServices,
    allMachineryInspectionNegotiations,
    allMachineryInspectionReports,
    allConstructionMaterialInspectionNegotiations,
    allConstructionMaterialInspectionReports,
    allSparePartInspectionNegotiations,
    allSparePartInspectionReports,
    allTruckInspectionReports,
    allTruckInspectionServiceNegotiations,
    allMachineryNegotiations,
    allMaterials,
    allMachineries,
    allRepairServiceNegotiations,
    allRentalConstructionMachineryNegotiations,
    allRentalTruckNegotiations,
    allSparePartNegotiations,
    allTruckMeetings,
    allTruckNegotiations,
    allFinanceTrucks,
    userFinanceTruckInstallmentNegotiations,
    allFinanceTruckNegotiations,
    allFinanceTruckInstallmentNegotiations,
    allRentalMachineries,
    allRentalTrucks,
    allRepairServices,
    allSpareParts,
    allTrucks,
    basicInfo,
    basicInfoInitialForm,
    financeTruckInitialForm,
    categories,
    constructionServiceCompanyTypes,
    constructionServiceInitialForm,
    createCategory,
    createConstructionService,
    createConstructionMaterialNegotiation,
    createConstructionServiceNegotiation,
    createInspectionService,
    createMachineryInspectionNegotiation,
    createMachineryInspectionReport,
    createConstructionMaterialInspectionNegotiation,
    createConstructionMaterialInspectionReport,
    createSparePartInspectionNegotiation,
    createSparePartInspectionReport,
    createTruckInspectionReport,
    createTruckInspectionServiceNegotiation,
    createMachineryNegotiation,
    createMachinery,
    createMaterial,
    createRepairServiceNegotiation,
    createRentalConstructionMachineryNegotiation,
    createRentalTruckNegotiation,
    createSparePartNegotiation,
    addConstructionServiceCounterOffer,
    addConstructionMaterialCounterOffer,
    addMachineryInspectionCounterOffer,
    addConstructionMaterialInspectionCounterOffer,
    addSparePartInspectionCounterOffer,
    addTruckInspectionServiceCounterOffer,
    addMachineryCounterOffer,
    addRepairServiceCounterOffer,
    addRentalConstructionMachineryCounterOffer,
    addRentalTruckCounterOffer,
    addSparePartCounterOffer,
    addTruckMeetingCounterOffer,
    addTruckCounterOffer,
    acceptConstructionServiceOffer,
    acceptConstructionMaterialOffer,
    acceptMachineryInspectionOffer,
    acceptConstructionMaterialInspectionOffer,
    acceptSparePartInspectionOffer,
    acceptTruckInspectionServiceOffer,
    acceptMachineryOffer,
    acceptRepairServiceOffer,
    acceptRentalConstructionMachineryOffer,
    acceptRentalTruckOffer,
    acceptSparePartOffer,
    acceptTruckMeetingOffer,
    acceptTruckOffer,
    createTruckMeeting,
    createMachineryRequirement,
    createConstructionMaterialRequirement,
    createSparePartRequirement,
    createTruckRequirement,
    createTruckNegotiation,
    createFinanceTruck,
    createFinanceTruckRequest,
    createRentalMachinery,
    createRentalTruck,
    createRepairService,
    createSparePart,
    createSubCategory,
    createTruck,
    currentAdmin,
    currentUser,
    dashboardKpis,
    deleteCategory,
    deleteConstructionService,
    deleteInspectionService,
    deleteMachinery,
    deleteMaterial,
    deleteFinanceTruck,
    deleteRentalMachinery,
    deleteRentalTruck,
    deleteRepairService,
    deleteSparePart,
    deleteSubCategory,
    deleteTruck,
    fetchAdmin,
    fetchUser,
    getAllConstructionServiceNegotiations,
    getAllConstructionMaterialNegotiations,
    getAllTruckInspectionReports,
    getAllTruckInspectionServiceNegotiations,
    getAllMachineryNegotiations,
    getAllRepairServiceNegotiations,
    getAllRentalConstructionMachineryNegotiations,
    getAllRentalTruckNegotiations,
    getAllSparePartNegotiations,
    getAllTruckMeetings,
    getAllTruckNegotiations,
    getAllFinanceTrucks,
    getUserFinanceTruckInstallmentNegotiations,
    getAllFinanceTruckNegotiations,
    getAllFinanceTruckInstallmentNegotiations,
    getBasicInfo,
    getAllConstructionServices,
    getAllInspectionServices,
    getAllMachineries,
    getAllMaterials,
    getAllRentalMachineries,
    getAllRentalTrucks,
    getAllRepairServices,
    getAllSpareParts,
    getAllTrucks,
    getMarketplaceTrucks,
    getMarketplaceMachineries,
    getMarketplaceSpareParts,
    getMarketplaceMaterials,
    getApprovedConstructionServices,
    getApprovedInspectionServices,
    getApprovedMachineries,
    getApprovedMaterials,
    getApprovedRentalMachineries,
    getApprovedRentalTrucks,
    getApprovedRepairServices,
    getApprovedSpareParts,
    getApprovedTrucks,
    getConstructionServiceNegotiationById,
    getConstructionMaterialNegotiationById,
    getConstructionServiceById,
    getInspectionServiceById,
    getTruckInspectionReportById,
    getTruckInspectionServiceNegotiationById,
    getMachineryById,
    getMaterialById,
    getMachineryNegotiationById,
    getRepairServiceNegotiationById,
    getRentalMachineryById,
    getRentalConstructionMachineryNegotiationById,
    getRentalTruckById,
    getRentalTruckNegotiationById,
    getRepairServiceById,
    getSparePartById,
    getSparePartNegotiationById,
    getCategories,
    getCategoryById,
    getSubCategories,
    getSubCategoriesByCategoryType,
    getSubCategoryById,
    getTruckMeetingById,
    getTruckNegotiationById,
    getUserConstructionServiceNegotiations,
    getUserConstructionMaterialNegotiations,
    getUserConstructionServices,
    getUserInspectionServices,
    getUserMachineryInspectionNegotiations,
    getUserMachineryInspectionReports,
    getUserConstructionMaterialInspectionNegotiations,
    getUserConstructionMaterialInspectionReports,
    getUserSparePartInspectionNegotiations,
    getUserSparePartInspectionReports,
    getUserTruckInspectionReports,
    getUserTruckInspectionServiceNegotiations,
    getAllMachineryInspectionNegotiations,
    getAllMachineryInspectionReports,
    getAllConstructionMaterialInspectionNegotiations,
    getAllConstructionMaterialInspectionReports,
    getMachineryInspectionNegotiationById,
    getMachineryInspectionReportById,
    getConstructionMaterialInspectionNegotiationById,
    getConstructionMaterialInspectionReportById,
    getAllSparePartInspectionNegotiations,
    getAllSparePartInspectionReports,
    getSparePartInspectionNegotiationById,
    getSparePartInspectionReportById,
    getUserMachineries,
    getUserMachineryNegotiations,
    getUserRepairServiceNegotiations,
    getUserRentalConstructionMachineryNegotiations,
    getUserRentalMachineries,
    getUserRentalTruckNegotiations,
    getUserRentalTrucks,
    getUserSpareParts,
    getUserSparePartNegotiations,
    getUserTruckMeetings,
    getUserTruckNegotiations,
    getUserFinanceTrucks,
    getUserFinanceTruckNegotiations,
    getTruckById,
    getFinanceTruckById,
    getFinanceTruckNegotiationById,
    getUserMaterials,
    getUserRepairServices,
    getUserTrucks,
    inspectionServiceInitialForm,
    loginAdmin,
    loginUser,
    logoutAdmin,
    logoutUser,
    countryOptions,
    machineryBrands,
    machineryInitialForm,
    machineryStatuses,
    materialGrades,
    materialInitialForm,
    materialSellerTypes,
    materialUnits,
    pakistanCities,
    repairServiceInitialForm,
    rentalMachineryInitialForm,
    rentalTruckInitialForm,
    searchEligibleConstructionMaterialInspectionNegotiations,
    searchEligibleSparePartInspectionNegotiations,
    searchEligibleTruckInspectionNegotiations,
    searchEligibleMachineryInspectionNegotiations,
    searchNegotiationEligibleConstructionMaterials,
    searchNegotiationEligibleMachineries,
    searchNegotiationEligibleSpareParts,
    searchNegotiationEligibleTrucks,
    serviceCategoryTypes,
    sparePartInitialForm,
    signupUser,
    marketplaceSubCategories,
    subCategories,
    submitConstructionServiceAdvanceProof,
    submitConstructionServiceFinalProof,
    submitMachineryInspectionAdvanceProof,
    submitMachineryInspectionFinalProof,
    submitConstructionMaterialInspectionAdvanceProof,
    submitConstructionMaterialInspectionFinalProof,
    submitSparePartInspectionAdvanceProof,
    submitSparePartInspectionFinalProof,
    submitTruckInspectionServiceAdvanceProof,
    submitTruckInspectionServiceFinalProof,
    submitConstructionMaterialAdvanceProof,
    submitConstructionMaterialFinalProof,
    submitRepairServiceAdvanceProof,
    submitRepairServiceFinalProof,
    submitRentalConstructionMachineryAdvanceProof,
    submitRentalConstructionMachineryFinalProof,
    submitRentalTruckAdvanceProof,
    submitRentalTruckFinalProof,
    submitSparePartAdvanceProof,
    submitSparePartFinalProof,
    submitMachineryAdvanceProof,
    submitMachineryFinalProof,
    submitAdvanceProof,
    submitFinanceTruckAdvanceProof,
    submitFinanceTruckFinalProof,
    submitFinanceTruckInstallmentProof,
    submitFinalProof,
    truckBrands,
    truckInitialForm,
    updateBasicInfo,
    updateConstructionServiceMilestone,
    updateConstructionServiceNegotiationStatus,
    updateMachineryInspectionNegotiationStatus,
    updateMachineryInspectionReportStatus,
    updateConstructionMaterialInspectionNegotiationStatus,
    updateConstructionMaterialInspectionReportStatus,
    updateSparePartInspectionNegotiationStatus,
    updateSparePartInspectionReportStatus,
    updateTruckInspectionReportStatus,
    updateTruckInspectionServiceNegotiationStatus,
    updateConstructionMaterialNegotiationStatus,
    updateConstructionService,
    updateConstructionServiceStatus,
    updateInspectionService,
    updateInspectionServiceStatus,
    updateMachinery,
    updateMachineryNegotiationStatus,
    updateMachineryStatus,
    updateMaterial,
    updateMaterialStatus,
    updateRepairServiceNegotiationStatus,
    updateRentalMachinery,
    updateRentalMachineryStatus,
    updateRentalConstructionMachineryNegotiationStatus,
    updateRentalTruckNegotiationStatus,
    updateRentalTruck,
    updateRentalTruckStatus,
    updateRepairService,
    updateRepairServiceStatus,
    updateSparePart,
    updateSparePartNegotiationStatus,
    updateSparePartStatus,
    updateCategory,
    updateSubCategory,
    updateTruck,
    updateTruckMeetingStatus,
    updateTruckNegotiationStatus,
    updateFinanceTruck,
    updateFinanceTruckNegotiationStatus,
    updateFinanceTruckInstallmentStatus,
    updateTruckStatus,
    updateUserProfile,
    uploadImage,
    addFinanceTruckCounterOffer,
    confirmFinanceTruckCost,
    acceptFinanceTruckOffer,
    userConstructionServiceNegotiations,
    userConstructionMaterialNegotiations,
    userMachineryInspectionNegotiations,
    userMachineryInspectionReports,
    userConstructionMaterialInspectionNegotiations,
    userConstructionMaterialInspectionReports,
    userSparePartInspectionNegotiations,
    userSparePartInspectionReports,
    userTruckInspectionReports,
    userTruckInspectionServiceNegotiations,
    userMachineryNegotiations,
    userRepairServiceNegotiations,
    userRentalConstructionMachineryNegotiations,
    userRentalTruckNegotiations,
    userSparePartNegotiations,
    userTruckMeetings,
    userTruckNegotiations,
    userFinanceTrucks,
    userFinanceTruckNegotiations,
    userToken,
    userConstructionServices,
    userInspectionServices,
    userMachineries,
    userMaterials,
    userRentalMachineries,
    userRentalTrucks,
    userRepairServices,
    userSpareParts,
    userTrucks,
  }), [
    adminToken,
    allConstructionServices,
    allConstructionMaterialNegotiations,
    allConstructionServiceNegotiations,
    allInspectionServices,
    allMachineryInspectionNegotiations,
    allMachineryInspectionReports,
    allConstructionMaterialInspectionNegotiations,
    allConstructionMaterialInspectionReports,
    allSparePartInspectionNegotiations,
    allSparePartInspectionReports,
    allTruckInspectionReports,
    allTruckInspectionServiceNegotiations,
    allMachineryNegotiations,
    allMaterials,
    allMachineries,
    allRepairServiceNegotiations,
    allRentalConstructionMachineryNegotiations,
    allRentalTruckNegotiations,
    allSparePartNegotiations,
    allTruckMeetings,
    allTruckNegotiations,
    allFinanceTrucks,
    userFinanceTruckInstallmentNegotiations,
    allFinanceTruckNegotiations,
    allFinanceTruckInstallmentNegotiations,
    allRentalMachineries,
    allRentalTrucks,
    allRepairServices,
    allSpareParts,
    allTrucks,
    basicInfo,
    categories,
    createConstructionService,
    createCategory,
    createConstructionMaterialNegotiation,
    createConstructionServiceNegotiation,
    createInspectionService,
    createMachineryInspectionNegotiation,
    createMachineryInspectionReport,
    createConstructionMaterialInspectionNegotiation,
    createConstructionMaterialInspectionReport,
    createSparePartInspectionNegotiation,
    createSparePartInspectionReport,
    createTruckInspectionReport,
    createTruckInspectionServiceNegotiation,
    createMachinery,
    createMaterial,
    createRepairServiceNegotiation,
    createRentalConstructionMachineryNegotiation,
    createRentalTruckNegotiation,
    createSparePartNegotiation,
    addConstructionServiceCounterOffer,
    addConstructionMaterialCounterOffer,
    addMachineryInspectionCounterOffer,
    addConstructionMaterialInspectionCounterOffer,
    addSparePartInspectionCounterOffer,
    addTruckInspectionServiceCounterOffer,
    addMachineryCounterOffer,
    addRepairServiceCounterOffer,
    addRentalConstructionMachineryCounterOffer,
    addRentalTruckCounterOffer,
    addSparePartCounterOffer,
    addTruckMeetingCounterOffer,
    addTruckCounterOffer,
    acceptConstructionServiceOffer,
    acceptConstructionMaterialOffer,
    acceptMachineryInspectionOffer,
    acceptConstructionMaterialInspectionOffer,
    acceptSparePartInspectionOffer,
    acceptTruckInspectionServiceOffer,
    acceptMachineryOffer,
    acceptRepairServiceOffer,
    acceptRentalConstructionMachineryOffer,
    acceptRentalTruckOffer,
    acceptSparePartOffer,
    acceptTruckMeetingOffer,
    acceptTruckOffer,
    createTruckMeeting,
    createMachineryNegotiation,
    createMachineryRequirement,
    createConstructionMaterialRequirement,
    createSparePartRequirement,
    createTruckRequirement,
    createTruckNegotiation,
    createFinanceTruck,
    createFinanceTruckRequest,
    createRentalMachinery,
    createRentalTruck,
    createRepairService,
    createSparePart,
    createSubCategory,
    createTruck,
    currentAdmin,
    currentUser,
    dashboardKpis,
    deleteCategory,
    deleteConstructionService,
    deleteInspectionService,
    deleteMachinery,
    deleteMaterial,
    deleteFinanceTruck,
    deleteRentalMachinery,
    deleteRentalTruck,
    deleteRepairService,
    deleteSparePart,
    deleteSubCategory,
    deleteTruck,
    fetchAdmin,
    fetchUser,
    getAllConstructionServiceNegotiations,
    getAllConstructionMaterialNegotiations,
    getAllTruckInspectionReports,
    getAllTruckInspectionServiceNegotiations,
    getAllMachineryNegotiations,
    getAllRepairServiceNegotiations,
    getAllRentalConstructionMachineryNegotiations,
    getAllRentalTruckNegotiations,
    getAllSparePartNegotiations,
    getAllTruckMeetings,
    getAllTruckNegotiations,
    getAllFinanceTrucks,
    getUserFinanceTruckInstallmentNegotiations,
    getAllFinanceTruckNegotiations,
    getAllFinanceTruckInstallmentNegotiations,
    getBasicInfo,
    getAllConstructionServices,
    getAllInspectionServices,
    getAllMachineries,
    getAllMaterials,
    getAllRentalMachineries,
    getAllRentalTrucks,
    getAllRepairServices,
    getAllSpareParts,
    getAllTrucks,
    getMarketplaceTrucks,
    getMarketplaceMachineries,
    getMarketplaceSpareParts,
    getMarketplaceMaterials,
    getApprovedConstructionServices,
    getApprovedInspectionServices,
    getApprovedMachineries,
    getApprovedMaterials,
    getApprovedRentalMachineries,
    getApprovedRentalTrucks,
    getApprovedRepairServices,
    getApprovedSpareParts,
    getApprovedTrucks,
    getConstructionServiceNegotiationById,
    getConstructionMaterialNegotiationById,
    getConstructionServiceById,
    getInspectionServiceById,
    getTruckInspectionReportById,
    getTruckInspectionServiceNegotiationById,
    getMachineryById,
    getMaterialById,
    getRepairServiceNegotiationById,
    getRentalMachineryById,
    getRentalConstructionMachineryNegotiationById,
    getRentalTruckById,
    getRentalTruckNegotiationById,
    getRepairServiceById,
    getSparePartById,
    getSparePartNegotiationById,
    getCategories,
    getCategoryById,
    getSubCategories,
    getSubCategoriesByCategoryType,
    getSubCategoryById,
    getMachineryNegotiationById,
    getTruckMeetingById,
    getTruckNegotiationById,
    getUserConstructionServiceNegotiations,
    getUserConstructionMaterialNegotiations,
    getUserConstructionServices,
    getUserInspectionServices,
    getUserMachineryInspectionNegotiations,
    getUserMachineryInspectionReports,
    getUserConstructionMaterialInspectionNegotiations,
    getUserConstructionMaterialInspectionReports,
    getUserSparePartInspectionNegotiations,
    getUserSparePartInspectionReports,
    getUserTruckInspectionReports,
    getUserTruckInspectionServiceNegotiations,
    getAllMachineryInspectionNegotiations,
    getAllMachineryInspectionReports,
    getAllConstructionMaterialInspectionNegotiations,
    getAllConstructionMaterialInspectionReports,
    getMachineryInspectionNegotiationById,
    getMachineryInspectionReportById,
    getConstructionMaterialInspectionNegotiationById,
    getConstructionMaterialInspectionReportById,
    getAllSparePartInspectionNegotiations,
    getAllSparePartInspectionReports,
    getSparePartInspectionNegotiationById,
    getSparePartInspectionReportById,
    getUserMachineries,
    getUserMachineryNegotiations,
    getUserRepairServiceNegotiations,
    getUserRentalConstructionMachineryNegotiations,
    getUserRentalMachineries,
    getUserRentalTruckNegotiations,
    getUserRentalTrucks,
    getUserSpareParts,
    getUserSparePartNegotiations,
    getUserTruckMeetings,
    getTruckById,
    getFinanceTruckById,
    getFinanceTruckNegotiationById,
    getUserMaterials,
    getUserRepairServices,
    getUserTruckNegotiations,
    getUserFinanceTrucks,
    getUserFinanceTruckNegotiations,
    getUserTrucks,
    loginAdmin,
    loginUser,
    logoutAdmin,
    logoutUser,
    searchEligibleConstructionMaterialInspectionNegotiations,
    searchEligibleSparePartInspectionNegotiations,
    searchEligibleMachineryInspectionNegotiations,
    searchEligibleTruckInspectionNegotiations,
    searchNegotiationEligibleConstructionMaterials,
    searchNegotiationEligibleMachineries,
    searchNegotiationEligibleSpareParts,
    searchNegotiationEligibleTrucks,
    signupUser,
    marketplaceSubCategories,
    subCategories,
    submitConstructionServiceAdvanceProof,
    submitConstructionServiceFinalProof,
    submitMachineryInspectionAdvanceProof,
    submitMachineryInspectionFinalProof,
    submitConstructionMaterialInspectionAdvanceProof,
    submitConstructionMaterialInspectionFinalProof,
    submitSparePartInspectionAdvanceProof,
    submitSparePartInspectionFinalProof,
    submitTruckInspectionServiceAdvanceProof,
    submitTruckInspectionServiceFinalProof,
    submitConstructionMaterialAdvanceProof,
    submitConstructionMaterialFinalProof,
    submitRepairServiceAdvanceProof,
    submitRepairServiceFinalProof,
    submitRentalConstructionMachineryAdvanceProof,
    submitRentalConstructionMachineryFinalProof,
    submitRentalTruckAdvanceProof,
    submitRentalTruckFinalProof,
    submitSparePartAdvanceProof,
    submitSparePartFinalProof,
    submitMachineryAdvanceProof,
    submitMachineryFinalProof,
    submitAdvanceProof,
    submitFinanceTruckAdvanceProof,
    submitFinanceTruckFinalProof,
    submitFinanceTruckInstallmentProof,
    submitFinalProof,
    updateBasicInfo,
    updateConstructionServiceMilestone,
    updateConstructionServiceNegotiationStatus,
    updateMachineryInspectionNegotiationStatus,
    updateMachineryInspectionReportStatus,
    updateConstructionMaterialInspectionNegotiationStatus,
    updateConstructionMaterialInspectionReportStatus,
    updateSparePartInspectionNegotiationStatus,
    updateSparePartInspectionReportStatus,
    updateTruckInspectionReportStatus,
    updateTruckInspectionServiceNegotiationStatus,
    updateConstructionMaterialNegotiationStatus,
    updateConstructionService,
    updateConstructionServiceStatus,
    updateInspectionService,
    updateInspectionServiceStatus,
    updateSparePart,
    updateSparePartStatus,
    updateMachinery,
    updateMachineryStatus,
    updateMaterial,
    updateMaterialStatus,
    updateRepairServiceNegotiationStatus,
    updateRentalMachinery,
    updateRentalMachineryStatus,
    updateRentalConstructionMachineryNegotiationStatus,
    updateRentalTruckNegotiationStatus,
    updateRentalTruck,
    updateRentalTruckStatus,
    updateRepairService,
    updateRepairServiceStatus,
    updateSparePartNegotiationStatus,
    updateTruckMeetingStatus,
    updateTruckNegotiationStatus,
    updateFinanceTruck,
    updateFinanceTruckNegotiationStatus,
    updateFinanceTruckInstallmentStatus,
    updateMachineryNegotiationStatus,
    updateCategory,
    updateSubCategory,
    updateTruck,
    updateTruckStatus,
    updateUserProfile,
    uploadImage,
    addFinanceTruckCounterOffer,
    confirmFinanceTruckCost,
    acceptFinanceTruckOffer,
    userConstructionServiceNegotiations,
    userConstructionMaterialNegotiations,
    userMachineryInspectionNegotiations,
    userMachineryInspectionReports,
    userConstructionMaterialInspectionNegotiations,
    userConstructionMaterialInspectionReports,
    userSparePartInspectionNegotiations,
    userSparePartInspectionReports,
    userTruckInspectionReports,
    userTruckInspectionServiceNegotiations,
    userMachineryNegotiations,
    userRepairServiceNegotiations,
    userRentalConstructionMachineryNegotiations,
    userRentalTruckNegotiations,
    userSparePartNegotiations,
    userTruckMeetings,
    userTruckNegotiations,
    userFinanceTrucks,
    userFinanceTruckNegotiations,
    userToken,
    userConstructionServices,
    userInspectionServices,
    userMachineries,
    userMaterials,
    userRentalMachineries,
    userRentalTrucks,
    userRepairServices,
    userSpareParts,
    userTrucks,
    globalLoader,
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
