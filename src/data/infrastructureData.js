// Static data for infrastructure assets
export const infrastructureAssets = [
  // Roads
  {
    id: 1,
    assetName: "Main Street Highway",
    assetType: "Road",
    location: "Downtown District",
    department: "Transportation",
    constructionYear: 2015,
    condition: "Good",
    priorityLevel: "Medium",
    status: "Active",
    lastMaintenanceDate: "2025-11-15",
    length: "5.2 km",
    cost: "$125,000",
    description: "Major arterial road connecting downtown to suburbs"
  },
  {
    id: 2,
    assetName: "Riverside Expressway",
    assetType: "Road",
    location: "North District",
    department: "Transportation",
    constructionYear: 2018,
    condition: "Good",
    priorityLevel: "Low",
    status: "Active",
    lastMaintenanceDate: "2025-12-20",
    length: "8.7 km",
    cost: "$180,000",
    description: "High-speed expressway along the river"
  },
  {
    id: 3,
    assetName: "Industrial Park Access Road",
    assetType: "Road",
    location: "Industrial Zone",
    department: "Transportation",
    constructionYear: 2010,
    condition: "Critical",
    priorityLevel: "High",
    status: "Under Maintenance",
    lastMaintenanceDate: "2024-08-10",
    length: "3.4 km",
    cost: "$95,000",
    description: "Access road requiring urgent repairs"
  },
  {
    id: 4,
    assetName: "University Boulevard",
    assetType: "Road",
    location: "Education District",
    department: "Transportation",
    constructionYear: 2014,
    condition: "Moderate",
    priorityLevel: "Medium",
    status: "Active",
    lastMaintenanceDate: "2025-06-05",
    length: "4.1 km",
    cost: "$110,000",
    description: "Main road through university campus"
  },
  
  // Bridges
  {
    id: 5,
    assetName: "Central Bridge",
    assetType: "Bridge",
    location: "Downtown District",
    department: "Infrastructure",
    constructionYear: 1995,
    condition: "Good",
    priorityLevel: "Medium",
    status: "Active",
    lastMaintenanceDate: "2025-09-12",
    length: "450 m",
    cost: "$450,000",
    description: "Historic bridge over the main river"
  },
  {
    id: 6,
    assetName: "North Overpass",
    assetType: "Bridge",
    location: "North District",
    department: "Infrastructure",
    constructionYear: 2020,
    condition: "Good",
    priorityLevel: "Low",
    status: "Active",
    lastMaintenanceDate: "2025-10-08",
    length: "320 m",
    cost: "$380,000",
    description: "Modern overpass with steel structure"
  },
  {
    id: 7,
    assetName: "Old Town Bridge",
    assetType: "Bridge",
    location: "Old Town",
    department: "Infrastructure",
    constructionYear: 1985,
    condition: "Critical",
    priorityLevel: "High",
    status: "Under Maintenance",
    lastMaintenanceDate: "2023-12-15",
    length: "280 m",
    cost: "$520,000",
    description: "Aging bridge requiring structural assessment"
  },
  
  // Utilities
  {
    id: 8,
    assetName: "Water Treatment Plant #1",
    assetType: "Utility",
    location: "West District",
    department: "Water & Sanitation",
    constructionYear: 2012,
    condition: "Good",
    priorityLevel: "Low",
    status: "Active",
    lastMaintenanceDate: "2026-01-10",
    length: "N/A",
    cost: "$280,000",
    description: "Primary water treatment facility"
  },
  {
    id: 9,
    assetName: "Downtown Power Substation",
    assetType: "Utility",
    location: "Downtown District",
    department: "Electrical Services",
    constructionYear: 2008,
    condition: "Good",
    priorityLevel: "Medium",
    status: "Active",
    lastMaintenanceDate: "2025-11-22",
    length: "N/A",
    cost: "$320,000",
    description: "Main electrical distribution point"
  },
  {
    id: 10,
    assetName: "Sewage Pumping Station A",
    assetType: "Utility",
    location: "South District",
    department: "Water & Sanitation",
    constructionYear: 2011,
    condition: "Moderate",
    priorityLevel: "Medium",
    status: "Active",
    lastMaintenanceDate: "2025-07-18",
    length: "N/A",
    cost: "$150,000",
    description: "Sewage handling facility"
  },
  {
    id: 11,
    assetName: "Gas Distribution Hub",
    assetType: "Utility",
    location: "Industrial Zone",
    department: "Gas Services",
    constructionYear: 2005,
    condition: "Critical",
    priorityLevel: "High",
    status: "Under Maintenance",
    lastMaintenanceDate: "2024-05-30",
    length: "N/A",
    cost: "$420,000",
    description: "Natural gas distribution requiring upgrades"
  },
  
  // Buildings
  {
    id: 12,
    assetName: "City Hall",
    assetType: "Building",
    location: "Downtown District",
    department: "Administration",
    constructionYear: 1998,
    condition: "Good",
    priorityLevel: "Low",
    status: "Active",
    lastMaintenanceDate: "2026-01-05",
    length: "N/A",
    cost: "$95,000",
    description: "Main administrative building"
  },
  {
    id: 13,
    assetName: "Central Library",
    assetType: "Building",
    location: "Education District",
    department: "Culture & Education",
    constructionYear: 2010,
    condition: "Good",
    priorityLevel: "Low",
    status: "Active",
    lastMaintenanceDate: "2025-10-20",
    length: "N/A",
    cost: "$75,000",
    description: "Main public library facility"
  },
  {
    id: 14,
    assetName: "Community Recreation Center",
    assetType: "Building",
    location: "West District",
    department: "Parks & Recreation",
    constructionYear: 2013,
    condition: "Moderate",
    priorityLevel: "Medium",
    status: "Active",
    lastMaintenanceDate: "2025-05-14",
    length: "N/A",
    cost: "$110,000",
    description: "Sports and recreation facility"
  },
  {
    id: 15,
    assetName: "Fire Station #3",
    assetType: "Building",
    location: "South District",
    department: "Emergency Services",
    constructionYear: 2000,
    condition: "Critical",
    priorityLevel: "High",
    status: "Under Maintenance",
    lastMaintenanceDate: "2024-03-22",
    length: "N/A",
    cost: "$185,000",
    description: "Emergency services facility needing renovation"
  },
  {
    id: 16,
    assetName: "Municipal Park Complex",
    assetType: "Building",
    location: "North District",
    department: "Parks & Recreation",
    constructionYear: 2016,
    condition: "Good",
    priorityLevel: "Low",
    status: "Active",
    lastMaintenanceDate: "2025-09-01",
    length: "N/A",
    cost: "$65,000",
    description: "Large public park with facilities"
  }
];

// Summary statistics
export const getStatistics = () => {
  const stats = {
    total: infrastructureAssets.length,
    byType: {},
    byCondition: {},
    byPriority: {},
    byStatus: {},
    totalCost: 0
  };

  infrastructureAssets.forEach(asset => {
    // Count by type
    stats.byType[asset.assetType] = (stats.byType[asset.assetType] || 0) + 1;
    
    // Count by condition
    stats.byCondition[asset.condition] = (stats.byCondition[asset.condition] || 0) + 1;
    
    // Count by priority
    stats.byPriority[asset.priorityLevel] = (stats.byPriority[asset.priorityLevel] || 0) + 1;
    
    // Count by status
    stats.byStatus[asset.status] = (stats.byStatus[asset.status] || 0) + 1;
    
    // Calculate total cost
    const cost = parseInt(asset.cost.replace(/[$,]/g, ''));
    stats.totalCost += cost;
  });

  return stats;
};

// Get assets by type
export const getAssetsByType = (type) => {
  if (!type) return infrastructureAssets;
  return infrastructureAssets.filter(asset => asset.assetType === type);
};

// Get assets by condition
export const getAssetsByCondition = (condition) => {
  if (!condition) return infrastructureAssets;
  return infrastructureAssets.filter(asset => asset.condition === condition);
};

// Get assets by priority
export const getAssetsByPriority = (priority) => {
  if (!priority) return infrastructureAssets;
  return infrastructureAssets.filter(asset => asset.priorityLevel === priority);
};

// Get assets by status
export const getAssetsByStatus = (status) => {
  if (!status) return infrastructureAssets;
  return infrastructureAssets.filter(asset => asset.status === status);
};

// Search assets
export const searchAssets = (query) => {
  if (!query) return infrastructureAssets;
  const lowerQuery = query.toLowerCase();
  return infrastructureAssets.filter(asset => 
    asset.assetName.toLowerCase().includes(lowerQuery) ||
    asset.location.toLowerCase().includes(lowerQuery) ||
    asset.description.toLowerCase().includes(lowerQuery) ||
    asset.department.toLowerCase().includes(lowerQuery)
  );
};
