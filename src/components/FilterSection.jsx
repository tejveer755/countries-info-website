import React, { useState } from 'react';

const FilterSection = ({ selectedRegion,setSelectedRegion, setSearchQuery }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showRegions, setShowRegions] = useState(false);
  const [animationState, setAnimationState] = useState('');

  const toggleRegions = () => {
    if (showRegions) {
      setAnimationState('hide');
      setTimeout(() => {
        setShowRegions(false);
        setAnimationState('');
      }, 400);
    } else {
      setShowRegions(true);
      setAnimationState('show');
    }
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    toggleRegions();
  };

  return (
    <div className="filter-section" >
      <div className={`search-box ${isFocused ? 'focused' : ''}`} >
        <span className="material-icons icon">search</span>
        <input
          type="text"
          placeholder="Search for a country..."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span
          className="material-icons icon"
          onClick={() => setIsFocused(false)}
        >
          close
        </span>
      </div>
      <div>
        <button className="filter-region" onClick={toggleRegions} >
      {  !selectedRegion  ? "Filter by Region" : selectedRegion }
        </button>
        {showRegions && 
          <div className={`regions ${animationState}`}>
            {['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].map((region) => (
              <p key={region} onClick={() => handleRegionChange(region === 'All' ? '' : region)}>{region}</p>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default FilterSection;
