# Version Number builder for Angular build facade 


## Usage

  1. In the root of your Angular application:
        ```
        npm i -D @yrd1/version
        ```
  2. In your _angular.json_ add the following to _architect_ section of the relevant project:
  
        ```
        "version": {
          "builder": "@yrd1/version:file",
          "options": {}
        },
        ```
  3. Run: `ng run [relevant-project]:version`
     Where _[relevant-project]_ is the project to which you've added the target 

## Options

 - `path` - path to the file with version, defaults to `./version.txt`
