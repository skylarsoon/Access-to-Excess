import { Link } from 'react-router-dom';

function Home() {
    return(
        <div>
            Access To Excess
            <Link to="/food-pickup" className="text-black hover:text-gray-300">Food Pickup</Link>
            <Link to="/mailing-list-signup" className="text-black hover:text-gray-300">Mailing List Signup Form</Link>
        </div>
    ) 

}

export default Home