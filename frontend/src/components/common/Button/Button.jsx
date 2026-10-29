export default function Button({
  text,
  variant = "primary",
  classes = "",
  ...props
}) {
  return (
    <button className={`btn btn-${variant} ${classes}`.trim()} {...props}>
      {text}
    </button>
  );
}
