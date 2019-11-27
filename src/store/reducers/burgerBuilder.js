import * as actionStyle from '../actions/actionTypes'
import { updateObject } from "../utility";

const initialState = {
    ingredients: null,
    totalPrice: 100,
    error: false,
    building: false
}

const INGREDIENT_PRICE = {
    cheese: 30.40,
    bacon: 40.50,
    meat: 50.60,
    salad: 60.80,
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case (actionStyle.ADD_INGREDIENT): 
            const updateIngredients = updateObject(state.ingredients, { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 })
            return updateObject(state,
                {
                    ingredients: updateIngredients,
                    totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
                    building: true
                }
            )
            
         case (actionStyle.REMOVE_INGREDIENT):
                const updateIng = updateObject(state.ingredients, { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 })
                return updateObject(state,
                    {
                        ingredients: updateIng,
                        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
                        building: true
                    }
                )
                
        case actionStyle.SET_INGREDIENT:
            return updateObject(state, {
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                error: false,
                totalPrice: 100,
                building: false
                })
                
        case actionStyle.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true})
        default:
            return state
        
    }


}

export default reducer