var app=getApp();
Page({
  data:{
    items:[],
    winHeight:0,
    winWidth:0,
    start:0,
    size:10,
    nomore:false
  },
  previewImage:function(e){
    //进入预览页面
    wx.navigateTo({
      url:'../viewswiper/viewswiper?albumId='+e.currentTarget.dataset.albumid
     })
  },
  confirmUploadImage: function(e, tempFilePaths){
    console.log(e,tempFilePaths)
    let uploadfailed = false
    let that = this
    for(let i =0; i<tempFilePaths.length && !uploadfailed; i++){
      wx.uploadFile({
        url: app.globalData.serverHost + "/dream/album/common/uploaduserimg.json",
        filePath: tempFilePaths[i],
        name: 'image',
        formData: {
          'userId': this.userId,
          'albumId': e.currentTarget.dataset.albumid,
          'rank':i,
          'complete': i===tempFilePaths.length-1?1:0
        },
        success: function (res) {
          wx.hideToast()
          if (i === tempFilePaths.length-1){
            wx.redirectTo({
              url: '../viewswiper/viewswiper?userAlbumId=' + res.userAlbumId
            })
          }
        },
        fail: function (res) {
          that.requestFailed(res);
          uploadfailed = true
        }
      })
    }
  },
  createImage:function(e){
    let that = this
    wx.chooseImage({
      count: e.currentTarget.dataset.totalitems,
      success: function(res){
        console.log(res)
        if(res.tempFilePaths.length < e.currentTarget.dataset.totalitems){
          wx.showModal({
            title:"提示",
            content: "该相册可以上传"+e.currentTarget.dataset.totalitems+"张照片，您选中"+res.tempFilePaths.length+"张 确认是否上传",
            success: function(rescfm){
              if(rescfm.confirm){
                that.confirmUploadImage(e, res.tempFilePaths)
              }else{
                that.createImage(e)
              }
            }
          })
        }else{
          that.confirmUploadImage(e, res.tempFilePaths)
        }
      }
    })
  },
  onLoad:function(options){
    this.userId = wx.getStorageSync('userId');
    let that=this;
    that.setData({
      winWidth:app.globalData.windowWidth,
      winHeight:app.globalData.windowHeight
    })
   this.search();
  },
  requestFailed: function(res){
    wx.showModal({
      title:"提示",
      content: "网络错误，请稍后再试！"
    }),
    wx.hideToast()
  },
  onPullDownRefresh:function(){
    this.refreshData();
    wx.stopPullDownRefresh();
  },
  refreshData:function(){
    let that=this;
    this.setData({
      start:0,
      size:that.data.size,
      items:[],
      nomore:false
    })
    this.search();
  },
  moreData:function(){
    this.search();
  },
  search(){
    let that=this;
    if(that.data.nomore){
      return;
    }
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 5000
    });
    wx.request({
      url: app.globalData.serverHost+'dream/album/common/homepage.json',
      data: {
        size:that.data.size,
        start:that.data.start
      },
      method: 'GET',
      success: function(res){
        console.log(res)
        that.setData({
          items:that.data.items.concat(res.data.albumList),
          start:that.data.start+res.data.albumList.length,
        });
        if(res.data.albumList.length<that.data.size){
          that.setData({
            nomore:true
          })
        }
        console.log("Finish load album list.");
        wx.hideToast();
      },
      fail: function(res){
        that.requestFailed(res)
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
