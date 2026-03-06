# 🏙️ Urban Infrastructure Data Portal

A comprehensive web-based dashboard for managing and visualizing city infrastructure assets including roads, bridges, utilities, and public facilities.

## 📋 Project Overview

The Urban Infrastructure Data Portal is a React-based application designed to help city administrators and engineers manage structured information about urban infrastructure assets. The system provides an intuitive interface for tracking maintenance schedules, monitoring asset conditions, and analyzing infrastructure data.

## ✨ Features

### 1. **Dashboard Overview**
- Real-time statistics display
- Total asset count and maintenance costs
- Asset health status tracking
- Priority-based alerts

### 2. **Asset Management**
- 16 sample infrastructure assets across 4 categories:
  - 🛣️ Roads (4 assets)
  - 🌉 Bridges (3 assets)
  - ⚡ Utilities (4 assets)
  - 🏢 Public Facilities (5 assets)

### 3. **Advanced Filtering & Search**
- Full-text search across name, location, and description
- Filter by asset type
- Filter by status (Excellent, Good, Fair, Poor)
- Filter by priority (High, Medium, Low)
- One-click filter reset

### 4. **Data Visualization**
- Status distribution bar charts
- Asset type distribution
- Priority analysis
- Summary analytics panel

### 5. **Detailed Asset Information**
- Comprehensive asset details in modal view
- Maintenance timeline visualization
- Location and status information
- Cost estimates
- Next scheduled maintenance dates

### 6. **Responsive Design**
- Fully responsive layout
- Mobile-friendly interface
- Touch-optimized interactions

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

The React environment has already been set up. To run the application:

1. Navigate to the project directory:
```bash
cd infra_maintainance
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 📁 Project Structure

```
infra_maintainance/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Header.js & Header.css
│   │   ├── StatisticsCards.js & StatisticsCards.css
│   │   ├── FilterPanel.js & FilterPanel.css
│   │   ├── AssetCard.js & AssetCard.css
│   │   ├── AssetGrid.js & AssetGrid.css
│   │   ├── AssetDetailModal.js & AssetDetailModal.css
│   │   └── DataVisualization.js & DataVisualization.css
│   ├── data/
│   │   └── infrastructureData.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🎯 Key Components

### Data Model (`infrastructureData.js`)
Contains static data for 16 infrastructure assets with properties:
- Name, Type, Status, Location
- Length, Last/Next Maintenance dates
- Cost, Priority, Description

### Main Components

1. **Header** - Application title and current date display
2. **StatisticsCards** - Dashboard metrics and statistics
3. **FilterPanel** - Search and filter controls
4. **AssetGrid** - Grid layout of asset cards
5. **AssetCard** - Individual asset preview card
6. **AssetDetailModal** - Detailed asset information popup
7. **DataVisualization** - Analytics and charts view

## 🎨 Design Features

- **Color-coded Status**: Visual indicators for asset conditions
- **Priority Badges**: Clear priority level identification
- **Gradient Headers**: Modern purple gradient design
- **Interactive Cards**: Hover effects and animations
- **Modal Overlays**: Detailed information display
- **Responsive Grid**: Adapts to all screen sizes

## 📊 Data Categories

### Asset Types
- **Roads**: Highway and street infrastructure
- **Bridges**: Crossing structures and overpasses
- **Utilities**: Water, power, gas, and sewage facilities
- **Public Facilities**: Government and community buildings

### Status Levels
- **Excellent**: Optimal condition
- **Good**: Satisfactory condition
- **Fair**: Requires monitoring
- **Poor**: Needs urgent attention

### Priority Levels
- **High**: Immediate action required
- **Medium**: Scheduled maintenance
- **Low**: Routine monitoring

## 🔄 View Modes

### Grid View
- Browse all assets in card format
- Apply filters and search
- Click for detailed information
- See maintenance schedules at a glance

### Analytics View
- Visualize data distributions
- Status breakdown charts
- Asset type analysis
- Priority distribution
- Summary statistics

## 💡 Usage Tips

1. **Quick Search**: Use the search bar to find assets by name or location
2. **Filter Combination**: Combine multiple filters for precise results
3. **Asset Details**: Click any asset card to view comprehensive information
4. **Clear Filters**: Use the "Clear All Filters" button to reset
5. **Switch Views**: Toggle between Grid and Analytics views for different perspectives

## 🔮 Future Enhancements (Potential)

- Export data to CSV/PDF
- Custom date range filtering
- Interactive maps integration
- Maintenance scheduling system
- User authentication and roles
- Historical data tracking
- Notification system for upcoming maintenance
- Budget planning tools

## 🛠️ Technologies Used

- **React 19.2.4** - UI framework
- **CSS3** - Styling and animations
- **JavaScript (ES6+)** - Logic and functionality
- **React Hooks** - State management (useState, useMemo)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 👥 Target Users

- City Administrators
- Infrastructure Engineers
- Maintenance Managers
- Urban Planners
- Public Works Departments

## 📝 License

This project is created for educational and demonstration purposes.

## 🤝 Contributing

This is a demonstration project. For educational purposes, feel free to fork and modify.

---

**Built with ❤️ for Urban Infrastructure Management**
