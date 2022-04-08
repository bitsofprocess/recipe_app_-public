import { useParams } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useEffect, useState } from 'react';
import { projectFirestore } from '../../firebase/config';

// styles
import './Recipe.css';



const Recipe = () => {
    const { id } = useParams();
    const { mode } = useTheme();

    const [recipe, setRecipe] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsPending(true);

        projectFirestore.collection('recipes').doc(id).get().then((doc) => {
            if (doc.exists) {
                setIsPending(false);
                setRecipe(doc.data());
            } else {
                setIsPending(false);
                setError('Could not find recipe');
            }
        })

        return () => {
    
        };
    }, [id]);

    return (
        <div className={`recipe ${mode}`}>
            {isPending && <div>Loading...</div>}
            {error && <div>Error</div>}
            {recipe && (
                <>
                  <h2 className="page-title">{recipe.title}</h2>
                  <p>Takes {recipe.cookingTime} to cook</p>
                  <ul>
                      {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
                  </ul>
                  <p className="method">{recipe.method}</p>
                </>
            )}
        </div>
    );
}

export default Recipe;
