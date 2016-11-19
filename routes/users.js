var express = require('express');
var config = require('../mysqlConfig');
var mysql = require('mysql');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/:title', function(req, res, next) {
    console.log(req.params.title)
    var insertSQL = 'insert into article(file,title,subtitle) values("3.md","test3","subtitle3")';
    var selectSQL = 'select * from article where title ='+'\"'+req.params.title+'\"';
    var deleteSQL = 'delete from t_user';
    var updateSQL = 'update t_user set name="conan update"  where name="conan"';

    var getFileDir = function (sql) {
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
    // var getResult = async function (sql) {
    //     let aticPara = await getFileDir(sql);
    //     let result = await readFile('./resource/'+aticPara.file);
    //     aticPara.context = result;
    //     return aticPara;
    // }
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
    ).catch(error=>res.send(error));
    // readFile('./resource/1.md').then(data => console.log(data.toString())).catch(error=>console.log(error));

    // getResult(selectSQL).then(
    //     e => {console.log(e) && res.send(e)},
    //     v => res.send(v)
    // )

});


module.exports = router;
