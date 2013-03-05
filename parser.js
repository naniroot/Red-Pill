var fs = require('fs');
var redis = require('redis');

client = redis.createClient();

client.on("error",function(err){

	console.log("Error"+err);
});

var fileContents = fs.readFile('./file.json','utf-8',function(err,fileContents){
	if (err) throw err;
	var parsedBody =JSON.parse(fileContents);

	parsedBody.forEach(function(e,index){
		Object.keys(e).forEach(function(key){
			var _ValidFrom = new Date(e._ValidFrom);
			var _ValidTo = new Date(e._ValidTo);
			var ObjectID = e.ObjectID;
			var ScheduleState = e.ScheduleState;

			console.log(_ValidFrom,_ValidTo, ObjectID, ScheduleState);
			
			client.sadd("AllIDs",ObjectID);
			client.sadd(ObjectID,index);

			//client.hset(ObjectID+":"+index, "ObjectID",ObjectID);

			client.hset(ObjectID+":"+index, "_ValidFrom:day",_ValidFrom.getUTCDay());
			client.hset(ObjectID+":"+index, "_ValidFrom:date",_ValidFrom.getUTCDate());
			client.hset(ObjectID+":"+index, "_ValidFrom:month",_ValidFrom.getUTCMonth());
			client.hset(ObjectID+":"+index, "_ValidFrom:year",_ValidFrom.getUTCFullYear());
			client.hset(ObjectID+":"+index, "_ValidFrom:hours",_ValidFrom.getUTCHours());
			client.hset(ObjectID+":"+index, "_ValidFrom:minutes",_ValidFrom.getUTCMinutes());
			client.hset(ObjectID+":"+index, "_ValidFrom:seconds",_ValidFrom.getUTCSeconds());
			client.hset(ObjectID+":"+index, "_ValidFrom:milliseconds",_ValidFrom.getUTCMilliseconds());


			client.hset(ObjectID+":"+index, "_ValidTo:day",_ValidTo.getUTCDay());
			client.hset(ObjectID+":"+index, "_ValidTo:date",_ValidTo.getUTCDate());
			client.hset(ObjectID+":"+index, "_ValidTo:month",_ValidTo.getUTCMonth());
			client.hset(ObjectID+":"+index, "_ValidTo:year",_ValidTo.getUTCFullYear());
			client.hset(ObjectID+":"+index, "_ValidTo:hours",_ValidTo.getUTCHours());
			client.hset(ObjectID+":"+index, "_ValidTo:minutes",_ValidTo.getUTCMinutes());
			client.hset(ObjectID+":"+index, "_ValidTo:seconds",_ValidTo.getUTCSeconds());
			client.hset(ObjectID+":"+index, "_ValidTo:milliseconds",_ValidTo.getUTCMilliseconds());
	
			client.hset(ObjectID+":"+index,"ScheduleState", ScheduleState);
		
			//console.log(index);
		
		})
	
	})
	client.quit();
	
	

	
});

