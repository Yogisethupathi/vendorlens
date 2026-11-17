import { useState, type ChangeEvent } from "react"
import { Vendorcard } from "./components/Vendorcard"
import { vendors as initialVendors } from "./Data/Vendor"
import searchvendor, { getActiveVendors } from "./utils/Vendorhelp"
import type { VendorStatus } from "./Type/Vendor"
import type PremiumVendor from "./Type/Vendor"
import CrudOperation from "./components/crudoperation"

export default function Dashboard() {
    // CRUD state: storing vendors in state so we can Create, Update, and Delete
    const [vendorList, setVendorList] = useState<PremiumVendor[]>(initialVendors)
    const [search, setsearch] = useState<string>("")
    const [filter, setFilter] = useState<VendorStatus>("all")

    const activeVendors = getActiveVendors(vendorList)

    const handelChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setsearch(e.target.value)
    }

    // CRUD: Create (Add new vendor)
    const handleAddVendor = (newVendor: PremiumVendor): void => {
        setVendorList([newVendor, ...vendorList])
    }

    // CRUD: Delete (Remove vendor by ID)
    const handleDeleteVendor = (id: number): void => {
        setVendorList(vendorList.filter((vendor) => vendor.id !== id))
    }

    // CRUD: Update (Toggle active/inactive status)
    const handleToggleStatus = (id: number): void => {
        setVendorList(
            vendorList.map((vendor) =>
                vendor.id === id
                    ? { ...vendor, status: vendor.status === "active" ? "inactive" : "active" }
                    : vendor
            )
        )
    }

    // Search function
    const searchedVendors = searchvendor(vendorList, search)

    // Filtered vendor by status
    const filtervendors = filter === "all" || filter === "All"
        ? searchedVendors
        : searchedVendors.filter((vendor) => vendor.status === filter)

    return (
        <div>
        <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto", fontFamily: "sans-serif" }}>
            <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", color: "#0f172a" }}>
                VendorLens Dashboard
            </div>

            {/* CRUD: Create Operation Component */}
            <CrudOperation onAddVendor={handleAddVendor} />

            <div style={{ marginBottom: "16px" }}>
                <input 
                    type="text" 
                    placeholder="Search the vendor..."
                    value={search}
                    onChange={handelChange}
                    style={{
                        padding: "8px 12px",
                        width: "100%",
                        maxWidth: "400px",
                        borderRadius: "6px",
                        border: "1px solid #cbd5e1",
                        fontSize: "14px"
                    }}
                />
            </div>

            <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 8px 0" }}>
                Total Result: {filtervendors.length}
            </p>
            <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 16px 0" }}>
                Active Vendors: {activeVendors.length}
            </p>

            <div className="filter-btn-group">
                <button 
                    onClick={() => setFilter("all")} 
                    className={`filter-btn ${filter === "all" ? "active" : ""}`}
                >
                    All Vendors
                </button>
                <button 
                    onClick={() => setFilter("active")} 
                    className={`filter-btn ${filter === "active" ? "active" : ""}`}
                >
                    Active Vendors
                </button>
                <button 
                    onClick={() => setFilter("inactive")} 
                    className={`filter-btn ${filter === "inactive" ? "active" : ""}`}
                >
                    Inactive Vendors
                </button>
            </div>

            {filtervendors.length === 0 ? (
                <p style={{ color: "#94a3b8" }}>vendor not found</p>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
                    {filtervendors.map((vendor) => (
                        <Vendorcard 
                            key={vendor.id} 
                            vendor={vendor} 
                            onDelete={handleDeleteVendor}
                            onToggleStatus={handleToggleStatus}
                        />
                    ))}
                </div>
            )}
        </div>
</div>
    )
}
