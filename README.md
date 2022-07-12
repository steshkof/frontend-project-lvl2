# Xexlet Frontend Project #2
## Cli Difference Calculator

---

### Hexlet tests,linter, my tests and codeclimate status:
[![Actions Status](https://github.com/steshkof/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/steshkof/frontend-project-lvl2/actions) [![eslint](https://github.com/steshkof/frontend-project-lvl2/actions/workflows/eslint.yml/badge.svg?event=push)](https://github.com/steshkof/frontend-project-lvl2/actions/workflows/eslint.yml) [![My tests](https://github.com/steshkof/frontend-project-lvl2/actions/workflows/tests.yml/badge.svg?event=push)](https://github.com/steshkof/frontend-project-lvl2/actions/workflows/tests.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://github.com/steshkof/frontend-project-lvl2/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://github.com/steshkof/frontend-project-lvl2/test_coverage)

```Gendiff``` is a command-line utility, which compares a pair of cofiguration files and shows the difference in different formats: pretty, plain text and json 


**Installation** ```$ npm ci```

**Help** ```$ gendiff --help```

---

## Usage
```gendiff <pathToFile1> <pathToFile2> [options]```  

**Options:**
```-V, --version``` - version
```-f, --format [type]``` - output format, default format is ```pretty```
```-h, --help``` - help information
```[type]``` - pretty, plain, json
```<pathToFile>``` - path to json or yaml/yml configuration file

---

## Demo


### Comparison of json files
[![asciicast](https://asciinema.org/a/502162.svg)](https://asciinema.org/a/502162)

### Comparison of json/yaml files and test
[![asciicast](https://asciinema.org/a/502163.svg)](https://asciinema.org/a/502163)

### Comparison of json/yaml stylish format
[![asciicast](https://asciinema.org/a/bScpBqZ7fr6UwTciNfKTjZaDA.svg)](https://asciinema.org/a/bScpBqZ7fr6UwTciNfKTjZaDA)

### Comparison of json/yaml plain format
[![asciicast](https://asciinema.org/a/502150.svg)](https://asciinema.org/a/502150)

### Comparison of json/yaml json format
[![asciicast](https://asciinema.org/a/502167.svg)](https://asciinema.org/a/502167)