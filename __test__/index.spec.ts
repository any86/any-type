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

  expect(getType(input)).toMatchSnapshot(`type ResponseData= {
        userId:string;
        age:number;
        sex:number;
        nickName:string;
        userName:string;
    }[];`);
});



// test.skip(`验证对象`, () => {
//     const input = `{
//         "totalSales": {
//             "total": "288769",
//             "weekCompared": "39",
//             "dayCompared": "-44",
//             "dayTotal": "7151"
//         },
//         "order": {
//             "total": "32829",
//             "paid": "46025",
//             "dayTotal": "6442"
//         },
//         "salesRanking": {
//             "list": [
//                 {
//                     "title": "华为手机",
//                     "totalSales": "20851"
//                 },
//                 {
//                     "title": "小米手机",
//                     "totalSales": "30001"
//                 },
//                 {
//                     "title": "苹果手机",
//                     "totalSales": "56678"
//                 }
//             ]
//         },
//         "activityResults": {
//             "percent": 44,
//             "totalOrder": "570290"
//         }
//       }`
  
//     expect(getType(input)).toMatchInlineSnapshot(`type ResponseData=
//       {
//           userId:string;
//           age:number;
//           sex:number;
//           nickName:string;
//           userName:string;
//       }[];`);
//   });
  