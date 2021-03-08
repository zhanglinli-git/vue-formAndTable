/*
 * @Descripttion: 该页面用于——
 * @Author: zhanglinli
 * @Date: 2021-03-02 16:08:43
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-03-05 14:05:13
 */
export const listSearch = async (param = { pageSize: 5 }) => {
  let data = () => {}
  const list = [
    {
      id: 1,
      date: '2016-05-02',
      name: '王小虎',
      active: 0,
      address: '上海市普陀区金沙江路 1518 弄',
    },
    {
      id: 2,
      date: '2016-05-04',
      name: '王小虎',
      active: 1,
      address: '上海市普陀区金沙江路 1517 弄',
    },
    {
      id: 3,
      date: '2016-05-01',
      name: '王小虎',
      active: 1,
      address: '上海市普陀区金沙江路 1519 弄',
    },
    {
      id: 4,
      date: '2016-05-03',
      name: '王小虎',
      active: 1,
      address: '上海市普陀区金沙江路 1516 弄',
    },
  ]
  if (param.pageSize === 5) {
    data = () => {
      return {
        data: list,
        total: 4,
        treeData: [
          {
            id: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            id: 2,
            date: '2016-05-04',
            name: '普通树',
            address: '上海市普陀区金沙江路 1517 弄',
            children: [
              {
                id: 31,
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
              },
              {
                id: 32,
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
              },
            ],
          },
          {
            id: 3,
            date: '2016-05-01',
            name: '懒加载',
            address: '上海市普陀区金沙江路 1519 弄',
            hasChild: true,
          },
          {
            id: 4,
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
          },
        ],
      }
    }
  } else if (param.pageSize === 10) {
    data = () => {
      return {
        data: [...list, ...list],
        total: 8,
      }
    }
  }

  return await data()
}
