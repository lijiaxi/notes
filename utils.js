
/**
 *  format Number 
 *  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
 * 
 */
function formatNumber(number,options = {},locals = 'en-US'){
    return number.toLocaleString(locals,options)
}