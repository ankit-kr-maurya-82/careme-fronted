import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const MyProblems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const res = await api.get("/problems/my");
      setProblems(res.data?.data || []);
    } catch (error) {
      console.log("Fetch Error:", error);
      alert("Failed to load problems");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h3>Loading problems...</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Medical Problems 🩺</h2>

      {problems.length === 0 ? (
        <p>No problems submitted yet.</p>
      ) : (
        problems.map((problem) => (
          <div
            key={problem._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginTop: "15px",
              borderRadius: "8px",
              background: "#f9f9f9",
            }}
          >
            <p>
              <strong>Doctor:</strong>{" "}
              {problem.doctor?.fullName || problem.doctor?.username || "Not assigned"}
            </p>

            <p>
              <strong>Title:</strong> {problem.title}
            </p>

            <p>
              <strong>Description:</strong> {problem.description}
            </p>

            <p>
              <strong>Severity:</strong> {problem.severity}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(problem.date).toLocaleDateString()}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color: problem.status === "Pending" ? "orange" : "green",
                  fontWeight: "bold",
                }}
              >
                {problem.status}
              </span>
            </p>

            <small>
              Submitted on:{" "}
              {new Date(problem.createdAt).toLocaleDateString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
};

export default MyProblems;
