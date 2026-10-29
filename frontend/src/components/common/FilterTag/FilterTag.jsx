export default function FilterTag({
  label,
  active = false,
  classes = "",
  ...props
}) {
  let isActive = active ? "active" : "";

  return (
    <button
      type="button"
      className={`filter-tag ${isActive} ${classes}`}
      {...props}
    >
      {label}
    </button>
  );
}
