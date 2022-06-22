const api = axios.create({
    baseURL: 'https://api.thedogapi.com/v1',
});

const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=3';

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

        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;


    }
}

loadRandomDogs();