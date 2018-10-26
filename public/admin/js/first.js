$(function () {

    var page = 1;
    var pageSize = 5;
    var $form = $('form');
    
    
    // 进入页面渲染一次
    render();

    // 封装渲染函数和分页功能
    function render() {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                // console.log(info);
                $('tbody').html(template('tmp', info));

                // 获取数据后完成分页功能
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

    // 添加分类模块
    $('.btn-add1').on('click', function() {
        $('#addModal').modal('show');
    })

    // 表单校验
    $form.bootstrapValidator({
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '一级分类不能为空'
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
    })

    // 校验成功后
    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: $form.serialize(),
            success: function(info) {
                // console.log(info);
                if(info.success) {
                    page = 1;
                    render();

                    $('#addModal').modal('hide');

                    // 重置掉模态框的样式和内容
                    $form.data('bootstrapValidator').resetForm(true);                }  
            }
        })

    });

})