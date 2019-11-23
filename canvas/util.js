//获取弧度
function getRadian(deg){
    return deg * Math.PI / 180;
}

//获取随机颜色
function getRandomColor() {
    return 'hsla('+parseInt(Math.random() * 360)+', '+parseInt(Math.random() * 100)+'%, '+parseInt(Math.random() * 100)+'%, 1)';
}