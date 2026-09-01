import Badge from "../ui/Badge";

const STATUS_CONFIG = {
  AVAILABLE: {
    label: "Available",
    variant: "success",
  },

  BUSY: {
    label: "Busy",
    variant: "warning",
  },

  ON_THE_WAY: {
    label: "On The Way",
    variant: "info",
  },
};

const normalizeStatus = (status) => {
  if (!status) {
    return "";
  }

  return status
    .toString()
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "_");
};

const MechanicStatusBadge = ({ status }) => {
  const normalizedStatus = normalizeStatus(status);

  const config = STATUS_CONFIG[normalizedStatus] || {
    label: status?.toString().trim() || "Unknown",
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

export default MechanicStatusBadge;