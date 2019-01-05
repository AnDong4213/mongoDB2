sc create mongodb binPath= "d:\MongoDB\Server\4.0\bin\mongod.exe --service --dbpath d:\MongoDB\data --logpath=d:\MongoDB\log\mongodb.log --logappend --directoryperdb"

services.msc

D:\MongoDB\Server\4.0\bin

安装 MongoDB服务
通过执行mongod.exe，使用--install选项来安装服务，使用--config选项来指定之前创建的配置文件。
D:\MongoDB\Server\4.0\bin\mongod.exe --config "D:\MongoDB\Server\4.0\bin\mongod.cfg" --install

D:\MongoDB\Server\4.0\bin\mongod.exe --config "D:\MongoDB\Server\4.0\bin\mongod.cfg" --service

net start MongoDB

 db.runoob.insert({x:10})
WriteResult({ "nInserted" : 1 })
> db.runoob.find()
{ "_id" : ObjectId("5604ff74a274a611b0c990aa"), "x" : 10 }

// 删库
查看所有数据库：show dbs
切换到数据库 runoob： use runoob
MongoDB 删除数据库的语法格式如下：  db.dropDatabase()    { "dropped" : "runoob", "ok" : 1 }

// MongoDB 创建集合
MongoDB 中使用 createCollection() 方法来创建集合。
语法格式：db.createCollection(name, options)
name: 要创建的集合名称  options: 可选参数, 指定有关内存大小及索引的选项
如果要查看已有集合，可以使用 show collections 命令：

创建固定集合 mycol，整个集合空间大小 6142800 KB, 文档最大个数为 10000 个。
db.createCollection("mycol",{capped:true,autoIndexId:true,size:6142800,max :10000 })
在 MongoDB 中，你不需要创建集合。当你插入一些文档时，MongoDB 会自动创建集合。

// MongoDB 删除集合
MongoDB 中使用 drop() 方法来删除集合。  语法格式： db.collection.drop()
集合删除语法格式如下： db.collection.drop()
删除 runoob 数据库中的集合 site： use runoob  ， show tables ，db.site.drop()

// MongoDB 插入文档
文档的数据结构和JSON基本一样..所有存储在集合中的数据都是BSON格式。BSON是一种类json的一种二进制形式的存储格式,简称Binary JSON。
MongoDB 使用 insert() 或 save() 方法向集合中插入文档，语法如下：  db.COLLECTION_NAME.insert(document)
//  db.col.insert({title: '好',age: 23})
插入文档可以使用 db.col.save(document) 命令。如果不指定 _id 字段 save() 方法类似于 insert() 方法。如果指定 _id 字段，则会更新该 _id 的数据。 
3.2 版本后还有以下几种语法可用于插入文档:
db.collection.insertOne():向指定集合中插入一条文档数据
db.collection.insertMany():向指定集合中插入多条文档数据

// MongoDB 更新文档
MongoDB 使用 update() 和 save() 方法来更新集合中的文档。接下来让我们详细来看下两个函数的应用及其区别。
    /* query : update的查询条件，类似sql update查询内where后面的。
    update : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
    upsert : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
    multi : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
    writeConcern :可选，抛出异常的级别。 */
db.haha.update({'title':'MongoDB 教程'},{$set:{'title':'安东'}})
// db.haha.find().pretty()
db.hehe.update({'age': '24'},{$set: {'age':'我是嘿嘿','name':'OOO'}},true)
// 在3.2版本开始，MongoDB提供以下更新集合文档的方法：
db.collection.updateOne() 向指定集合更新单个文档    db.collection.updateMany() 向指定集合更新多个文档
// 移除集合中的键值对，使用的 $unset 操作符：
如果指定的字段不存在则操作不做任何处理。
db.col.update({"_id":"56064f89ade2f21f36b03136"}, {$unset:{ "test2" : "OK"}})

// MongoDB 删除文档
// MongoDB remove()函数是用来移除集合中的数据。
如果你想删除所有数据，可以使用以下方式（类似常规 SQL 的 truncate 命令）：  // db.col.remove({})
MongoDB数据更新可以使用update()函数。在执行remove()函数前先执行find()命令来判断执行的条件是否正确，这是一个比较好的习惯。
db.collection.remove(
   <query>,
   <justOne> // （可选）如果设为 true 或 1，则只删除一个文档，如果不设置该参数，或使用默认值 false，则删除所有匹配条件的文档。
)
移除 title 为 'MongoDB 教程' 的文档：
>db.col.remove({'title':'MongoDB 教程'})
//.....remove() 方法已经过时了，现在官方推荐使用 deleteOne() 和 deleteMany() 方法。
// 删除集合下全部文档：  db.inventory.deleteMany({})
删除 status 等于 A 的全部文档：  db.inventory.deleteMany({ status : "A" })
// 删除 status 等于 D 的一个文档： db.inventory.deleteOne( { status: "D" } )
remove() 方法 并不会真正释放空间。
需要继续执行 db.repairDatabase() 来回收磁盘空间。
> db.repairDatabase()
或者
> db.runCommand({ repairDatabase: 1 })

// MongoDB 查询文档
db.collection.find(query, projection)
query ：可选，使用查询操作符指定查询条件
projection ：可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参数即可（默认省略）
// 小于 	{<key>:{$lt:<value>}} 	db.col.find({"likes":{$lt:50}}).pretty() 	where likes < 50
// $lt <小于  $lte<=小于或等于  $gt >大于  $gte大于或等于  $ne不等于
MongoDB AND 条件
MongoDB 的 find() 方法可以传入多个键(key)，每个键(key)以逗号隔开，即常规 SQL 的 AND 条件。
db.col.find({"by":"菜鸟教程", "title":"MongoDB 教程"}).pretty();
// MongoDB OR 条件   MongoDB OR 条件语句使用了关键字 $or,
db.col.find(
   {
      $or: [
         {key1: value1}, {key2:value2}
      ]
   }
).pretty()
db.col.find({$or:[{"by":"菜鸟教程"},{"title": "MongoDB 教程"}]}).pretty();
// AND 和 OR 联合使用
db.col.find({"likes": {$gt:50}, $or: [{"by": "菜鸟教程"},{"title": "MongoDB 教程"}]}).pretty();


补充一下 projection 参数的使用方法
db.collection.find(query, projection)
若不指定 projection，则默认返回所有键，指定 projection 格式如下，有两种模式
db.collection.find(query, {title: 1, by: 1}) // inclusion模式 指定返回的键，不返回其他键
db.collection.find(query, {title: 0, by: 0}) // exclusion模式 指定不返回的键,返回其他键
_id 键默认返回，需要主动指定 _id:0 才会隐藏
两种模式不可混用（因为这样的话无法推断其他键是否应返回）
db.collection.find(query, {title: 1, by: 0}) // 错误
只能全1或全0，除了在inclusion模式时可以指定_id为0
db.collection.find(query, {_id:0, title: 1, by: 1}) // 正确

若不想指定查询条件参数 query 可以 用 {} 代替，但是需要指定 projection 参数：
querydb.collection.find({}, {title: 1})

// MongoDB 条件操作符
db.col.find({likes: {$gt: 100}}).pretty()
MongoDB 使用 (<) 和 (>) 查询 - $lt 和 $gt  // Select * from col where likes>100 AND  likes<200;
$ne ----------- not equal  !=                 $eq  --------  equal  =

// MongoDB $type 操作符
$type操作符是基于BSON类型来检索集合中匹配的数据类型，并返回结果。
db.col.find({"title" : {$type : 2}})
或
db.col.find({"title" : {$type : 'string'}})

// MongoDB Limit与Skip方法
如果你需要在MongoDB中读取指定数量的数据记录，可以使用MongoDB的Limit方法，limit()方法接受一个数字参数，该参数指定从MongoDB中读取的记录条数。  // db.COLLECTION_NAME.find().limit(NUMBER)
// db.col.find({},{'title':1,_id:0}).limit(2) 1代表显示0不显示..     注：如果你们没有指定limit()方法中的参数则显示集合中的所有数据。
MongoDB Skip() 方法
我们除了可以使用limit()方法来读取指定数量的数据外，还可以使用skip()方法来跳过指定数量的数据，skip方法同样接受一个数字参数作为跳过
db.COLLECTION_NAME.find().limit(NUMBER).skip(NUMBER)  // 注:skip()方法默认参数为 0 。
// db.col.find({},{'title':1,_id:0}).limit(1).skip(1)

// MongoDB 排序
在 MongoDB 中使用 sort() 方法对数据进行排序，sort() 方法可以通过参数指定排序的字段，并使用 1 和 -1 来指定排序的方式，其中 1 为升序排列，而 -1 是用于降序排列。 // db.COLLECTION_NAME.find().sort({KEY:1})
skip(), limilt(), sort()三个放在一起执行的时候，执行的顺序是先 sort(), 然后是 skip()，最后是显示的 limit()。


// MongoDB 索引
索引通常能够极大的提高查询的效率，如果没有索引，MongoDB在读取数据时必须扫描集合中的每个文件并选取那些符合查询条件的记录。
这种扫描全集合的查询效率是非常低的，特别在处理大量的数据时，查询可以要花费几十秒甚至几分钟，这对网站的性能是非常致命的。
索引是特殊的数据结构，索引存储在一个易于遍历读取的数据集合中，索引是对数据库表中一列或多列的值进行排序的一种结构 
//  MongoDB使用 createIndex() 方法来创建索引。  注意在 3.0.0 版本前创建索引方法为 db.collection.ensureIndex()，之后的版本使用了 db.collection.createIndex() 方法，ensureIndex() 还能用，但只是 createIndex() 的别名。
db.collection.createIndex(keys, options)  Key 值为你要创建的索引字段，1 为指定按升序创建索引，如果你想按降序来创建索引指定为 -1 即可。
// db.col.createIndex({"title":1})
createIndex() 方法中你也可以设置使用多个字段创建索引（关系型数据库中称作复合索引） db.col.createIndex({"title":1,"description":-1})
// 在后台创建索引：
db.values.createIndex({open: 1, close: 1}, {background: true})
通过在创建索引时加 background:true 的选项，让创建工作在后台执行


// MongoDB 聚合
MongoDB中聚合(aggregate)主要用于处理数据(诸如统计平均值,求和等)，并返回计算后的数据结果。有点类似sql语句中的 count(*)。 
db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION)
// db.mycol.aggregate([{$group: {_id: "$by_user", num_tutorial: {$sum: 1}}}])
通过字段 by_user 字段对数据进行分组，并计算 by_user 字段相同值的总和。$sum对应的数值表示 乘
{
   title: 'haha', 
   description: 'Neo4j is no sql database',
   by_user: 'Neo4j',
   url: 'http://www.163.com',
   tags: ['neo4j', 'database', 'NoSQL'],
   likes: 79
}
db.col.aggregate([
	{$match: {likes: {$gt: 100,$lte: 800}}},
	{$group: {_id:'$by_user',count: {$sum: 1}}}
]).pretty()   // { "_id" : "Neo4j", "count" : 2 }
管道在Unix和Linux中一般用于将当前命令的输出结果作为下一个命令的参数。
MongoDB的聚合管道将MongoDB文档在一个管道处理完毕后将结果传递给下一个管道处理。管道操作是可以重复的。
表达式：处理输入文档并输出。表达式是无状态的，只能用于计算当前聚合管道的文档，不能处理其它的文档。
这里我们介绍一下聚合框架中常用的几个操作：
     $project：修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及嵌套文档。
    $match：用于过滤数据，只输出符合条件的文档。$match使用MongoDB的标准查询操作。
    $limit：用来限制MongoDB聚合管道返回的文档数。
    $skip：在聚合管道中跳过指定数量的文档，并返回余下的文档。
    $unwind：将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。
    $group：将集合中的文档分组，可用于统计结果。
    $sort：将输入文档排序后输出。
    $geoNear：输出接近某一地理位置的有序文档。




// Ywo(1;irei)w
update mysql.user set authentication_string=password('123456') where user='root' and Host = 'localhost';
flush privileges;




{title: 'MongoDB Overview', description: 'MongoDB is no sql database',by_user: 'runoob.com',url: 'http://www.runoob.com',tags: ['mongodb', 'database', 'NoSQL'],likes: 100},
{title: 'NoSQL Overview', description: 'No sql database is very fast',by_user: 'runoob.com',url: 'http://www.runoob.com',tags: ['mongodb', 'database', 'NoSQL'],likes: 10},
{title: 'Neo4j Overview', description: 'Neo4j is no sql database',by_user: 'Neo4j',url: 'http://www.neo4j.com',tags: ['neo4j', 'database', 'NoSQL'],likes: 750}










































