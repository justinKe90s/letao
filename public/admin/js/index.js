
    var myChart = echarts.init(document.querySelector('.chart_left'));

    var option = {
        title: {
            text: '2018年注册人数'
        },
        tooltip: {},
        legend: {
            data: ['人数']
        },
        xAxis: {
            data: ["1月", "2月", "3月", "4月", "5月", "6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [2000, 2100, 3600, 1090, 1056, 800]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);


    var myChart = echarts.init(document.querySelector('.chart_right'));

    var option = {
        title : {
            text: '热门品牌销售',
            subtext: '2018年9月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['李宁','阿迪','特步','乔丹','阿迪王','优衣库']
        },
        series : [
            {
                name: '销售情况',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'李宁'},
                    {value:310, name:'阿迪'},
                    {value:234, name:'特步'},
                    {value:135, name:'乔丹'},
                    {value:1548, name:'阿迪王'},
                    {value:1548, name:'优衣库'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    myChart.setOption(option);
    