Red-Pill
========

Red-Pill exercise in Node-js with Redis key-value store support.
There two important files
parser.js
query.js

parser.js 
parses the given JSON file and stores the content into redis key-value store. It stores data based on UTC so retrieval and processing is easier.

query.js
Is used to process the data stored in the redis database. I have implemented the basic retrieval of data but processing requires me to implement async libraries so that processing is not interrupted in between. This is not complete yet and I am working on it.  
