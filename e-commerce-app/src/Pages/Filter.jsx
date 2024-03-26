import { useState } from "react";
import Rating from './Rating';


const Filter = () => {
    const [rate, setRate] = useState(5);
    
    return (
        <div>
            <span>
                <label>Rating: </label>
                <Rating 
                    rating={rate} 
                    onClick={(i) => setRate(i + 1)}
                />
            </span>
            
        </div>
    );
};

export default Filter;
