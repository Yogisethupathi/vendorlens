# VendorLens

VendorLens is a vendor management dashboard built with **React 19**, **TypeScript**, and **Vite**. It provides a clean, responsive interface to manage, search, filter, and execute full **CRUD (Create, Read, Update, Delete)** operations on vendor records.

---
--

## Project Structure

```text
VendorLens/
├── public/
│   ├── favicon.svg          # Lens fallback icon
│   └── lens.svg             # Custom optical lens favicon
├── src/
│   ├── components/
│   │   ├── crudoperation.tsx # Form component for creating vendors
│   │   ├── Vendorcard.tsx    # Card component displaying vendor details
│   │   └── Vendorcard.css    # Scoped outline styling for vendor cards
│   ├── Data/
│   │   └── Vendor.ts         # Initial mock dataset (10 premium vendors)
│   ├── Type/
│   │   └── Vendor.ts         # TypeScript interfaces & union types
│   ├── utils/
│   │   └── Vendorhelp.tsx    # Search & active vendor filter utilities
│   ├── App.css               # Clean styling for dashboard and form
│   ├── App.tsx               # Route configurations (Landing, Login, Dashboard)
│   ├── Dashboard.tsx         # Main Dashboard managing CRUD state & UI
│   ├── Landingpage.tsx       # Welcome page with router navigation
│   ├── Loginpage.tsx         # Account/Login page
│   ├── index.css             # Base CSS reset
│   └── main.tsx              # Application entry point
├── index.html                # HTML entry point with lens favicon link
├── package.json              # Project dependencies & scripts
├── tsconfig.json             # Root TypeScript config
└── vite.config.ts            # Vite configuration
```

---

## Getting Started

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```
