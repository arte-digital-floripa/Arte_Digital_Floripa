export default function MetricBadge({ label, value }) {
  return (
    <div>
      <span>{value}</span>
      <p>{label}</p>
    </div>
  );
}
