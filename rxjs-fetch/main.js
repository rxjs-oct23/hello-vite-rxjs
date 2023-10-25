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
    map(ret=>({lat: ret.latitude, lng: ret.longitude})),
)
return location$;
}

ip$.pipe(
    switchMap(getLocation),
).subscribe(console.log);
