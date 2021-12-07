const pg = require('pg');
// /*Connection à partir des données .env*/
const client = new pg.Client();

client.connect((err)=>{
	if(err){
	console.log('failed AWS database connection: ' + err.stack);
	return;
	}
	console.log('success database connection');
});
module.exports = client;