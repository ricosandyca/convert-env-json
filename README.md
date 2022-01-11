# Convert JSON to ENV Github Action

## About
A Github action to convert a .env file to JSON or a JSON file to .env file.

## Usage
You can either convert JSON to .env or .env to JSON. Below is an example of converting .env file to JSON file
```yml
name: convert .env to JSON
uses: ricosandyca/convert-env-json@main
with:
  type: env-to-json
  input_path: .env
  output_path: json-result.json
```

Or JSON to .env file
```yml
name: convert JSON to .env
uses: ricosandyca/convert-env-json@main
with:
  type: json-to-env
  input_path: data.json
  output_path: .env-result
```

## Inputs
|      Name      |                     Description                     |
|----------------|-----------------------------------------------------|
|      type      | Converting type `json-to-env` or `env-to-json`      |
|   input_path   | Full path of file to convert                        |
|   ouput_path   | Full path of new output file                        |
