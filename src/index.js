const {getFileNames, readServerFiles} = require("./utils/file-treatment")
const { parseArgs } = require("./utils/params")


const [, , ...args] = process.argv

const main = (async (args)=>{
  let pathArguments = parseArgs(args)
  const fileNames = getFileNames(pathArguments.path_directory)
  const files = []
  for(let i = 0; i< fileNames.length; i++){
    files[i] = {serverNumber: i, filePath: `${pathArguments.path_directory}/${fileNames[i]}` }
  }
  if(files.length){
    readServerFiles(files)
  }else{
    console.log("no logs founds into the path")
  }
  })(args)


