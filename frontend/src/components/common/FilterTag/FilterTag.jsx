export default function FilterTag({
  tagText,
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
      {tagText}
    </button>
  );
}
