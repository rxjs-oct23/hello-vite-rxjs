import { interval, map, switchMap, take, tap } from "rxjs";
import { fromFetch } from "rxjs/fetch";

const API_KEY = import.meta.env.VITE_IPGEO_API_KEY;

const ip$ = fromFetch('https://api.ipify.org/').pipe(
    switchMap(response => response.text()),
    tap(ip => {
        document.getElementById('ip').innerText = ip;
    }),
);

function getLocation(ip) {
    const location$ = fromFetch('https://api.ipgeolocation.io/ipgeo?apiKey='+API_KEY+'&ip='+ip)
    .pipe(
        switchMap(response=>response.json()),
        tap(console.info),
        map(obj=>({lat: obj.latitude, lng: obj.longitude})),
        tap(location=>{
            document.getElementById('location').innerText=JSON.stringify(location);
        }),
    )
    return location$;
}

function getWeather(location) {
    const weather$ = fromFetch('https://api.open-meteo.com/v1/forecast?latitude='+location.lat+'&longitude='+location.lng+'&hourly=temperature_2m')
    .pipe(
        tap(console.log),
        switchMap(ret=>ret.json()),
        tap(weather=>{
            document.getElementById('weather').innerText = JSON.stringify(weather);
        }),
    );
    return weather$;
}

ip$.pipe(
    switchMap(getLocation),
    switchMap(getWeather),
).subscribe(console.log);
