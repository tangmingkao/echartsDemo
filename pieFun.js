/**
 * Created by ex-tangmingkao001 on 17/8/22.
 */

define([
    "jQuery",
    "echarts"
], function($, echarts) {
    "use strict";
    //
    var pieFun = {
        piefun: function(elem,options) {
            var targetElem;
            if(elem instanceof HTMLElement){
                targetElem = elem;
            } else {
                targetElem =  elem[0];
            }
            var settings = $.extend({
                title: {
                    text: ''
                },
                //全局调色盘
                color: ['#8B0000', '#7FFF00', '#91c7ae', '#ca8622', '#0000EE', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
                //图例组件。图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
                legend: {
                    show: true,
                    type: 'scroll',
                    bottom: '2%',
                    orient: 'horizontal',
                    data: [
                        {
                            name: '无抵押',
                            icon: 'circle',
                            textStyle: {
                                color: 'black'
                            },
                        },
                        {
                            name: '有抵押',
                            icon: 'circle',
                            textStyle: {
                                color: 'black'
                            }
                        },
                        {
                            name: '宝单保',
                            icon: 'circle',
                            textStyle: {
                                color: 'black'
                            }
                        },
                        {
                            name: '万商贷',
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
                        {
                            name: '直销',
                            icon: 'circle',
                            textStyle: {
                                color: 'black'
                            }
                        }
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
                    center: ['50%', '50%'],
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
                                },
                            },
                            lableLine: {
                                normal: true
                            },
                            //图形样式，有 normal 和 emphasis 两个状态。normal 是图形在默认状态下的样式；
                            //emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                            itemStyle: {
                                //normal 是图形在默认状态下的样式；
//	                        	normal:{
//	                        		 color: 'rgb(128, 128, 128)'
//	                        	}
                            },
//                      tooltip:{
//                          position: 'inside'
//                      },
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
                            value: 20,
                            name: '宝单保',
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
                            value: 30,
                            name: '万商贷',
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
                        },
                        {
                            value: 10,
                            name: '直销',
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
            }, options);

            var myCharts = echarts.init(targetElem);

            // 使用刚指定的配置项和数据显示图表。
            myCharts.setOption(settings);
        }
    };
    return pieFun;
});