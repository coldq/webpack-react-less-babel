var express = require('express');
var config = require('../mysqlConfig');
var mysql = require('mysql');
var router = express.Router();
var fs = require('fs');
var co = require('co');

function uuidGenerator() {
    var S4 = function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + S4() + S4() );
}
var sqlOp = function (sql) {
    return new Promise(function (resolve,reject){
        var pool= mysql.createPool(config); //连接池
        pool.getConnection(function (err, conn) {
            if (err) reject(err);
            else
                conn.query(sql, function (err, data) {
                    if (err){
                        reject(err);
                        console.log(err)
                    }

                    resolve(data);
                    conn.release();
                })
        })
    })
}
var readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function(error, data) {
            if (error) reject(error);
            resolve(data);
        });
    });
};

/*
 * 写文件函数，成功返回code=1，失败返回错误原因
 */
var writeFile = function (fileName,data) {
    return new Promise(function(resolve,reject){
        fs.writeFile(fileName,data,function (err) {
            if(err) reject(err);
            resolve('{"code":true}')
        });
    });
};
var wrtAndSql = function* (sql,data,fileName) {   //generator函数，异步执行，消除callback，不能用ES7 的async/await，就用co代替
    try {
        var write = yield writeFile(fileName,data);
        var insert = yield sqlOp(sql);

    }catch(err){
        return err;
    }

    return write;
};
var readAndSql = function* (sql,fileName) {
    try {
        var file = yield readFile(fileName);
        if(sql != '')
            var result = yield sqlOp(sql)
    }catch(err){
        return err;
    }
    result[0].content = file.toString();
    return result[0];
}

/* GET users listing. */
router.post('/:io', function(req, res, next) {
    var io = req.params.io;
    console.log(req.params);
    console.log(req.body);
    //var deleteSQL = 'delete from t_user';
    //var updateSQL = 'update t_user set name="conan update"  where name="conan"';

    /*
    * promise then 写法，还是不简洁
    var results ="";
    getFileDir(selectSQL).then(
        data=> {
            results = data[0];
            console.log(data);
            return readFile('./resource/' + data[0].file)
        }
    ).then(
        result => {
            results.context = result.toString();
            res.send(results)
        }
    ).catch(error=>res.send(error));*/




    switch (io){
        /*
        *获取一页List数据
        * @param body:page type
        */
        case "getList" :{
            let selectSQL = 'select * from article '; //limit 起始偏移量(默认0)+显示的行数
            if(req.body.type !== "all"){
                selectSQL += 'where type ='+'"'+req.body.type+'"';
            }
            selectSQL += 'order by create_time limit '+(req.body.page-1)*5+',5';
            sqlOp(selectSQL).then(
                result => {
                    res.send(result)
                    console.log(result)
                }
            ).catch(err=> res.send(err))
        }
        break;


        /*
         * 获得文章内容
         * @param body:file
         * */
        case "getArticle" :{ //参数json file路径  body:file
            let fileDir = './resource/'+req.body.file+".md";
            let selectSQL = 'select * from article where file="'+req.body.file+'"';
           // readFile('./resource/'+req.body.file+".md").then(
           //     result=>res.send(result.toString())
           // ).catch(
           //     err=>res.send(err)
           // )
            co(readAndSql(selectSQL,fileDir)).then(
                rest=>{
                    res.send(rest)
                    console.log(rest)
                }
            ).catch(err=>console.log("err:"+err));
        }
        break;

        /*
         * 写文章到文件，并保存相关信息到数据库。
         * @param body:imgUrl,title,subTitle,type ,context
         * */
        case "write":{ //参数 body: 封面图地址imgUrl,标题title，子标题sunTitle，类型type，文章内容context

             //文件名
            let insertSQL;
            let file = './resource/'+req.body.fileDir+".md";
            console.log(req.body.fileDir == 'new');
            if(req.body.ope != 'update'){
                insertSQL= 'insert into article(file,imgUrl,title,subTitle,type) ' +
                    'values("'+req.body.fileDir+'","'+req.body.imgUrl+'","'+req.body.title+'","'+req.body.subTitle+'","'+req.body.type+'")';
            }else {
              insertSQL='update article set imgUrl="'+req.body.imgUrl+'",title="'+req.body.title+'",subTitle="'+req.body.subTitle+'",type="'+req.body.type+'"  where file="'+req.body.fileDir+'"';
            }

            console.log("sql:"+insertSQL);
            co(wrtAndSql(insertSQL,req.body.context,file)).then(
                rest=>res.send(rest)
            ).catch(err=>console.log("err:"+err));
        }
        break;
        /*
        * 获取博文数
        * type 可为空，空则返回所有类型的数量
        * */
        case "getCount":{
            let countSQL = 'SELECT COUNT( * ) AS count FROM article '
            if(req.body.type !== "all"){
                countSQL +='where type="'+req.body.type+'"';
            }
            console.log(countSQL)
            sqlOp(countSQL).then(
                result=> {
                    res.send(result[0]);
                    console.log("count:"+result[0].count+"条sssssssssssssssssssssssssssssssssss\n")
                }
            ).catch(err=>{
                res.send(err);
                console.log(err)
            });
        }
        break;

        case "getTypeList":{
            let groupSQL = 'SELECT type FROM article GROUP BY type';
            sqlOp(groupSQL).then(
                result=> res.send(result)
            ).catch(err=>res.send(err));
        }
        break;
        default:
            let err = new Object;
            err.code=-1;
            err['info']="argv err";
            res.send(err)

    }



});


module.exports = router;
