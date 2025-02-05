import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./Recipe"
import {  getRecipeFromMistral } from "../ai"

export default function Main() {
    const [ingredients, setIngredients] = React.useState(
        []
    )
    const [recipe, setRecipe] = React.useState("")
    const recipeSection = React.useRef(null)
    const [pending,setPending]=React.useState(false);
    
    React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({behavior: "smooth"})
        }
    }, [recipe])

    async function getRecipe() {
        setPending(true)
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setPending(false)
        setRecipe(recipeMarkdown)
    }
    function removeIngredient(ingredient){
        setIngredients(prev=>prev.filter(ing=>ing!==ingredient))

    }
    

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }
    
    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. chicken"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ref={recipeSection}
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    isPending={pending}
                    removeIngredient={removeIngredient}
                />
            }

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}