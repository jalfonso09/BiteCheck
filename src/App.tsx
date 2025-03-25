import { useState } from 'react';
import Header from './assets/components/Header.tsx';
import './App.css';
import CalorieCheck from './assets/components/CalorieCheck.tsx';
import SearchResult from './assets/components/SearchResult.tsx';
import AboutUs from './assets/components/AboutUs.tsx';

const App = () => {
    const apiKeyString = "DEMO_KEY"; //
    
    const [selectedFood, setSelectedFood] = useState<any | null>(null);

    return (
        <>
            <div>
                <Header />
                <AboutUs />
                <CalorieCheck apiKey={apiKeyString} onSelectFood={setSelectedFood} />
                <SearchResult selectedFood={selectedFood} />
            </div>
        </>
    );
};

export default App;
