# VendorLens

VendorLens is a vendor management dashboard built with **React 19**, **TypeScript**, and **Vite**. It provides a clean, responsive interface to manage, search, filter, and execute full **CRUD (Create, Read, Update, Delete)** operations on vendor records.

---

## What is CRUD?

**CRUD** represents the four fundamental operations for managing persistent data:

| Letter | Operation | Purpose | In VendorLens |
| :---: | :--- | :--- | :--- |
| **C** | **Create** | Add new records | The **Add New Vendor** form |
| **R** | **Read** | View, search, and filter records | The **Dashboard vendor cards grid** |
| **U** | **Update** | Modify existing records | The **Toggle Status** action button |
| **D** | **Delete** | Remove records from the list | The **Delete** action button |

---

## Detailed CRUD Implementation

### 1. Create (Add New Vendor)
* **File:** `src/components/crudoperation.tsx`
* **How it works:**
  1. **Controlled Form State:** Form inputs (`name`, `company`, `email`, `category`, `services`, `creditlimit`, `totalInvoices`, `priority`, `payment`, `status`) are bound to a single local state object (`formData`).
  2. **Dynamic Handler:** A single `handleChange` function updates state dynamically based on the input's `name` attribute:
     ```tsx
     const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
         setFormData({
             ...formData,
             [e.target.name]: e.target.value
         })
     }
     ```
  3. **Data Sanitization & Object Construction:** 
     - Generates a unique timestamp `id` using `Date.now()`.
     - Ensures `creditlimit` and `totalInvoices` are strictly positive numbers using `Math.max(0, Math.abs(Number(...)))`.
     - Provides clean fallback defaults for optional text fields.
  4. **Child-to-Parent Communication:** Calls the `onAddVendor(newVendor)` callback function passed down as a prop from `Dashboard.tsx`.
  5. **State Update in Parent:** In `Dashboard.tsx`, the new vendor is prepended to the array:
     ```tsx
     const handleAddVendor = (newVendor: PremiumVendor): void => {
         setVendorList([newVendor, ...vendorList])
     }
     ```
  6. **Form Reset:** Resets `formData` back to initial empty/default values so the form is ready for the next entry.

---

### 2. Read (View, Search & Filter Vendors)
* **Files:** `src/Dashboard.tsx`, `src/components/Vendorcard.tsx`, `src/utils/Vendorhelp.tsx`
* **How it works:**
  1. **Reactive State Storage:** The list of vendors is stored in React state in `Dashboard.tsx`:
     ```tsx
     const [vendorList, setVendorList] = useState<PremiumVendor[]>(initialVendors)
     ```
  2. **Multi-field Search:** `searchvendor()` in `src/utils/Vendorhelp.tsx` filters vendors by comparing the search query against `name`, `company`, `category`, and `email` using `.toLowerCase()` and `.includes()`.
  3. **Status Filter:** Filter buttons (`All`, `Active`, `Inactive`) update the `filter` state. A **ternary operator** computes the final displayed list without mutating the original state:
     ```tsx
     const filtervendors = filter === "all" || filter === "All"
         ? searchedVendors
         : searchedVendors.filter((vendor) => vendor.status === filter)
     ```
  4. **Dynamic Rendering:** Maps through `filtervendors` to display an individual `<Vendorcard />` for each record, passing the vendor data and action callbacks via props.
  5. **Computed Counters:** Live counters show `Total Result: {filtervendors.length}` and `Active Vendors: {activeVendors.length}` using `getActiveVendors()`.

---

### 3. Update (Toggle Vendor Status)
* **Files:** `src/Dashboard.tsx`, `src/components/Vendorcard.tsx`
* **How it works:**
  1. Each card in `Vendorcard.tsx` contains a **Toggle Status** button:
     ```tsx
     <button onClick={() => onToggleStatus(vendor.id)}>Toggle Status</button>
     ```
  2. When clicked, it triggers `handleToggleStatus` in `Dashboard.tsx`:
     ```tsx
     const handleToggleStatus = (id: number): void => {
         setVendorList(
             vendorList.map((vendor) =>
                 vendor.id === id
                     ? { ...vendor, status: vendor.status === "active" ? "inactive" : "active" }
                     : vendor
             )
         )
     }
     ```
  3. Uses `.map()` to create a new array immutably, flipping the target vendor's `status` between `"active"` and `"inactive"`. The UI and counters instantly re-render to reflect the change.

---

### 4. Delete (Remove Vendor)
* **Files:** `src/Dashboard.tsx`, `src/components/Vendorcard.tsx`
* **How it works:**
  1. Each card includes a **Delete** button:
     ```tsx
     <button onClick={() => onDelete(vendor.id)}>Delete</button>
     ```
  2. When clicked, it calls `handleDeleteVendor` in `Dashboard.tsx`:
     ```tsx
     const handleDeleteVendor = (id: number): void => {
         setVendorList(vendorList.filter((vendor) => vendor.id !== id))
     }
     ```
  3. Uses `.filter()` to produce a new array excluding the vendor matching the clicked `id`.

---

## Data Models & Types

All types are defined in `src/Type/Vendor.ts`:

```ts
// Status Union Type
export type VendorStatus = "All" | "all" | "active" | "inactive";

// Base Vendor Interface
export interface Vendor {
    readonly id: number;
    name: string;
    email: string;
    catogery: string;
    company: string;
    phone?: string;
    status: "active" | "inactive"; 
    payment: "pending" | "paid" | "overdue";
    totalInvoices: number;
}

// Extended Premium Vendor Interface (Inheritance)
export default interface PremiumVendor extends Vendor {
    services: string;
    priority: "top" | "high" | "medium";
    creditlimit: number;
}
```

---

## Core React & TypeScript Concepts Applied

1. **Immutable State Management:** Using spread operators (`[newVendor, ...vendorList]`), `.filter()`, and `.map()` instead of directly mutating state.
2. **Child-to-Parent Communication (Lifting State Up):** Passing callback functions (`onAddVendor`, `onDelete`, `onToggleStatus`) down through props.
3. **Controlled Form Inputs:** Binding `<input>` and `<select>` values directly to React state with dynamic `onChange` handlers.
4. **Input Validation & Sanitization:** Using HTML `min="0"` and JavaScript `Math.max(0, Math.abs(...))` to guarantee non-negative numerical fields.
5. **Derived / Computed State:** Using the ternary operator (`? :`) to filter search results on the fly without extra unnecessary state hooks.
6. **Strict TypeScript & Verbatim Module Syntax:** Leveraging TypeScript interfaces, inheritance (`extends`), string literal union types, and type-only imports (`import type`).

---

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
