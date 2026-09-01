export const BOOKING_STATUS = {
  PENDING: "PENDING",
  ASSIGNED: "ASSIGNED",
  ON_THE_WAY: "ON_THE_WAY",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
};

export const MECHANIC_STATUS = {
  AVAILABLE: "AVAILABLE",
  BUSY: "BUSY",
  ON_THE_WAY: "ON_THE_WAY",
  OFFLINE: "OFFLINE",
  UNAVAILABLE: "UNAVAILABLE",
};

export const getBookingStatusLabel = (
  status
) => {
  const labels = {
    PENDING: "Pending",
    ASSIGNED: "Assigned",
    ON_THE_WAY: "On The Way",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
  };

  return (
    labels[status?.toUpperCase()] ||
    status ||
    "Unknown"
  );
};

export const getMechanicStatusLabel = (
  status
) => {
  const labels = {
    AVAILABLE: "Available",
    BUSY: "Busy",
    ON_THE_WAY: "On The Way",
    OFFLINE: "Offline",
    UNAVAILABLE: "Unavailable",
  };

  return (
    labels[status?.toUpperCase()] ||
    status ||
    "Unknown"
  );
};

export const isActiveBooking = (status) => {
  return [
    BOOKING_STATUS.PENDING,
    BOOKING_STATUS.ASSIGNED,
    BOOKING_STATUS.ON_THE_WAY,
    BOOKING_STATUS.IN_PROGRESS,
  ].includes(status);
};

export const isCompletedBooking = (status) => {
  return status === BOOKING_STATUS.COMPLETED;
};

export const isCancelledBooking = (status) => {
  return status === BOOKING_STATUS.CANCELLED;
};

export const isActiveMechanic = (status) => {
  return [
    MECHANIC_STATUS.AVAILABLE,
    MECHANIC_STATUS.BUSY,
    MECHANIC_STATUS.ON_THE_WAY,
  ].includes(status);
};