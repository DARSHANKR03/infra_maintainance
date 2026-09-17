import React from 'react';
import AssetCard from './AssetCard';
import './AssetGrid.css';

const AssetGrid = ({ assets, onAssetClick }) => {
  if (assets.length === 0) {
    return (
      <div className="no-results">
        <p>No infrastructure assets found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="asset-grid">
      {assets.map(asset => (
        <AssetCard 
          key={asset.id} 
          asset={asset} 
          onClick={onAssetClick}
        />
      ))}
    </div>
  );
};

export default AssetGrid;
