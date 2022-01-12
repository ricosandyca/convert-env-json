const core = require("@actions/core");
// const github = require("@actions/github");
const fs = require("fs");

/**
 * Read file synchronously and return the content of it
 *
 * @param {String} path - full path of file to read
 * @returns {String} content of the file
 */
function readFile(path) {
  return fs.readFileSync(path, { encoding: "utf-8" });
}

/**
 * Write file then save it
 * has a directory validation, if the given directory doesn't exists it will create one
 *
 * @param {String} path - full path of new file
 * @param {String} content - content of the new file
 * @returns {void}
 */
function writeFile(path, content) {
  const pathArr = path.split("/");
  const dirPath = pathArr.splice(0, pathArr.length - 1).join("/");
  // create directory if doesn't exist
  if (dirPath && !fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(path, content);
}

/**
 * Convert env file into JSON
 *
 * @param {String} inputPath - file path of env to convert
 * @param {String} outputPath - new file path of JSON output
 */
function convertEnvToJson(inputPath, outputPath) {
  const inputContent = readFile(inputPath);
  const properties = inputContent.split("\n").filter((val) => !!val.trim());
  const jsonContent = properties.reduce((acc, prop) => {
    const propArr = prop.split("=");
    const key = propArr.splice(0, 1);
    const value = propArr
      .join("=")
      .replace(/^['"]/gi, "")
      .replace(/['"]$/gi, "");
    return { ...acc, [key]: value };
  }, {});
  const jsonStr = JSON.stringify(jsonContent, undefined, 2);

  // create ouput JSON file
  writeFile(outputPath, jsonStr);
  console.log(`output: \n${jsonStr}`);
}

/**
 * Convert JSON file into env
 *
 * @param {String} inputPath - file path of JSON to convert
 * @param {String} outputPath - new file path of env output
 */
function convertJsonToEnv(inputPath, outputPath) {
  const inputContent = readFile(inputPath);
  const jsonContent = JSON.parse(inputContent);
  const envStr = Object.entries(jsonContent).reduce((acc, [key, value]) => {
    return `${acc}${key}=${value}\n`;
  }, "");

  // create ouput env file
  writeFile(outputPath, envStr);
  console.log(`output: \n${envStr}`);
}

// main
(() => {
  try {
    /** @type {'env-to-json'|'json-to-env'} convert type */
    const type = core.getInput("type");
    const inputPath = core.getInput("input_path");
    const outputPath = core.getInput("output_path");

    if (type === "env-to-json") return convertEnvToJson(inputPath, outputPath);
    if (type === "json-to-env") return convertJsonToEnv(inputPath, outputPath);
    throw new Error(`Type ${type} not allowed`);
  } catch (err) {
    core.setFailed(err);
  }
})();
