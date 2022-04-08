import { useState, useRef, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useHistory } from 'react-router-dom';

// styles

import './Create.css';

import React from 'react';

const Create = () => {
    const [title, setTitle] = useState('');
    const [method, setMethod] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [newIngredient, setNewIngredients] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const ingredientInput = useRef(null);

    const { postData, data } = useFetch('http://localhost:3000/recipes', 'POST')

    const history = useHistory();

    useEffect(() => {
        if (data) {
            history.push('/');
        }
    }, [data, history]);


    const handleSubmit = (e) => {
        e.preventDefault()
        postData( { title, ingredients, method, cookingTime: cookingTime + 'minutes' });
    }

    const handleAdd = (e) => {
        e.preventDefault();
        const ing = newIngredient.trim();

        if (ing && !ingredients.includes(ing)) {
            setIngredients(prevIngredients => [...prevIngredients, ing])
        }
        setNewIngredients('')
        ingredientInput.current.focus();
    }


    return (
        <div className="create">
            <h2 className="page-title">Add a New Recipe</h2>

            <form onSubmit={handleSubmit}>

                <label>
                    <span>Recipe title:</span>
                    <div>
                        <input 
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            required
                        />
                    </div>
                </label>

                <label>
                    <span>Ingredients:</span>
                    <div className="ingredients">
                        <input 
                            type="text"
                            onChange={(e) => setNewIngredients(e.target.value)}
                            value={newIngredient}
                            ref={ingredientInput}
                        />
                        <button onClick={handleAdd} className="btn">add</button>
                    </div>
                </label>
                <p>Current ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>

                <label>
                    <span>Recipe method:</span>
                    <textarea 
                        onChange={(e) => setMethod(e.target.value)}
                        value={method}
                        required
                    />
                </label>

                <label>
                    <span>Cooking time (minutes):</span>
                    <input 
                        type="number"
                        onChange={(e) => setCookingTime(e.target.value)}
                        value={cookingTime}
                        required
                    />
                </label>

            <button className="btn">submit</button>

            </form>
        </div>
    );
}

export default Create;
