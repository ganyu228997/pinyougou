window.addEventListener('load', function () {
    var text = document.querySelector('input');
    text.onfocus = function () {
        if (this.placeholder === '语言开发') {
            this.placeholder = '';
        }
        this.style.color = '#333';
    }
    text.onblur = function () {
        if (this.placeholder === '') {
            this.placeholder = '语言开发';
        }
        this.style.color = '#999';
    }
    var fr = document.querySelector('.fr');
    var lis = fr.children;
    for (var i = 0; i < lis.length; i++) {
        lis[i].onmouseover = function () {
            this.children[1].style.display = 'block';
        }
        lis[i].onmouseout = function () {
            this.children[1].style.display = 'none';
        }
    }
    var main = document.querySelector('main')
    var sliderbar = document.querySelector('.sliderbar');
    var maintop = main.offsetTop;
    var slidertop = sliderbar.offsetTop;
    var sliderbartop = sliderbar.offsetTop - maintop;
    var floor = document.querySelector('.floor');
    var floortop = floor.offsetTop;
    var goback = document.querySelector('.goback');
    document.addEventListener('scroll', function () {
        // console.log(window.pageYOffset);
        if (window.pageYOffset >= maintop) {
            sliderbar.style.position = 'fixed';
            sliderbar.style.top = sliderbartop + 'px';
        }
        else {
            sliderbar.style.position = 'absolute';
            sliderbar.style.top = slidertop + 'px';
        }
        if (window.pageYOffset >= floortop) {
            goback.style.display = 'block';
        }
        else {
            goback.style.display = 'none';
        }
    })
    goback.addEventListener('click',function() {
        window.scroll(0,0);//不用单位
    })
    var arrowl = document.querySelector('.arrow-l');
    var arrowr = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    focus.addEventListener('mouseenter', function () {
        arrowl.style.display = 'block';
        arrowr.style.display = 'block';
        // 鼠标经过停止自动播放
        clearInterval(timer);
        // 清除定时器变量
        timer = null;
    })
    focus.addEventListener('mouseleave', function () {
        arrowl.style.display = 'none';
        arrowr.style.display = 'none';
        // 鼠标离开自动播放
        timer = setInterval(function () {
        // 手动调用点击事件
            arrowr.click();
        }, 3000)
    })
    // 动态生成轮播图中的小点数
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {

        // 创建li
        var li = document.createElement('li');
        // 记录当前小圆圈的索引号 通过自定义属性来做
        li.setAttribute('index', i);
        // 把li插入到ol
        ol.appendChild(li);
        // 小圆圈排他思想 我们可以在生成小圆圈的同时直接绑定事件
        var focuswidth = focus.offsetWidth;
        li.addEventListener('click', function () {
            console.log(ul.children.length);
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 点击小圆圈移动图片，当然是移动ul
            // ul的移动距离是小圆圈的索引号乘以图片宽度 注意是负值
            // 当我们点击了某个li 就拿到当前li的索引号
            var index = this.getAttribute('index');
            // 当我们点击了某个li 就要把这个li 的索引号给num 和 circle
            num = index;
            circle = index;
            animate(ul, -index * focuswidth);
        })
    }
    // 把ol里面的第一个li设置类名为current
    ol.children[0].className = 'current';
    // 克隆第一张图片放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 点击右侧按钮，图片滚动一张
    var num = 0;
    // 控制小圆圈的播放
    var circle = 0;
    // flag节流阀 
    var flag = true;
    arrowr.addEventListener('click', function () {
        if (flag) {
            flag = false;//关闭节流阀
            // 如果走到了最后一张图片，此时 我们的ul要快速复原为left 改为 0;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focuswidth, function () {
                flag = true;//打开节流阀
            });
            // 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈
            circle++;
            // 如果circle == 4 这里的4是小圆点的个数 说明走到最后我们克隆的这张图片了然后将circle复原为0
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 先清除其余小圆圈的current类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下当前小圆圈的类名
            ol.children[circle].className = 'current';
        }
    });
    // 左侧按钮
    arrowl.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // 如果走到了最后一张图片，此时 我们的ul要快速复原为left 改为 0;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focuswidth + 'px';
            }
            num--;
            animate(ul, -num * focuswidth, function () {
                flag = true;
            });
            // 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈
            circle--;
            // 如果circle <0 说明走到了第一张图片了 然后将circle改为为第四个小圆圈
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            // 先清除其余小圆圈的current类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下当前小圆圈的类名
            ol.children[circle].className = 'current';
        }
    });
    var timer = setInterval(function () {
        // 手动调用点击事件
        arrowr.click();
    }, 3000)

})