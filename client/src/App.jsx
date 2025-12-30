import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import FoodPickup from './pages/FoodPickup';
import MailingListSignup from './components/MailingListSignup';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/food-pickup" element={<FoodPickup />} />
                <Route path="/mailing-list-signup" element={<MailingListSignup />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
