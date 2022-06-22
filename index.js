const api = axios.create({
    baseURL: 'https://api.thedogapi.com/v1',
});
api.defaults.headers.common['X-API-KEY'] = 'c17e17b1-d423-4a7e-ae90-85c4781c2d07';


const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=3';

const API_URL_Favourites = 'https://api.thedogapi.com/v1/favourites';

const spanError = document.getElementById('error');

async function loadRandomDogs(){
    const res = await fetch(API_URL_RANDOM)
    const data = await res.json();
    console.log(data);


    if(res.status !==200){
        spanError.innerHTML = "Hubo un Error:" + res.status;
    } else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        const btn3 = document.getElementById('btn3');

        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;

        btn1.onclick = () => saveFavoureteDog(data[0].id);
        btn2.onclick = () => saveFavoureteDog(data[1].id);
        btn3.onclick = () => saveFavoureteDog(data[2].id);

    }
}

async function saveFavoureteDog(id){
    const {data, status} = await api.post('/favourites',{
        image_id: id,
    });

    // const res = await fetch(API_URL_Favourites,{
    //     method: 'POST', 
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'X-API-KEY': '7a620791-01d0-447e-8178-f697f28caae3',
    //     },
    //     body: JSON.stringify({
    //         image_id: id
    //     }),
    // });

    // const data = await res.json();


    if (status !== 200){
        spanError.innerHTML = "Hubo un Error:"+ status +data.message;
    // } else{
    //     console.log('Cat add fovorite');
    //     loadFavouriteDogs();
    // }
    console.log('post');
    }
    
}

async function loadFavouriteDogs() {
    const res = await fetch(API_URL_Favourites,{
    method: 'GET',
    headers: {
        'X-API-KEY': 'c17e17b1-d423-4a7e-ae90-85c4781c2d07',
    },
});

    const data = await res.json();
    console.log('favoritos');
    console.log(data);
    
    if (res.status !== 200){
        spanError.innerHTML = "Hubo un Error:"+ res.status +data.message;
    }else{
        const section = document.getElementById('favouritesDogs');
        section.innerHTML = "";
        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode(' Perro Favoritos');
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach(cat =>{
            
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('eliminar Perro favorito');
            
            img.src = cat.image.url
            img.width = 150;
            btn.appendChild(btnText);    
            btn.onclick = () => deleteFavouriteCat(cat.id);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);


        })
    }

    
}

loadFavouriteDogs();

loadRandomDogs();