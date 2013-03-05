var redis = require('redis');
var async = require('async');

client = redis.createClient();
client1 = redis.createClient();
client2 = redis.createClient();

client.on("error",function(err){

	console.log("Error"+err);
});

client1.on("error",function(err){

	console.log("Error"+err);
});

client2.on("error",function(err){

	console.log("Error"+err);
});


/*
async.waterfall(
	[
		function(callback){
			client.smembers("AllIDs", function(err,response){
				response.forEach(function(e){
					//console.log(e);
				})
				callback(null, response);
			});
			
		},

		function(response, callback){
			response.forEach(function(e){
				console.log(e);
			
			});
			client.quit();
			//callback(null, ":D");
		}


	],
	function(err, result){
		console.log(result);
	}	
);

*/

client.smembers("AllIDs", function(err, response){
	if(err) console.log(err);
	response.forEach(function(e){
		console.log(e);
		client1.smembers(e,function(err, respo){
			if(err) console.log(err);
			respo.forEach(function(k){
				console.log(k);
				client2.hgetall(e+":"+k,function(err,res){
					if(err) console.log(err);
					console.log(res);
				})		
			})

			client1.quit();	
			
		})

	})

});
client.quit();


