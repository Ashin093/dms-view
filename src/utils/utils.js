/* eslint-disable no-unused-vars */
import Moment from 'moment';
import _ from 'lodash';
export default {
    formatDate : function(time,simple){
        let formatRex = simple?"HH:mm:ss":"YYYY-MM-DD HH:mm:ss";
        if(time){
            if(time instanceof  Date){
                return Moment(time.getTime()).format(formatRex);
            }
            if(typeof time == Number){
                return Moment(time).format(formatRex);
            }
        }else{
            return Moment(new Date().getTime()).format(formatRex);
        }

    },
    getWeekDay:function(time){
        return this.formatWeekDay(Moment(time.getTime()).weekday());
    },
    //将日期数字转换为汉字数字
    formatWeekDay : function(index){
        let weekdayArr = [1,2,3,4,5,6,7];
        let weekdayCharArr = ["一","二","三","四","五","六","日"];
        let i = _.findIndex(weekdayArr,(item)=>{
            return item === index;
        });
        if(i >= 0) {
            return weekdayCharArr[i];
        }
        return null;

    },
    getDateDiff : function(time){//获取传入时间与当前时间的天数差值
        return Moment().diff(time,'day');
    },
    getDateDiffDetail : function(time){//获取传入时间与当前时间的具体（DD:HH:mm:ss）差值
        let now = Moment(new Date().getTime());
        let seconds = now.diff(time,'seconds');
        let day = seconds / 24 / 60 / 60;
        let hour,min
        if(day >= 1){
            seconds = seconds % (24 * 60 * 60);
        }else{
            day = '00';
        }

        hour = seconds / 60 / 60;
        if(hour >= 1){
            seconds = seconds % (60 * 60)
        }else{
            hour = '00';
        }

        min = seconds / 60;
        if(min >=1 ){
            seconds = seconds % 60;
        }else{
            min = '00'
        }
        day = parseInt(day + '')>9? parseInt(day+'') : ('0' + parseInt(day+''));
        hour = parseInt(hour + '')>9?  parseInt(hour+'') : ('0' + parseInt(hour+''));
        min = parseInt(min + '')>9?  parseInt(min+'') : ('0' + parseInt(min+''));
        seconds = parseInt(seconds + '')>9? parseInt(seconds+'') : ('0' + parseInt(seconds+''));
        return day + '天' + hour + '小时' + min + '分' + seconds + '秒';
    },
    dateAdd:function(days){
        return Moment().add(days,'days').format('YYYY-MM-DD');
    },
    dateTimeMake0_iso:function (dateTime) {
        let date = Moment(dateTime);
        date.set('hour',0);
        date.set('minute',0);
        date.set('second',0);
        date.set('millisecond',0);
        return date.toISOString();
    },
    arraySum:function(arr){
        let sum = 0;
        for(let i = 0;i<arr.length;i++){
            sum+=arr[i];
        }
        return sum;
    },
    sportDataFormat:function(arr){
        let result = [];
        let container = [];
        for(let j = 0 ; j<24;j++){
            container[j] = [];
        }
        for(let i = 0 ; i<arr.length;i++){
            let item = arr[i];
            let hour = Moment(item.detecTime.iso,'YYYY-MM-DD HH:mm:ss').hours();//获取整点数
            container[hour].push(item);
        }
        for(let x in container){
            let sum = 0;
            container[x].forEach(data=>{
                sum += data.amount;
            });
            result[x]=((sum/container[x].length).toFixed(0));
        }
        return result;
    },
    randomFrom:function(lowerValue,upperValue){//计算区间内随机值
        return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
    },
    mathDecimal:function(x){//计算参数的小数位数
        let y = String(x).indexOf('.') + 1;//小数点位置
        let count = String(x).length - y;//小数点后位数
        return count;
    },
    randomCoefficient:function(param){
        let decimalCount = this.mathDecimal(param);
        let coefficient = Math.pow(10,decimalCount);
        return this.randomFrom(-param*coefficient,param*coefficient)/coefficient;
    },
    pagination: function (data, callback) {
        return {
            onChange: (current) => {
                callback(current)
            },
            current: data.page.current,
            pageSize: data.page_size,
            total: data.page.total_count,
            showTotal: () => {
                return `共${data.page.total_count}条`
            },
            showQuickJumper: true
        }
    },
    fixedZero: function (val) {
        return val * 1 < 10 ? `0${val}` : val;
    },
    getTimeDistance: function (type) {
        const now = new Date();
        const oneDay = 1000 * 60 * 60 * 24;

        if (type === 'today') {
            now.setHours(0);
            now.setMinutes(0);
            now.setSeconds(0);
            return [Moment(now), Moment(now.getTime() + (oneDay - 1000))];
        }

        if (type === 'week') {
            let day = now.getDay();
            now.setHours(0);
            now.setMinutes(0);
            now.setSeconds(0);

            if (day === 0) {
                day = 6;
            } else {
                day -= 1;
            }

            const beginTime = now.getTime() - day * oneDay;
            return [Moment(beginTime), Moment(beginTime + (7 * oneDay - 1000))];
        }

        const year = now.getFullYear();

        if (type === 'month') {
            const month = now.getMonth();
            const nextDate = Moment(now).add(1, 'months');
            const nextYear = nextDate.year();
            const nextMonth = nextDate.month();
            return [
                Moment(`${year}-${this.fixedZero(month + 1)}-01 00:00:00`),
                Moment(Moment(`${nextYear}-${this.fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
            ];
        }

        return [Moment(`${year}-01-01 00:00:00`), Moment(`${year}-12-31 23:59:59`)];
    }
}
