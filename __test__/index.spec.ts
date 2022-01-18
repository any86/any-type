import prettier from 'prettier';
import getType from "../src/getType";

test(`验证数组`, () => {
  const input = `[
        {
            "userId": "97",
            "age": 52.487349189738985,
            "sex": 1,
            "nickName": "易芳",
            "userName": "hpk"
        },
        {
            "userId": "60",
            "age": 60.04573151125732,
            "sex": 0,
            "nickName": "徐娜",
            "userName": "tziihyji"
        }
      ]`;

  expect(getType(input)).toBe(
    prettier.format(`type ResponseData= {
        userId:string;
        age:number;
        sex:number;
        nickName:string;
        userName:string;
    }[];`, { parser: 'typescript' })
  );
});

test(`验证字符串`, () => {
  expect(getType(`'机器猫'`)).toBe(prettier.format(`type ResponseData = string;`, { parser: 'typescript' }))
})

test(`验证数字`, () => {
  expect(getType(`123`)).toBe(prettier.format(`type ResponseData = number;`, { parser: 'typescript' }))
})


test(`数组中不同元素会被识别成元祖`, () => {
  expect(getType(`[1,'2']`)).toBe(prettier.format(`type ResponseData = [number,string]`, { parser: 'typescript' }));
  expect(getType(`[{a:1},{b:'2'}]`)).toBe(prettier.format(`type ResponseData = [{a:number},{b:string}]`, { parser: 'typescript' }));
})

test(`数组中相同元素会被识别成数祖`, () => {
  expect(getType(`[{a:1},{a:2}]`)).toBe(prettier.format(`type ResponseData = {a:number}[]`, { parser: 'typescript' }));
})

test(`混合`, () => {
  expect(getType(`{a:100,b:[10,'ww',{g:100,k:[200,'sanbai']}],c:'100'}`)).toBe(prettier.format(`type ResponseData = {
    a: number;
    b: [number, string, { g: number; k: [number, string] }];
    c: string;
  };`, { parser: 'typescript' }))
});

test(`验证对象`, () => {
  const input = `{
        "totalSales": {
            "total": "288769",
            "weekCompared": "39",
            "dayCompared": "-44",
            "dayTotal": "7151"
        },
        "order": {
            "total": "32829",
            "paid": "46025",
            "dayTotal": "6442"
        },
        "salesRanking": {
            "list": [
                {
                    "title": "华为手机",
                    "totalSales": "20851"
                },
                {
                    "title": "小米手机",
                    "totalSales": "30001"
                },
                {
                    "title": "苹果手机",
                    "totalSales": "56678"
                }
            ]
        },
        "activityResults": {
            "percent": 44,
            "totalOrder": "570290"
        }
      }`

  expect(getType(input)).toBe(prettier.format(`type ResponseData = {
      totalSales: {
          total: string;
          weekCompared: string;
          dayCompared: string;
          dayTotal: string;
      };
      order: { total: string; paid: string; dayTotal: string };
      salesRanking: { list: { title: string; totalSales: string }[] };
      activityResults: { percent: number; totalOrder: string };
  };`, { parser: 'typescript' }));
});
