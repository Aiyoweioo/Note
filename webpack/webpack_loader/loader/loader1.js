function loader1 (source) { // 参数：代码，进行代码转化
  console.log('loader1')
  return source
}

module.exports = loader1