import api from "../api/axios";

export const createAppointment = async ({ doctorId, date, time, reason }) => {
  const res = await api.post("/appointments", {
    doctorId,
    date,
    time,
    reason,
  });
  return res.data?.data;
};

export const getPatientAppointments = async () => {
  const res = await api.get("/appointments/my");
  return res.data?.data || [];
};

export const cancelAppointment = async (appointmentId) => {
  const res = await api.patch(`/appointments/${appointmentId}/cancel`);
  return res.data?.data;
};

export const getDoctorAppointments = async () => {
  const res = await api.get("/appointments/doctor");
  return res.data?.data || [];
};

export const updateAppointmentStatus = async (appointmentId, status) => {
  const res = await api.patch(`/appointments/${appointmentId}/status`, { status });
  return res.data?.data;
};
