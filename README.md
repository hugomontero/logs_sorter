
# logs_sorter

### HOW TO INSTALL
In order to install, please run the follow command: 
```
npm install
```
### HOW TO RUN
In order to run, please run the follow command: 
```
node src/index.js --path_directory="<<LOGS DIRECTORY PATH>>"

```

### CODE EXPLANING
This project read all the files into a directory that match with "*.log"
Each file is proceseed and sorted in order to print in console the merge of the logs in ascending order (by date)
The way components that were defined in this project are defined following:
#### Server Log Occuped Status Array
Once we have a list of the files we need to proceess, the system creates an array that will work as a Semaphore that indicates if a we can read another line from a specific log file
#### Server Log Finished Array
Once we have a list of the files we need to proceess, the system creates an array with the number of logs (server) we need to proceess, with a boolean that indicates if the log was fully readed

#### PrincipalStack (Array that works like a stack)
The first thing the system do when its running (after getting the whole logs files) it's create a stream for each log file we need to read and after that fill the principalStack with the first line of each log files.
This fill works in a async way that means for each file we have a independiently process running in order to fill the principalStack with a new line when the server occupped log allows it.
Once we have the whole principalstack fill, then we sort the array by date, and then we make a "pop" in order to retrieve the most older message in order to print in console.
When we do the pop, we indicate the system that the server id that belongs the message is free to read a new message
When a server log file it's completed readed then, we indicate it via server log finished array in order to not wait for another message for this file.
