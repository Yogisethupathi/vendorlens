import { useNavigate } from "react-router-dom"

export default function Loginpage() {
    const navigate = useNavigate()

    return (
        <div style={{ padding: "40px 24px", maxWidth: "400px", margin: "60px auto", fontFamily: "sans-serif", border: "1px solid #e2e8f0", borderRadius: "8px", textAlign: "center" }}>
            <h2 style={{ margin: "0 0 16px 0", color: "#0f172a" }}>Create an Account</h2>
            <button 
                onClick={() => navigate("/Dashboard")}
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
                Go to Dashboard
            </button>
        </div>
    )
}
