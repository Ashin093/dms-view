const menuList = [
    {
        title:'设备管理',
        key: '/dev',
        icon: 'hdd',
        children:[
            {
                title:'声音设备',
                key: '/admin/dev/soundDev',
                icon:'audio'
            }, {
                title: '图像设备',
                key: '/admin/dev/videoDev',
                icon:'video-camera'
            }, {
                title: '环控设备',
                key: '/admin/dev/environmentalDev',
                icon: 'dashboard'
            }
        ]
    },
    {
        title:'猪舍管理',
        key: '/pigHouse',
        icon: 'cluster',
        children:[
            {
                title:'猪舍管理',
                key:'/admin/pigHouse/list'
            },
            {
                title:'批次管理',
                key:'/admin/pigpen/batch'
            }
        ]
    },
    // {
    //     title:'语音分析',
    //     key:'/analysis',
    //     children:[
    //         {
    //             title:'分析结果',
    //             key:'/analysis/result'
    //         },
    //         {
    //             title:'分析日志',
    //             key:'/analysis/logs'
    //         },
    //         {
    //             title:'引擎管理',
    //             key:'/analysis/engine'
    //         }
    //     ]
    // },
    {
        title:'系统设置',
        key: '/system',
        icon : 'tool',
        children:[
            {
                title:'日志管理',
                key:'/system/logs'
            },
            {
                title:'系统参数设置',
                key:'/system/params'
            }
        ]
    },
    {
        title:'UI',
        key: '/ui',
        icon:'build',
        children:[
            {
                title:'按钮',
                key:'/admin/ui/buttons',
            },
            {
                title:'弹框',
                key:'/admin/ui/modals',
            },
            {
                title:'Loading',
                key:'/admin/ui/loadings',
            },
            {
                title:'通知提醒',
                key:'/admin/ui/notification',
            },
            {
                title:'全局Message',
                key:'/admin/ui/messages',
            },
            {
                title:'Tab页签',
                key:'/admin/ui/tabs',
            },
            {
                title:'图片画廊',
                key:'/admin/ui/gallery',
            },
            {
                title:'轮播图',
                key:'/admin/ui/carousel',
            }
        ]
    },
    // {
    //     title:'表单',
    //     key:'/form',
    //     children:[
    //         {
    //             title:'登录',
    //             key:'/form/login',
    //         },
    //         {
    //             title:'注册',
    //             key:'/form/reg',
    //         }
    //     ]
    // },
    // {
    //     title:'表格',
    //     key:'/table',
    //     children:[
    //         {
    //             title:'基础表格',
    //             key:'/table/basic',
    //         },
    //         {
    //             title:'高级表格',
    //             key:'/table/high',
    //         }
    //     ]
    // },
    // {
    //     title:'富文本',
    //     key:'/rich'
    // },
    // {
    //     title:'城市管理',
    //     key:'/city'
    // },
    // {
    //     title:'订单管理',
    //     key:'/order',
    //     btnList:[
    //         {
    //             title:'订单详情',
    //             key:'detail'
    //         },
    //         {
    //             title:'结束订单',
    //             key:'finish'
    //         }
    //     ]
    // },
    // {
    //     title:'员工管理',
    //     key:'/user'
    // },
    // {
    //     title:'车辆地图',
    //     key:'/bikeMap'
    // },
    // {
    //     title:'图表',
    //     key: '/charts',
    //     icon:'bar-chart',
    //     children:[
    //         {
    //             title:'柱形图',
    //             key:'/charts/bar'
    //         },
    //         {
    //             title:'饼图',
    //             key:'/admin/charts/pie'
    //         },
    //         {
    //             title:'折线图',
    //             key:'/admin/charts/line'
    //         },
    //         {
    //             title:'仪表盘',
    //             key:'/charts/gauge'
    //         },
    //         {
    //             title:'平均运动量折线图',
    //             key:'/charts/line'
    //         },
    //         {
    //             title:'Label数据页',
    //             key:'/charts/labelChart'
    //         },
    //         {
    //             title:'video',
    //             key:'/charts/video'
    //         },
    //         {
    //             title:'LabelDetail',
    //             key:'/charts/labelDetail'
    //         },
    //         {
    //             title:'CoughLineChart',
    //             key:'/charts/cough'
    //         },
    //         {
    //             title:'CoughLineChart',
    //             key:'/charts/weightRise'
    //         }
    //     ]
    // },
    {
        title: 'Dashboard',
        key: '/charts',
        icon: 'line-chart',
        children: [
            {
                title: '数据分析',
                key: '/admin/charts/dashboard'
            }, {
                title: '实时大屏',
                key: '/admin/charts/screen'
            }
        ]
    },
    {
        title:'权限设置',
        key: '/permission',
        icon: 'apartment',
        children:[]
    }
];
export default menuList;