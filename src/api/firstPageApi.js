/*
 * @Descripttion: 该页面用于——
 * @Author: zhanglinli
 * @Date: 2020-11-24 09:50:00
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-03-10 15:46:19
 */

// 保单、信函昨日、今日统计
export const getCountByAcceptTime = async (param) => {
  const data = () => {
    return {
      data: {
        letterTotalToday: 10,
        letterTotalYes: 20,
        policyTotalToday: 14,
        policyTotalYes: 11110,
      },
    }
  }
  return await data()
}

// 保单待处理事务
export const getWaitDeal = async (param) => {
  const data = () => {
    return {
      data: [
        { label: '地址审核', count: 11 },
        { label: '特殊数据审核', count: 1111 },
        { label: '重复数据审核', count: 1111 },
        { label: '电邮地址审核', count: 1111 },
      ],
    }
  }
  return await data()
}

// 保单总览
export const getOverView = async (param) => {
  const data = () => {
    return {
      data: [
        { label: '总数据', count: 4111 },
        { label: '待质检', count: 1101 },
        { label: '待打印(邮件发送)', count: 1201 },
        { label: '已完成', count: 1210 },
      ],
    }
  }
  return await data()
}

// 保单、信函统计
export const policyStatistics = async (param) => {
  const data = () => {
    return {
      data: {
        series: [
          { data: [11, 22, 333, 444, 5555, 666, 7777, 1111] },
          { data: [111, 222, 333, 222, 1111, 111, 222, 3333] },
          { data: [111, 222, 333, 222, 1111, 111, 222, 3333] },
        ],
        xdata: [
          '数据处理',
          '数据导入',
          '在线审核规则处理',
          '生成PDF',
          '外包打印',
          '数据分发',
          '发送邮件',
          '邮寄',
        ],
      },
    }
  }
  return await data()
}
