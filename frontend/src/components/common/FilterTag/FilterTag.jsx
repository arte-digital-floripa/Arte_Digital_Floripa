export default function FilterTag({
  tagText,
  label,
  active = false,
  classes = "",
  ...props
}) {
  const isActive = active ? "active" : "";

  return (
    <button
      type="button"
      className={`filter-tag ${isActive} ${classes}`.trim()}
      {...props}
    >
      {tagText || label}
    </button>
  );
}