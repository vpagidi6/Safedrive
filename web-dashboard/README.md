# SafeDrive Web Dashboard

A modern Next.js web dashboard for the SafeDrive project, converted from the original Flutter dashboard. This is a full-featured website with a traditional web layout including top navigation, sidebar menu, and responsive design.

## Features

- **Website Layout**: Traditional web structure with top navigation bar and sidebar
- **Dashboard Overview**: View driving distraction statistics and recent drives
- **Real-time Data**: Fetches distraction data from Firebase Firestore
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Dark theme matching the original Flutter design
- **Interactive Charts**: Pie chart visualization of distraction breakdown
- **Image Preview**: Click on distractions to view captured images
- **Search Functionality**: Search bar in the top navigation (desktop)
- **Notifications**: Notification bell with indicator

## Tech Stack

- **Next.js 14**: React framework with App Router
- **React 18**: UI library
- **Firebase**: Firestore for data storage
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Chart library for data visualization
- **Lucide React**: Icon library

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Navigate to the web-dashboard directory:
```bash
cd web-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
web-dashboard/
├── app/
│   ├── layout.js          # Root layout with fonts
│   ├── page.js            # Main dashboard page
│   └── globals.css        # Global styles with custom scrollbar
├── components/
│   ├── dashboard/         # Dashboard components
│   │   ├── DashboardScreen.js
│   │   ├── MyFiles.js
│   │   ├── RecentDrives.js
│   │   ├── StorageDetails.js
│   │   └── ...
│   └── layout/            # Layout components
│       ├── MainLayout.js  # Main layout with sidebar
│       ├── TopNav.js      # Top navigation bar
│       ├── SideMenu.js    # Sidebar navigation menu
│       └── MenuItem.js    # Menu item component
├── lib/
│   ├── firebase.js        # Firebase configuration
│   ├── api/               # API utilities
│   ├── constants.js       # App constants
│   └── utils/             # Utility functions
└── package.json
```

## Layout Structure

The website follows a traditional web layout:

- **Top Navigation Bar**: Fixed header with logo, search, notifications, and profile
- **Sidebar Menu**: Persistent sidebar on desktop, collapsible on mobile
- **Main Content Area**: Scrollable content area with max-width container
- **Responsive Grid**: 12-column grid system for dashboard widgets

## Key Components

### DashboardScreen
Main dashboard container that orchestrates all dashboard components.

### MyFiles
Displays average number of distractions per drive in a grid layout.

### RecentDrives
Shows a list of recent driving distractions with clickable previews.

### StorageDetails
Displays distraction breakdown with a pie chart and category list.

## Firebase Configuration

The app uses Firebase Firestore to fetch distraction data from the `classifications` collection. The Firebase configuration is already set up in `lib/firebase.js` using the same credentials as the Flutter app.

## Responsive Breakpoints

- **Mobile**: < 850px
- **Tablet**: 850px - 1100px
- **Desktop**: >= 1100px

## Building for Production

```bash
npm run build
npm start
```

## Design Notes

The dashboard maintains the same visual design as the Flutter version with website-optimized improvements:
- **Dark Theme**: Colors `#212332` (background), `#2A2D3E` (secondary), `#2697FF` (primary)
- **Typography**: Poppins font family from Google Fonts
- **Layout**: Traditional website structure with top nav and sidebar
- **Spacing**: Consistent padding and margins throughout
- **Custom Scrollbar**: Styled scrollbars matching the dark theme
- **Responsive Grid**: 12-column grid system for flexible layouts

## Future Enhancements

- Add authentication
- Implement real-time updates with Firebase listeners
- Add filtering and sorting for distractions
- Create profile and settings pages
- Add data export functionality
