export type VendorStatus = "All" | "all" | "active" | "inactive";

export interface Vendor {
    readonly id: number;
    name: string;
    email: string;
    catogery: string;
    company: string;
    phone?: string;  // optional property
    status: "active" | "inactive";
    payment: "pending" | "paid" | "overdue";
    totalInvoices: number;
}

export default interface PremiumVendor extends Vendor {
    services: string;
    priority: "top" | "high" | "medium";
    creditlimit: number;
}
