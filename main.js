/**
 * Created by Administrator on 2017/8/24.
 */
//1，about require js config//配置信息
;
require.config({
    //define all js file path base on this base path
    //actually this can setting same to data-main attribute in script tag
    //定义所有JS文件的基本路径,实际这可跟script标签的data-main有相同的根路径
    baseUrl:"",

    //define each js frame path, not need to add .js suffix name
    //定义各个JS框架路径名,不用加后缀 .js
    paths:{
        "Zepto":"zepto",
        "echarts":"echarts",
        "pieFun": "pieFun"
    },

    //include NOT AMD specification js frame code
    //包含其它非AMD规范的JS框架
    shim:{
    }
});

//2，about load each js code basing on different dependency
//按不同先后的依赖关系加载各个JS文件
// require(["Zepto","echarts","pieFun"],function($,echarts,pieFun){
//     pieFun.piefun($("#tmk1")[0]);
// });
