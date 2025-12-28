import {useContext, useRef, useEffect} from "react";
import { Link, useSearchParams, useNavigate} from "react-router-dom";
import EcomContext from "../../context/EcomContext";

const Thanks = () => {
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const verifiedRef = useRef(false);
  const { refreshCart } = useContext(EcomContext);

  useEffect(() => {
    const transactionId =
      searchParams.get("transaction_id") || searchParams.get("id");

    if (!transactionId || verifiedRef.current) return;

    verifiedRef.current = true;

    const verifyPayment = async () => {
      try {
        const token = localStorage.getItem("auth-token");

        const res = await fetch(
          `http://localhost:3000/api/payment/verify/${transactionId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          console.log("✅ Payment verified");

          refreshCart(); // ✅ just refresh, don’t pass []
          navigate("/dashboard"); // ✅ redirect works
        } else {
          console.error("❌ Verification failed");
        }
      } catch (err) {
        console.error("❌ Verify error:", err);
      }
    };

    verifyPayment();
  }, [searchParams, refreshCart, navigate]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Success Icon */}
        <div style={styles.iconWrapper}>
          <div style={styles.icon}>✓</div>
        </div>

        {/* Title */}
        <h1 style={styles.title}>Thank You for Your Order!</h1>

        {/* Message */}
        <p style={styles.message}>
          Your gym wear is officially on the way 💪 <br />
          Designed for strength. Built for performance.
        </p>

        {/* Order Info */}
        <div style={styles.infoBox}>
          <p>📦 Order confirmed</p>
          <p>📧 Confirmation email sent</p>
          <p>🚚 Preparing for delivery</p>
        </div>

        {/* Buttons */}
        <div style={styles.buttonGroup}>
          <Link to="/" style={styles.primaryBtn}>
            Continue Shopping
          </Link>

          <Link to="/orders" style={styles.secondaryBtn}>
            View Orders
          </Link>
        </div>

        {/* Footer Text */}
        <p style={styles.footerText}>
          Thank you for choosing premium gym wear. <br />
          Stay strong 🖤
        </p>
      </div>
    </div>
  );
};

export default Thanks;

/* ========================= */
/* Inline Styles Only */
/* ========================= */

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #020617 0%, #0f172a 50%, #020617 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },

  card: {
    background: "#020617",
    borderRadius: "18px",
    padding: "45px 35px",
    maxWidth: "520px",
    width: "100%",
    textAlign: "center",
    color: "#e5e7eb",
    boxShadow: "0 25px 50px rgba(0,0,0,0.7)",
  },

  iconWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "15px",
  },

  icon: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    background: "#22c55e",
    color: "#020617",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "42px",
    fontWeight: "900",
    boxShadow: "0 10px 30px rgba(34,197,94,0.6)",
  },

  title: {
    fontSize: "34px",
    fontWeight: "800",
    marginBottom: "12px",
  },

  message: {
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#cbd5f5",
    marginBottom: "25px",
  },

  infoBox: {
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: "12px",
    padding: "15px",
    textAlign: "left",
    marginBottom: "30px",
    fontSize: "15px",
    color: "#e5e7eb",
  },

  buttonGroup: {
    display: "flex",
    gap: "14px",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  primaryBtn: {
    background: "#22c55e",
    color: "#020617",
    padding: "14px 26px",
    borderRadius: "999px",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "15px",
    transition: "0.3s",
  },

  secondaryBtn: {
    border: "2px solid #22c55e",
    color: "#22c55e",
    padding: "14px 26px",
    borderRadius: "999px",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "15px",
  },

  footerText: {
    marginTop: "30px",
    fontSize: "13px",
    color: "#94a3b8",
  },
};
