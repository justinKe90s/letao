$(document).ajaxStart(function() {
    //开始进度条
    NProgress.start();
})
$(document).ajaxStop(function() {
    NProgress.done();
})


// 二级菜单的显示和隐藏
$('.categroy>a').on('click', function() {
    $('.categroy .second').slideToggle();
})

// 切换菜单栏显示隐藏左侧栏
$('.lt_topbar .menuToggle').on('click', function() {
    $('.lt_aside').toggleClass('active');
    $('body').toggleClass('active');
})


//退出功能
$('.loginOut').on('click', function() {
    // console.log(2)
    $('#myModal').modal('show');
})

//退出管理系统
$('.confirm').on('click', function() {
    // console.log(2);
    $.ajax({
        type: 'GET',
        url: '/employee/employeeLogout',
        success: function( info ){
            
            if(info) {
                location.href = './index.html';
            }
            
        }
    })
    
})