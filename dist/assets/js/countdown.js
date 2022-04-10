function setCountdown(mainDateTime, setItem) {
    var countDownDate = mainDateTime.getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {
        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result in the element with id="demo"
        var countdownText = days + ' วัน ' + hours + ' ชั่วโมง '
        + minutes + ' นาที ' + seconds + ' วินาที ';
        
        $('.countdown').html(countdownText);

        // If the count down is finished, write some text
        if (distance < 0) {
            $('.countdown').html('').hide();
        }
        
        handleState(setItem)
    }, 1000);
}

function handleState(setItem) {
    setItem.forEach(item => {
        var countDownDate = new Date(item.dt).getTime();
        
         // Get today's date and time
         var now = new Date().getTime();

         // Find the distance between now and the count down date
         var distance = countDownDate - now;

        // If the count down is finished, write some text
        if (distance < 0) {
            $('.state').removeClass('active');
            $('.' + item.activeItem).addClass('active');
            return;
        }
    });
}