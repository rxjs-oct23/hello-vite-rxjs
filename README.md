# Hello Vite+RxJS!

This project illustrates using RxJS in vanilla JavaScript using [Vite](https://vitejs.dev/) as a dev server and bundler.

We use the following APIs:

* [ipify](https://www.ipify.org/)
* [open-meteo](https://open-meteo.com/)
* [IPgeolocation](https://ipgeolocation.io/)

All three are free for development purposes, but IPgeolocation requires a free token to track usage. Please [sign up](https://ipgeolocation.io/signup.html) to get a token and make it available to the application in a `.env.local` file (which will be ignored by git):

```dotenv
VITE_IPGEO_API_KEY=your_token_here
```

_Caveat Emptor_: Some CORS issues have been observed in the latest versions of Firefox (~v118) which go beyond the scope of this particular course. Proceed with caution or use Google Chrome instead.

Making the application look pretty, adding error handing and writing unit tests are left as exercises for the reader.
