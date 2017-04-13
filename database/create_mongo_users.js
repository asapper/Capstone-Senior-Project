db.createUser({ user:"pushstock-api", pwd:"Capstone_PVS022017API", roles:[{ role:"readWrite", db:"pushstock-app" }] });
Console.log("DB User created");
