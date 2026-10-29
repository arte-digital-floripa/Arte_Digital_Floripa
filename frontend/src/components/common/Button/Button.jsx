export default function Button({
  text,
  variant = "primary",
  className = "btn-compact",
  ...props
}) {
  return (
    <button className={`btn btn-${variant} ${className}`} {...props}>
      {text}
    </button>
  );
}
