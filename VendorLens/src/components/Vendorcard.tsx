import type PremiumVendor from "../Type/Vendor"
import "./Vendorcard.css"

interface Props {
    vendor: PremiumVendor
}

export const Vendorcard = ({ vendor }: Props) => {
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
        </div>
    )
}
