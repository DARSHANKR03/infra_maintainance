import React, { useState, useMemo } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import AssetDetailModal from './components/AssetDetailModal';
import Dashboard from './pages/Dashboard';
import AddInfrastructure from './pages/AddInfrastructure';
import ViewInfrastructure from './pages/ViewInfrastructure';
import InfrastructureCategories from './pages/InfrastructureCategories';
import MaintenanceManagement from './pages/MaintenanceManagement';
import IssueReports from './pages/IssueReports';
import AssetStatusMonitoring from './pages/AssetStatusMonitoring';
import ReportsAnalytics from './pages/ReportsAnalytics';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import { infrastructureAssets as initialAssets } from './data/infrastructureData';

function App() {
  // Navigation state
  const [activeMenu, setActiveMenu] = useState('dashboard');
  
  // Assets state - initialized with static data
  const [assets, setAssets] = useState(initialAssets);
  
  // Maintenance state
  const [maintenanceRecords, setMaintenanceRecords] = useState([
    { id: 1, assetId: 1, assetName: 'Main Street Highway', type: 'Preventive', scheduledDate: '2026-03-15', completedDate: null, status: 'Scheduled', description: 'Annual road surface inspection', cost: '$5,000', technician: 'John Smith' },
    { id: 2, assetId: 3, assetName: 'Metro Water Treatment Plant', type: 'Corrective', scheduledDate: '2026-03-10', completedDate: '2026-03-10', status: 'Completed', description: 'Filter replacement', cost: '$12,000', technician: 'Sarah Johnson' },
    { id: 3, assetId: 5, assetName: 'City Hall', type: 'Preventive', scheduledDate: '2026-03-20', completedDate: null, status: 'Scheduled', description: 'HVAC system maintenance', cost: '$3,500', technician: 'Mike Wilson' },
    { id: 4, assetId: 2, assetName: 'Downtown Bridge', type: 'Emergency', scheduledDate: '2026-03-08', completedDate: null, status: 'In Progress', description: 'Structural crack repair', cost: '$25,000', technician: 'David Brown' },
    { id: 5, assetId: 7, assetName: 'Public Library', type: 'Preventive', scheduledDate: '2026-02-28', completedDate: '2026-02-28', status: 'Completed', description: 'Monthly safety inspection', cost: '$800', technician: 'Emma Davis' }
  ]);

  // Issues state
  const [issues, setIssues] = useState([
    { id: 1, assetId: 1, assetName: 'Main Street Highway', title: 'Pothole on westbound lane', description: 'Large pothole causing traffic disruption', severity: 'High', status: 'In Progress', reportedBy: 'Citizen Report', reportedDate: '2026-03-05', assignedTo: 'Road Maintenance Team', location: 'Mile marker 15.3' },
    { id: 2, assetId: 6, assetName: 'River Crossing Bridge', title: 'Railing damage', description: 'Safety railing damaged by vehicle collision', severity: 'Critical', status: 'Pending', reportedBy: 'Police Department', reportedDate: '2026-03-06', assignedTo: 'Bridge Inspection Unit', location: 'North approach' },
    { id: 3, assetId: 9, assetName: 'Community Park', title: 'Broken playground equipment', description: 'Swing set chain broken', severity: 'Medium', status: 'Pending', reportedBy: 'Park Visitor', reportedDate: '2026-03-04', assignedTo: 'Parks Department', location: 'East playground area' },
    { id: 4, assetId: 3, assetName: 'Metro Water Treatment Plant', title: 'Water quality alert', description: 'Elevated turbidity levels detected', severity: 'Critical', status: 'In Progress', reportedBy: 'Quality Control', reportedDate: '2026-03-07', assignedTo: 'Water Quality Team', location: 'Filtration unit B' },
    { id: 5, assetId: 8, assetName: 'Sports Stadium', title: 'Lighting failure', description: 'Section C lighting not functioning', severity: 'Medium', status: 'Resolved', reportedBy: 'Facility Manager', reportedDate: '2026-03-01', assignedTo: 'Electrical Team', location: 'Section C northwest', resolvedDate: '2026-03-03' }
  ]);
  
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'analytics'

  // Function to add new asset
  const addAsset = (newAssetData) => {
    const newAsset = {
      ...newAssetData,
      id: Math.max(...assets.map(a => a.id), 0) + 1, // Generate unique ID
      constructionYear: parseInt(newAssetData.constructionYear),
    };
    setAssets(prevAssets => [...prevAssets, newAsset]);
    return newAsset;
  };

  // Function to update existing asset
  const updateAsset = (assetId, updatedData) => {
    setAssets(prevAssets => 
      prevAssets.map(asset => 
        asset.id === assetId 
          ? { ...asset, ...updatedData, constructionYear: parseInt(updatedData.constructionYear) }
          : asset
      )
    );
  };

  // Function to delete asset
  const deleteAsset = (assetId) => {
    setAssets(prevAssets => prevAssets.filter(asset => asset.id !== assetId));
    // Close modal if deleted asset was selected
    if (selectedAsset && selectedAsset.id === assetId) {
      setSelectedAsset(null);
    }
  };

  // Maintenance management functions
  const addMaintenanceRecord = (recordData) => {
    const newRecord = {
      ...recordData,
      id: Math.max(...maintenanceRecords.map(r => r.id), 0) + 1
    };
    setMaintenanceRecords(prev => [...prev, newRecord]);
    return newRecord;
  };

  const updateMaintenanceRecord = (recordId, updatedData) => {
    setMaintenanceRecords(prev => 
      prev.map(record => 
        record.id === recordId ? { ...record, ...updatedData } : record
      )
    );
  };

  const deleteMaintenanceRecord = (recordId) => {
    setMaintenanceRecords(prev => prev.filter(record => record.id !== recordId));
  };

  // Issue management functions
  const addIssue = (issueData) => {
    const newIssue = {
      ...issueData,
      id: Math.max(...issues.map(i => i.id), 0) + 1,
      reportedDate: new Date().toISOString().split('T')[0]
    };
    setIssues(prev => [...prev, newIssue]);
    return newIssue;
  };

  const updateIssue = (issueId, updatedData) => {
    setIssues(prev => 
      prev.map(issue => 
        issue.id === issueId ? { ...issue, ...updatedData } : issue
      )
    );
  };

  const deleteIssue = (issueId) => {
    setIssues(prev => prev.filter(issue => issue.id !== issueId));
  };

  // Filter assets based on search and filters
  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      // Search filter
      const matchesSearch = !searchQuery || 
        asset.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.department.toLowerCase().includes(searchQuery.toLowerCase());

      // Type filter
      const matchesType = !selectedType || asset.assetType === selectedType;

      // Condition filter
      const matchesCondition = !selectedCondition || asset.condition === selectedCondition;

      // Priority filter
      const matchesPriority = !selectedPriority || asset.priorityLevel === selectedPriority;

      // Status filter
      const matchesStatus = !selectedStatus || asset.status === selectedStatus;

      return matchesSearch && matchesType && matchesCondition && matchesPriority && matchesStatus;
    });
  }, [assets, searchQuery, selectedType, selectedCondition, selectedPriority, selectedStatus]);

  // Calculate statistics based on current assets
  const stats = useMemo(() => {
    const total = assets.length;
    const byType = {};
    const byCondition = {};
    const byPriority = {};
    const byStatus = {};
    let totalCost = 0;

    assets.forEach(asset => {
      // Count by type
      byType[asset.assetType] = (byType[asset.assetType] || 0) + 1;
      
      // Count by condition
      byCondition[asset.condition] = (byCondition[asset.condition] || 0) + 1;
      
      // Count by priority
      byPriority[asset.priorityLevel] = (byPriority[asset.priorityLevel] || 0) + 1;
      
      // Count by status
      byStatus[asset.status] = (byStatus[asset.status] || 0) + 1;
      
      // Sum total cost (parse string cost to number)
      if (asset.cost) {
        const costValue = typeof asset.cost === 'string' 
          ? parseInt(asset.cost.replace(/[$,]/g, '')) 
          : asset.cost;
        if (!isNaN(costValue)) {
          totalCost += costValue;
        }
      }
    });

    return { total, byType, byCondition, byPriority, byStatus, totalCost };
  }, [assets]);

  // Common props for pages
  const commonProps = {
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    selectedCondition,
    setSelectedCondition,
    selectedPriority,
    setSelectedPriority,
    selectedStatus,
    setSelectedStatus,
    filteredAssets,
    selectedAsset,
    setSelectedAsset,
    viewMode,
    setViewMode,
    stats
  };

  // Render active page
  const renderPage = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard {...commonProps} allAssets={assets} />;
      case 'add-infrastructure':
        return <AddInfrastructure addAsset={addAsset} setActiveMenu={setActiveMenu} />;
      case 'view-infrastructure':
        return <ViewInfrastructure 
          {...commonProps} 
          allAssets={assets} 
          updateAsset={updateAsset}
          deleteAsset={deleteAsset}
        />;
      case 'categories':
        return <InfrastructureCategories 
          allAssets={assets} 
          stats={stats}
          setActiveMenu={setActiveMenu}
          setSelectedType={setSelectedType}
        />;
      case 'maintenance':
        return <MaintenanceManagement 
          allAssets={assets}
          maintenanceRecords={maintenanceRecords}
          addMaintenanceRecord={addMaintenanceRecord}
          updateMaintenanceRecord={updateMaintenanceRecord}
          deleteMaintenanceRecord={deleteMaintenanceRecord}
        />;
      case 'issues':
        return <IssueReports 
          allAssets={assets}
          issues={issues}
          addIssue={addIssue}
          updateIssue={updateIssue}
          deleteIssue={deleteIssue}
        />;
      case 'monitoring':
        return <AssetStatusMonitoring />;
      case 'reports':
        return <ReportsAnalytics stats={stats} />;
      case 'notifications':
        return <Notifications />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard {...commonProps} />;
    }
  };

  return (
    <div className="App">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      
      <main className="main-content">
        {renderPage()}
        
        {selectedAsset && (
          <AssetDetailModal 
            asset={selectedAsset} 
            onClose={() => setSelectedAsset(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
