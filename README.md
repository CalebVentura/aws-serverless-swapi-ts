# Serverless Framework - TypeScript - DynamoDB - AWS Gateway - AWS Lambda

Este es un proyecto en el cual se usa TypeScript, AWS Lambda, DynamoDB y Serverless para desplegar funcions en la nube de AWS.

## Pasos previos
NodeJs + 18.x.x
```bash
# Clonado del repositorio
git clone https://github.com/CalebVentura/aws-serverless-swapi-ts

# Ir al directorio
cd aws-serverless-swapi-ts

# Instalación de paquetes
npm i

# Compilación de TypeScript
npx tsc
```

### Despliegue

```bash
serverless deploy
```

Después de hacer deployment se debe ver un resultado de este tipo:

```bash
Deploying aws-serverless-swapi-dev to stage dev (us-east-1)

✔ Service deployed to stack aws-serverless-swapi-dev (53s)

endpoints:
  GET - https://9y5f34o3v0.execute-api.us-east-2.amazonaws.com/
  GET - https://9y5f34o3v0.execute-api.us-east-2.amazonaws.com/swapi/{resource}
  POST - https://9y5f34o3v0.execute-api.us-east-2.amazonaws.com/people
  GET - https://9y5f34o3v0.execute-api.us-east-2.amazonaws.com/people
  GET - https://9y5f34o3v0.execute-api.us-east-2.amazonaws.com/people/{id}
  PUT - https://9y5f34o3v0.execute-api.us-east-2.amazonaws.com/people/{id}
  DELETE - https://9y5f34o3v0.execute-api.us-east-2.amazonaws.com/people/{id}
functions:
  api: aws-serverless-swapi-dev-api (18 MB)
  swapi: aws-serverless-swapi-dev-swapi (18 MB)
  postPerson: aws-serverless-swapi-dev-postPerson (18 MB)
  getPerson: aws-serverless-swapi-dev-getPerson (18 MB)
  getOnePerson: aws-serverless-swapi-dev-getOnePerson (18 MB)
  updatePerson: aws-serverless-swapi-dev-updatePerson (18 MB)
  deletePerson: aws-serverless-swapi-dev-deletePerson (18 MB)
```

### Uso

Cuando el deploy sea satisfactorio se puede consultar a la siguiente endpoint de prueba usando curl:

```bash
curl https://9y5f34o3v0.execute-api.us-east-2.amazonaws.com/
```

Este debe devolver un resultado como el siguiente:

```json
{
  "message": "API funcionando correctamente",
  "input": {
    "version": "2.0",
    "routeKey": "GET /",
    "rawPath": "/",
    "rawQueryString": "",
    ...
  }
}
```

### Local development

Localmente se puede invocar a las funciones de la siguiente manera:

```bash
serverless invoke local --function getPerson
```

Y se recibirá un resultado como el siguiente:

```
{
    "status": 200,
    "message": "GET people successful",
    "data": [
        {
            "naves": [],
            "nombre": "KALI",
            "color_cabello": "n/a",
            "nacimiento": "112BBY",
            "vehiculos": [],
            "createdAt": {},
            "estatura": "189",
            "url": "https://swapi.dev/api/people/2/",
            "peso": "67",
            "peliculas": [
                "https://swapi.dev/api/films/1/",
                "https://swapi.dev/api/films/2/",
                "https://swapi.dev/api/films/4/",
                "https://swapi.dev/api/films/6/"
            ],
            "planeta": "https://swapi.dev/api/planets/1/",
            "color_piel": "silver",
            "especies": [
                "https://swapi.dev/api/species/2/"
            ],
            "id": "790701f0-cd05-4332-bdf8-bdc39dd69d62",
            "color_ojos": "red",
            "genero": "n/a"
        },
        ...
    ]
}
```

## Consumo de APIS

### GET - Obtener datos del api original
```
https://9y5f34o3v0.execute-api.us-east-2.amazonaws.com/swapi/{resource}
```

Donde resource puede tomar los siguiente valores: people, films, starships, vehicles, species y planets.

Esto devolverá como resultado todos los elementos que corresponden a la entidad "resource".

### POST - Crear un personaje
```
https://9y5f34o3v0.execute-api.us-east-2.amazonaws.com/people
```
Esto creará un personaje y se le asignará un id, el cual será usado en otras endpoints.
Ejemplo:
```json
{
  "status": 200,
  "message": "POST people successful",
  "data": [
    {
      "id": "790701f0-cd05-4332-bdf8-bdc39dd69d62",
      "nombre": "KALI",
      "estatura": "167",
      "peso": "75",
      "color_cabello": "n/a",
      "color_piel": "gold",
      "color_ojos": "yellow",
      "nacimiento": "112BBY",
      "genero": "n/a",
      "planeta": "https://swapi.dev/api/planets/1/",
      "peliculas": [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/4/",
        "https://swapi.dev/api/films/5/",
        "https://swapi.dev/api/films/6/"
      ],
      "especies": [
        "https://swapi.dev/api/species/2/"
      ],
      "vehiculos": [],
      "naves": [],
      "url": "https://swapi.dev/api/people/2/",
      "createdAt": "2024-02-05T14:40:42.210Z"
    }
  ]
}
```
### GET - Obtener todos los personajes
```
https://9y5f34o3v0.execute-api.us-east-2.amazonaws.com/people
```
### GET - Obtener un personaje por id
```
https://9y5f34o3v0.execute-api.us-east-2.amazonaws.com/people/{id}
```
### PUT - Actualizar un personaje por id
```
https://9y5f34o3v0.execute-api.us-east-2.amazonaws.com/people/{id}
```
### DELETE - Eliminar un personaje por id
```
https://9y5f34o3v0.execute-api.us-east-2.amazonaws.com/people/{id}
```
