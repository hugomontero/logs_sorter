const fs = require("fs")
const readLine = require("readline")

const principalLogStack = []
let serverOcuppedStatus = []
let serverFinished = []
let hasServers = true

const getFileNames = path =>{
  const allFilesFromPath = fs.readdirSync(path)
  return allFilesFromPath.filter(fileName=>/.*\.log/g.test(fileName))
 }

const  sleep= (ms) =>{
  return new Promise(resolve => setTimeout(resolve, ms));
}

const readFileByLine = async ({filePath, serverNumber}) =>{
  let lineStream = readLine.createInterface({input: fs.createReadStream(filePath)})
  for await(line of lineStream){
    while(serverOcuppedStatus[serverNumber]){
      await sleep(500)
    }
    serverOcuppedStatus[serverNumber] = true
    principalLogStack.push({server: serverNumber, timeStamp: new Date(line.split(',')[0]), line})
  }
  serverFinished[serverNumber] = true
  serverOcuppedStatus[serverNumber] = true
}

const fillServerStatus = serverNumber =>{
  for(let i =0 ; i < serverNumber; i++){
    serverOcuppedStatus[i] = false
    serverFinished[i] = false
  }

}

const sortDates = (log1, log2) => {
  if (log1.timeStamp.getTime() < log2.timeStamp.getTime()) return 1
  if (log1.timeStamp.getTime() >= log2.timeStamp.getTime()) return -1
  return 0
}


const readServerFiles = async (files) =>{
  fillServerStatus(files.length)
  files.forEach(readFileByLine)
  while(hasServers){
    while(serverOcuppedStatus.filter(server=>server===false).length){
      await sleep(500)
    }
    principalLogStack.sort(sortDates)
    let linePop = principalLogStack.pop()
    if(!serverFinished[linePop.server])
      serverOcuppedStatus[linePop.server]= false
    console.log(linePop.line)
    hasServers = Boolean(serverFinished.filter(server=> server===false).length)
  }
}


module.exports = {
  getFileNames,
  readServerFiles
}
