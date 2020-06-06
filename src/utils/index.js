export function formatDate (time) {
    let date = new Date(time)
    let Y, M, D, h, m, s
    Y = date.getFullYear() + '-'
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
    D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' '
    h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':'
    m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':'
    s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds())
    return Y+M+D+h+m+s
}

// export function param (json) {
//     if (!json) return ''
//     return cleanArray(Object.keys(json).map(key => {
//         if (json[key] === undefined) return ''
//         return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
//     })).join('&')
// }

export function scrollTo (element, to, duration) {
    if (duration <= 0) return
    const difference = to - element.scrollTop
    const perTick = difference / duration * 10
    setTimeout(() => {
        console.log(new Date())
        element.scrollTop = element.scrollTop + perTick
        if (element.scrollTop === to) return
        scrollTo(element, to, duration - 10)
    }, 10)
}


// export function getCookie(name) {
//     var cookieValue = "啥也没有！！";
//     if (document.cookie && document.cookie !== '') {
//         var cookies = document.cookie.split(';');
//         for (var i = 0; i < cookies.length; i++) {
//             var cookie = $.trim(cookies[i]);
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }

export function setTokenToCookie(value) {
    var Days = 1; //此 cookie 将被保存 30 天
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = "my_token =" + escape(value) + ";expires=" + exp.toGMTString();
}

