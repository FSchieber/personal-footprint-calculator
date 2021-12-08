import './App.css';
import PageWrapper from './components/PageWrapper';
import TotalEmissions from './components/TotalEmissions';
import Header from './components/Header';
import PageCover from './components/PageCover';
import EmissionCategories from './components/EmissionCategories/EmissionCategories.js';
import HousingEmissions from './components/EmissionCategories/HousingEmissions';
import TravelEmissions from './components/EmissionCategories/TravelEmissions';
import { BackTop } from 'antd';
import { useState } from 'react';

function App() {

  const [totalEmissions, setTotalEmissions] = useState(0);
  const [totalEmissionsPerCategory, setTotalEmissionsPerCategory] = useState({});

  const updateEmissionCategory = (emissionCategory, totalEmissions) => {
    totalEmissionsPerCategory[emissionCategory] = totalEmissions;
    setTotalEmissionsPerCategory(totalEmissionsPerCategory);
    updateTotalEmissions(totalEmissionsPerCategory);
  }

  const updateTotalEmissions = (totalEmissionsPerCategory) => {
    let total = 0;
    for (let category in totalEmissionsPerCategory) {
      total += totalEmissionsPerCategory[category];
    }
    setTotalEmissions(total);
  }

  return (
    <PageWrapper>
      <Header />
      <PageCover />
      <TotalEmissions totalEmissions={(totalEmissions).toLocaleString()} />
      <EmissionCategories children={
        <div style={{ width: "100%" }}>
          <HousingEmissions onTotalEmissionsChange={updateEmissionCategory} />
          <TravelEmissions onTotalEmissionsChange={updateEmissionCategory} />
        </div>
      } />
      <BackTop>
        <div className="back-to-top">Top</div>
      </BackTop>
    </PageWrapper>
  );
}

export default App;
