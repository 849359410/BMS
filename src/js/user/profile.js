require('../common/header.js');
require('../common/aside.js');

/**
 *该页面功能点:
 * 1.数据回显
 * 2.表单提交
 * */

/**
 * 数据回显:
 * 1.请求接口获取当前用户的信息
 * 2.使用模板引擎把数据嵌套到模板当中,得到数据渲染后的模板
 * 3.把渲染后的模板插入到页面制定位置
 * */

$.ajax({
    url:'/v6/teacher/profile',
    type:'get',
    success:function(data){
        if(data.code == 200){
            $('.teacher-profile').html(template('teacher-profile-tpl',data.result));
        }
    }
})

/**
 * 表单提交：
 * 1.因为表单要进行数据回显,所以是动态异步创建出来的.
 *我们这里要通过插件的ajaxForm监听表单提交时间必须使用委托的方式,插件提供了delegation选项配置为true即可
 * 2.
 * */
$('#teacher-profile-form').ajaxForm({
    delegation:true,
    success:function(data){
        if(data.code == 200){
            alert('修改成功');
        }
    }
});