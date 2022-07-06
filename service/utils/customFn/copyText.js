export function copyText(text) {
    if(text){
        var textareaEl = document.createElement('textarea');
        textareaEl.setAttribute('readonly', 'readonly'); // 防止手机上弹出软键盘
        textareaEl.value = text;
        document.body.appendChild(textareaEl);
        textareaEl.select();
        var res = document.execCommand('copy');
        document.body.removeChild(textareaEl);
        return res;
    }
    else{
        return false;
    }
}