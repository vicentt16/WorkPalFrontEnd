import "./SearchBar.css";

export default function SearchBar({
  search,
  setSearch,
  category,
  setCategory,
}) {
  return (
    <div className="searchbar-container">
      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar proyectos o habilidades..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="searchbar-input"
      />

      {/* Filtro de categorías */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="searchbar-select"
      >
        <option value="Todas">
          Todas las categorías
        </option>

        <option value="Web">Web</option>

        <option value="Mobile">Mobile</option>

        <option value="IA">IA</option>

        <option value="Diseño">Diseño</option>

        <option value="Gaming">Gaming</option>
      </select>
    </div>
  );
}