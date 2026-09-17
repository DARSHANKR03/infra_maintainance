# Urban Infrastructure Maintenance Portal

The **Urban Infrastructure Maintenance Portal** is a React-based municipal asset-management dashboard designed to organize, monitor, and analyze infrastructure records. The application presents roads, bridges, utilities, public buildings, maintenance activities, issue information, and operational summaries through a unified browser interface.

The project is implemented as an academic Computer Science and Engineering prototype. It demonstrates how a component-based frontend can transform structured infrastructure data into an interactive decision-support interface for administrators, maintenance teams, and infrastructure analysts.

The system is intentionally designed as a frontend prototype. It uses local sample data and in-memory React state rather than a server-side API or persistent database. This makes the project simple to run, easy to demonstrate, and suitable as a foundation for future full-stack development.

## Executive Summary

Municipal infrastructure consists of a wide range of physical assets that must be inspected, maintained, and monitored throughout their operational lifecycle. When records are fragmented across departments or maintained manually, authorities may face difficulty identifying critical assets, comparing conditions, and scheduling timely maintenance.

This project addresses that problem through a structured dashboard that combines:

1. asset registration and record management
2. condition, priority, and operational-status classification
3. searchable and filterable infrastructure views
4. category-level infrastructure analysis
5. maintenance scheduling and status management
6. issue and notification interfaces
7. dashboard statistics and chart-based visualization

In practical use, the portal provides a single frontend workspace for understanding the current state of a simulated municipal infrastructure portfolio. In academic use, it demonstrates state management, component composition, responsive layout design, data modeling, and visual analytics in a modern web application.

## Motivation and Problem Context

Cities manage assets that differ significantly in type, scale, location, ownership, cost, and maintenance requirements. A road network, water-treatment facility, bridge, public library, and electrical substation cannot be evaluated using exactly the same operational criteria. However, they still require a common information system through which administrators can review records and prioritize action.

Common problems in a decentralized infrastructure-management workflow include:

- asset details distributed across separate files or departments
- limited visibility into infrastructure condition and priority
- delayed identification of assets requiring corrective action
- inconsistent maintenance records and status updates
- difficulty converting raw records into management-level summaries
- limited support for comparing infrastructure categories

The portal models a unified workflow in which asset records, derived statistics, category summaries, maintenance activities, and user-facing views are connected through a shared application state.

From a software-engineering perspective, the project demonstrates a realistic frontend workflow:

- sample infrastructure records are loaded into the application
- React state stores the active asset, maintenance, and issue information
- derived statistics are calculated from the current asset collection
- filters and search conditions produce a focused asset view
- reusable components render cards, tables, charts, forms, and modals
- administrative pages expose different operational concerns through a common shell

## System Architecture

The application follows a layered client-side architecture. Each layer has a focused responsibility while remaining lightweight enough for academic demonstration and local development.

### 1. Data Definition Layer

The data layer is represented by `src/data/infrastructureData.js`. It contains the initial infrastructure asset collection and helper logic for calculating summary values.

The sample portfolio includes categories such as:

- roads
- bridges
- utilities
- buildings

Each record contains identifying information, location, department ownership, construction year, condition, priority, operational status, maintenance date, cost, and description.

### 2. Application State Layer

The root `App` component manages the main runtime state of the application. This includes:

- active navigation menu
- infrastructure assets
- maintenance records
- reported issues
- search text
- selected filters
- selected asset for detail inspection
- current asset-view mode

The application uses React hooks such as `useState` and `useMemo`. Derived statistics and filtered assets are recalculated from the current state so that the dashboard remains consistent after an asset is added, edited, or deleted.

### 3. Presentation Component Layer

Reusable components provide the visual building blocks of the system. Major components include:

- `Sidebar` for navigation
- `Header` for portal identity and date information
- `StatisticsCards` for summary indicators
- `FilterPanel` for asset filtering
- `AssetGrid` and `AssetCard` for portfolio browsing
- `AssetDetailModal` for detailed inspection
- `DataVisualization` for charts and analytical summaries
- `RecentUpdates` for recent asset information
- `EditAssetModal` for asset modification workflows

Each component has a focused responsibility and a related stylesheet to support maintainable development.

### 4. Page and Workflow Layer

The page layer organizes the main administrative workflows:

- dashboard overview
- infrastructure creation
- infrastructure browsing
- infrastructure categories
- maintenance management
- issue reports
- status monitoring
- reports and analytics
- notifications
- settings

Navigation is controlled through application state in `App.js`. A separate routing library is not currently required because the project uses a single-page prototype navigation model.

### 5. Visualization and Interaction Layer

The interface uses responsive CSS layouts and Recharts-based visual components to communicate information through:

- summary cards
- distribution charts
- condition indicators
- priority badges
- status labels
- tables
- filter controls
- modal dialogs
- recent-update panels

Visual hierarchy is used to distinguish normal, moderate, and critical infrastructure conditions.

## Repository Structure

```text
infra_maintainance-master/
├── package.json                    # Dependencies and project scripts
├── README.md                       # Project documentation
├── public/
│   ├── index.html                  # HTML entry document
│   ├── manifest.json               # Web application metadata
│   └── robots.txt                  # Search crawler configuration
└── src/
    ├── App.js                      # Root application state and page selection
    ├── App.css                     # Shared application layout styles
    ├── index.js                    # React entry point
    ├── index.css                   # Global browser styles
    ├── reportWebVitals.js          # Web-vitals support
    ├── setupTests.js               # Test environment setup
    ├── App.test.js                 # Application test file
    ├── components/
    │   ├── AssetCard.js
    │   ├── AssetDetailModal.js
    │   ├── AssetGrid.js
    │   ├── DataVisualization.js
    │   ├── EditAssetModal.js
    │   ├── FilterPanel.js
    │   ├── Header.js
    │   ├── RecentUpdates.js
    │   ├── Sidebar.js
    │   └── StatisticsCards.js
    ├── data/
    │   └── infrastructureData.js   # Initial asset data and statistics helpers
    └── pages/
        ├── Dashboard.js
        ├── AddInfrastructure.js
        ├── ViewInfrastructure.js
        ├── InfrastructureCategories.js
        ├── MaintenanceManagement.js
        ├── IssueReports.js
        ├── AssetStatusMonitoring.js
        ├── ReportsAnalytics.js
        ├── Notifications.js
        └── Settings.js
```

## Key Features

### Infrastructure Asset Management

The portal supports the primary frontend operations required for an infrastructure register:

- adding a new asset
- viewing asset information
- editing existing asset details
- deleting an asset
- opening a detailed asset modal
- calculating updated summary statistics

The current implementation stores these changes in React state for the active browser session.

### Dashboard Overview

The dashboard provides an operational summary of the infrastructure portfolio. It brings together:

- total asset count
- condition and priority summaries
- asset distribution information
- analytical charts
- searchable asset cards
- recent asset updates

This gives the user an initial view of portfolio health before navigating to a specialized page.

### Search and Multi-Criteria Filtering

The dashboard and infrastructure views support filtering based on:

- asset name
- location
- description
- department
- asset type
- condition
- priority level
- operational status

This allows users to narrow a broad infrastructure collection into a focused working set.

### Grid and Table Presentation

Assets can be reviewed through visual cards or structured tabular information. The grid view emphasizes quick comparison and visual status recognition, while the table view supports sorting, metadata inspection, and row-level actions.

### Category-Level Analysis

The categories page groups infrastructure assets by type and presents category-level information such as:

- number of assets
- health percentage
- condition distribution
- priority distribution
- total category value

This helps users compare different classes of infrastructure using a common presentation model.

### Maintenance Management

The maintenance module represents a workflow for scheduling and monitoring maintenance activity. It includes:

- maintenance summary cards
- schedule and history views
- maintenance filters
- maintenance alerts
- editable maintenance records
- status updates
- record deletion controls

The module demonstrates how operational tasks can be connected to infrastructure assets.

### Issue and Notification Interfaces

Issue and notification pages provide the presentation structure required for recording infrastructure problems, tracking their status, and communicating conditions that may require administrative attention. They also provide a clear extension point for future API-backed issue workflows.

### Responsive User Interface

The styling system uses flexible grids, responsive breakpoints, consistent spacing, and scoped page styles. The interface is designed to remain usable across desktop, tablet, and mobile viewport sizes.

## Technical Implementation Notes

### React Application State

The root component maintains the active application state and passes data and callbacks to child pages. This approach keeps the prototype simple while demonstrating unidirectional data flow.

Important state operations include:

- adding assets with generated identifiers
- updating asset fields
- removing assets from the active collection
- filtering records with memoized computations
- selecting an asset for modal inspection
- adding and updating maintenance records
- adding, updating, and deleting issues

### Derived Statistics

The application calculates statistics from the asset collection rather than storing duplicate totals. The derived values include:

- total number of assets
- distribution by asset type
- distribution by condition
- distribution by priority
- distribution by operational status
- aggregate cost of the current asset collection

This reduces the risk of displaying stale summary values when the underlying collection changes.

### Data Visualization

Recharts is used for chart-oriented dashboard components. The visualization layer is designed to convert aggregate values into readable visual summaries rather than exposing raw records alone.

The visual design uses color and spacing to distinguish healthy, moderate, critical, active, and maintenance-related states. These indicators are intended for operational clarity in a prototype context.

### Responsive Layout Engineering

The layout system addresses common dashboard scaling problems through:

- flexible content widths
- sidebar-aware main-content sizing
- minimum-width safeguards
- responsive grid columns
- consistent page padding
- mobile-specific control wrapping
- scoped page and component CSS
- equal-height card alignment where appropriate

This makes the interface more predictable across different screen dimensions.

### Client-Side Navigation

The application uses the `activeMenu` state to select the current page. Each navigation action updates the active menu value, and the root component renders the corresponding page component.

This approach is sufficient for a prototype with a small number of internal views. A future production implementation may replace it with a dedicated routing system and URL-based navigation.

### Session-Based Data Behavior

The initial data is loaded from the local JavaScript data module. Changes made during a session are held in memory and are lost when the browser is refreshed. This behavior is intentional for the current prototype and provides a clear boundary for future persistence work.

## Technology Stack

The project uses the following technologies:

- React 19.2.4
- JavaScript ES6+
- JSX
- CSS3
- Recharts 3.7.0
- Create React App
- `react-scripts` 5.0.1
- Jest
- React Testing Library
- Testing Library User Event
- Node.js and npm

The selected stack is lightweight, widely used for frontend education, and suitable for demonstrating interactive data-driven interfaces.

## Setup and Installation

### Requirements

Before running the project, ensure that the following are installed:

- Node.js 18 or a compatible current LTS release
- npm
- Git, if obtaining the project from a repository

### Install Dependencies

From the project directory, run:

```bash
npm install
```

The command installs React, Recharts, testing utilities, and the project build scripts declared in `package.json`.

## Running the Project

### 1. Start the Development Server

```bash
npm start
```

The Create React App development server starts the application in development mode and reports the local address in the terminal.

### 2. Create a Production Build

```bash
npm run build
```

This command compiles and optimizes the project for deployment.

### 3. Run the Test Suite

```bash
npm test
```

This command starts the configured Jest and React Testing Library test environment.

### 4. Deployment Build

The project includes a GitHub Pages-compatible deployment script:

```bash
npm run deploy
```

Deployment requires the appropriate repository permissions and a configured GitHub Pages workflow.

## Practical Data Flow

A typical user interaction follows this sequence:

1. The application loads the initial asset collection from the local data module.
2. The root component initializes asset, maintenance, issue, filter, and navigation state.
3. The dashboard derives summary statistics from the current asset collection.
4. The user searches or filters assets according to operational requirements.
5. The selected records are rendered as cards, table rows, charts, or detail views.
6. The user adds, edits, or deletes records through the corresponding interface.
7. React state updates the active collection and recalculates dependent summaries.
8. Maintenance and issue pages present operational workflows based on the current application data.
9. A browser refresh restores the original sample data because persistence is not yet implemented.

This workflow demonstrates the connection between data representation, derived computation, user interaction, and visual presentation in a client-side management application.

## Research and Academic Framing

From an academic perspective, the project sits at the intersection of several Computer Science and Engineering topics:

- software architecture and modular design
- frontend component engineering
- state management and event-driven programming
- data modeling and statistical aggregation
- responsive interface design
- information visualization
- human-computer interaction
- software testing and build validation

The project is especially suitable for demonstrating how a domain problem can be translated into a structured software system. Infrastructure management provides realistic entities, states, relationships, priorities, and operational workflows without requiring a complex external environment for the initial prototype.

The system can also serve as a foundation for research and development in areas such as:

- smart-city asset management
- predictive infrastructure maintenance
- GIS-enabled municipal planning
- IoT-supported condition monitoring
- public-sector decision-support systems
- lifecycle and risk analysis of physical assets

## Limitations and Design Caveats

This project is a frontend prototype and should be interpreted as an academic demonstration rather than a production municipal information system.

Important considerations include:

- infrastructure records are sample data rather than live government records
- changes are stored only in browser memory during the current session
- there is no backend API or persistent database
- authentication and role-based access control are not implemented
- issue, reports, notifications, and settings workflows can be expanded further
- sample condition and priority values are illustrative rather than engineering-certified assessments
- production deployment would require stronger validation, logging, security, accessibility testing, and data governance

The system should therefore be used for learning, demonstration, and prototyping until these concerns are addressed.

## Suggested Future Enhancements

The project can be extended in several practical directions:

- implement a REST or GraphQL backend
- persist assets and maintenance records in a relational or document database
- add authentication and department-based authorization
- introduce audit logs for asset and maintenance changes
- integrate GIS maps and location-aware asset views
- connect inspection forms and field-engineer workflows
- support image and document attachments for asset records
- add predictive maintenance and risk-scoring models
- provide CSV and PDF export functionality
- implement real-time alerts and notifications
- add comprehensive unit, integration, accessibility, and end-to-end tests
- deploy the frontend and backend through a managed cloud environment

## Quick Start

```bash
npm install
npm start
```

After the development server starts, use the sidebar to explore the dashboard, asset register, infrastructure categories, maintenance workflows, reports, notifications, and settings pages.

## License and Usage Disclaimer

This repository is provided for educational, academic, and demonstration purposes. It is not a production municipal asset-management system and does not replace professional infrastructure inspection, engineering assessment, or government information systems.

Use the project responsibly, and validate all operational, financial, and infrastructure decisions against authoritative domain information before applying the concepts in a real environment.

## Summary

The Urban Infrastructure Maintenance Portal demonstrates how a structured React application can represent a municipal infrastructure-management workflow. It combines local asset data, React state, reusable components, responsive styling, filters, operational pages, and visualization into a coherent frontend system.

The current implementation provides a clear prototype foundation. With the addition of persistence, authentication, GIS support, real-time data, and predictive analytics, it can evolve into a broader smart-city infrastructure platform.
