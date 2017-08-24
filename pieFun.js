/**
 * Created by ex-tangmingkao001 on 17/8/22.
 */

define([
    "Zepto",
    "echarts"
], function($,echarts) {
    "use strict";
    //
    var pieFun = {
        piefun: function(elem,options) {
            var targetElem;
            //做一个兼容,看下是否是原生dom对象还是zepto对象.echarts创建是针对原生dom的,如果是zepto对象需要转换.
            if(elem instanceof HTMLElement){
                targetElem = elem;
            } else {
                targetElem = elem[0];
            }

            //默认配置
            var settings = {
                title: {
                    text: ''
                },
                //全局调色盘
                color: ['#e53f4b', '#e58a1f', '#983ac3', '#d31c85', '#5848a7', '#26a576', '#0066ff', '#00ccdd', '#e17413','#20a6ab'],
                //图例组件。图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
                legend: {
                    show: true,
                    type: 'plain',
                    bottom: '3%',
                    width: '70%',
                    orient: 'horizontal',
                    data: [
                        {
                            name: '无抵押',
                            icon: 'circle',
                            textStyle: {
                                color: 'black'
                            }
                        },
                        {
                            name: '有抵押',
                            icon: 'circle',
                            textStyle: {
                                color: 'black'
                            }
                        },
                        {
                            name: 'O2O',
                            icon: 'circle',
                            textStyle: {
                                color: 'black'
                            }
                        },
                    ]

                },
                tooltip: {
                    show: true
                },
                series: [{
                    //系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
                    name: '业绩',
                    type: 'pie',
                    //饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
                    center: ['50%', '45%'],
                    //饼图的半径，数组的第一项是内半径，第二项是外半径。
                    radius: ['20%', '70%'],
                    //是否启用图例 hover 时的联动高亮。
                    legendHoverLink: true,
                    //是否开启 hover 在扇区上的放大动画效果。
                    hoverAnimation: true,
                    //饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等，label选项在 ECharts 2.x 中
                    //放置于itemStyle.normal下，在 ECharts 3 中为了让整个配置项结构更扁平合理，label 被拿出来跟
                    //itemStyle 平级，并且跟 itemStyle 一样拥有 normal, emphasis 两个状态。
                    label: {
                        normal: {
                            show: true,
                            position: 'inside',
                            formatter: '{d}%'
                        }

                    },
                    //系列中的数据内容数组。
                    data: [
                        {
                            value: 10,
                            name: '无抵押',
                            lable: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 12
                                    }
                                }
                            },
                            lableLine: {
                                normal: true
                            },
                            //图形样式，有 normal 和 emphasis 两个状态。normal 是图形在默认状态下的样式；
                            //emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                            itemStyle: {
                            },
                            markLine: {
                                silent: true
                            },
                            silent: true
                        },
                        {
                            value: 15,
                            name: '有抵押',
                            lable: {
                                normal: {
                                    show: true,
                                    position: 'inside',
                                    formatter: '{b}: {d}',
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 12
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    formatter: '{d}%'
                                }
                            }
                        },
                        {
                            value: 15,
                            name: 'O2O',
                            lable: {
                                normal: {
                                    show: true,
                                    position: 'inside',
                                    formatter: '{b}: {d}',
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 12
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    formatter: '{d}%'
                                }
                            }
                        }

                    ]
                }]
            };

            /*配置参数的说明
            * 1. color,数据类型:[],数组中每个颜色值为rgb或者16进制.含义:全局调色盘,默认顺序取色.
            * 2.pieData,数据类型:string,数组中每个值为{a}、{b}、{c}、{d}%，分别表示系列名，数据名，数据值，百分比.饼图中展示的文字内容.
            * 3.pieRadius,数据类型:[],数组的第一项是内半径，第二项是外半径,每个数据类型为string,例如'50%'。支持百分比,是相对于容器宽高较短的一边.含义:饼图的半径
            * 4.pieCenter,数据类型:[],数组的第一项是x轴位置，第二项是Y轴位置.每个数据类型为string,例如['50%','50%']
            * 5.legenHoverLink,数据类型:Boolean,是否启用图例 hover 时的联动高亮。
            * 6.hoverAnimation,数据类型:Boolean,是否开启 hover 在扇区上的放大动画效果。
            * 7.data,数据类型:[],每一项数据类型是json对象.例如{name:'无抵押',value: 30}.含义图例名车和值.
            * 8.orient,数据类型:string,图例列表的布局朝向。可选:横向:'horizontal',纵向:'vertical'.
            * 9.position,数据类型:Object,图例列表的位置.{top:'3%',left:'4%',bottom:'2%',right:'3%'}
            *
            */
            if(options && options.hasOwnProperty('color') && options.color instanceof Array){
                settings.color = options.color;
            }
            if(options && options.hasOwnProperty('pieData') && typeof options.pieData == 'string'){
                settings.series[0].label.normal.formatter = options.pieData;
            }
            if(options && options.hasOwnProperty('pieRadius') && options.pieRadius instanceof Array){
                if(options.pieRadius.length > 1){
                   for (var i = 0 ; i < options.pieRadius.length; i++){
                       settings.series[0].radius[i] =   options.pieRadius[i];
                   }
                } else {
                    settings.series[0].radius[0] = '0%';
                    settings.series[0].radius[1] = options.pieRadius[0];
                }

            }
            if(options && options.hasOwnProperty('pieCenter') && options.pieCenter instanceof Array){
                for (var j = 0 ; j < options.pieCenter.length; j++){
                    settings.series[0].center[j] =   options.pieCenter[j];
                }
            }
            if(options && options.hasOwnProperty('legendHoverLink') && typeof options.legendHoverLink == 'Boolean'){
                settings.series[0].legendHoverLink = options.legendHoverLink;
            }
            if(options && options.hasOwnProperty('hoverAnimation') && typeof options.hoverAnimation == 'Boolean'){
                settings.series[0].hoverAnimation = options.hoverAnimation;
            }
            if(options && options.hasOwnProperty('data') && options.data instanceof Array){
                settings.legend.data = [];
                settings.series[0].data = [];
                for(var k = 0;k < options.data.length;k++){
                    //设置图例的名称
                    settings.legend.data[k] = {
                        name: options.data[k].name,
                            icon: 'circle',
                        textStyle: {
                            color: 'black'
                        }
                    };
                    //设置饼图的的参数
                    settings.series[0].data[k] = {
                        value: options.data[k].value,
                        name: options.data[k].name,
                        lable: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 12
                                }
                            }
                        },
                        lableLine: {
                            normal: true
                        },
                        //图形样式，有 normal 和 emphasis 两个状态。normal 是图形在默认状态下的样式；
                        //emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                        itemStyle: {
                        },
                        markLine: {
                            silent: true
                        },
                        silent: true
                    };
                }
            }
            if(options && options.hasOwnProperty('orient') && (options.orient == 'horizontal' || options.orient == 'vertical')){
                settings.legend.orient = options.orient;
            }
            if(options && options.hasOwnProperty('position') && options.position instanceof Object){
                var arr = Object.keys(options.position);
                arr.forEach(function(element) {
                    if(!element){
                        return false;
                    }
                    if(element == 'top' ){
                        $.extend(settings.legend,{top: options.position.top});
                    }
                    if(element == 'left'){
                        $.extend(settings.legend,{left: options.position.left});
                    }
                    if(element == 'bottom'){
                        $.extend(settings.legend,{bottom: options.position.bottom});
                    }
                    if(element == 'right'){
                        $.extend(settings.legend,{right: options.position.right});
                    }
                });
            }


            var myCharts = echarts.init(targetElem);

            // 使用刚指定的配置项和数据显示图表。
            myCharts.setOption(settings);
        },
        extendOptions: function(){

        }
    };
    return pieFun;
});