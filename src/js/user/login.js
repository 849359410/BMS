    $('#login-form').ajaxForm({
        success:function(data){
            if(data.code == 200){
                alert('登录成功');
                location.href = '/dist';
            }else{
                alert('登录失败');
            }
        },
        error:function(){
            alert('登录失败');
        }
    });

    //$('#login-form').on('submit',function(){
    //    $.ajax({
    //        url:'/v6/login',
    //        type:'post',
    //        data:$(this).serialize(),
    //        success:function(data){
    //            if(data.code == 200){
    //                 alert('登录成功');
    //            }else{
    //                    alert('登录失败');
    //            }
    //        },
    //            error:function(){
    //                alert('登录失败');
    //            }
    //    });
    //    return false;
    //})

