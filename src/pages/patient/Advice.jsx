import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const Advice = () => {
  const [adviceList, setAdviceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        setLoading(true);
        const res = await api.get("/advice/patient");
        setAdviceList(res.data?.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load advice");
      } finally {
        setLoading(false);
      }
    };

    fetchAdvice();
  }, []);

  if (loading) return <div style={{ padding: "20px" }}>Loading advice...</div>;
  if (error) return <div style={{ padding: "20px", color: "crimson" }}>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Doctor Advice</h2>

      {adviceList.length === 0 ? (
        <p>No advice available</p>
      ) : (
        adviceList.map((advice) => (
          <div
            key={advice._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginTop: "10px",
              borderRadius: "8px",
            }}
          >
            <p>
              <strong>Doctor:</strong>{" "}
              {advice.doctor?.fullName || advice.doctor?.username || "Doctor"}
            </p>
            <p>
              <strong>Title:</strong> {advice.title || "General Advice"}
            </p>
            <p>
              <strong>Advice:</strong> {advice.message || advice.dietAdvice}
            </p>
            <p>
              <strong>Date:</strong> {new Date(advice.createdAt).toLocaleString()}
            </p>
            {advice.followUpDate ? (
              <p>
                <strong>Follow-up:</strong>{" "}
                {new Date(advice.followUpDate).toLocaleDateString()}
              </p>
            ) : null}
          </div>
        ))
      )}
    </div>
  );
};

export default Advice;
