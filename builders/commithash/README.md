# Commithash builder for Angular build facade 


## Usage

  1. In the root of your Angular application:
        ```
        npm i -D @yrd1/commithash
        ```
  2. In your _angular.json_ add the following to _architect_ section of the relevant project:
  
        ```
        "commithash": {
          "builder": "@angular-builders/timestamp:file",
          "options": {}
        },
        ```
  3. Run: `ng run [relevant-project]:commithash`
     Where _[relevant-project]_ is the project to which you've added the target 

## Options

 - `path` - path to the file with timestamp, defaults to `./timestamp`
