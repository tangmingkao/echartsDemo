/**
 * Created by ex-tangmingkao001 on 17/8/22.
 */

define([
    "zepto",
    "echarts"
], function($,echarts) {
    "use strict";

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
                            name: '用例一',
                            icon: 'circle',
                            textStyle: {
                                color: 'black'
                            }
                        },
                        {
                            name: '用例二',
                            icon: 'circle',
                            textStyle: {
                                color: 'black'
                            }
                        },
                        {
                            name: '用例三',
                            icon: 'circle',
                            textStyle: {
                                color: 'black'
                            }
                        }
                    ]

                },
                tooltip: {
                    show: true,
                    formatter: '{b}:<br />{c}',
                    position: function (pos, params, dom, rect, size) {
                        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                        var obj = {top: 60};
                        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                        return obj;
                    }
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
                            fontSize: 12,
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
                                normal: {
                                    borderWidth: 0,
                                    borderColor: '#fff',
                                    borderType: 'solid'
                                }
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
             * 7.data,数据类型:[],每一项数据类型是json对象.例如{name:'无抵押',value: 30}.含义图例名和值.
             * 8.orient,数据类型:string,图例列表的布局朝向。可选:横向:'horizontal',纵向:'vertical'.
             * 9.position,数据类型:Object,图例列表的位置.{top:'3%',left:'4%',bottom:'2%',right:'3%'}
             * 10.symbolTextStyle,数据类型:string,图例文字颜色.默认黑色.color: "black".
             * 11.pieTextStyle,数据类型:string,饼图中文字颜色.默认白色. color: "#fff",这里不支持类似"black"颜色表示.
             * 12. symbolWidth,数据类型:string,图例组合所占的宽度. 默认容器宽度的70%, symbolWidth = '70%'
             * 13. symbolIcon,数据类型:string,图例组合的形状.默认圆形,'circle'.可选择配置:'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'.
             * 14. borderWidth,饼图的间隙.borderWidth: 5,该块饼图的boder值为5,数据类型都是number. 这个参数设置其实处理并不合理,是为了兼容草稿箱那个饼图做的兼容处理.
             * 15. symbolShow,数据类型:Boolean,图例是否显示参数.
             * 16. pieTextShow,数据类型:Boolean,饼图中是否显示文字.
             *
             */
            if(options && options.hasOwnProperty('color') && options.color instanceof Array){
                settings.color = options.color;
            }
            if(options && options.hasOwnProperty('pieData') && typeof options.pieData == 'string'){
                if(options.pieData == '{d}%'){
                    settings.series[0].label.normal.formatter = function(obj){
                        //取进度为小数点后一位.
                        var count = 0;
                        for(var q = 0; q < obj.data.length;){
                            if(obj.data[q] == 0){
                                count++;
                                cosole.log(count);
                                cosole.log(obj.data[q]);
                            }
                        }
                        if(count == obj.data.length ){
                            return obj.percent.toFixed(0) + '%';
                        } else {
                            if(obj.value == 0){
                                return "";
                            } else  {
                                return obj.percent.toFixed(0) + '%';
                            }
                        }

                    };
                } else {
                    settings.series[0].label.normal.formatter = options.pieData;
                }
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
            if(options && options.hasOwnProperty('legendHoverLink') && typeof options.legendHoverLink == 'boolean'){
                settings.series[0].legendHoverLink = options.legendHoverLink;
            }
            if(options && options.hasOwnProperty('hoverAnimation') && typeof options.hoverAnimation == 'boolean'){
                settings.series[0].hoverAnimation = options.hoverAnimation;
            }
            if(options && options.hasOwnProperty('data') && options.data instanceof Array){
                settings.legend.data = [];
                settings.series[0].data = [];
                var tempColor1,tempColor2,tempIcon,tempItemStyle;
                //其实这种处理并不合理.因为这两个参数和dada参数是平行并列的.但是这里因为肯定不会缺省data参数,所以就这样处理了.
                tempColor1 = options && options.hasOwnProperty('symbolTextStyle') && typeof options.symbolTextStyle == 'string' ? options.symbolTextStyle : 'black';
                tempColor2 = options && options.hasOwnProperty('pieTextStyle') && typeof options.pieTextStyle == 'string' ? options.pieTextStyle : '#fff';
                tempIcon = options && options.hasOwnProperty('symbolIcon') && typeof options.symbolIcon == 'string'  ? options.symbolIcon : 'circle';

                if(options && options.hasOwnProperty('borderWidth') && typeof options.borderWidth == 'number'){
                    tempItemStyle = {
                        normal: {
                            borderWidth: options.borderWidth,
                            borderColor: '#fff',
                            borderType: 'solid'
                        }
                    }
                } else {
                    tempItemStyle = {
                        normal: {
                            borderWidth: 0,
                            borderColor: '#fff',
                            borderType: 'solid'
                        }
                    }
                }

                for(var k = 0;k < options.data.length;k++){
                    //设置图例的名称
                    settings.legend.data[k] = {
                        name: options.data[k].name,
                        icon: tempIcon,
                        textStyle: {
                            color: tempColor1
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
                                    color: tempColor2,
                                    fontSize: 12
                                }
                            }
                        },
                        itemStyle: tempItemStyle,
                        lableLine: {
                            normal: true
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
            if(options && options.hasOwnProperty('symbolWidth') && typeof options.symbolWidth == 'string' ){
                settings.legend.width = options.symbolWidth;
            }

            if(options && options.hasOwnProperty('symbolShow') && typeof options.symbolShow == 'boolean'){
                settings.legend.show = options.symbolShow;
            }
            if(options && options.hasOwnProperty('pieTextShow') && typeof options.pieTextShow == 'boolean'){
                settings.series[0].label.normal.show = options.pieTextShow;
            }

            if(options && options.hasOwnProperty('position') && options.position instanceof Object){
                var arr = Object.keys(options.position);
                if(arr.length > 0){
                    //进行设置前先将设置默认的取消掉,不然设置可能会没有作用.
                    //var tempObj = _.pick(settings.legend,['left','bottom','right','top']);
                    var tempArr = Object.keys(settings.legend);
                    for(var l = 0 ; l < tempArr.length; l++){
                        if( ['left','bottom','right','top'].indexOf(tempArr[l]) > -1){
                            settings.legend[tempArr[l]] = '';
                        }
                    }
                }
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