$(function () {

    // user后台需要传入参数
    var currentPage = 1;
    var pageSize = 5;

    render();

    var id, isDelete;

    $('tbody').on('click', '.btn', function () {
        // console.log(2)
        // 点击禁用按钮弹出模态框
        $('#userModal').modal('show');
        // 获取用户点击的按钮的id和isDelete数值
        id = $(this).parent().data('id');
        isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
    })


    //当用户点击确定
    $('.btn-confirm').on('click', function () {
        $.ajax({
            type: 'POST',
            url: '/user/updateUser',
            data: {
                id: id,
                isDelete: isDelete
            },
            success: function (info) {
                $('#userModal').modal('hide');
                render();
            }
        })
    })

    function render() {
        $.ajax({
            type: 'GET',
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                // console.log(info);   
                $('tbody').html(template('tmp', info));


                // 获取到数据后渲染分页
                $('#pagination').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                });
            }
        })
    }

})