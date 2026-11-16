import { useNavigate } from "react-router-dom"

export default function Landingpage() {
    const navigate = useNavigate()

    const Login = () => {
        navigate("/Login")
    }

    return (
        <div style={{ padding: "40px 24px", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
            <header style={{ marginBottom: "24px" }}>
                <h1 style={{ fontSize: "32px", color: "#0f172a", margin: "0 0 8px 0" }}>Vendor Lens</h1>
            </header>
            <main style={{ marginBottom: "24px" }}>
                <div style={{ fontSize: "18px", fontWeight: "500", color: "#334155", marginBottom: "8px" }}>
                    Welocme to my mern project !!!!
                </div>
                <p style={{ color: "#64748b", lineHeight: "1.6" }}>
                    i pratice tech by handcoding for better undestanding of code and produce clean code
                </p>
            </main>
            <div>
                <button 
                    onClick={() => Login()}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#0f172a",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "14px",
                        cursor: "pointer"
                    }}
                >
                    Login
                </button>
            </div>
        </div>
    )
}
