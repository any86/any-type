import JSON5 from 'json5'

/**
 * 获取json类型
 * @param jsonString json字符串
 * @param space 自定义缩进
 * @returns typescript类型
 */
export default function (jsonString: string, space = '    ') {
  const json = JSON5.parse(jsonString);
  const typeArray: string[] = [`type ResponseData=`];

  /**
   * 遍历节点
   * @param node 节点
   * @param propsName 节点名称 
   * @param level 当前层级, 用来控制缩进
   */
  function walk(node: object, propsName?: string, level = 0) {
    const indent = space.repeat(level);
    if (isObject(node)) {
      if (void 0 === propsName) {
        typeArray.push(`${indent}{`);
      } else {
        typeArray.push(`${indent}${propsName}:{`);
      }
      for (let key in node) {
        walk(node[key], key, level + 1);
      }
      typeArray.push(`${indent}};`);
    } else if (isArray(node)) {
      // wip
      walk(node[0], propsName, level);
      const last = typeArray.pop();
      if (last) {
        typeArray.push(last.replace(';', '[];'));
      }
      // for(let childNode of node){
      //     walk(childNode, propsName, level+1);
      // }
    } else {
      if (void 0 === propsName) {
        typeArray.push(`${indent}${typeof node}`);
      } else {
        typeArray.push(`${indent}${propsName}:${typeof node};`);
      }
    }
  }
  walk(json);
  return (typeArray.join('\r\n'));
}


function isObject(node: unknown): node is Record<string | number | symbol, any> {
  return '[object Object]' === Object.prototype.toString.call(node);
}

function isArray(node: unknown): node is unknown[] {
  return '[object Array]' === Object.prototype.toString.call(node);
}
