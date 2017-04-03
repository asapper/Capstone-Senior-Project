db.buttons.deleteMany({ isActive: false, dateLastConfigured: null, dateCreated: { "$lte": new Date(ISODate().getTime() - 1000*3600*24*30) } });
