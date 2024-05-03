window.addEventListener('load', async () => {
    const recipeData = localStorage.getItem('recipes');
    if (recipeData) {
        const recipes = JSON.parse(recipeData);
        constructRecipes(recipes);
    } else {
        const url = 'https://the-vegan-recipes-db.p.rapidapi.com/';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '0a21c6ff6fmsh5d534652269c0c1p103c8djsn1107079621c2',
                'X-RapidAPI-Host': 'the-vegan-recipes-db.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            localStorage.setItem('recipes', JSON.stringify(result));

            constructRecipes(result);// Pass recipes array to constructRecipes function
        } catch (error) {
            console.error(error);
        }
    }
});

function constructRecipes(recipes) {
    const container = document.getElementById('main-container');


    recipes.forEach(recipes => {
        //  create a new recipe card div
        const card = document.createElement('div');
        card.classList.add('bg-white', 'shadow-lg', 'rounded-lg', 'overflow-hidden', 'recipe-card',
    "p-4");

        //  create imgae element
        const image = document.createElement('img');
        image.src = recipes.image;
        image.alt = recipes.title;
        image.classList.add('w-full', 'h-64', 'object-cover', 'recipe-image', "rounded-md");
        // create title elemnet
        const title = document.createElement('h3');
        title.textContent = recipes.title;
        title.classList.add('font-semibold', 'text-xl', 'mb-2', 'recipe-title');
        // create difficulty level
        const difficulty = document.createElement('p');
        difficulty.textContent = `Difficulty: ${recipes.difficulty}`;
        difficulty.classList.add('font-semibold', 'text-lg', 'recip-difficulty');

        // button view recipe button
        const button = document.createElement('button');
        button.textContent = 'View Recipe';
        button.classList.add('mt-4', 'bg-yellow-500', 'hover:bg-yellow-400', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'recipe-button');

        button.addEventListener('click', () => {
            window.location.assign('recipe.html' + '?id=' + recipes.id);
        });
        //    append element to card
        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(difficulty);
        card.appendChild(button);

        //   apped card  to container
        container.appendChild(card);
    });
}