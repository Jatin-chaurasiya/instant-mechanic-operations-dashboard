import Badge from "../ui/Badge";

const statusConfig = {
  COMPLETED: {
    label: "Completed",
    variant: "success",
  },

  PENDING: {
    label: "Pending",
    variant: "warning",
  },

  ASSIGNED: {
    label: "Assigned",
    variant: "info",
  },

  ON_THE_WAY: {
    label: "On The Way",
    variant: "purple",
  },

  CANCELLED: {
    label: "Cancelled",
    variant: "danger",
  },

  IN_PROGRESS: {
    label: "In Progress",
    variant: "info",
  },
};

const StatusBadge = ({ status }) => {
  const normalizedStatus = status
    ?.toUpperCase()
    ?.replaceAll(" ", "_");

  const config =
    statusConfig[normalizedStatus] || {
      label: status || "Unknown",
      variant: "neutral",
    };

  return (
    <Badge
      variant={config.variant}
      dot
    >
      {config.label}
    </Badge>
  );
};

export default StatusBadge;