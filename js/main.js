$(document).ready(function() {
    $('#start').css({
        left: ($(window).width() - $('#start').outerWidth()) / 2,
        top: ($(window).height() - $('#start').outerHeight()) / 2
    });
    $('#three').css({
        left: ($(window).width() - $('#three').outerWidth()) / 2,
        top: ($(window).height() - $('#three').outerHeight()) / 2
    });
    $('#two').css({
        left: ($(window).width() - $('#two').outerWidth()) / 2,
        top: ($(window).height() - $('#two').outerHeight()) / 2
    });
    $('#one').css({
        left: ($(window).width() - $('#one').outerWidth()) / 2,
        top: ($(window).height() - $('#one').outerHeight()) / 2
    });
    $('#content').css({
        left: ($(window).width() - $('#content').outerWidth()) / 2,
        top: ($(window).height() - $('#content').outerHeight()) / 2
    });
    $('#stat').css({
        left: ($(window).width() - $('#stat').outerWidth()) / 2,
        top: ($(window).height() - $('#stat').outerHeight()) / 2
    });

    $(document).unbind('keydown').bind('keydown', function(e) {
        var doPrevent = false;

        if (e.keyCode === 8) {
            var d = e.srcElement || e.target;
            if ((d.tagName.toUpperCase() === 'INPUT' && (d.type.toUpperCase() === 'TEXT' || d.type.toUpperCase() === 'PASSWORD' || d.type.toUpperCase() === 'FILE' || d.type.toUpperCase() === 'EMAIL')) || d.tagName.toUpperCase() === 'TEXTAREA') {
                doPrevent = d.readOnly || d.disabled;
            } else {
                doPrevent = true;
            }
        }

        if (doPrevent) {
            e.preventDefault();
        }
    });

    $(window).keypress(function(e) {

        if (e.which === 13) {
            $(document).unbind('keydown').bind('keydown', function(e) {
                if (e.keyCode === 13 || e.keyCode === 8) {
                    e.preventDefault();
                }
            });
            $('#start').fadeOut('fast', function() {
                $('#three').fadeIn('500', function() {
                    $(this).fadeOut('500', function() {
                        $('#two').fadeIn('500', function() {
                            $(this).fadeOut('500', function() {
                                $('#one').fadeIn('500', function() {
                                    $(this).fadeOut('500', function() {
                                        $('#content').show();
                                        startgame();
                                        console.log("Start typing!");
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }

    });

    function startgame() {
        $(document).unbind('keydown').bind('keydown', function(e) {
            if (e.keyCode === 13 || e.keyCode === 8) {
                e.preventDefault();
            }
        });

        var starttime = $.now();
        console.log(starttime);
        var textcontent = $("#content").text().split("");
        for (var i = 0; i < textcontent.length; i++) {
            if (textcontent[i] === " ") {
                textcontent[i] = "<span class='s'>" + textcontent[i] + "</span>";
            } else {
                textcontent[i] = "<span class='n'>" + textcontent[i] + "</span>";
            }
        }
        var allWords = $("#content").text().split(" ");

        var inputNumber = 0,
            correctChars = 0,
            wrongChars = 0,
            totalChars = textcontent.length;
        defaulttextcontent = textcontent[inputNumber];
        textcontent[inputNumber] = "<span class='current'>" + textcontent[inputNumber] + "</span>";
        $('#content').html(textcontent.join(''));
        $(window).on('keypress', function(e) {
            var input = parseInt(e.which);
            console.log(input);
            console.log(textcontent[inputNumber]);
            textcontent[inputNumber] = defaulttextcontent;

            if (input === textcontent[inputNumber].charCodeAt(16)) {
                textcontent[inputNumber] = "<span class='correct'>" + textcontent[inputNumber] + "</span>";
                $('#content').html(textcontent.join(''));
                correctChars++;

            } else if (input !== textcontent[inputNumber].charCodeAt(16) && textcontent[inputNumber].charCodeAt(16) === 32) {
                textcontent[inputNumber] = "<span class='wrong'>" + textcontent[inputNumber] + "</span>";
                $('#content').html(textcontent.join(''));
                wrongChars++;
            } else {
                textcontent[inputNumber] = "<span class='wrong'>" + textcontent[inputNumber] + "</span>";
                $('#content').html(textcontent.join(''));
                wrongChars++;
            }

            inputNumber++;

            if (inputNumber < textcontent.length) {
                defaulttextcontent = textcontent[inputNumber];
                textcontent[inputNumber] = "<span class='current'>" + textcontent[inputNumber] + "</span>";
                $('#content').html(textcontent.join(''));
            }

            if (inputNumber == textcontent.length) {
                var endtime = $.now();
                var periodtime = ((endtime - starttime) / 1000).toFixed(1);
                var wpm = ((60 / periodtime) * allWords.length).toFixed(0);
                var accuracy = ((correctChars / totalChars) * 100).toFixed(0);
                var expectwpm = 30;
                var expectAccuracy = 80;
                console.log("correct " + correctChars);
                console.log("wrong " + wrongChars);
                console.log("total " + totalChars);
                console.log("periodtime " + periodtime);
                console.log("wpm " + wpm);
                $('#stat').prepend("ความแม่นยำ: " + accuracy + "%<br>จำนวนคำต่อนาที: " + wpm + "<br>เวลาที่ใช้: " + periodtime + " วินาที");
                $('#content').fadeOut('fast', function() {
                    $('#stat').show();
                    if (wpm > expectwpm && accuracy > expectAccuracy) {
                        $('.nextlesson').show();
                    }
                });
                $(window).off('keypress');
                return;
            }

        });
    }
});