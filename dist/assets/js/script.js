var vdo = '';
var isNew = false;
var eventKey = '';

$(function() {
    const address = getURLParam('address');
    const event = getURLParam('event');
    eventKey = event;

    let errorMessage = '';
    let isError = false;
    if (!address) {
        errorMessage += 'กรุณาติดต่อผู้ประสานงานเพื่อเพิ่มข้อมูลที่อยู่ <br />';
        isError = true;
    }
    if (!event) {
        errorMessage += 'กรุณาติดต่อผู้ประสานงานเพื่อเพิ่มข้อมูลงาน <br />';
        isError = true
    }

    const data = {
        event: getURLParam('event')
    };
    const success = (result) => {
        if (result.error_code === 200) {
            $('.fill-name').html(result?.event_name);
            $('.fill-caption').html(result?.event_caption);

            if (result?.event_isNew !== 'Y') {
                $('.is-count-new').hide();
                isNew = true;
            } 

            vdo = result?.event_youtube;

            var mainDateTime = dateConverter(result?.event_start);
            var setItem = [
                {
                    activeItem: 'state1',
                    dt: dateConverter(result?.event_init)
                },
                {
                    activeItem: 'state2',
                    dt: dateConverter(result?.event_start)
                },
                {
                    activeItem: 'state3',
                    dt: dateConverter(result?.event_end)
                }
            ]
            setCountdown(mainDateTime, setItem);
        } else {
            errorMessage += 'กรุณาติดต่อผู้ประสานงานเพื่อเพิ่มข้อมูลงาน <br />';
            isError = true;
        }
        isDisplayError(isError, errorMessage);
    };
    const fail = () => {
        errorMessage += 'กรุณาติดต่อผู้ประสานงานเพื่อเพิ่มข้อมูลงาน <br />';
        isError = true

        isDisplayError(isError, errorMessage);
    };
    postRequest(endPointURL + '/check-event.php', data, success, fail);




    $('input.md').val(getCookie('sgt-md-' + eventKey) || 0);
    $('input.wd').val(getCookie('sgt-wd-' + eventKey) || 0);
    $('input.ymd').val(getCookie('sgt-ymd-' + eventKey) || 0);
    $('input.ywd').val(getCookie('sgt-ywd-' + eventKey) || 0);

    $('input.s-md').val(getCookie('sgt-s-md-' + eventKey) || 0);
    $('input.s-wd').val(getCookie('sgt-s-wd-' + eventKey) || 0);
    $('input.s-ymd').val(getCookie('sgt-s-ymd-' + eventKey) || 0);
    $('input.s-ywd').val(getCookie('sgt-s-ywd-' + eventKey) || 0);
});

function recheckDoubleForm() {
    if (getCookie('sgt-md-' + eventKey)) {
        Swal.fire({
            title: 'ท่านได้ทำการลงข้อมูลเรียบร้อยแล้ว หากไม่มีการแก้ไขข้อมูลสามารถกด ชม VDO',
            html: !isNew ? 
            '<span class="_fs-20">ผู้ใหญ่ชาย<br /> สมาชิก (' + $('input.md').val() + ') เพื่อนสมาชิก (' + $('input.s-md').val() + 
            ') <br/>ผู้ใหญ่หญิง<br /> สมาชิก (' + $('input.wd').val() + ') เพื่อนสมาชิก (' + $('input.s-wd').val() + 
            ') <br/>ยุวชนชายและมิไรบุชาย<br /> สมาชิก (' + $('input.ymd').val() + ') เพื่อนสมาชิก (' + $('input.s-ymd').val() + 
            ') <br/>ยุวชนหญิงและมิไรบุหญิง<br /> สมาชิก (' + $('input.ywd').val() + ') เพื่อนสมาชิก (' + $('input.s-ywd').val() + ') </span>' 
            : '<span class="_fs-20">ผู้ใหญ่ชาย<br />  ' + $('input.md').val() + 
            ' <br/>ผู้ใหญ่หญิง<br /> ' + $('input.wd').val() + 
            ' <br/>ยุวชนชายและมิไรบุชาย<br /> ' + $('input.ymd').val() +
            ' <br/>ยุวชนหญิงและมิไรบุหญิง<br /> ' + $('input.ywd').val() + ' </span>' ,
            confirmButtonText: 'ชม VDO',
            cancelButtonText: 'แก้ไข',
            showCancelButton: true,
            showCloseButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                setTimeout(function() {
                    if (vdo) {
                        location.href = 'https://www.youtube.com/watch?v=' + vdo;
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'เกิดข้อผิดพลาดในการส่งข้อมูล',
                            text: 'กรุณาเช็ค Internet ของท่านแล้วลองใหม่อีกครั้ง'
                        });
                    }
                }, 1000);
            }
        })
    }
}

function dateConverter(convertDt) {
    const dateTime = convertDt;

    let dateTimeParts = dateTime.split(/[- :]/);
    dateTimeParts[1]--;

    return new Date(...dateTimeParts);
}

function isDisplayError(isError, errorMessage) {
    if (isError) {
        $('.content-block').addClass('_hide');
        $('.error-message').html(errorMessage);
    } else {
        $('.error-block').addClass('_hide');
    }

    setTimeout(function() {
        $('.loading').fadeOut();
        recheckDoubleForm();
    }, 1000);
}

function minus(itemId) {
    const inputItem = $('.form input.' + itemId);
    const inputValue = parseInt(inputItem.val());
    inputItem.val((inputValue - 1) <= 0 ? 0 : (inputValue - 1));
}
function add(itemId) {
    const inputItem = $('.form input.' + itemId);
    const inputValue = parseInt(inputItem.val());
    inputItem.val(inputValue + 1);
}

function goto(page) {
    $('.state-item').removeClass('active');
    $('.state-item.state2-' + page).addClass('active');
}

function submit() {
    Swal.fire({
        title: 'กรุณายืนยันยอดของท่าน',
        html: !isNew ? 
        '<span class="_fs-20">ผู้ใหญ่ชาย<br /> สมาชิก (' + $('input.md').val() + ') เพื่อนสมาชิก (' + $('input.s-md').val() + 
        ') <br/>ผู้ใหญ่หญิง<br /> สมาชิก (' + $('input.wd').val() + ') เพื่อนสมาชิก (' + $('input.s-wd').val() + 
        ') <br/>ยุวชนชาย<br /> สมาชิก (' + $('input.ymd').val() + ') เพื่อนสมาชิก (' + $('input.s-ymd').val() + 
        ') <br/>ยุวชนหญิง<br /> สมาชิก (' + $('input.ywd').val() + ') เพื่อนสมาชิก (' + $('input.s-ywd').val() + ') </span>' 
        : '<span class="_fs-20">ผู้ใหญ่ชาย<br />  ' + $('input.md').val() + 
        ' <br/>ผู้ใหญ่หญิง<br /> ' + $('input.wd').val() + 
        ' <br/>ยุวชนชาย<br /> ' + $('input.ymd').val() +
        ' <br/>ยุวชนหญิง<br /> ' + $('input.ywd').val() + ' </span>' ,
        confirmButtonText: 'ส่ง',
        cancelButtonText: 'แก้ไข',
        showCancelButton: true,
        showCloseButton: true
    }).then((result) => {
        if (result.isConfirmed) {
            var oldMdVal = getCookie('sgt-md-' + eventKey) || 0;
            var oldWdVal = getCookie('sgt-wd-' + eventKey) || 0;
            var oldYmdVal = getCookie('sgt-ymd-' + eventKey) || 0;
            var oldYwdVal = getCookie('sgt-ywd-' + eventKey) || 0;

            var oldSMdVal = getCookie('sgt-s-md-' + eventKey) || 0;
            var oldSWdVal = getCookie('sgt-s-wd-' + eventKey) || 0;
            var oldSYmdVal = getCookie('sgt-s-ymd-' + eventKey) || 0;
            var oldSYwdVal = getCookie('sgt-s-ywd-' + eventKey) || 0;

            const data = {
                event: getURLParam('event'),
                address: getURLParam('address'),
                md: $('input.md').val() - oldMdVal,
                wd: $('input.wd').val() - oldWdVal,
                ymd: $('input.ymd').val() - oldYmdVal,
                ywd: $('input.ywd').val() - oldYwdVal,

                s_md: $('input.s-md').val() - oldSMdVal,
                s_wd: $('input.s-wd').val() - oldSWdVal,
                s_ymd: $('input.s-ymd').val() - oldSYmdVal,
                s_ywd: $('input.s-ywd').val() - oldSYwdVal,
            };
            const success = (result) => {
                if (result.error_code === 200) {
                    setCookie('sgt-md-' + eventKey, $('input.md').val(), 3);
                    setCookie('sgt-wd-' + eventKey, $('input.wd').val(), 3);
                    setCookie('sgt-ymd-' + eventKey, $('input.ymd').val(), 3);
                    setCookie('sgt-ywd-' + eventKey, $('input.ywd').val(), 3);

                    setCookie('sgt-s-md-' + eventKey, $('input.s-md').val(), 3);
                    setCookie('sgt-s-wd-' + eventKey, $('input.s-wd').val(), 3);
                    setCookie('sgt-s-ymd-' + eventKey, $('input.s-ymd').val(), 3);
                    setCookie('sgt-s-ywd-' + eventKey, $('input.s-ywd').val(), 3);

                    setTimeout(function() {
                        if (vdo) {
                            location.href = 'https://www.youtube.com/watch?v=' + vdo;
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'เกิดข้อผิดพลาดในการส่งข้อมูล',
                                text: 'กรุณาเช็ค Internet ของท่านแล้วลองใหม่อีกครั้ง'
                            });
                        }
                    }, 1000);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาดในการส่งข้อมูล',
                        text: 'กรุณาเช็ค Internet ของท่านแล้วลองใหม่อีกครั้ง'
                    });
                }
            };
            const fail = () => {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาดในการส่งข้อมูล',
                    text: 'กรุณาเช็ค Internet ของท่านแล้วลองใหม่อีกครั้ง'
                });
            };
            postRequest(endPointURL + '/add.php', data, success, fail);
        }
    })
}