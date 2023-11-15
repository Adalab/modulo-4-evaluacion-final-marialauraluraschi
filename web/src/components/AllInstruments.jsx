import InstrumentList from './InstrumentList';
import '../styles/App.scss';

const AllInstruments = (props) => {
  const handleOptions = (ev) => {
    props.handleAllInstrumentsOptions({
      value: ev.target.value,
      key: ev.target.name,
    });
  };
  return (
    <section className='border--medium'>
      <h1 className='title--medium'>Instrumentos</h1>
      <form className='movies__filters'>
        <div className='movies__filters--genre'>
          <label htmlFor='filterFamily'>Filtrar por familia</label>
          <select
            className='form__input-text'
            id='filterFamily'
            name='family'
            value={props.allInstrumentsOptionFamily}
            onChange={handleOptions}
          >
            <option value=''>Todas</option>
            <option value='Cordófonos'>Cordófonos</option>
            <option value='Membranófonos'>Membranófonos</option>
            <option value='Electrófonos'>Electrófonos</option>
            <option value='Aerófonos'>Aerófonos</option>
            <option value='Idiófonos'>Idiófonos</option>
          </select>
        </div>

        <div className='movies__filters--sort'>
          <label>
            Ordernar: A-Z
            <input
              className='movies__radio'
              type='radio'
              name='sort'
              value='asc'
              checked={props.allInstrumentsOptionSort === 'asc'}
              onChange={handleOptions}
            />
          </label>

          <label>
            Z-A
            <input
              className='movies__radio'
              type='radio'
              name='sort'
              value='desc'
              checked={props.allInstrumentsOptionSort === 'desc'}
              onChange={handleOptions}
            />
          </label>
        </div>
      </form>

      <InstrumentList instruments={props.instruments} />
    </section>
  );
};

export default AllInstruments;
