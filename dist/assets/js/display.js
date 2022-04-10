function queryDb() {
    const data = {
        event: $('input.event').val(),
        address: $('input.address').val()
    };
    const success = (result) => {
        if (result.error_code === 200) {
            $('span.md').html(result.md);
            $('span.wd').html(result.wd);
            $('span.ymd').html(result.ymd);
            $('span.ywd').html(result.ywd);

            $('span.s-md').html(result.s_md);
            $('span.s-wd').html(result.s_wd);
            $('span.s-ymd').html(result.s_ymd);
            $('span.s-ywd').html(result.s_ywd);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาดในการส่งข้อมูล',
                text: 'กรุณาเช็ค event กับ address ของท่าน ยังไม่มีข้อมูลในระบบ'
            });
        }
    };
    const fail = () => {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาดในการส่งข้อมูล',
            text: 'กรุณาเช็ค event กับ address ของท่าน ยังไม่มีข้อมูลในระบบ'
        });
    };
    postRequest(endPointURL + '/display.php', data, success, fail);
}