const {Pool} = require("pg")

const pool = new Pool({
    "user": "postgres",
    "password" : "Aa123456!",
    "host" : "finalprojectdb.cwyoldwe4q5y.us-east-1.rds.amazonaws.com",
    "port" : 5432,
    "database" : "postgres"
})

exports.connect = async function() {
    try {
        await pool.connect(); 
        console.log("Connected to DB")
    }
    catch(e) {
        console.error(`Failed to connect ${e}`)
    }
  }

  exports.getPool = function () {
    return pool; 
};