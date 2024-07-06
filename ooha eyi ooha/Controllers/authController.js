const Ing = require("../Models/IngModel.js")
const Fav = require("../Models/FavModel.js")





const getAllIngs = async(req, res) => {
    try{
        const ingredients = await Ing.find({}, { _id: 0, ingredient: 1 }).exec();

        // Extract and print the ingredients
        const ingredientList = ingredients.map(doc => doc.ingredient);
        res.json({ ingredients: ingredientList });
    } catch(e) {
        console.log("Error: ", e);
        res.json(500).json({error: "Error fetching ingredients"})
    }
}

const fetchRecipes = async(req, res) => {
    console.log(req.body.ingredients, " received !");
    const recipes = [
        {
            name: 'Spaghetti Carbonara',
            steps: [
                'Boil pasta according to package instructions.',
                'Cook pancetta in a skillet until crispy.',
                'Whisk eggs and grated Parmesan in a bowl.',
                'Combine pasta, pancetta, and egg mixture.',
                'Season with salt and pepper and serve.'
            ],
            ingredients: [
                'Spaghetti',
                'Pancetta',
                'Eggs',
                'Parmesan cheese',
                'Salt',
                'Pepper',
            ]
        },
        {
            name: 'Chicken Alfredo',
            steps: [
                'Cook pasta according to package instructions.',
                'Cook chicken breasts in a skillet until done.',
                'Melt butter in a pan and add heavy cream.',
                'Stir in Parmesan and cook until sauce thickens.',
                'Combine pasta, chicken, and sauce.',
                'Season with salt and pepper and serve.'
            ],
            ingredients: [
                'Pasta',
                'Chicken breasts',
                'Butter',
                'Heavy cream',
                'Parmesan cheese',
                'Salt',
                'Pepper',
            ]
        },
        {
            name: 'Beef Tacos',
            steps: [
                'Cook ground beef in a skillet until browned.',
                'Add taco seasoning and water to the beef.',
                'Simmer until sauce thickens.',
                'Warm taco shells in the oven.',
                'Fill taco shells with beef, lettuce, cheese, and salsa.'
            ],
            ingredients: [
                'Ground beef',
                'Taco seasoning',
                'Taco shells',
                'Lettuce',
                'Cheese',
                'Salsa',
            ]
        },
        {
            name: 'Vegetable Stir Fry',
            steps: [
                'Heat oil in a large pan.',
                'Add chopped vegetables and cook until tender.',
                'Stir in soy sauce, garlic, and ginger.',
                'Cook until sauce thickens.',
                'Serve with rice or noodles.'
            ],
            ingredients: [
                'Mixed vegetables (e.g., bell peppers, broccoli, carrots)',
                'Soy sauce',
                'Garlic',
                'Ginger',
                'Cooking oil',
                'Rice or noodles (optional)',
            ]
        },
        {
            name: 'Margherita Pizza',
            steps: [
                'Preheat oven to 475°F (245°C).',
                'Roll out pizza dough on a floured surface.',
                'Spread tomato sauce over the dough.',
                'Top with fresh mozzarella and basil leaves.',
                'Bake in the oven until crust is golden.',
                'Drizzle with olive oil and serve.'
            ],
            ingredients: [
                'Pizza dough',
                'Tomato sauce',
                'Fresh mozzarella',
                'Basil leaves',
                'Olive oil',
            ]
        },
        {
            name: 'Chicken Caesar Salad',
            steps: [
                'Grill chicken breasts until fully cooked.',
                'Chop romaine lettuce and place in a bowl.',
                'Add croutons and grated Parmesan.',
                'Slice the grilled chicken and add to the salad.',
                'Toss with Caesar dressing and serve.'
            ], 
            ingredients: [
                'Chicken breasts',
                'Romaine lettuce',
                'Croutons',
                'Parmesan cheese',
                'Caesar dressing',
            ]
        },
        {
            name: 'Pancakes',
            steps: [
                'Mix flour, sugar, baking powder, and salt in a bowl.',
                'Whisk milk, eggs, and melted butter in another bowl.',
                'Combine wet and dry ingredients and stir until smooth.',
                'Heat a griddle and pour batter to form pancakes.',
                'Cook until bubbles form, then flip and cook until golden.',
                'Serve with syrup and butter.'
            ], 
            ingredients: [
                'Flour',
                'Sugar',
                'Baking powder',
                'Salt',
                'Milk',
                'Eggs',
                'Butter',
                'Syrup (optional)',
            ]
        },
        {
            name: 'Beef Stew',
            steps: [
                'Brown beef in a large pot.',
                'Add chopped onions, carrots, and potatoes.',
                'Stir in beef broth, tomato paste, and seasonings.',
                'Simmer until meat and vegetables are tender.',
                'Serve hot with crusty bread.'
            ],
            ingredients: [
                'Beef',
                'Onions',
                'Carrots',
                'Potatoes',
                'Beef broth',
                'Tomato paste',
                'Seasonings (salt, pepper, etc.)',
            ]
        },
        {
            name: 'Chocolate Chip Cookies',
            steps: [
                'Preheat oven to 350°F (175°C).',
                'Cream butter and sugars together in a bowl.',
                'Add eggs and vanilla extract and mix well.',
                'Stir in flour, baking soda, and salt.',
                'Fold in chocolate chips.',
                'Drop spoonfuls of dough onto a baking sheet.',
                'Bake until golden brown.'
            ],
            ingredients: [
                'Butter',
                'Sugar',
                'Brown sugar',
                'Eggs',
                'Vanilla extract',
                'Flour',
                'Baking soda',
                'Salt',
                'Chocolate chips',
            ]
        },
        {
            name: 'Grilled Cheese Sandwich',
            steps: [
                'Butter one side of each bread slice.',
                'Place cheese slices between two pieces of bread.',
                'Heat a skillet over medium heat.',
                'Cook sandwich until bread is golden brown and cheese is melted.',
                'Serve hot.'
            ],
            ingredients: [
                'Bread slices',
                'Cheese slices',
                'Butter',
            ]
        }
    ]
    res.status(200).json({recipes: recipes});
}

const fetchFavs = async(req, res) => {
    const favourites = await Fav.find();
    console.log(favourites);
    res.status(200).json(favourites);
}

const removeRecipe = async(req, res) => {
    const { recipeName } = req.body;
    console.log(recipeName);
    try {
        const deletedRecipe = await Fav.findOneAndDelete({ recipeName: recipeName });
        if (!deletedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json({ message: 'Recipe removed from favourites', recipe: deletedRecipe });
    } catch (error) {
        console.error('Error removing recipe from favourites:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports = {getAllIngs, fetchRecipes, fetchFavs, removeRecipe};