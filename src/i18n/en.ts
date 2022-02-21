
export default {
  test: 'test',
  route: {
    sideBarTitle: 'Admin System',
    dashboard: 'Dashboard',
    profile: 'Profile',
    systemManage: 'System Manage',
    userManage: 'User',
    roleManage: 'Role',
    orderManage:'Order',
    permissionManage: 'Permission',
    playGroundManage: 'Ground',
    equipmentManage: 'Equipment',
    exception: 'Exception',
    403: '403',
    404:'404',
    500:'500',
    info: 'Info',
    monitor: 'System Monitor',
  },
  setting:{
    title:'Theme Setting'
  },
  navbar:{
    langSelect: 'Language Select',
    skinSetting: 'Skin Setting',
    screenFull: 'Full Screen',
    headerSearch: 'System Search'
  },
  skin:{
    default: 'Default',
    dark: 'Dark',
    rose: 'Rose'
  },
  contextMenu:{
    refresh: 'refresh',
    closeRight:'Close right side tags',
    closeOthers :'Close other tags'
  },
  profile:{
    title: 'Basic Info',
    updateButton: 'Edit Profile',
    changeAvatarButton: 'Change avatar',
    securityButton: 'Security',
    updateProfile: 'Update Profile',

    basicCardTitle: 'Basic',
    securityCardTitle: 'Security',
    security:{
      rpTitle: 'Role&Permission',
      apTitle:'Account&Password',
      changePasswordButton: 'Change Password',
      roleTitle: 'Role',
      permissionTitle: 'Permission',

      oldPass: 'Old Pass',
      newPass: 'New pass',
      confirm: 'Confirm Pass'
    },

    nickname: 'Nickname',
    gender: 'Gender',
    mobile:'Mobile',
    email:'Email',
    age:'Age',
    introduce:'Introduce',
    username: 'Username',
    isAvailable: 'Account Status',
    lastLoginTime: 'Last Login Time',
    updateTime: 'Last Update Time',
    createdTime: 'Create Time'
  },
  accountStatus:{
    available: 'Available',
    unavailable: 'Unavailable'
  },
  cardItem:{
    UserData: 'Active User',
    MessageData: 'Message',
    PlaygroundData: 'Playground',
    MoneyData:'Daily Income'
  },
  userQuery:{
    id:'id',
    rid: 'rid',
    username: 'Username',
    nickname: 'Nickname',
    gender: 'Gender',
    mobile:'Mobile',
    avatar: 'Avatar',
    email:'Email',
    role:'Role',
    role_name: 'Role',
    minAge:'min age',
    maxAge: 'max age',
    introduce:'introduce',
    isAvailable: 'Available',
    lastLoginTime: 'Last Login Time',
    updateTime: 'Update Time',
    createdTime: 'Created Time',
    isDeleted: 'Exist',
  },

  roleQuery:{
    id:'id',
    name: 'Role Name',
    remark: 'Remark'
  },

  permissionQuery:{
    id:'id',
    name: 'Permission Name',
    remark: 'Remark'
  },

  groundQuery:{
    id: 'ID',
    name: 'Name',
    type: 'Type',
    isAvailable: 'Available',
    isDeleted: 'Exists',
    pics : 'Pics',
    status: 'Status',
    page: '',
    size: ''
  },

  orderQuery:{
    id: 'id',
    username: 'User',
    ground:'Ground',
    status:'Order Status',
    minTime: 'Started Time',
    maxTime:'End Time'
  },

  orderModel:{
    id: 'id',
    username: 'User',
    ground:'Ground',
    status:'Order Status',
    createdTime: 'Created Time'
  },

  OrderStatus:{
    unpaid: 'Unpaid',
    paid: 'Paid',
    running: 'Running',
    finished: 'Finished',
    cancel: 'Cancel',
  },

  groundStatus:{
    free: 'free',
    occupied: 'occupied'
  },



  charts:{
    title: 'Recent Data'
  },
  avatarFunctions:{
    logout: 'logout'
  },
  gender:{
    Male: 'Male',
    Female: 'Female'
  },
  button:{
    confirm: 'Confirm',
    cancel: 'Cancel',
    create: 'Create',
    search: 'Search',
    delete: 'Delete',
    update: 'Modify'
  },
  DeleteStatus:{
    deleted: 'Negation',
    exists: 'Running'
  },
}
