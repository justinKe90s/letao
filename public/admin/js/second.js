/*
 * @Author: justin_yke 
 * @Date: 2018-10-26 21:32:12 
 * @Last Modified by: justin_yke
 * @Last Modified time: 2018-10-27 20:43:16
 */
$(function () {
    var page = 1;
    var pageSize = 5;
    var $form = $('form');

    // 封装函数和分页
    function render() {
        // 进入页面发出ajax请求
        $.ajax({
            type: 'GET',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                // console.log(info);
                $('tbody').html(template('tmp', info));


                // 分页盒子
                $('#pagination').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, p) {
                        // console.log(p);
                        page = p;
                        render();
                    }
                })
            }
        })
    }

    render();

    $('.btn-add').on('click', function() {
        // 弹出添加二级分类的模态框
        $('#addModal').modal('show');

        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function(info) {
                // console.log(info);
                $('.dropdown-menu').html(template('tmp-1', info));
                
            }
        })
    })

    // drop模块选择一级分类提取文字
    $('.dropdown-menu').on('click', 'li', function() {
        // console.log(2);
        var content = $(this).children().html();
        $('#dropdownMenu1').html(content);

        $('[name=categoryId]').val($(this).data('id'));
        // console.log($('#hid_form').val());
        
        // 选择一级分类的时候，自动更改表单校验结果为成功
        $form.data('bootstrapValidator').updateStatus('categoryId', 'VALID');
        
    })


    // 图片文件上传
    $("#file").fileupload({
        done: function(e, data) {
           var $url = data.result.picAddr;

            // 获取到的地址存在data.result.picAddr里
            $('.img-box img').attr('src', $url);

            $("[name='brandLogo']").val( data.result.picAddr );

            //把图片校验手动更改为成功
            $form.data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
        }
    });


    // 表单校验
    $form.bootstrapValidator({
        // 隐藏的表单也参与校验
        excluded: [],
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一个一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '二级分类名称不能为空'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '图片不能为空'
                    }
                }
            }
        },
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok-circle',
            invalid: 'glyphicon glyphicon-remove-sign',
            validating: 'glyphicon glyphicon-refresh'
        }
    })

    // 校验成功后
    $form.on('success.form.bv', function(e ) {
        // 阻止默认事件
        e.preventDefault();

        // 发送ajax请求
        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: $form.serialize(),
            success: function(info) {
                // console.log(info);

                // 验证成功
                if(info.success) {
                    
                    // 关闭模态框
                    
                    page = 1;
                    render();
                    $('#addModal').modal('hide');

                    $form.data('bootstrapValidator').resetForm(true);

                    // 重置非输入框的内容
                    $('.dropdown-text').text('请选择一级分类');

                    $('.img_box img').attr('src', 'images/none.png');
                }
            }
        })
    })

})