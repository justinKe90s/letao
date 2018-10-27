/*
 * @Author: justin_yke 
 * @Date: 2018-10-26 23:33:54 
 * @Last Modified by: justin_yke
 * @Last Modified time: 2018-10-27 21:33:04
 */
$(function () {
    var page = 1;
    var pageSize = 5;
    var $form = $('form');
    var img = [];

    render();

    function render() {
        $.ajax({
            type: 'GET',
            url: '/product/queryProductDetailList',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info)
                $('tbody').html(template('tmp', info));

                // 分页
                $('#pagination').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, p) {
                        page = p;
                        render();
                    }
                })
            }
        })
    }

    $('.btn-add1').on('click', function () {
        // 显示模态框
        $('#addModal').modal('show');

        // 获取二级分类内容
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: page,
                pageSize: 100
            },
            success: function (info) {
                console.log(info);
                $('.dropdown-menu').html(template('tmp_c', info));
            }
        })
    })

    // 二级分类点击选择功能
    $('.dropdown-menu').on('click', 'a', function () {
        // 讲a标签的文字设置给button的span标签
        $('.drop-text').text($(this).text());

        // 获取a的自定义id属性，设置给隐藏表单的value属性
        $('[name="brandId"]').val($(this).data('id'));

        // 手动设置校验成功
        $form.data('bootstrapValidator').updateStatus('brandId', 'VALID')
    })

    // 初始化文件上传
    $('#file_pro').fileupload({
        done: function (e, data) {

            if (img.length >= 3) {
                return false;
            }
            console.log(data.result);
            var $sor = data.result.picAddr;
            $('.img_box').append('<img src="' + $sor + '" width="100" height="100">')

            img.push(data.result);
            // console.log(img);

            if (img.length == 3) {
                $form.data('bootstrapValidator').updateStatus('pic_upload', 'VALID');
            } else {
                $form.data('bootstrapValidator').updateStatus('pic_upload', 'INVALID');
            }

        }
    })

    // 表单校验
    $form.bootstrapValidator({
        excluded: [],
        fields: {
            // 字段
            proName: {
                validators: {
                    notEmpty: {
                        message: '商品的名称不能为空'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '商品的原价不能为空'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '商品的优惠价不能为空'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '商品的描述不能为空'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '商品的尺码不能为空'
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '请输入正确的尺码格式(xx-xx)'
                    }
                }
            },
            // 必须是1-99999之间的有效数字
            num: {
                validators: {
                    notEmpty: {
                        message: '商品的库存不能为空'
                    },
                    regexp: {
                        regexp: /^[1-9]\d{0,4}$/,
                        message: '请输入1-99999之间的数字'
                    }
                }
            },
            brandId: {
                validators: {
                    notEmpty: {
                        message: '二级分类不能为空'
                    }
                }
            },
            pic_upload: {
                validators: {
                    notEmpty: {
                        message: '商品的图片不能为空且必须为3张'
                    }
                }
            },
        },
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }
    })

    // 表單校驗成功後
    $form.on('success.form.bv', function (e) {
        e.preventDefault();

        // 先拼好參數
        var param = $form.serialize();
        // 再拼上6個參數（每張圖片2個參數）
        param += '&picName1' + img[0].picName + '&picAddr1' + img[0].picAddr;
        param += '&picName2' + img[1].picName + '&picAddr2' + img[1].picAddr;
        param += '&picName3' + img[2].picName + '&picAddr3' + img[2].picAddr;

        // 發送ajax請求
        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: param,
            success: function (info) {
                if (info.success) {
                    $('#addModal').modal('hide');

                    page = 1;
                    render();

                    // 重置樣式
                    $form.data('bootstrapValidator').resetForm(true);

                    // 手動清除非表單元素的內容和錯誤提示
                    $('.dropdown-text').html('请选择二级分类');
                    $('.img_box img').remove();

                    // img數組也要清空
                    img = [];
                }
            }
        })
    })

})