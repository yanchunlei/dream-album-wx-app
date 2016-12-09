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
    windowWidth: 375,
    windowHeight: 625,
    moduleobj:{
      title:"圣诞模板",
      submodules:[{
        "status": 0,
        "updateTime": "2016-12-06 19:08:07",
        "createTime": "2016-12-06 19:08:08",
        "id": 4,
        "albumId": 1,
        "editImgUrl": "http://10.1.1.197:8080/dream-album/images/1/detail/4.png",
        "previewImgUrl": "http://10.1.1.197:8080/dream-album/images/1/detail/4.png",
        "rank": 4,
        "editImgInfos": {width:240, height: 200, scale: 1, rotate: 3, positionX: 40, positionY: 110},
        "editTextInfos": "{}",
        "ok": true,
        "del": false
    },
    {
        "status": 0,
        "updateTime": "2016-12-06 19:07:45",
        "createTime": "2016-12-06 19:07:46",
        "id": 3,
        "albumId": 1,
        "editImgUrl": "http://10.1.1.197:8080/dream-album/images/1/detail/3.png",
        "previewImgUrl": "http://10.1.1.197:8080/dream-album/images/1/detail/3.png",
        "rank": 3,
        "editImgInfos": {width:240, height: 200, scale: 1, rotate: 4, positionX: 42, positionY: 100},
        "editTextInfos": "{}",
        "ok": true,
        "del": false
    },
    {
        "status": 0,
        "updateTime": "2016-12-06 19:07:25",
        "createTime": "2016-12-06 19:07:27",
        "id": 2,
        "albumId": 1,
        "editImgUrl": "http://10.1.1.197:8080/dream-album/images/1/detail/2.png",
        "previewImgUrl": "http://10.1.1.197:8080/dream-album/images/1/detail/2.png",
        "rank": 2,
        "editImgInfos": {width:240, height: 200, scale: 1, rotate: 4, positionX: 42, positionY: 100},
        "editTextInfos": "{}",
        "ok": true,
        "del": false
    }]
    }
  }
})
