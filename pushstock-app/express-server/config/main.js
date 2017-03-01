module.exports = {  
  // Secret key for JWT signing and encryption
  'secret': '201701-PVS02',
  // Database connection information
  'database': 'mongodb://database/pushstock-app',
  // Setting port for server
  'port': process.env.PORT || 3000
}