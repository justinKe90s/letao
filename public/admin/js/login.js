$(function () {

    //找对象
    var $form = $('form');


    $form.bootstrapValidator({

        fields: {
            //校验用户名
            username: {
                validators: {
                    //用户名不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //用户名长度
                    stringLength: {
                        min: 4  ,
                        max: 20,
                        message: '用户名长度必须在4到20之间'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[a-z0-9]+$/i,
                        message: '用户名必须是字母或者数字'
                    },
                    callback: {
                        message: '用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 20,
                        message: '密码长度必须在6到20位之间'
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        },
        // 配置校验时表单提示的图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok-circle',
            invalid: 'glyphicon glyphicon-remove-sign',
            validating: 'glyphicon glyphicon-refresh'
        }
    });

    $form.on('success.form.bv', function( e ) {
        //阻止默认事件
        e.preventDefault();

        $.ajax( {
            url: '/employee/employeeLogin',
            type: 'post',
            data: $form.serialize(),
            success: function( info ) {
                // console.log(info);
                if(info.success) {
                    // 如果登录成功，跳转到首页
                    location.href = './index.html' 
                }
                if(info.error == 1000) {
                    $form.data('bootstrapValidator').updateStatus('username', 'INVALID' , 'callback');
                }
                if(info.error == 1001) {
                    $form.data('bootstrapValidator').updateStatus('password', 'INVALID' , 'callback');
                }

            }
        });

    } );

    // 重置功能
    $("[type='reset']").on('click', function() {
        $form.data('bootstrapValidator').resetForm();
    })
})