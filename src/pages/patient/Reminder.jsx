import React from "react";

const Reminder = () => {

  // dummy data (baad me API se ayega)
  const reminders = [
    {
      id: 1,
      title: "Doctor Appointment",
      message: "Visit Dr. Sharma at 10:30 AM",
      date: "20 Feb 2026",
    },
    {
      id: 2,
      title: "Medicine Reminder",
      message: "Take Paracetamol after lunch",
      date: "15 Feb 2026",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Reminders ⏰</h2>

      {reminders.length === 0 ? (
        <p>No reminders available</p>
      ) : (
        reminders.map((reminder) => (
          <div
            key={reminder.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginTop: "10px",
              borderRadius: "8px",
            }}
          >
            <h4>{reminder.title}</h4>
            <p>{reminder.message}</p>
            <small>{reminder.date}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default Reminder;
