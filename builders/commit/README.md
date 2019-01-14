# Commit builder for Angular build facade 


## Usage

  1. In the root of your Angular application:
        ```
        npm i -D @yrd1/commit
        ```
  2. In your _angular.json_ add the following to _architect_ section of the relevant project:
  
        ```
        "commit": {
          "builder": "@yrd1/commit:file",
          "options": {}
        },
        ```
  3. Run: `ng run [relevant-project]:commit`
     Where _[relevant-project]_ is the project to which you've added the target 

## Options

 - `path` - path to the file with commit, defaults to `./commit.txt`
