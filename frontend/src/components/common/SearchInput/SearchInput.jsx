export default function SearchInput({
  value,
  onChange,
  placeholder = "Buscar",
  className = "",
  ...props
}) {
  return (
    <form className={`search-container ${className}`.trim()} {...props}>
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="search-input"
      />
      <button type="submit" className="search-submit-btn" aria-label="Buscar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="22" y2="22" />
        </svg>
      </button>
    </form>
  );
}