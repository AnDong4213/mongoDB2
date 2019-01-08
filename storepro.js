var db = connect( 'mydb' ); 
db.system.js.insert({_id:'getFormatDate', 
value:function (time){   
    year = time.getFullYear();   
    mon = time.getMonth()+1;   
    date = time.getDate();   
    hour = time.getHours();   
    min = time.getMinutes();   
    sec = time.getSeconds();   
    newtime = year+'-'+mon+'-'+date+' '+hour+':'+min+':'+sec;   
    return newtime;   
} 
}) 
 
db.system.js.insert({_id:'getUserRS', 
    value:function(rs){ 
        var mapArr; 
        mapArr = rs.map(function(item, index, array ){  
            getDate = db.eval('getFormatDate'); 
            item.birthday = getDate(item.birthday); 
        return item;  
        }); 
        return mapArr; 
    } 
}) 