import { useState, useEffect } from 'react';

interface FilterFormProps {
  onFilter: (filters: {
    site?: string;
    equipment?: string;
    startDate?: string;
    endDate?: string;
  }) => void;
}

const FilterForm = ({ onFilter }: FilterFormProps) => {
  const [site, setSite] = useState('');
  const [equipment, setEquipment] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Aplicar filtros automaticamente quando algo mudar
  useEffect(() => {
    onFilter({
      site: site || undefined,
      equipment: equipment || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });
  }, [site, equipment, startDate, endDate]);

  const handleClear = () => {
    setSite('');
    setEquipment('');
    setStartDate('');
    setEndDate('');
    setShowDatePicker(false);
  };

  return (
    <div className="filter-form">
      <div className="filter-row">
        <div className="select-wrapper">
          <select
            value={site}
            onChange={(e) => setSite(e.target.value)}
            className="filter-select"
          >
            <option value="">Selecione um site</option>
            <option value="Barros">Barros, Reis e Moraes</option>
            <option value="Carvalho">Carvalho, Martins e Batista</option>
            <option value="Pereira">Pereira, Reis e Albuquerque</option>
            <option value="Souza">Souza-Batista</option>
          </select>
          <img src="/chevron.svg" alt="" className="select-arrow" />
        </div>

        <div className="select-wrapper">
          <select
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            className="filter-select"
          >
            <option value="">Selecione um equipamento</option>
            <option value="Gerador">Gerador</option>
            <option value="Transformador">Transformador</option>
            <option value="Multimedidor">Multimedidor</option>
          </select>
          <img src="/chevron.svg" alt="" className="select-arrow" />
        </div>

        <button 
          type="button"
          className="btn-period"
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
          <img src="/filter.svg" alt="" width="16" height="16" />
          <span>Filtrar por período</span>
        </button>

        {(site || equipment || startDate || endDate) && (
          <button type="button" onClick={handleClear} className="btn-clear">
            Limpar filtros
          </button>
        )}
      </div>

      {showDatePicker && (
        <div className="date-picker-row">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Data início"
          />
          <span>até</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="Data fim"
          />
        </div>
      )}
    </div>
  );
};

export default FilterForm;