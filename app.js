//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let that = this
    wx.getSystemInfo({
      success: function(res){
        that.globalData.windowWidth = res.windowWidth;
        that.globalData.windowHeight = res.windowHeight;
      }
    })
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    windowWidth: 0,
    windowHeight: 0,
    moduleobj:{
      title:"圣诞模板",
      submodules:[{
        bgsrc:"https://raw.githubusercontent.com/yanchunlei/res/master/crs/crs_1.png",
        elesrc:"https://raw.githubusercontent.com/yanchunlei/res/master/ele/start0.png",
        elecount: 1,
        translatex:42,
        translatey:100,
        rotate:10,
        scale:1
      },{
        bgsrc:"https://raw.githubusercontent.com/yanchunlei/res/master/crs/crs_2.png",
        elesrc:"https://raw.githubusercontent.com/yanchunlei/res/master/ele/start1.png",
        elecount: 1,
        translatex:42,
        translatey:100,
        rotate:4,
        scale:1
      }
      ,{
        bgsrc:"https://raw.githubusercontent.com/yanchunlei/res/master/crs/crs_3.png",
        elesrc:"https://raw.githubusercontent.com/yanchunlei/res/master/ele/start2.png",
        elecount: 1,
        translatex:42,
        translatey:100,
        rotate:5,
        scale:1
      }]
    }
  }
})
