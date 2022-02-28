var Doc = document.getElementById("main_docs");
var Txt = document.getElementById("main_txt");
var fontSize = document.getElementById("font_size");
var fontColor = '';
var operators = ['Escape', 'Tab', 'CapsLock', 'Shift', 'Control', 'Alt', 'Enter', 'Backspace', 'PageUp', 'PageDown', 'Insert', 'Delete', 'Home', 'End', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];
var lastWords = [];

window.onload = function() {Txt.style.textIndent = '0'};

fontSize.addEventListener('change', function() {
    if (fontSize.value >=99) {
        fontSize.value = 99;
    }
    if (fontSize.value <= 1) {
        fontSize.value = 1;
    }
    docFontSize(fontSize.value);
})

fontSize.addEventListener('focusin', function() {
    document.addEventListener('keyup', function(e) {
        if (e.key == 'Enter') {
            Txt.focus();
        }
    })
})

function docUndo() {
    lastWords = Txt.value.split(' ');
    Txt.value = Txt.value.substring(0, Txt.value.lastIndexOf(' '));
    Txt.focus();
}

function docRedo() {
    if (lastWords.length > 1) {
        Txt.value += ' ' + lastWords[lastWords.length-1];
    }
}

document.addEventListener('mouseup', function(e) {
    if (!document.getElementById('doc_color_picker').contains(e.target)) {
        document.getElementById('doc_color_picker').style.display = 'none';
    }
})

function docPickColor(color) {
    document.getElementById('txt_font').style.color = color;
    Txt.style.color = color;
    document.getElementById('doc_color_picker').style.display = 'none'
    Txt.focus(); 
}

function docColorPickerShow() {
    document.getElementById('doc_color_picker').style.display = 'block';
}

function docFontSize(s) {
    if (s == 'decrese') {
        s = parseFloat(getComputedStyle(Txt, null).getPropertyValue('font-size')) - 5;
    }
    if (s == 'increse') {
        s = parseFloat(getComputedStyle(Txt, null).getPropertyValue('font-size')) + 5;
    }
    Txt.style.fontSize = Math.round(s) + 'px';
    fontSize.value = Math.round(s);
}

function docBold() {
    document.getElementById('txt_bold').classList.add('active');
    if (Txt.style.fontWeight > 300) {
        Txt.style.fontWeight = 300;
        document.getElementById('txt_bold').classList.remove('active');
    } else {
        Txt.style.fontWeight = 600;
    }

}

function docItal() {
    document.getElementById('txt_ital').classList.add('active');
    if (Txt.style.fontStyle != 'italic') {
        Txt.style.fontStyle = 'italic';
    } else {
        Txt.style.fontStyle = 'normal';
        document.getElementById('txt_ital').classList.remove('active');
    }
}

function docUnderline() {
    document.getElementById('txt_underline').classList.add('active');
    if (Txt.style.textDecoration != 'underline') {
        Txt.style.textDecoration = 'underline';
    } else {
        Txt.style.textDecoration = 'none';
        document.getElementById('txt_underline').classList.remove('active');
    }
}

function docAlignL() {
    Txt.style.textAlign = 'left';
    document.getElementById('align_right').classList.remove('active');
    document.getElementById('align_center').classList.remove('active');
    document.getElementById('align_justify').classList.remove('active');
    document.getElementById('align_left').classList.add('active');
}

function docAlignR() {
    Txt.style.textAlign = 'right';
    document.getElementById('align_right').classList.add('active');
    document.getElementById('align_center').classList.remove('active');
    document.getElementById('align_justify').classList.remove('active');
    document.getElementById('align_left').classList.remove('active');
}

function docAlignC() {
    Txt.style.textAlign = 'center';
    document.getElementById('align_right').classList.remove('active');
    document.getElementById('align_center').classList.add('active');
    document.getElementById('align_justify').classList.remove('active');
    document.getElementById('align_left').classList.remove('active');
}

function docAlignJ() {
    Txt.style.textAlign = 'justify';
    document.getElementById('align_right').classList.remove('active');
    document.getElementById('align_center').classList.remove('active');
    document.getElementById('align_justify').classList.add('active');
    document.getElementById('align_left').classList.remove('active');
}

function docIndent() {
    if (Txt.style.textIndent == '0px') {
        Txt.style.textIndent = '50px';
    } else {
        Txt.style.textIndent = '0'
    }
    document.getElementById('indentP').classList.toggle('icon-indent-increase');
    document.getElementById('indentP').classList.toggle('icon-indent-decrease');
}

function fileSaveShow() {
    document.getElementById('file_save_win').style.display = 'block';
}

function fileSaveClose() {
    document.getElementById('file_save_win').style.display = 'none';
}

document.addEventListener('keyup', function(e) {
    if (e.key == 'Escape' && document.getElementById('file_save_win').style.display == 'block') {
        fileSaveClose();
    }
})

function saveFile() {
    var fileName = document.getElementById('save_fileName').value;
    if (Txt.value.length < 1) {
        alert('Unable to save empty document');
    } 
    if (fileName.length < 1) {
        alert('Input File Name');
    }
    var textFileAsBlob = new Blob([Txt.value], {type:'text/plain'}); 
    var downloadLink = document.createElement("a");
    downloadLink.download = fileName;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
    	downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else {
    	downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    	downloadLink.onclick = destroyClickedElement;
    	downloadLink.style.display = "none";
    	document.body.appendChild(downloadLink);
    }

    downloadLink.click();
    winReload();
}