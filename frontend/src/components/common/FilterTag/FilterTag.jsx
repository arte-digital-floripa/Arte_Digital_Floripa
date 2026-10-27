export default function FilterTag({ label, active, onClick }) {
  return (
    <button onClick={onClick} className={active ? "active" : ""}>
      {label}
    </button>
  );
}