import type { Vendor } from "../Type/Vendor"

export default function searchvendor<T extends Vendor>(
    vendors: T[],
    search: string
): T[] {
    const searchNow = search.toLowerCase().trim()

    if (!searchNow) {
        return vendors
    }

    return vendors.filter((vendor) =>
        vendor.name.toLowerCase().includes(searchNow) ||
        vendor.company.toLowerCase().includes(searchNow) ||
        vendor.catogery.toLowerCase().includes(searchNow) ||
        vendor.email.toLowerCase().includes(searchNow)
    )
}

export function getActiveVendors<T extends Vendor>(vendors: T[]): T[] {
    return vendors.filter((vendor) => vendor.status === "active")
}
