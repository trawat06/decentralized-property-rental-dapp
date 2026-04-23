function AlertMessage({ alert }) {
  if (!alert) return null;

  const colorClasses =
    alert.type === "error"
      ? "border-red-200 bg-red-50 text-red-700"
      : "border-green-200 bg-green-50 text-green-700";

  return (
    <div className={`rounded-lg border px-4 py-3 text-sm ${colorClasses}`}>
      {alert.message}
    </div>
  );
}

export default AlertMessage;
