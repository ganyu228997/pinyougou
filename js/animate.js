function animate(obj, target,calback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 要想实现倒退，得把>=改为=
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            if(calback) {
                calback();
            }
        }
        // 把我们的步长值改为整数，有小数会因为误差原因导致最后到达的距离不够
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 30)
}