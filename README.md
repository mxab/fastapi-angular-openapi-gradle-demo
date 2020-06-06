# FastAPI Angular client via Gradle

FastAPI automatically generates an OpenAPI spec via its decorated methods.

This demo showcases how to use gradle to export an OpenAPI json spec file and use this to generate an angular client service based on that spec.

## FastAPI Server

```
cd fastapi-server
poetry install
poetry run uvicorn fastapi_server.app:app
```

### Export

If you manually want to trigger the export to the OpenAPI json you can run:

```
./gradlew fastapi-server:exportOpenAPISpec
```

But this is actually not needed since the client generate task does this implicitly when it is executed:

```
./gradlew ng-app:openApiGenerate
```

This will generate the angular client into your `ng-app/src/client`

## NG App

```
cd ng-app
npm install
npm start
```

For this demo we do not want to deal with a CORS config, therefore we use the `proxy.conf.json` of the angular dev server to forward requests to forward request for `localhost:4200/users` to the fastapi's backend.
