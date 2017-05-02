db.createUser({ user:"pushstock-api", pwd:"Capstone_PVS022017API", roles:[{ role:"readWrite", db:"pushstock-app" }] });
db.employees.insert({ email: 'admin@admin.com', password: '$2a$05$F3uarJhx4YcX2x8iZJB1W.69wms4cVZdwi0l/rKuGMXqjUBs4s1XS', profile: { firstName: 'admin', lastName: 'admin' }, role: 'Admin' });
db.employees.insert({ email: 'worker@worker.com', password: '$2a$05$jLqsbAmW9xEK8JnfIyV6Mueog112Tyay9gsQWFcC9z3/2Xq0HuNzW', profile: { firstName: 'worker', lastName: 'worker' }, role: 'Worker' });
db.employees.insert({ email: 'unassigned@unassigned.com', password: '$2a$05$NUohS6ZuuSOGhQqrSfsTRegnv8j9pXeEG/HGgtljMZTEfTmYJaOhi', profile: { firstName: 'unassigned', lastName: 'unassigned' }, role: 'Unassigned' });
db.employees.insert({ email: 'raspberrypi@pushstock.com', password: '$2a$05$5VV2pAizvH76JOihSoNNteDz1z2sQ3bLnxwTDT9hQODVWNd30Bc.y', profile: { firstName: 'Raspberry', lastName: 'Pi' }, role: 'Pi' });
Console.log("DB User and default testing employees created");
