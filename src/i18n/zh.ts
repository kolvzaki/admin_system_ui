export default {
  test: '你好',
  route: {
    sideBarTitle: '管 理 系 统',
    dashboard: '仪表盘',
    profile: '个人信息',
    systemManage: '系统管理',
    userManage: '用户管理',
    playGroundManage: '场地管理',
    roleManage: '角色管理',
    permissionManage: '权限管理',

    orderManage : '订单管理',
    equipmentManage: '设备管理',
    exception: '异常页面',
    403: '403',
    404:'404',
    500:'500',
    info: '信息页',
    monitor: '系统监控',
  },
  setting:{
    title: '主题配置'
  },
  navbar:{
    langSelect: '语言切换',
    skinSetting: '皮肤设置',
    screenFull: '全屏',
    headerSearch: '系统检索'
  },
  skin:{
    default: '默认',
    dark: '黑夜',
    rose: '玫红'
  },
  contextMenu:{
    refresh: '刷新',
    closeRight:'关闭右侧标签',
    closeOthers :'关闭其他标签'
  },

  profile:{
    title: '基本信息',
    updateButton: '修改信息',
    changeAvatarButton: '更换头像',
    securityButton:'安全信息',
    updateProfile: '更新个人信息',
    basicCardTitle: '基本信息',
    securityCardTitle: '安全信息',
    security:{
      rpTitle: '角色与权限',
      apTitle:'账号安全',
      changePasswordButton: '更换密码',
      roleTitle: '角色',
      permissionTitle: '权限',
      oldPass: '旧密码',
      newPass: '新密码',
      confirm: '确认新密码'
    },
    username: '账号',
    nickname: '姓名',
    gender: '性别',
    mobile:'联系电话',
    email:'联系邮箱',
    age:'年龄',
    introduce:'自我介绍',
    isAvailable: '账号状态',
    lastLoginTime: '上次登录时间',
    updateTime: '上次更新时间',
    createdTime: '创建时间'
  },

  cardItem:{
    UserData: '今日活跃用户',
    MessageData: '今日消息',
    PlaygroundData: '今日活跃场地',
    MoneyData:'今日流水'
  },

  userQuery:{
    id:'id',
    rid: 'rid',
    username: '账号',
    nickname: '姓名',
    gender: '性别',
    avatar: '头像',
    mobile:'联系电话',
    email:'联系邮箱',
    minAge:'最小年龄',
    maxAge: '最大年龄',
    role: '角色',
    role_name: '角色',
    introduce:'自我介绍',
    isAvailable: '账号状态',
    isDeleted: '存在',
    lastLoginTime: '上次登录时间',
    updateTime: '上次更新时间',
    createdTime: '创建时间'
  },

  roleQuery:{
    id:'id',
    name: '角色名称',
    remark: '备注'
  },
  permissionQuery:{
    id:'id',
    name: '权限名称',
    remark: '备注'
  },

  groundQuery:{
    id: '场地ID',
    name: '场地名',
    type: '种类',
    pics : '图片',
    cost: '价格',
    isAvailable: '是否可用',
    isDeleted: '删除',
    status: '状态',
    page: '',
    size: ''
  },

  orderQuery:{
    id: 'id',
    username: '用户',
    gid:'场地ID',
    name: '场地名称',
    type: '场地种类',
    orderDate: '预约日期',
    orderTime: '预约时间',
    status:'订单状态',
    score: '评分',
    page: '',
    size: '',
  },

  orderModel:{
    id: 'id',
    username: '用户',
    gid: '场地ID',
    name:'场地',
    type: '场地种类',
    status:'订单状态',
    createdTime: '创建时间',
    orderTime: '预约时间',
    cost: '支付金额(RMB)',
    score: '用户评分'
  },

  OrderStatus:{
    unpaid: '未支付',
    paid: '已支付',
    running: '进行中',
    finished: '已结束',
    cancel: '已取消',
  },

  OrderDetail:{
    title: '订单详情',
    orderId: '订单编号: '
  },

  groundStatus:{
    free: '空闲',
    occupied: '占用'
  },

  charts:{
    title:'近期数据'
  },
  avatarFunctions:{
    logout: '退出登录'
  },

  gender:{
    Male: '男',
    Female: '女'
  },

  accountStatus:{
    available: '可用',
    unavailable: '不可用'
  },

  DeleteStatus:{
    deleted: '已删除',
    exists: '运行中'
  },

  button:{
    confirm: '确认',
    cancel: '取消',
    close: '关闭',
    create: '增加',
    search: '查找',
    delete: '删除',
    update: '修改',
    fold: '折叠',
    unfold:'展开'
  }

};
