import JSON5 from 'json5'
import prettier from 'prettier';
type KV = Record<string | number | symbol, unknown>;
/**
 * 获取json类型
 * @param jsonString json字符串
 * @param space 自定义缩进
 * @returns typescript类型
 */
export default function (jsonString: string, space = '    ') {

  const is = isAllSameItemArray([[1], [2]])
  console.warn(is);



  const json = JSON5.parse(jsonString);
  const typeArray: string[] = [`type ResponseData=`];
  walk(json);
  /**
   * 遍历节点
   * @param node 节点
   * @param propsName 节点名称 
   * @param level 当前层级, 用来控制缩进
   */
  function walk(node: unknown, propsName?: string, level = 0) {
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
      // 顶级是个数组
      if (0 === level) {
        let currentType = '';
        for (let childNode of node) {
          currentType = typeof childNode
          walk(childNode, void 0, level + 1);
        }
      } else {
        walk(node[0], propsName, level);
        const last = typeArray.pop();
        if (last) {
          typeArray.push(last.replace(';', '[];'));
        }
      }



    } else {
      if (void 0 === propsName) {
        typeArray.push(`${indent}${typeof node}`);
      } else {
        typeArray.push(`${indent}${propsName}:${typeof node};`);
      }
    }
  }

  return ((typeArray.join('\r\n')));
}


function isObject(node: unknown): node is KV {
  return '[object Object]' === Object.prototype.toString.call(node);
}

function isArray(node: unknown): node is unknown[] {
  return '[object Array]' === Object.prototype.toString.call(node);
}


function isAllSameItemArray(nodes: unknown[]) {
  if (nodes.length < 2) return false;
  let lastType = '';
  let lastNode;
  for (const node of nodes) {
    let currentType: string = typeof node;
    // 非首次
    // console.log({ lastType, currentType });
    if ('' !== lastType) {
      // 类型相同
      if (lastType == currentType) {
        if (isArray(node)) {
          currentType = 'array';
          if (!isAllSameItemArray(node)) {
            return false;
          }
        } else if (isObject(node)) {
          currentType = 'object';
          const isSameKeys = hasSameKeysObject(node, lastNode as KV);
          console.log({ isSameKeys });
          if (!isSameKeys) {
            return false;
          }
        }
      } else {
        return false;
      }
    }

    lastType = currentType;
    lastNode = node;
  }
  return true;
}

function isSameSchemeArray(arr1:unknown[],arr2:unknown[]):boolean{
  if(arr2.length !== arr1.length) return false;
  
}

function hasSameKeysObject(obj1: KV, obj2: KV):boolean {
  const isSameKeysLength = Object.keys(obj1).length === Object.keys(obj2).length;
  if (!isSameKeysLength) return false;
  for (const key in obj1) {
    if (void 0 === obj2[key]) {
      return false;
    }
  }
  return true;
}