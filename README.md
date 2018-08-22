# intec-anywhere
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

**intec-anywhere** is a simple server that allows you to bypass the same-origin policy for requests to INTEC's websites. It was inspired by the cors-anywhere project, but was made since these requests require a login to access these resources.

### How to use

This server works by sending a POST request to the server that contains authorization credentials, the HTTP method to use and a JSON payload to be sent on POST requests.

First, just prefix the endpoint you want to send a request to with the intec-anywhere server URL. For example, if you want to request `https://procesos.intec.edu.do/Main/Inicio` and your intec-anywhere server is hosted at `http://localhost/`, you would issue a POST request to `http://localhost/procesos/Main/Inicio`.

This request must contain a JSON body with the following information:

1. **auth** *(required)*: Object that contains two required keys, id and password. It refers to the credentials used to issue the first post request to login to INTEC's portal.
2. **method** *(required)*: String that specifies which HTTP method to use on the second request. At the moment, only `GET` or `POST` can be specified.
3. **payload** *(optional)*: Object that will be passed along as JSON as the second requests' body, if the method is set as `POST`.

If credentials were not issued correctly, the server will return a `401 - Unauthorized` response. If not, the status code and body resulting from the request will be returned directly from INTEC.

#### Example

If we want to GET `/Main/Inicio`...

```
URL: http://localhost/procesos/Main/Inicio
Method: POST
Content-Type: application/json
Body: {"auth": {id: "ID", "password": "PASSWORD"}, "method": "GET"}
```

Or if we want to issue a POST for a report (`/Reporte/MostrarEnPantalla`)...

```
URL: http://localhost/procesos/Reporte/MostrarEnPantalla
Method: POST
Content-Type: application/json
Body: {"auth": {id: "ID", "password": "PASSWORD"}, "method": "POST", "payload": {"indiceReporte":"1","parametros":{"Ano":"2018","Termino":"1"}}}
```

### What's missing?
At the moment, GET and POST requests to anything in the "procesos" portal is supported, however, requests to other parts of INTEC like "LMS" or others that don't require a login should also be included in the future.

Another issue is the limitation of only being able to issue a single request after login. Ideally, you should be able to specify a series of requests to be excecuted after login to prevent unnecessary strain on the servers.
