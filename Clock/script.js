const HourElement = document.querySelector('.hour')
const MinuteElement = document.querySelector('.minute')
const SecondElement = document.querySelector('.second')
const TimeElement = document.querySelector('.time')
const DateElement = document.querySelector('.date')
const Toggle = document.querySelector('.toggle')
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';


Toggle.addEventListener('click', (e)=> {
    const html = document.querySelector('html')
    if(html.classList.contains('dark')) {
        html.classList.remove('dark')
        e.target.innerHTML = 'Dark mode'
    } else{
        html.classList.add('dark')
        e.target.innerHTML = 'Light mode'
    }
})

function SetTime() {
    const time = new Date();
    const month = time.getMonth()
    const day = time.getDay()
    const date = time.getDate()
    const hours = time.getHours()
    const hoursForClock = hours % 12
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()
    const AmPm = hours >= 12 ? 'PM' : 'AM'
    

    HourElement.style.transform = `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 11, 0, 360)}deg)`
    MinuteElement.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 59, 0, 360)}deg)`
    SecondElement.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 59, 0, 360)}deg)`

    TimeElement.innerHTML = `${hoursForClock}:${minutes < 10 ? `0${minutes}`: minutes} ${AmPm}`
    DateElement.innerHTML = `${days[day]}, ${months[month]} <span class="circle"> ${date}</span>`
    
}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}

function showWeatherData (data){
    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'
}

SetTime()
setInterval(SetTime, 1000)