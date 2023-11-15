import '../styles/App.scss';
const instrumentList = (props) => {
  const renderInstrumentList = () => {
    return <ul className='cards'>{renderInstruments()}</ul>;
  };

  const renderInstruments = () => {
    return props.instruments.map((instrument) => {
      return (
        <li key={instrument._id} className='card'>
          <img
            className='card__img'
            src={instrument.pic}
            alt={`Imágen de ${instrument.name}`}
          />
          <h3 className='card__title'>{instrument.name}</h3>
          <a href={`${instrument.audio}`}>Audio</a>
          <p className='card__description'>
            Familia: {instrument.family.familyName}
          </p>
          <p className='card__description'>{instrument.description}</p>
        </li>
      );
    });
  };

  const renderEmptyList = () => {
    return <p>No hay instrumentos en este listado</p>;
  };

  return props.instruments ? renderInstrumentList() : renderEmptyList();
};

export default instrumentList;
