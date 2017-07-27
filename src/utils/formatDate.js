export default function formatDate(date,format){
    if(Object.prototype.toString.call(date) !== '[object Date]'){
        date = new Date(Date.parse(date));
    }
    if(isNaN(date))return null;
    let obj = {
        yyyy:date.getFullYear(),
        yy:(""+ date.getFullYear()).slice(-2),
        M:date.getMonth()+1,
        MM:("0"+ (date.getMonth()+1)).slice(-2),
        d:date.getDate(),
        dd:("0" + date.getDate()).slice(-2),
        H:date.getHours(),
        HH:("0" + date.getHours()).slice(-2),
        h:date.getHours() % 12,
        hh:("0"+date.getHours() % 12).slice(-2),
        m:date.getMinutes(),
        mm:("0" + date.getMinutes()).slice(-2),
        s:date.getSeconds(),
        ss:("0" + date.getSeconds()).slice(-2),
        w:['日', '一', '二', '三', '四', '五', '六'][date.getDay()]
    };
    return format.replace(/([a-z]+)/ig,function($1){
        return obj[$1];
    });
}
