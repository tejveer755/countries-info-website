import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import FilterSection from './components/FilterSection';
import Countries from './components/Countries';
import CountryDetail from './components/CountryDetail';
import Pagination from './components/Pagination';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const sortedCountries = response.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
        setFilteredCountries(sortedCountries);
      } catch (error) {
        console.error('Error fetching the countries data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); 
  }, []);

  useEffect(() => {
    const lowercasedSearchQuery = searchQuery.toLowerCase();
    const filtered = countries.filter(country => {
      const matchesRegion = selectedRegion ? country.region === selectedRegion : true;
      const matchesSearchQuery = country.name.common.toLowerCase().includes(lowercasedSearchQuery);
      return matchesRegion && matchesSearchQuery;
    });
    setFilteredCountries(filtered);
  }, [selectedRegion, searchQuery, countries]);


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPageBtn = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPageBtn = () => {
    setCurrentPage(currentPage - 1);
  };

  const countriesPerPage = 25;
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  return (
    <Router>
      <main>
        <nav >
          <h1>Where in the world?</h1>
        </nav>

        {isLoading ? (
          <div className="loading">Searching...</div>
        ) : (
          <Routes>
            <Route
              path="/countries-info-website/"
              element={
                <>
                  <FilterSection selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} setSearchQuery={setSearchQuery} />
                  <Countries countries={filteredCountries} />
                  <Pagination
                    countriesPerPage={countriesPerPage}
                    totalCountries={filteredCountries.length}
                    paginate={paginate}
                    nextPageBtn={nextPageBtn}
                    prevPageBtn={prevPageBtn}
                    currentPage={currentPage}
                  />
                </>
              }
            />
            <Route path="/countries-info-website/country/:countryCode" element={<CountryDetail />} />
          </Routes>
        )}
      </main>
    </Router>
  );
}

export default App;
