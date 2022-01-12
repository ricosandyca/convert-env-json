# Convert JSON to ENV Github Action

## About

A Github action to convert a .env file to a JSON or a JSON file to a
.env file.

## Usage

You can convert JSON to .env or .env to JSON. You need to pass convertion
type that can be either `json-to-env` or `env-to-json`, input file and
output that allows you to pass nested directory whether it exists or not.
Note that this action doesn't replace the original file but this action
only duplicates it then create another format of it.

Below is an example of converting a .env file to a JSON file

```yml
name: convert .env to JSON
uses: ricosandyca/convert-env-json@main
with:
  type: env-to-json
  input_path: .env
  output_path: output/json-result.json
```

Or a JSON to a .env file

```yml
name: convert JSON to .env
uses: ricosandyca/convert-env-json@main
with:
  type: json-to-env
  input_path: data.json
  output_path: output/.env-result
```

Example file output

```
APP_URL=https://google.com
NODE_ENV=production
PORT=8000
```

```json
{
  "APP_URL": "https://google.com",
  "NODE_ENV": "production",
  "PORT": "8000"
}
```

## Inputs

| Name          | Description                                    | Note       |
| ------------- | ---------------------------------------------- | ---------- |
| `type`        | Converting type `json-to-env` or `env-to-json` | `required` |
| `input_path`  | Full path of file to convert                   | `required` |
| `output_path` | Full path of new output file                   | `required` |

## Limitations

### 1. No nested JSON convertion

This action can't convert a nested JSON object into .env. It will return
an invalid .env file like this

```json
{
  "user": {
    "id": 4,
    "name": "John Doe"
  }
}
```

```
user=[object Object]
```

### 2. Always returns string value in JSON object

Sometimes you might be intending to convert a value in a .env file into
its real value like `integer`, `boolean` etc. But this action doesn't
handle it yet. For example:

```
APP_URL=https://google.com
APP_PORT=8000
IS_PRODUCTION=true
```

```json
{
  "APP_URL": "https://google.com",
  "APP_PORT": "8000", // <-- always returns string
  "IS_PRODUCTION": "true" // <-- always returns string
}
```
