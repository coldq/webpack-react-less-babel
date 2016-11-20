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
                    if (err)reject(err);
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
            resolve('{"code":1}')
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

/* GET users listing. */
router.post('/:io', function(req, res, next) {
    var io = req.params.io;
    console.log(req.params);
    console.log(req.body);
    var deleteSQL = 'delete from t_user';
    var updateSQL = 'update t_user set name="conan update"  where name="conan"';

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
            if(req.body.type !== undefined){
                selectSQL += 'where type ='+'"'+req.body.type+'"';
            }
            selectSQL += 'order by create_time limit '+(req.body.page-1)*2+',2';
            sqlOp(selectSQL).then(
                result => res.send(result)
            ).catch(err=> res.send(err))
        }
        break;

        /*
        * 获得类型为x的一页List数据
        * @param body :type,page
        * */
        case "getListByType":{ //参数 博客类型，页 body :type,page
            let selectSQL = 'select * from article where type ='+'"'+req.body.type+'"'+'order by create_time limit '+(req.body.page-1)*2+',2';
            sqlOp(selectSQL).then(
                result => res.send(result)
            ).catch(err=> res.send(err))
        }
        break;

        /*
         * 获得文章内容
         * @param body:file
         * */
        case "getArticle" :{ //参数json file路径  body:file
           readFile('./resource/'+req.body.file+".md").then(
               result=>res.send(result.toString())
           ).catch(
               err=>res.send(err)
           )
        }
        break;

        /*
         * 写文章到文件，并保存相关信息到数据库。
         * @param body:imgUrl,title,subTitle,type ,context
         * */
        case "write":{ //参数 body: 封面图地址imgUrl,标题title，子标题sunTitle，类型type，文章内容context

            let uuid = uuidGenerator(); //文件名

            let file = './resource/'+uuid+".md";

            let insertSQL = 'insert into article(file,imgUrl,title,subTitle,type) ' +
                'values("'+uuid+'","'+req.body.imgUrl+'","'+req.body.title+'","'+req.body.subTitle+'","'+req.body.type+'")';
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
            if(req.body.type !== undefined){
                countSQL +='where type="'+req.body.type+'"';
            }
            sqlOp(countSQL).then(
                result=> res.send(result[0])
            ).catch(err=>res.send(err));
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
