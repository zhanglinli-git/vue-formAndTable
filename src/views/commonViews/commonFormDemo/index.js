/*
 * @Descripttion: 该页面用于——
 * @Author: zhanglinli
 * @Date: 2021-02-25 15:02:47
 * @LastEditors: zhanglinli
 * @LastEditTime: 2021-03-01 11:17:00
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

export const f2 = async () => {
  const data = () => {
    return {
      data: [
        {
          createBy: 0,
          createTime: '2020-12-23 16:31:20',
          updateBy: 1,
          updateTime: '2021-01-21 08:58:33',
          deptId: 1,
          customerId: 1,
          customerName: null,
          deptCode: '0',
          deptName: '总公司',
          parentId: 0,
          parentIds: '1',
          hasChild: 0,
          parentCode: '',
          deptLevel: 1,
          isReceiveDept: 0,
          isPostDept: 0,
          recevieDeptCode: null,
          recevieDeptName: null,
          address: '　',
          zipCode: '',
          active: 1,
          remark: '',
          children: [
            {
              createBy: 0,
              createTime: '2020-12-23 16:31:20',
              updateBy: 1,
              updateTime: '2021-01-27 20:49:02',
              deptId: 2,
              customerId: 1,
              customerName: null,
              deptCode: '1011',
              deptName: '北京分公司(汇总)',
              parentId: 1,
              parentIds: '1:2',
              hasChild: 0,
              parentCode: '0',
              deptLevel: 2,
              isReceiveDept: 1,
              isPostDept: 1,
              recevieDeptCode: '1011',
              recevieDeptName: '北京分公司(汇总)',
              address: '北京-海淀区　xx区110号',
              zipCode: null,
              active: 1,
              remark: '444',
              children: [
                {
                  createBy: 0,
                  createTime: '2020-12-23 16:31:20',
                  updateBy: 1,
                  updateTime: '2020-12-28 16:47:17',
                  deptId: 29,
                  customerId: 1,
                  customerName: null,
                  deptCode: '1011001',
                  deptName: '北京分公司',
                  parentId: 2,
                  parentIds: '1:2:29',
                  hasChild: 0,
                  parentCode: '1011',
                  deptLevel: 3,
                  isReceiveDept: 1,
                  isPostDept: 1,
                  recevieDeptCode: '1011001',
                  recevieDeptName: '北京分公司',
                  address:
                    '北京市朝阳区　朝外大街乙12号昆泰国际大厦20层-121212',
                  zipCode: null,
                  active: 1,
                  remark: '',
                  children: [],
                  isPermission: true,
                  linkList: null,
                  parentName: null,
                  linkNameList: null,
                  freceiveDeptId: 29,
                },
                {
                  createBy: 0,
                  createTime: '2020-12-23 16:31:20',
                  updateBy: 0,
                  updateTime: '2020-12-23 16:31:20',
                  deptId: 241,
                  customerId: 1,
                  customerName: null,
                  deptCode: '1011080',
                  deptName: '北京电销中心',
                  parentId: 2,
                  parentIds: '1:2:241',
                  hasChild: 0,
                  parentCode: '1011',
                  deptLevel: 3,
                  isReceiveDept: 0,
                  isPostDept: 1,
                  recevieDeptCode: '1011001',
                  recevieDeptName: null,
                  address: '-',
                  zipCode: '',
                  active: 1,
                  remark: '',
                  children: [],
                  isPermission: true,
                  linkList: null,
                  parentName: null,
                  linkNameList: null,
                  freceiveDeptId: 29,
                },
              ],
              isPermission: true,
              linkList: null,
              parentName: null,
              linkNameList: null,
              freceiveDeptId: 2,
            },
          ],
          isPermission: true,
          linkList: null,
          parentName: null,
          linkNameList: null,
          freceiveDeptId: null,
        },
      ],
    }
  }
  return await data()
}

export const f3 = async () => {
  const data = () => {
    return {
      result: [
        {
          materialTypeId: 14,
          typeName: '实达人寿保单首页',
        },
        {
          materialTypeId: 15,
          typeName: '实达人寿收据回',
        },
      ],
    }
  }
  return await data()
}

export const f31 = async (param) => {
  let data = () => {}
  if (param.param === 14) {
    data = () => {
      return {
        data: [
          {
            materialName: '全国版首页',
            materialCode: 'SM_HZRS_BODYPAGE_QG',
          },
        ],
      }
    }
  } else if (param.param === 15) {
    data = () => {
      return {
        data: [
          {
            materialName: '实达人寿收据回执',
            materialCode: 'SM_HZRS_BODYPAGE_QG',
          },
        ],
      }
    }
  } else {
    data = () => {
      return {
        data: [
          {
            materialName: '全国版首页',
            materialCode: 'SM_HZRS_BODYPAGE_QG',
          },
          {
            materialName: '实达人寿收据回执',
            materialCode: 'SM_HZRS_BODYPAGE_QG',
          },
        ],
      }
    }
  }

  return await data()
}
