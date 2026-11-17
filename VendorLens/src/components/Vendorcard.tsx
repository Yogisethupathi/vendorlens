import type PremiumVendor from "../Type/Vendor"
import "./Vendorcard.css"

interface Props {
    vendor: PremiumVendor
    onDelete?: (id: number) => void
    onToggleStatus?: (id: number) => void
}

export const Vendorcard = ({ vendor, onDelete, onToggleStatus }: Props) => {
    return (
        <div className="vendor-card">
            <h3>{vendor.name}</h3>
            <p><strong>Company:</strong> {vendor.company}</p>
            <p><strong>Category:</strong> {vendor.catogery}</p>
            <p><strong>Services:</strong> {vendor.services}</p>
            <p><strong>Phone:</strong> {vendor.phone ?? "N/A"}</p>
            <p><strong>Email:</strong> {vendor.email}</p>
            <p><strong>Credit Limit:</strong> ${vendor.creditlimit.toLocaleString()}</p>
            <p><strong>Total Invoices:</strong> {vendor.totalInvoices}</p>
            <p>
                <strong>Priority:</strong>{" "}
                <span className={`priority ${vendor.priority}`}>{vendor.priority}</span>
            </p>
            <p>
                <strong>Payment:</strong>{" "}
                <span className={`payment ${vendor.payment}`}>{vendor.payment}</span>
            </p>
            <p>
                <strong>Status:</strong>{" "}
                <span className={`status ${vendor.status}`}>{vendor.status}</span>
            </p>

            {(onDelete || onToggleStatus) && (
                <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                    {onToggleStatus && (
                        <button
                            type="button"
                            onClick={() => onToggleStatus(vendor.id)}
                            className="btn-toggle-status"
                        >
                            Toggle Status
                        </button>
                    )}
                    {onDelete && (
                        <button
                            type="button"
                            onClick={() => onDelete(vendor.id)}
                            className="crud-btn-delete"
                        >
                            Delete
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
