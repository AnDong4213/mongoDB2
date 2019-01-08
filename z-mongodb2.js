1. 显示当前数据库状态： 在mongodb控制台中  db.stats()        //这将显示数据库名称 

1.使用和创建数据库：  use mydb  //没有就创建
2.显示数据库   show dbs
3.显示数据库状态  db.stats()
4.检查当前所用的数据库  db
5.删除数据库(先用然后删除)
    use mydb
    db.dropDatabase()    

//  db.user.insert({name: 'uu',age: 3, time: new Date()})  db.user.find()[7].time  
// db.user.find()[7].time.getHours()


db.user.find()
{ "_id" : ObjectId("5c300c7b5cf9fc0ededb888b"), "email" : "aa", "pwd" : "aa" }
{ "_id" : ObjectId("5c300c7d5cf9fc0ededb888c"), "email" : "aa", "pwd" : "aa" }
// db.user.update({email: 'aa'},{pwd: 'bb'})  // 这样更新数据的话只更新第一条，且是覆盖式更新...
{ "_id" : ObjectId("5c300c7b5cf9fc0ededb888b"), "pwd" : "bb" }
{ "_id" : ObjectId("5c300c7d5cf9fc0ededb888c"), "email" : "aa", "pwd" : "aa" }

// db.user.update({pwd: 'bb'},{$set: {email: 'aa'}})  // 这样更新数据的话有就修改没有就新增,也是只更改第一条...
{ "_id" : ObjectId("5c300c7b5cf9fc0ededb888b"), "pwd" : "bb", "email" : "aa" }
{ "_id" : ObjectId("5c300c7d5cf9fc0ededb888c"), "email" : "aa", "pwd" : "aa" }

// db.user.update({email: 'aa'},{$set: {pwd: 'bb'}}, {multi: true})  // 全部更新...


// db.user.update({email: 'aa'},{$unset: {pwd: 'bb'}})  // 删除...
{ "_id" : ObjectId("5c300c7b5cf9fc0ededb888b"), "email" : "aa" }
{ "_id" : ObjectId("5c300c7d5cf9fc0ededb888c"), "email" : "aa", "pwd" : "bb" }
// db.user.update({email: 'aa'},{$unset: {pwd: 'bb'}}, {multi: true})  // 全部删除...

//  db.user.update({email: 'aa'},{$set: {money: 100}}, {multi: true})
{ "_id" : ObjectId("5c300c7b5cf9fc0ededb888b"), "email" : "aa", "pwd" : "bb", "money" : 100 }
{ "_id" : ObjectId("5c300c7d5cf9fc0ededb888c"), "email" : "aa", "pwd" : "bb", "money" : 100 }
//  db.user.update({email: 'aa'},{$inc: {money: 15}}, {multi: true}) // 每个money都加15
{ "_id" : ObjectId("5c300c7b5cf9fc0ededb888b"), "email" : "aa", "pwd" : "bb", "money" : 115 }
{ "_id" : ObjectId("5c300c7d5cf9fc0ededb888c"), "email" : "aa", "pwd" : "bb", "money" : 115 }

//  db.user.update({email: 'aa'},{$inc: {haha: 15}}, {multi: true})  // $inc:没有就新增...
{ "_id" : ObjectId("5c300c7b5cf9fc0ededb888b"), "email" : "aa", "pwd" : "bb", "money" : 115, "haha" : 15 }
{ "_id" : ObjectId("5c300c7d5cf9fc0ededb888c"), "email" : "aa", "pwd" : "bb", "money" : 115, "haha" : 15 }


//  db.user.update({email: 'aa'},{$set: {timejob: ['翻译']}}, {multi: true}) // 数组
{ "_id" : ObjectId("5c300c7b5cf9fc0ededb888b"), "email" : "aa", "pwd" : "bb", "money" : 115, "timejob" : [ "翻译" ] }
{ "_id" : ObjectId("5c300c7d5cf9fc0ededb888c"), "email" : "aa", "pwd" : "bb", "money" : 115, "timejob" : [ "翻译" ] }
//  db.user.update({email: 'aa'},{$push: {timejob: '滴滴'}})  // 单个的加 timejob必须是个数组...
{ "_id" : ObjectId("5c300c7b5cf9fc0ededb888b"), "email" : "aa", "pwd" : "bb", "money" : 115, "timejob" : [ "翻译", "滴滴" ] }
{ "_id" : ObjectId("5c300c7d5cf9fc0ededb888c"), "email" : "aa", "pwd" : "bb", "money" : 115, "timejob" : [ "翻译" ] }

//  db.user.update({email: 'aa'},{$pushAll: {timejob: ['作家','律师']}}) // $pushAll 貌似已经废弃了，用下边的语句...
//  db.user.update({email: 'aa'},{$push: {timejob:{$each:['作家','律师']}}})
{ "_id" : ObjectId("5c301a96b68ce6324d72b53a"), "email": "aa", "pwd": "bb", "money": 100, "timejob":["翻译", "滴滴", "作家", "律师" ]}
{ "_id" : ObjectId("5c301a98b68ce6324d72b53b"), "email" : "aa", "pwd" : "bb", "money" : 100 }

// db.user.update({email: 'aa'},{$addToSet: {timejob: '厨师'}},{multi: true})  // 增加一个值到数组内，而且只有当这个值不在数组内才增加   
{ "_id" : ObjectId("5c301a96b68ce6324d72b53a"), "email" : "aa", "pwd" : "bb", "money" : 100, "timejob" : [ "翻译", "滴滴", "作家", "律师", "厨师" ] }
{ "_id" : ObjectId("5c301a98b68ce6324d72b53b"), "email" : "aa", "pwd" : "bb", "money" : 100, "timejob" : [ "厨师" ] }
{ "_id" : ObjectId("5c301a9fb68ce6324d72b53c"), "email" : "aa", "pwd" : "bb", "money" : 100, "timejob" : [ "厨师" ] }


$ pop运算符删除数组的第一个或最后一个元素。 传递$ pop值为-1以删除数组的第一个元素，并传递1以删除数组中的最后一个元素。
// db.user.update({email: 'aa'}, {$pop: {timejob: -1}})
{ "_id" : ObjectId("5c301a96b68ce6324d72b53a"), "email" : "aa", "pwd" : "bb", "money" : 100, "timejob" : [ "滴滴", "作家", "律师", "厨师" ] }

// $ pull运算符从现有数组中删除与指定条件匹配的值的所有实例。
{ "_id" : ObjectId("5c302575b68ce6324d72b53d"), "fruits" : [ "apples", "pears", "oranges", "grapes", "bananas" ], "vegetables" : [ "carrots", "celery", "squash", "carrots" ] }
{ "_id" : ObjectId("5c3025b9b68ce6324d72b53e"), "fruits" : [ "plums", "kiwis", "oranges", "bananas", "apples" ], "vegetables" : [ "broccoli", "zucchini", "carrots", "onions" ] }
// db.stores.update({},{$pull: { fruits: { $in: [ "apples", "oranges" ] }, vegetables: "carrots"}},{ multi: true })
{ "_id" : ObjectId("5c302575b68ce6324d72b53d"), "fruits" : [ "pears", "grapes", "bananas" ], "vegetables" : [ "celery", "squash" ] }
{ "_id" : ObjectId("5c3025b9b68ce6324d72b53e"), "fruits" : [ "plums", "kiwis", "bananas" ], "vegetables" : [ "broccoli", "zucchini", "onions" ] }


{ "_id" : ObjectId("5c301a96b68ce6324d72b53a"), "email" : "aa", "pwd" : "bb", "money" : 100, "timejob" : [ "滴滴", "作家", "律师", "厨师", "教师" ] }
{ "_id" : ObjectId("5c301a98b68ce6324d72b53b"), "email": "aa", "pwd": "bb", "money": 100, "timejob": [ "厨师", "教师" ] }
// db.user.update({email: 'aa'}, {$pull: {timejob: '厨师'}}, {multi: true})
{ "_id" : ObjectId("5c301a96b68ce6324d72b53a"), "email": "aa", "pwd": "bb", "money": 100, "timejob": ["滴滴", "作家", "律师", "教师" ]}
{ "_id" : ObjectId("5c301a98b68ce6324d72b53b"), "email": "aa", "pwd": "bb", "money": 100, "timejob": [ "教师" ] }



db.user.insert({name:'张三',sex:1,age:18,pwd:'zhangsan',money:20,des:'刚上大学'})
db.user.insert({name:'李四',sex:0,age:27,pwd:'lisi',money:70,des:'毕业5年'})
db.user.insert({name:'王五',sex:1,age:35,pwd:'wangwu',money:17,des:'工作13年,高管级别'})
db.user.insert({name:'赵六',sex:0,age:42,pwd:'zhaoliu',money:60,des:'自己开公司,做老板'})
db.user.insert({name:'张四',sex:1,age:18,pwd:'zhangsan',money:80,des:'刚上大学'})
db.user.insert({name:'赵八',sex:0,age:25,pwd:'zhaoliu',money:60,des:'自己开公司,做老板'})
// 查询数据(文档)  
db.user.find()  
db.user.find()[0]
db.user.find().pretty()  //格式化显示  
db.user.findOne()      //返回一条记录  
  
13.查看有几条记录  
db.user.count()  
db.user.count({sex: 1})  // 3
  
查询需要的字段：  
db.user.find({},{"name":1})  //只显示id和money  
db.user.find({},{"name":1,"age":1}) //显示id,name和age  
db.user.find({},{"name":1,_id:0})  //只显示money  
  
13.条件查询  
a.==  
db.user.find({"pwd":"anorials point"}).pretty() <=> where pwd = 'anorials point'   
b.< $lt  
db.user.find({"age":{$lt:50}}).pretty() <=> where age < 50   
c.<= $lte  
db.user.find({"age":{$lte:50}}).pretty() <=> where age <= 50   
d.> $gt  
db.user.find({"age":{$gt:50}}).pretty() <=> where age > 50  
e.>= $gte  
db.user.find({"age":{$gte:50}}).pretty() <=> where age >= 50  
f.!= $ne  
db.user.find({"age":{$ne:50}}).pretty() <=> where age != 50   
 
db.user.find({money:{$lt:80,$gt:20}})   //money>20同时<80 
  
13.多条件查询and( where pwd='yiibai' AND money='MongoDB Overview' )  
db.user.find({key1:value1, key2:value2}).pretty()  
db.user.find({"pwd":"anorials point","money": "MongoDB Overview"}).pretty()  
  
14.多条件查询or  
db.user.find({$or: [{key1: value1}, {key2:value2}]}).pretty()  
db.user.find({$or: [{age: {$gt: 18}},{money: {$gt: 20}}]}).pretty();
  
15.多条件查询(and和or一起用)  
// db.user.find({age: {$gt:10}, $or: [{age: {$gt: 18}},{money: {$gt: 20}}]} ).pretty()  
db.user.find({pwd: 'zhaoliu', $or: [{age: {$gt: 18}},{money: {$gt: 20}}]} ).pretty()  
  
16.模糊查询(字段pwd中包含bai的记录)  
db.user.find({'name': /.*张.*/i})  //忽略大小写  
db.user.find({'pwd': /ao/})        //包含ao的,大小写敏感  
db.user.find({"pwd": {$regex:/ao.*/i}})  //包含ao的,忽略大小写  
  
  
db.user.find({'pwd':/^an/})       //an打头的,大小写敏感  
db.user.find({'pwd':/^An/i})      //an打头的，大小写不敏感  
  
15.分页(limit)  
db.COLLECTION_NAME.find().limit(NUMBER)  
db.user.find().limit(3)  
db.user.find({},{"money":1,_id:0}).limit(1).skip(3)  //跳到第3条记录,向后显示1条  
db.user.find({},{"money":1,_id:0}).skip(3)    //跳到第3条记录，向后显示所有记录  
  
15.降序排序  
db.user.find({},{"money":1,name: 1,_id:0}).sort({"money":-1})// 1用于升序排列，而-1用于降序。  



aggregate() 方法
MongoDB中聚合的方法使用aggregate()。
语法
aggregate() 方法的基本语法格式如下所示：
>db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION) 

{ "_id" : ObjectId("5c306d3e3e1778e1211d0f19"), "title" : "aa", "description" : "bb", "by_user" : "runoob.com", "url" : "http://www.runoob.com", "tags" : [ "mongodb" ], "likes" : 100 }
{ "_id" : ObjectId("5c306d5a3e1778e1211d0f1a"), "title" : "aa", "description" : "bb", "by_user" : "runoob.com", "url" : "http://www.runoob.com", "tags" : [ "mongodb" ], "likes" : 10 }
{ "_id" : ObjectId("5c306d6b3e1778e1211d0f1b"), "title" : "aa", "description" : "bb", "by_user" : "Neo4j", "url" : "http://www.andong.com", "tags" : [ "neo4j" ], "likes" : 750 }
{ "_id" : ObjectId("5c306dba3e1778e1211d0f1c"), "title" : "aa", "description" : "bb", "by_user" : "Neo4j", "url" : "http://www.ruixin.com", "tags" : [ "neo4j" ], "likes" : 300 }
{ "_id" : ObjectId("5c306dbb3e1778e1211d0f1d"), "title" : "aa", "description" : "bb", "by_user" : "Neo4j", "url" : "http://www.neo4j.com", "tags" : [ "neo4j" ], "likes" : 200 }
{ "_id" : ObjectId("5c306dbc3e1778e1211d0f1e"), "title" : "aa", "description" : "bb", "by_user" : "Neo4j", "url" : "http://www.neo4j.com", "tags" : [ "neo4j" ], "likes" : 100 }

// db.mycol.aggregate([{$group : {_id : "$by_user", total : {$sum : 1}}}])
{ "_id" : "Neo4j", "total" : 4 }
{ "_id" : "runoob.com", "total" : 2 }

// db.mycol.aggregate([{$group : {_id : "$by_use", total : {$sum : 1}}}])
{ "_id" : null, "total" : 6 }

// db.mycol.aggregate([{$group : {_id : "by_user", total : {$sum : 1}}}])
{ "_id" : "by_user", "total" : 6 }

// db.mycol.aggregate([{$group : {_id : "by_use", total : {$sum : 1}}}])
{ "_id" : "by_use", "total" : 6 }

// 计算总和。
// db.mycol.aggregate([{$group : {_id : "$likes", total : {$sum : 1}}}])
{ "_id" : 10, "total" : 1 }
{ "_id" : 750, "total" : 4 }
{ "_id" : 100, "total" : 1 }

// 计算平均值
// db.mycol.aggregate([{$group : {_id : "$by_user", total : {$avg : "$likes"}}}])
{ "_id" : "Neo4j", "total" : 337.5 }
{ "_id" : "runoob.com", "total" : 55 }

// $min	获取集合中所有文档对应值得最小值。   $max 获取集合中所有文档对应值得最大值。
// db.mycol.aggregate([{$group : {_id : "$by_user", total : {$min : "$likes"}}}])
{ "_id" : "Neo4j", "total" : 100 }
{ "_id" : "runoob.com", "total" : 10 }

// 在结果文档中插入值到一个数组中。
// db.mycol.aggregate([{$group : {_id : "$by_user", haha : {$push: "$url"}}}])
{ "_id" : "Neo4j", "haha" : [ "http://www.andong.com", "http://www.ruixin.com", "http://www.neo4j.com", "http://www.neo4j.com" ] }
{ "_id" : "runoob.com", "haha" : [ "http://www.runoob.com", "http://www.runoob.com" ] }

// 在结果文档中插入值到一个数组中，但不创建副本。(去掉重复的...)
// db.mycol.aggregate([{$group : {_id : "$by_user", hahaurl : {$addToSet : "$url"}}}])
{ "_id" : "Neo4j", "hahaurl" : [ "http://www.neo4j.com", "http://www.ruixin.com", "http://www.andong.com" ] }
{ "_id" : "runoob.com", "hahaurl" : [ "http://www.runoob.com" ] }

// $first 根据资源文档的排序获取第一个文档数据。  $last	根据资源文档的排序获取最后一个文档数据
// db.mycol.aggregate([{$group : {_id : "$by_user", first_url : {$first : "$url"}}}])
{ "_id" : "Neo4j", "first_url" : "http://www.andong.com" }
{ "_id" : "runoob.com", "first_url" : "http://www.runoob.com" }


// db.mycol.aggregate({$project: {title: 1, url: 1}})返回的貌似和db.mycol.find({},{title: 1,url: 1})返回的一样...
// db.mycol.aggregate({ $skip : 2 });  // 经过$skip管道操作符处理后，前2个文档被"过滤"掉。


db.createCollection("course") 
db.course.insert({uid:1,name:'张三',cid:1,course:'英语',score:72}); 
db.course.insert({uid:1,name:'张三',cid:2,course:'数学',score:98}); 
db.course.insert({uid:1,name:'张三',cid:3,course:'物理',score:63}); 
db.course.insert({uid:1,name:'张三',cid:4,course:'化学',score:45}); 
 
db.course.insert({uid:2,name:'李四',cid:1,course:'英语',score:63}); 
db.course.insert({uid:2,name:'李四',cid:2,course:'数学',score:72}); 
db.course.insert({uid:2,name:'李四',cid:3,course:'物理',score:42}); 
db.course.insert({uid:2,name:'李四',cid:4,course:'化学',score:88}); 
db.course.insert({uid:2,name:'李四',cid:5,course:'生物',score:66}); 
 
db.course.insert({uid:3,name:'王五',cid:1,course:'英语',score:94}); 
db.course.insert({uid:3,name:'王五',cid:2,course:'数学',score:62}); 
db.course.insert({uid:3,name:'王五',cid:3,course:'物理',score:85}); 
db.course.insert({uid:3,name:'王五',cid:4,course:'化学',score:52}); 
db.course.insert({uid:3,name:'王五',cid:5,course:'生物',score:90}); 
db.course.insert({uid:3,name:'王五',cid:6,course:'几何',score:90}); 

// db.course.aggregate([{$group: {_id: '$uid', 科目数: {$sum: 1}} }])
{ "_id" : 3, "科目数" : 6 }
{ "_id" : 2, "科目数" : 5 }
{ "_id" : 1, "科目数" : 4 }

// db.course.aggregate([{$group: {_id: '$uid', 科目数: {$sum: 1}} }, {$sort: {_id: 1}}])  // 升序
{ "_id" : 1, "科目数" : 4 }
{ "_id" : 2, "科目数" : 5 }
{ "_id" : 3, "科目数" : 6 }

// db.course.aggregate([{$group: {_id: {编号: '$uid', 姓名: '$name'}, 科目数: {$sum: 1}} }, {$sort: {_id: 1}}])
{ "_id" : { "编号" : 1, "姓名" : "张三" }, "科目数" : 4 }
{ "_id" : { "编号" : 2, "姓名" : "李四" }, "科目数" : 5 }
{ "_id" : { "编号" : 3, "姓名" : "王五" }, "科目数" : 6 }

// db.course.aggregate([{$group: {_id: {编号: '$uid', 姓名: '$name'}, 总成绩: {$sum: '$score'}} }, {$sort: {_id: 1}}])
{ "_id" : { "编号" : 1, "姓名" : "张三" }, "总成绩" : 278 }
{ "_id" : { "编号" : 2, "姓名" : "李四" }, "总成绩" : 331 }
{ "_id" : { "编号" : 3, "姓名" : "王五" }, "总成绩" : 473 }

// db.course.aggregate([{$group: {_id: {编号: '$uid', 姓名: '$name'}, 平均成绩: {$avg: '$score'}} }, {$sort: {_id: 1}}])
{ "_id" : { "编号" : 1, "姓名" : "张三" }, "平均成绩" : 69.5 }
{ "_id" : { "编号" : 2, "姓名" : "李四" }, "平均成绩" : 66.2 }
{ "_id" : { "编号" : 3, "姓名" : "王五" }, "平均成绩" : 78.83333333333333 }

// db.course.aggregate([{$match: {score: {$gt: 60, $lte: 90}}},{$group: {_id: {编号: '$uid', 姓名: '$name'}, 平均成绩: {$avg: '$score'}} }, {$sort: {_id: 1}}])
{ "_id" : { "编号" : 1, "姓名" : "张三" }, "平均成绩" : 67.5 }
{ "_id" : { "编号" : 2, "姓名" : "李四" }, "平均成绩" : 72.25 }
{ "_id" : { "编号" : 3, "姓名" : "王五" }, "平均成绩" : 81.75 }

// db.course.aggregate([{$group: {_id: {课程编号: '$cid', 课程名称: '$course'},平均成绩: {$avg: '$score'}}}, {$sort: {_id: 1}}])
{ "_id" : { "课程编号" : 1, "课程名称" : "英语" }, "平均成绩" : 76.33333333333333 }
{ "_id" : { "课程编号" : 2, "课程名称" : "数学" }, "平均成绩" : 77.33333333333333 }
{ "_id" : { "课程编号" : 3, "课程名称" : "物理" }, "平均成绩" : 63.333333333333336 }
{ "_id" : { "课程编号" : 4, "课程名称" : "化学" }, "平均成绩" : 61.666666666666664 }
{ "_id" : { "课程编号" : 5, "课程名称" : "生物" }, "平均成绩" : 78 }
{ "_id" : { "课程编号" : 6, "课程名称" : "几何" }, "平均成绩" : 90 }

// db.course.aggregate([{$group: {_id: {课程编号: '$cid', 课程名称: '$course'},平均成绩: {$avg: '$score'}}}, {$sort: {_id: 1}}, {$skip: 1}, {$limit: 2}])
{ "_id" : { "课程编号" : 2, "课程名称" : "数学" }, "平均成绩" : 77.33333333333333 }
{ "_id" : { "课程编号" : 3, "课程名称" : "物理" }, "平均成绩" : 63.333333333333336 }



创建索引： 
db.mycol.createIndex({"title":1})   //1是按升序排列的字段名称。要创建降序索引，需要使用-1。 
//mongodb会为我们取一个默认的名字，规则为keyname1_dir1_keyname2_dir2...keynameN_dirN 
 
// createIndex指定索引名称 
db.user.createIndex({"name":1},{"name":"IX_name"}) //索引名为IX_name 
 
// 多字段索引： 
db.mycol.createIndex({"title":1,"description":-1}) 

// 唯一索引: 
db.user.createIndex({"name":1},{"unique":true}) 
 
// 联合唯一索引： 
db.user.createIndex({"name":1,"age":1},{unique:true,name:'nameageunq'})
 
1、查看集合索引  db.col.getIndexes()
2、查看集合索引大小  db.col.totalIndexSize()
3、删除集合所有索引  db.col.dropIndexes()
4、删除集合指定索引   db.col.dropIndex("索引名称")


一:备份数据库
G:\Program Files\MongoDB\Server\3.0\bin>mongodump -d mydb -o g:/data/back

mongodump -h IP --port 端口 -u 用户名 -p 密码 -d 数据库 -o 文件存在路径
如果没有用户，可以去掉-u和-p。
如果导出本机的数据库，可以去掉-h。
如果是默认端口，可以去掉--port。
如果想导出所有数据库，可以去掉-d。

导出所有数据库
命令：mongodump -h 127.0.0.1 -o /home/zhangy/mongodb/

导出指定数据库
mongodump -h 192.168.1.108 -d tank -o /home/zhangy/mongodb/

二:mongorestore还原数据库
1,常用命令格式
 mongorestore -h IP --port 端口 -u 用户名 -p 密码 -d 数据库 --drop 文件存在路径 
 --drop的意思是，先删除所有的记录，然后恢复。
  mongorestore /home/zhangy/mongodb/  #这里的路径是所有库的备份

  G:\Program Files\MongoDB\Server\3.0\bin>mongorestore -d mydb1 --dir g:/data/back/mydb

2,恢复所有数据库到mongodb中
mongorestore /home/zhangy/mongodb/  #这里的路径是所有库的备份

3,还原指定的数据库
G:\Program Files\MongoDB\Server\3.0\bin>mongorestore -d mydb1 --dir g:/data/back/mydb

mongorestore -d tank /home/zhangy/mongodb/tank/  #tank这个数据库的备份路径
mongorestore -d tank_new /home/zhangy/mongodb/tank/  #将tank还有tank_new数据库中

三，mongoexport导出表，或者表中部分字段
mongoexport -h IP --port 端口 -u 用户名 -p 密码 -d 数据库 -c 表名 -f 字段 -q 条件导出 --csv -o 文件名 

上面的参数好理解，重点说一下：
-f    导出指字段，以字号分割，-f name,email,age导出name,email,age这三个字段
-q    可以根据查询条件导出，-q '{ "uid" : "100" }' 导出uid为100的数据
--csv 表示导出的文件格式为csv的，这个比较有用，因为大部分的关系型数据库都是支持csv，在这里有共同点

导出整张表
mongoexport -d tank -c users -o /home/zhangy/mongodb/tank/users.dat

根据条件导出数据
mongoexport -d tank -c users -q '{uid:{$gt:1}}' -o tank/users.json

四，mongoimport导入表，或者表中部分字段

还原整表导出的非csv文件
mongoimport -h IP --port 端口 -u 用户名 -p 密码 -d 数据库 -c 表名 --upsert --drop 文件名  
重点说一下--upsert，其他参数上面的命令已有提到，--upsert 插入或者更新现有数据

还原部分字段的导出文件
mongoimport -h IP --port 端口 -u 用户名 -p 密码 -d 数据库 -c 表名 --upsertFields 字段 --drop 文件名  
--upsertFields根--upsert一样

还原导出的csv文件
mongoimport -h IP --port 端口 -u 用户名 -p 密码 -d 数据库 -c 表名 --type 类型 --headerline --upsert --drop 文件名  

还原导出的表数据
mongoimport -d tank -c users --upsert tank/users.dat

部分字段的表数据导入
mongoimport -d tank -c users  --upsertFields uid,name,sex  tank/users.dat 

还原csv文件
mongoimport -d tank -c users --type csv --headerline --file tank/users.csv
















