export default  {
    chartData : {
        motion : [3,3,3,2,2,6,15,28,14,16,18,6,7,5,8,13,11,21,13,8,7,7,5,3],
        motion_offset : {
            min:-13,max:10
        },//模拟运动量数据的偏差值范围
        // birthDay:'2019-04-11 10:45:33',//程序开始运行的开始日期时间
        birthDay:'2019-04-11 10:45:33',//程序开始运行的开始日期时间
        pigWeight:15,//猪只起始重量 单位kg
        pigCount:30,//猪只起始个数
        weightRise:0.55,//保育日增重基数kg
        cough_days:14,//咳嗽指数监控时间区间 单位：天
        weight_days:70,//估重趋势图时间区间 单位：天
        standard_weight_mmm:[3.51,4.56,7.08,9.28,11.60,13.80,15.85,17.83,21.52,24.84,34.26,41.25],//雄性猪对应平均体重['1月','2月','3月','4月','5月','6月','7月','8月','10月','12月','16月','20月']
        standard_weight_fff: [3.50,4.57,7.02,9.18,11.32,13.67,16.21,18.55,23.01,26.09,33.47,38.53],//雌性猪对应平均体重 同上
        standard_weight:[3.48,4.50,7.07,9.20,11.40,13.70,16.00,18.00,22.70,26.10,35.00,42.00],
        weightRiseOffset:0.5,
        weightRiseCalc:function(K,α,r,t){
            return K/(1+Math.exp(α-r*t));
        },
        weightRiseParam:{//体重计算公式参数
            α : 3.1907,
            K : 159,
            r : 0.0262
        },
        weightRiseParamOffset:{
            α : 0.0511,
            K : 5.4480,
            r : 0.000966
        },
        weightBeforeFeed:0//猪只进圈之前喂养天数
    },
    dataSource:{
        ip:'10.4.23.12',
        port:'1337',
        appId:'testid',
        restKey:'testrestkey'
    },
    api: {
        ip: '10.4.23.8',
        // ip:'10.4.22.87',
        port: 8088,
        jwt_secret:'iflytek'
    },
    hls_address:'http://10.4.22.200:88/hls/test.m3u8',
    pigHouseKey:'0dvSy2pkcx',
    deviceKey:'',
    networkState: false,
    default_title:'智能设备管理平台'
}