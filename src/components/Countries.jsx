import { Link } from 'react-router-dom';

const Countries = ({ countries,  }) => {
  return (
    <div className="countries">
      {countries.map(country => (
      
        <Link to={`/countries-info-website/country/${country.cca3}`} key={country.cca3}>
          
          <div className="card expand" >
            <img
              src={country.flags.svg}
              alt={`Flag of ${country.name.common}`}
              className="card-img"
            />
            <div className="card-content">
              <h2 className="card-title">{country.name.common}</h2>
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Countries;
