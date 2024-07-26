import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import FilterSection from './components/FilterSection';
import Countries from './components/Countries';
import CountryDetail from './components/CountryDetail';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);


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
              path="/"
              element={
                <>
                  <FilterSection selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} setSearchQuery={setSearchQuery} />
                  <Countries countries={filteredCountries} />
                </>
              }
            />
            <Route path="/country/:countryCode" element={<CountryDetail />} />
          </Routes>
        )}
      </main>
    </Router>
  );
}

export default App;
