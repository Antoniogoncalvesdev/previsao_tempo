//chave para acessar a api weather
const apiKey = "03cd6d82991f5da50801ed39607b0337"
const btn = document.querySelector("#btn")
const inputBox = document.querySelector("#inputBox");


//Pegando a data de hoje e mudando tamanho do container
function dateTodayF(){
    const today = document.querySelector("#today")
    const date= new Date();
    const dateToday = date.getDate();
    const monthName = date.toLocaleString('pt-BR', { month: 'long' });
    const dayName = date.toLocaleString('pt-BR', { weekday: 'long' });
    today.innerHTML = `${dayName}, ${dateToday} ${monthName}`;
    today.style.display = "flex";

    const container = document.querySelector("#container")
    container.style.height = "400px"
}

//Pegando o valor de alguma cidade da api
async function getCityBr(city){
    const urlBr = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
    const response = await fetch(urlBr)
    const data = await response.json()
    return data
}

//Função para mostrar a cidade, graus etc
async function showCityBr(){
    try {
    const inputBox = document.querySelector("#inputBox").value
    const data = await getCityBr(inputBox)

    //determina graus
    const timeInCity = document.querySelector("#timeInCity")
    const weather = parseInt(data.main.temp)
    timeInCity.innerHTML = `${weather}°C`

    //icone e descrição
    const iconImg = document.querySelector("#iconImg")
    const descrip = document.querySelector("#descrip")
    descrip.innerHTML = data.weather[0].description;
    iconImg.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)

    //nome da cidade
    const nameCity = document.querySelector("#nameCity")
    nameCity.innerHTML = `<b>${data.name}</b>`

    //umidade
    const humidity = document.querySelector("#humidity")
    humidity.innerHTML = `Umidade: ${data.main.humidity}%`

    //consumindo a api das bandeiras
    const flagContainer = document.querySelector("#flag-container");
    flagContainer.innerHTML = `<img src="https://flagsapi.com/${data.sys.country}/flat/64.png" alt="Bandeira de ${data.sys.country}" />`;
    } catch (error) {
        alert("Digite uma cidade válida!")
}}

btn.addEventListener("click", () => { 
    if(inputBox.value === ""){
        alert("Digite uma cidade válida")
    }
        showCityBr(); 
        dateTodayF();
});
