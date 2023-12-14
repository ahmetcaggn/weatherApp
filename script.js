const url = 'https://api.openweathermap.org/data/2.5/weather'
const kordinat = 'http://api.openweathermap.org/geo/1.0/direct'


displayGizle();
function displayGizle() {
    let image = document.getElementById('icon');
    if (image.src == '') {
        var sag = document.getElementById('sag');
        sag.style.display = 'none';
    } else {
        var sag = document.getElementById('sag')
        sag.style.display = 'block';
    }
}



const setQuery = (e) => {
    if (e.keyCode == '13')
        // getResult(searchBar.value)
        setCordinates();
        
}

const setCordinates = () => {
    let query = `${kordinat}?q=${searchBar.value}&appid=${key}`

    fetch(query)
        .then(istek => {
            return istek.json()
        })
        .then(result => {
            let lat = result[0].lat;
            let lon = result[0].lon;
            let query2 = `${url}?lat=${lat}&lon=${lon}&units=metric&lang=tr&appid=${key}`;

            fetch(query2)
                .then(wheather => {
                    return wheather.json()
                })
                .then(displayResult)

        })
}

const displayResult = (result) => {
    console.log(result)
    let sehir = document.getElementById('sehir');
    sehir.innerText = `${result.name} / ${result.sys.country}`

    let derece = document.getElementById('derece');
    derece.innerText = `${Math.round(result.main.temp)}°C`

    let minMax = document.getElementById('minMax');
    minMax.innerText = `${Math.round(result.main.temp_min)}° / ${Math.round(result.main.temp_max)}°`;

    let aciklama = document.getElementById('aciklama');
    aciklama.innerText = `${result.weather[0].description}`

    image = document.getElementById('icon');
    image.src = `https://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png`
    
    displayGizle();

}

const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keypress', setQuery)
