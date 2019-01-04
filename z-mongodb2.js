1. 显示当前数据库状态： 在mongodb控制台中  db.stats()        //这将显示数据库名称 

1.使用和创建数据库：
    use mydb  //没有就创建
2.显示数据库
    show dbs
3.显示数据库状态
    db.stats()
4.检查当前所用的数据库
    db
5.删除数据库(先用然后删除)
    use mydb
    db.dropDatabase()    

//  db.user.insert({name: 'uu',age: 3, time: new Date()})  db.user.find()[7].time  
// db.user.find()[7].time.getHours()





















