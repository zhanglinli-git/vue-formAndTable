/*
 * @Descripttion: 该页面用于——
 * @Author: zhanglinli
 * @Date: 2021-03-09 10:11:35
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-03-09 16:19:38
 */
export const f1 = async () => {
  const data = () => {
    return {
      data: [
        {
          value: '1',
          label: '已处理',
        },
        {
          value: '0',
          label: '未处理',
        },
      ],
    }
  }
  return await data()
}

export const base = async () => {
  const data = () => {
    return {
      data: {
        data: [
          {
            name: '总体单量统计',
            total: 231,
            dayRangeRingRatio: '-1.00',
            weekRangeRingRatio: '.00',
            weekLine: [
              { date: '03 08', total: 1 },
              { date: '03 09', total: 2 },
              { date: '03 10', total: 3 },
              { date: '03 11', total: 4 },
              { date: '03 12', total: 5 },
              { date: '03 13', total: 6 },
              { date: '03 14', total: 7 },
            ],
          },
          {
            name: '电子保单单量',
            total: 52,
            dayRangeRingRatio: '0',
            weekRangeRingRatio: '0',
            weekLine: [
              { date: '03 08', total: 1 },
              { date: '03 09', total: 2 },
              { date: '03 10', total: 3 },
              { date: '03 11', total: 4 },
              { date: '03 12', total: 5 },
              { date: '03 13', total: 6 },
              { date: '03 14', total: 7 },
            ],
          },
          {
            name: '纸质保单单量',
            total: 168,
            dayRangeRingRatio: '-1.00',
            weekRangeRingRatio: '.00',
            weekLine: [
              { date: '03 08', total: 1 },
              { date: '03 09', total: 2 },
              { date: '03 10', total: 3 },
              { date: '03 11', total: 4 },
              { date: '03 12', total: 5 },
              { date: '03 13', total: 6 },
              { date: '03 14', total: 7 },
            ],
          },
          {
            name: '电子信函单量',
            total: 1,
            dayRangeRingRatio: '0',
            weekRangeRingRatio: '0',
            weekLine: [
              { date: '03 08', total: 1 },
              { date: '03 09', total: 2 },
              { date: '03 10', total: 3 },
              { date: '03 11', total: 4 },
              { date: '03 12', total: 5 },
              { date: '03 13', total: 6 },
              { date: '03 14', total: 7 },
            ],
          },
          {
            name: '纸质信函单量',
            total: 10,
            dayRangeRingRatio: '0',
            weekRangeRingRatio: '0',
            weekLine: [
              { date: '03 08', total: 1 },
              { date: '03 09', total: 2 },
              { date: '03 10', total: 3 },
              { date: '03 11', total: 4 },
              { date: '03 12', total: 5 },
              { date: '03 13', total: 6 },
              { date: '03 14', total: 7 },
            ],
          },
        ],
      },
    }
  }
  return await data()
}

export const spreadOver = async () => {
  const data = () => {
    return {
      data: {
        data: [
          { name: '电子保单', value: 1 },
          { name: '纸质保单', value: 43 },
          { name: '电子信函', value: 111 },
          { name: '纸质信函', value: 222 },
        ],
      },
    }
  }
  return await data()
}

export const processHistTimeRadar = async () => {
  const data = () => {
    return {
      data: {
        data: {
          letter: {
            CheckRule: {
              count: 0,
              total: 0.0,
              avg: '0',
              label: '在线审核规则处理',
              processNow: 'CheckRule',
            },
            DataProcess: {
              count: 0,
              total: 10.0,
              avg: '0',
              label: '数据处理',
              processNow: 'DataProcess',
            },
            Distribute: {
              count: 0,
              total: 10.0,
              avg: '0',
              label: '数据分发',
              processNow: 'Distribute',
            },
            GeneratePDF: {
              count: 0,
              total: 20.0,
              avg: '0',
              label: '生成PDF',
              processNow: 'GeneratePDF',
            },
            OutPrint: {
              count: 0,
              total: 30.0,
              avg: '0',
              label: '外包打印',
              processNow: 'OutPrint',
            },
            SendEmail: {
              count: 0,
              total: 40.0,
              avg: '0',
              label: '发送邮件',
              processNow: 'SendEmail',
            },
          },
          policy: {
            CheckRule: {
              count: 118,
              total: 3.0,
              avg: '.00',
              label: '在线审核规则处理',
              processNow: 'CheckRule',
            },
            DataProcess: {
              count: 0,
              total: 5.0,
              avg: '0',
              label: '数据处理',
              processNow: 'DataProcess',
            },
            Distribute: {
              count: 18,
              total: 10.0,
              avg: '.00',
              label: '数据分发',
              processNow: 'Distribute',
            },
            GeneratePDF: {
              count: 160,
              total: 10.0,
              avg: '.00',
              label: '生成PDF',
              processNow: 'GeneratePDF',
            },
            OutPrint: {
              count: 0,
              total: 1.0,
              avg: '0',
              label: '外包打印',
              processNow: 'OutPrint',
            },
            SendEmail: {
              count: 76,
              total: 22.0,
              avg: '.00',
              label: '发送邮件',
              processNow: 'SendEmail',
            },
          },
        },
      },
    }
  }
  return await data()
}

export const getCenterStatistics = async () => {
  const data = () => {
    return {
      data: {
        data: [
          {
            centerId: 1,
            activeLetterNum: 0,
            address: '上海市黄浦区',
            city: '上海',
            num: 0,
            activePolicyNum: 0,
            specPolicyNum: 0,
            type: ['保单', '个性化', '信函'],
            linkMan: '做一个',
            activeNum: 88888,
            phone: '13055734582',
            policyNum: 0,
            email: '94536963@qq.com',
            letterNum: 0,
            centerName: '新疆',
          },
          {
            centerId: 1,
            activeLetterNum: 0,
            address: '上海市黄浦区',
            city: '上海',
            num: 0,
            activePolicyNum: 0,
            specPolicyNum: 0,
            type: ['保单', '个性化', '信函'],
            linkMan: '做一个',
            activeNum: 88888,
            phone: '13055734582',
            policyNum: 0,
            email: '94536963@qq.com',
            letterNum: 0,
            centerName: '新疆',
          },
          {
            centerId: 1,
            activeLetterNum: 0,
            address: '上海市黄浦区',
            city: '上海',
            num: 0,
            activePolicyNum: 0,
            specPolicyNum: 0,
            type: ['保单', '个性化', '信函'],
            linkMan: '做一个',
            activeNum: 88888,
            phone: '13055734582',
            policyNum: 0,
            email: '94536963@qq.com',
            letterNum: 0,
            centerName: '新疆',
          },
          {
            centerId: 1,
            activeLetterNum: 0,
            address: '上海市黄浦区',
            city: '上海',
            num: 0,
            activePolicyNum: 0,
            specPolicyNum: 0,
            type: ['保单', '个性化', '信函'],
            linkMan: '做一个',
            activeNum: 88888,
            phone: '13055734582',
            policyNum: 0,
            email: '94536963@qq.com',
            letterNum: 0,
            centerName: '新疆',
          },
        ],
      },
    }
  }
  return await data()
}
