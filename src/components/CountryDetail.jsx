import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const CountryDetail = () => {
    const { countryCode } = useParams();
    const [country, setCountry] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [borders, setBorders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
                setCountry(response.data[0]);

                if (response.data[0].borders) {
                    const borderPromises = response.data[0].borders.map(borderCode => 
                        axios.get(`https://restcountries.com/v3.1/alpha/${borderCode}`)
                    );
                    const borderResponses = await Promise.all(borderPromises);
                    const borderCountries = borderResponses.map(res => res.data[0]);
                    setBorders(borderCountries);
                } else {
                    setBorders([]);
                }
            } catch (error) {
                console.error('Error fetching country data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCountryData();
    }, [countryCode]);

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    if (!country) {
        return <div className="error">There is a problem in fetching data. Please go back to home and come again 😊</div>;
    }

    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <>
            <button className='back-btn' onClick={handleBackClick}>Back</button>
            <div className="country-detail">
                <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
                <div className="info">
                    <h2>{country.name.common}</h2>
                    <div className='details'>
                        <p><strong>Native Name:</strong> {Object.values(country.name.nativeName)[0].common}</p>
                        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                        <p><strong>Region:</strong> {country.region}</p>
                        <p><strong>Sub Region:</strong> {country.subregion}</p>
                        <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}</p>
                        <p><strong>Top Level Domain:</strong> {country.tld[0]}</p>
                        <p><strong>Currencies:</strong> {Object.values(country.currencies).map(c => c.name).join(', ')}</p>
                        <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
                    </div>
                    <div className="borders-box">
                        <h3>Border Countries:</h3>
                        {borders.length > 0 ? (
                            borders.map((borderCountry) => (
                                <Link to={`/country/${borderCountry.cca3}`} key={borderCountry.cca3} className='border'>
                                    {borderCountry.name.common}
                                </Link>
                            ))
                        ) : (
                            <p>No borders..</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CountryDetail;
