var redis = require('redis');
//var flow = require('flow');
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

/*async.series({
    one: function(callback){
        setTimeout(function(){
            callback(null, 1);
        }, 200);
    },
    two: function(callback){
        setTimeout(function(){
            callback(null, 2);
        }, 100);
    }
},
function(err, results) {
    // results is now equal to: {one: 1, two: 2}
});
*/







/*async.series([

client.smembers("AllIDs", getids)

function getids(err,response){

response.forEach(getObjects(e));

}

function getObjects(e){
	console.log(e);
}


]);

client.quit();
*/


/*async.waterfall([*/

client.smembers("AllIDs", function(err, response){
	if(err) console.log(err);
	response.forEach(function(e){
		console.log(e);
		client1.smembers(e,function(err, respo){
			if(err) console.log(err);
			//console.log(respo);
			respo.forEach(function(k){
				console.log(k);
				client2.hgetall(e+":"+k,function(err,res){
					if(err) console.log(err);
					console.log(res);
				})		
				//client2.quit();
			})

			client1.quit();	
			//client2.quit();
			
		})

	})

});
client.quit();
//]);


