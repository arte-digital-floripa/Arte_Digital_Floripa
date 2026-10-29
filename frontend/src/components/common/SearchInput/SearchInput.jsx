export default function SearchInput({
  value,
  onChange,
  placeholder = "Buscar...",
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
      <button type="submit" className="search-submit-btn">
        <svg
          xmlns="http://w3.org"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="6" />
          <line x1="16" y1="16" x2="21" y2="21" />
        </svg>
      </button>
    </form>
  );
}
