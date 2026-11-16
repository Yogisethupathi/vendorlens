import { useState, type ChangeEvent } from "react"
import { Vendorcard } from "./components/Vendorcard"
import { vendors } from "./Data/Vendor"
import searchvendor from "./utils/Vendorhelp" 

export default function Dashboard() { 
    const [search, setsearch] = useState<string>("")

    const handelChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setsearch(e.target.value)
    }

    const filtervendors = searchvendor(vendors, search)

    return (
        <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto", fontFamily: "sans-serif" }}>
            <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", color: "#0f172a" }}>
                VendorLens Dashboard
            </div>
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
            <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 16px 0" }}>
                Total Result: {filtervendors.length}
            </p>
            {filtervendors.length === 0 ? (
                <p style={{ color: "#94a3b8" }}>vendor not found</p>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
                    {filtervendors.map((vendor) => (
                        <Vendorcard key={vendor.id} vendor={vendor} />
                    ))}
                </div>
            )}
        </div>
    )
}
