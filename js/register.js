window.addEventListener('load',function() {
    var ipttel = document.getElementById('inptel');
var tel = document.getElementById('tel');
var ficon = document.getElementById('first_icon')
var p = tel.querySelector('p'); 
ipttel.addEventListener('blur',function() {

    if(this.value == '') {
        tel.style.color= 'green';
        ficon.className = 'success_icon right';
        p.innerHTML = '请输入11位的手机号码';
    }
    else if(this.value.length != 11) {
        tel.style.color = 'red';
        ficon.className = 'success_icon wrong';
        p.innerHTML = '您输入的格式错误';
    }
    else{
        tel.style.color= 'green';
        ficon.className = 'success_icon right';
        p.innerHTML = '您输入的格式正确';
    }
})
})