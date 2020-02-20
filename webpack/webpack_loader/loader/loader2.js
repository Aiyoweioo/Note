function loader2 (source) { // 参数：代码，进行代码转化
  console.log('loader2')
  return source
}
// loader2.pitch = function () {
//   return 'loader2有返回值停止'
// }
module.exports = loader2