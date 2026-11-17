import { useState, type ChangeEvent, type FormEvent } from "react"
import type PremiumVendor from "../Type/Vendor"

// 1. Props Interface: Defines the callback function received from parent (Dashboard)
interface Props {
    onAddVendor: (vendor: PremiumVendor) => void
}

export default function CrudOperation({ onAddVendor }: Props) {
    // 2. Form State: Stores current values for all input & select fields
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        catogery: "",
        services: "",
        creditlimit: "",
        totalInvoices: "",
        priority: "medium" as "top" | "high" | "medium",
        payment: "pending" as "pending" | "paid" | "overdue",
        status: "active" as "active" | "inactive"
    })

    // 3.input's "name" attribute
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // 4."+ Add Vendor"
    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault()

        // Validation
        if (!formData.name.trim() || !formData.company.trim()) {
            return
        }

       //the data is created for newvwndor
        const newVendor: PremiumVendor = {
            id: Date.now(),
            name: formData.name,
            company: formData.company,
            email: formData.email || "vendor@example.com",
            catogery: formData.catogery || "General",
            services: formData.services || "Standard Services",
            creditlimit: formData.creditlimit ? Math.max(0, Math.abs(Number(formData.creditlimit))) : 50000,
            totalInvoices: formData.totalInvoices ? Math.max(0, Math.abs(Number(formData.totalInvoices))) : 0,
            priority: formData.priority,
            payment: formData.payment,
            status: formData.status
        }

        // Send the new vendor to the parent Dashboard's state
        onAddVendor(newVendor)

        // Reset all form inputs 
        setFormData({
            name: "",
            company: "",
            email: "",
            catogery: "",
            services: "",
            creditlimit: "",
            totalInvoices: "",
            priority: "medium",
            payment: "pending",
            status: "active"
        })
    }

    return (
        <div className="crud-form-container">
            <h3 className="crud-form-title">Add New Vendor</h3>
            <form onSubmit={handleSubmit} className="crud-form">
                {/* Text Inputs */}
                <input
                    type="text"
                    name="name"
                    placeholder="Vendor Name *"
                    value={formData.name}
                    onChange={handleChange}
                    className="crud-input"
                    required
                />
                <input
                    type="text"
                    name="company"
                    placeholder="Company Name *"
                    value={formData.company}
                    onChange={handleChange}
                    className="crud-input"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="crud-input"
                />
                <input
                    type="text"
                    name="catogery"
                    placeholder="Category"
                    value={formData.catogery}
                    onChange={handleChange}
                    className="crud-input"
                />
                <input
                    type="text"
                    name="services"
                    placeholder="Services (e.g. Cloud, IT)"
                    value={formData.services}
                    onChange={handleChange}
                    className="crud-input"
                />

                {/* Number Inputs */}
                <input  //credit number : stays postive using js function 
                    type="number"
                    name="creditlimit"
                    placeholder="Credit Limit ($)"
                    min="0"
                    value={formData.creditlimit}
                    onChange={handleChange}
                    className="crud-input"
                />
                <input
                    type="number"
                    name="totalInvoices"
                    placeholder="Total Invoices"
                    min="0"
                    value={formData.totalInvoices}
                    onChange={handleChange}
                    className="crud-input"
                />

                {/* Select Dropdowns */}
                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="crud-select"
                >
                    <option value="medium">Priority: Medium</option>
                    <option value="high">Priority: High</option>
                    <option value="top">Priority: Top</option>
                </select>

                <select
                    name="payment"
                    value={formData.payment}
                    onChange={handleChange}
                    className="crud-select"
                >
                    <option value="pending">Payment: Pending</option>
                    <option value="paid">Payment: Paid</option>
                    <option value="overdue">Payment: Overdue</option>
                </select>

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="crud-select"
                >
                    <option value="active">Status: Active</option>
                    <option value="inactive">Status: Inactive</option>
                </select>

                <button type="submit" className="crud-btn">
                    + Add Vendor
                </button>
            </form>
        </div>
    )
}

export { CrudOperation }
