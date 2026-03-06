import React from 'react';
import Header from '../components/Header';
import StatisticsCards from '../components/StatisticsCards';
import FilterPanel from '../components/FilterPanel';
import AssetGrid from '../components/AssetGrid';
import DataVisualization from '../components/DataVisualization';
import AssetDetailModal from '../components/AssetDetailModal';
import RecentUpdates from '../components/RecentUpdates';

const Dashboard = ({ 
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
  stats,
  allAssets
}) => {
  return (
    <div>
      <Header />
      
      <div className="container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Municipal Infrastructure Dashboard</h1>
          <p className="dashboard-subtitle">Citywide asset health, anomaly signals, and operational risk overview.</p>
        </div>

        <StatisticsCards stats={stats} allAssets={allAssets} />
        
        <DataVisualization stats={stats} />

        <FilterPanel
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedCondition={selectedCondition}
          setSelectedCondition={setSelectedCondition}
          selectedPriority={selectedPriority}
          setSelectedPriority={setSelectedPriority}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
        
        <div className="results-header">
          <h2>Infrastructure Assets</h2>
          <span className="results-count">
            Showing {filteredAssets.length} of {allAssets.length} assets
          </span>
        </div>

        <AssetGrid 
          assets={filteredAssets} 
          onAssetClick={setSelectedAsset}
        />

        <RecentUpdates assets={allAssets} />

        {selectedAsset && (
          <AssetDetailModal 
            asset={selectedAsset} 
            onClose={() => setSelectedAsset(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
