import React, { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import "./css/Advice.css";

const Advice = () => {
  const [adviceList, setAdviceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

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

  const summary = useMemo(() => {
    const withFollowUp = adviceList.filter((item) => Boolean(item.followUpDate)).length;
    const upcomingFollowUp = adviceList.filter((item) => {
      if (!item.followUpDate) return false;
      return new Date(item.followUpDate) >= new Date();
    }).length;

    return {
      total: adviceList.length,
      withFollowUp,
      upcomingFollowUp,
    };
  }, [adviceList]);

  const filteredAdvice = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return adviceList.filter((item) => {
      const doctorName = (item.doctor?.fullName || item.doctor?.username || "").toLowerCase();
      const title = (item.title || "").toLowerCase();
      const message = (item.message || item.dietAdvice || "").toLowerCase();

      const matchesSearch =
        !query ||
        doctorName.includes(query) ||
        title.includes(query) ||
        message.includes(query);

      if (!matchesSearch) return false;
      if (filter === "followup") return Boolean(item.followUpDate);
      if (filter === "general") return !item.followUpDate;
      return true;
    });
  }, [adviceList, filter, searchTerm]);

  if (loading) return <div className="patient-advice-loading">Loading advice...</div>;
  if (error) return <div className="patient-advice-error">{error}</div>;

  return (
    <section className="patient-advice-page">
      <div className="patient-advice-shell">
        <header className="patient-advice-hero">
          <p className="patient-advice-kicker">Patient Care Center</p>
          <h2>Your Advice Feed</h2>
          <p className="patient-advice-subtitle">
            A clear view of recommendations from your doctors, including follow-up guidance.
          </p>
        </header>

        <div className="patient-advice-layout">
          <aside className="patient-advice-panel">
            <div className="patient-advice-count">
              <span>{summary.total}</span>
              <small>Total advice notes</small>
            </div>

            <div className="patient-advice-summary">
              <div className="patient-advice-summary-card">
                <span>{summary.withFollowUp}</span>
                <small>Need follow-up</small>
              </div>
              <div className="patient-advice-summary-card">
                <span>{summary.upcomingFollowUp}</span>
                <small>Upcoming follow-up</small>
              </div>
              <div className="patient-advice-summary-card">
                <span>{summary.total - summary.withFollowUp}</span>
                <small>General guidance</small>
              </div>
            </div>

            <div className="patient-advice-toolbar">
              <label htmlFor="advice-search">Search Advice</label>
              <input
                id="advice-search"
                type="text"
                className="patient-advice-search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Doctor, title, or advice text"
                aria-label="Search advice"
              />

              <div className="patient-advice-filters">
                <button
                  type="button"
                  className={`patient-advice-filter-btn ${filter === "all" ? "active" : ""}`}
                  onClick={() => setFilter("all")}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`patient-advice-filter-btn ${filter === "followup" ? "active" : ""}`}
                  onClick={() => setFilter("followup")}
                >
                  Follow-up
                </button>
                <button
                  type="button"
                  className={`patient-advice-filter-btn ${filter === "general" ? "active" : ""}`}
                  onClick={() => setFilter("general")}
                >
                  General
                </button>
              </div>
            </div>
          </aside>

          <main className="patient-advice-main">
            {adviceList.length === 0 ? (
              <p className="patient-advice-empty">No advice available.</p>
            ) : filteredAdvice.length === 0 ? (
              <p className="patient-advice-empty">No advice matches your filter.</p>
            ) : (
              <div className="patient-advice-feed">
                {filteredAdvice.map((advice) => (
                  <article key={advice._id} className="patient-advice-card">
                    <div className="patient-advice-card-head">
                      <div>
                        <h3>{advice.title || "General Advice"}</h3>
                        <p className="patient-advice-doctor">
                          by {advice.doctor?.fullName || advice.doctor?.username || "Doctor"}
                        </p>
                      </div>
                      <span className={advice.followUpDate ? "tag followup" : "tag general"}>
                        {advice.followUpDate ? "Follow-up" : "General"}
                      </span>
                    </div>

                    <p className="patient-advice-message">
                      {advice.message || advice.dietAdvice || "No advice details provided."}
                    </p>

                    <div className="patient-advice-meta">
                      <p>
                        <strong>Given:</strong> {new Date(advice.createdAt).toLocaleString()}
                      </p>
                      {advice.followUpDate ? (
                        <p>
                          <strong>Follow-up:</strong>{" "}
                          {new Date(advice.followUpDate).toLocaleDateString()}
                        </p>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default Advice;
