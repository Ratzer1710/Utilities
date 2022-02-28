window.onload = setDate();
window.onload = setTime();

function getDay(e) {
    let day = e + 1;
    if (day == 1) {
        return "Domingo";
    } if (day == 2) {
        return "Lunes";
    } if (day == 3) {
        return "Martes";
    } if (day == 4) {
        return "Miércoles";
    } if (day == 5) {
        return "Jueves";
    } if (day == 6) {
        return "Viernes";
    } if (day == 7) {
        return "Sábado";
    }
}

function getMonth(e) {
    let month = e + 1;
    if (month == 1) {
        return "Enero";
    } if (month == 2) {
        return "Febrero";
    } if (month == 3) {
        return "Marzo";
    } if (month == 4) {
        return "Abril";
    } if (month == 5) {
        return "Mayo";
    } if (month == 6) {
        return "Junio";
    } if (month == 7) {
        return "Julio";
    } if (month == 8) {
        return "Agosto";
    } if (month == 9) {
        return "Septiembre";
    } if (month == 10) {
        return "Octubre";
    } if (month == 11) {
        return "Noviembre";
    } if (month == 12) {
        return "Diciembre";
    }
}

function setTime() {
    let day = new Date();
    document.getElementById("current_time").innerHTML = checkTime(day.getHours()) + ":" + checkTime(day.getMinutes());
    setTimeout(setTime, 1000);
}

function setDate() {
    let today = new Date();
    document.getElementById("date").innerHTML = getDay(today.getDay()) + ", " + checkTime(today.getDate()) + " " + getMonth(today.getMonth());
    setTimeout(setDate, 1000*60*60);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    } 
    return i;
}

function stopwatchShow() {
    document.getElementById("stopwatch").style.display = "block";
}

function timerShow() {
    document.getElementById("timer").style.display = "block";
}

document.addEventListener('mouseup', function(e) {
    let stopwatch = document.getElementById("stopwatch");
    let timer = document.getElementById("timer");
    let setTimer = document.getElementById("timer_set_form");
    if (!stopwatch.contains(e.target) && !document.getElementById("dark_mode_switch").contains(e.target)) {
        stopwatch.style.display = "none";
    } if (!timer.contains(e.target) && !document.getElementById("dark_mode_switch").contains(e.target)) {
        timer.style.display = "none";
    } if (!setTimer.contains(e.target) && !document.getElementById("dark_mode_switch").contains(e.target)) {
        setTimer.style.display = "none";
    }
});

var stopwatchTime = document.getElementById("stopwatch_time"); 
var PlayPause = document.getElementById("stopwatch_play-pause");
var reset = document.getElementById("stopwatch_reset");
var mins = 00;
var secs = 00;
var mils = 00;
var timer = 0;

function stopwatchPlayPause() {
    if (PlayPause.classList.contains('stopped')) {
        PlayPause.classList.remove('stopped');
        PlayPause.classList.add('active');
        PlayPause.classList.remove('icon-play3');
        PlayPause.classList.add('icon-pause2');
        stopwatchStart();
    } else {
        stopwatchStop();
    }
}

function stopwatchStop() {
    clearTimeout(timer);
    timer = 0;
    PlayPause.classList.add('stopped');
    PlayPause.classList.remove('active');
    PlayPause.classList.add('icon-play3');
    PlayPause.classList.remove('icon-pause2');
}

function stopwatchStart() {
    mils++;

    if (mils > 99) {
        secs++;
        mils = 0;
    }

    if (secs > 59) {
        mins++;
        secs = 0;
        mils = 0;
    }

    stopwatchTime.innerHTML = checkTime(mins) + ":" + checkTime(secs) + ":" + checkTime(mils);

    timer = setTimeout(stopwatchStart, 10);
}

function stopwatchReset() {
    stopwatchStop();    
    mins = 00;
    secs = 00;
    mils = 00;
    stopwatchTime.innerHTML = "00:00:00";
}

function stopwatchClose() {
    stopwatch.style.display = "none";
}

var hours = 0;
var minutes = 0;
var seconds = 0;
var hsm = [];
var timeout = 0;
var PlayPauseTimer = document.getElementById("timer_play_pause");
var timerDisplay = document.getElementById("timer_time");

function checkEmpty(i) {
    if (i == "") {
        i = 0;
    }
    return i;
}

function timerSetShow() {
    document.getElementById("timer_set_form").style.display = "block";
    document.getElementById("timer").style.display = "none";
}

function timerClose() {
    document.getElementById("timer").style.display = "none";
}

function timerSet() {
    if (document.getElementById("timer_hs").value == "" && document.getElementById("timer_mins").value == "" && document.getElementById("timer_secs").value == "") {
        alert("fill inputs before submiting");
    } else {
        if (document.getElementById("timer_hs").value > 99) {
            alert("max hours is 99");
            return;
        } if (document.getElementById("timer_mins").value > 59) {
            alert("max minutes is 59");
            return;
        } if (document.getElementById("timer_secs").value > 59) {
            alert("max seconds is 59");
            return;
        }
        document.getElementById("timer").style.display = "block";
        document.getElementById("timer_set_form").style.display = "none";
        document.getElementById("timer_set").style.display = "none";
        hours = checkEmpty(document.getElementById("timer_hs").value);
        minutes = checkEmpty(document.getElementById("timer_mins").value);
        seconds = checkEmpty(document.getElementById("timer_secs").value);
        hsm = [hours, minutes, seconds];
        timerDisplay.innerHTML = checkTime(hours) + ":" + checkTime(minutes) + ":" + checkTime(seconds);
        timerPlayPause();
    }
}

function timerPlayPause() {
    if (timerDisplay.innerHTML == "00:00:00") {
        alert("Set timer before starting");
    } else {
        if (PlayPauseTimer.classList.contains('stopped')) {
            PlayPauseTimer.classList.remove('stopped');
            PlayPauseTimer.classList.add('active');
            PlayPauseTimer.classList.remove('icon-play3');
            PlayPauseTimer.classList.add('icon-pause2');
            timerStart();
        } else {
            timerStop();
        }
    }
}

function timerStop() {
    clearTimeout(timeout);
    timeout = 0;
    PlayPauseTimer.classList.add('stopped');
    PlayPauseTimer.classList.remove('active');
    PlayPauseTimer.classList.add('icon-play3');
    PlayPauseTimer.classList.remove('icon-pause2');
}

function timerDestroy() {
    timerStop()
    hours = 0;
    minutes = 0;
    seconds = 0;
    hsm = [];
    document.getElementById("timer_set").style.display = "block";
    timerDisplay.innerHTML = "00:00:00";
}

function timerReset() {
    if (hsm.length > 0) {
        timerStop()
        hours = hsm[0];
        minutes = hsm[1];
        seconds = hsm[2];
        timerDisplay.innerHTML = checkTime(hours) + ":" + checkTime(minutes) + ":" + checkTime(seconds);
    }
}

function timerStart() {
    seconds = seconds-1;

    if (minutes > 0 && seconds < 1) {
        seconds = 59;
        minutes = minutes-1;
        if (hours > 0 && minutes < 1) {
            minutes = 59;
            hours = hours-1;
        }
    }

    timerDisplay.innerHTML = checkTime(hours) + ":" + checkTime(minutes) + ":" + checkTime(seconds);

    timeout = setTimeout(timerStart, 1000);

    if (seconds < 1 && hours == 0 && minutes == 0) {
        document.getElementById("timer_audio").play();
        alert("Timer Ended");
        document.getElementById("timer_audio").pause();
        timerReset();
    }
}