export default function SearchInput({ value, onChange, placeholder = "Buscar..." }) {
  return <input type="search" value={value} onChange={onChange} placeholder={placeholder} />;
}
