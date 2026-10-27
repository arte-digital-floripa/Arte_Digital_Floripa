import { useState, useMemo } from "react";

export function useFilter(items = [], filterKey = "name") {
  const [seacrchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("Todos");

  // useMemo recalcula a lista filtrada apenas quando o termo de busca ou a lista mudarem
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchSearch = item[filterey]
      ?.toLowerCase()
      .includes(seacrchTerm.toLowerCase());

      return matchSearch;
    });
  }, [items, filterKey, seacrchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    selectedTag,
    setSelectedTag,
    filteredItems,
  };
}