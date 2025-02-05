import cancel from "../images/bx-x.svg"
export default function IngredientsList(props) {
    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient}><span><p>{ingredient} </p><button onClick={()=>props.removeIngredient(ingredient)}><img src={cancel}/></button></span></li> 
    ))
    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
            {props.ingredients.length > 3 && <div className="get-recipe-container">
                <div ref={props.ref}>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={props.getRecipe}>{props.isPending?"Creating recipe":"Get a recipe"}</button>
            </div>}
        </section>
    )
}