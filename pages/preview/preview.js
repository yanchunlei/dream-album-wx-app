let debug = true;
var app = getApp();

let pageData = {
  data:{
    next:"下一步",
    back:"返回",
    backhidden: true,
    submodules:[],
    hiddenfooter: false,
    elm_fnt: true
  },
  init:function(index){
    this.index = index;
    // init data
    let submodule = this.data.submodules[index]
    console.log(submodule, index)
    this.translatex = submodule.translatex;
    this.translatey = submodule.translatey;
    this.scalex = submodule.scale;
    this.scaley = submodule.scale;
    let elm_fnt = true

    // touchstap, 用于间隔tap和touch时间
    this.lasttouchstap = Date.parse(new Date())
    this.choosed = true;

    this.animation = wx.createAnimation({
      duration: 10,
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: '0 0 0'
    })
    this.animation.translate(this.translatex, this.translatey)
    .scale(this.scalex, this.scaley).step();

    let backhidden = true;
    if(index >0){
      backhidden = false;
    }

    let length = this.data.submodules.length;
    let next = this.data.next;
    if(index == length-1){
      next= "制作"
      if(this.showonly){
        next = "完成"
      }
    }else{
      next="下一步"
    }

    // 设置数据：
    this.setData({
      index: this.index,
      backhidden: backhidden,
      animation:this.animation.export(),
      elm_fnt: elm_fnt,
      next: next
    })
  },
  requestcontinue: function(res){

    let albumModule = app.globalData.moduleobj;

    function sortModule(am1, am2){
      return am1.rank - am2.rank
    }
    if(albumModule.hasOwnProperty(submodules)){
      albumModule.submodules.sort(sorModule)
    }
    // 循环读取 albumModule中的数据
    let submodules = []
    for(let amodule of albumModule.submodules){
      let submodule = {}
      submodule.bgsrc = amodule.previewImgUrl;
      submodule.elesrc = amodule.userOriginImgUrl
      submodule.translatex = amodule.editImgInfos.positionX
      submodule.translatey = amodule.editImgInfos.positionY
      submodule.rotate = amodule.editImgInfos.rotate
      submodule.width = amodule.editImgInfos.width
      submodule.height = amodule.editImgInfos.height

      submodule.scalex = amodule.editImgInfos.width / this.width
      submodule.scaley = amodule.editImgInfos.height / this.height
      submodule.rank = amodule.rank
      submodule.elecount = 1
      submodules.push(submodule)
    }

    this.setData({
      submodules: submodules
    })

    this.init(0)
    wx.hideToast()

  },
  beforeInit: function(option){
    this.albumId = option.id;
    this.userId = wx.getStorageSync('userId');
    this.width = 300;
    this.height = 200;

    // showonly = true 查看相册，showonly = false 预览相册
    let showonly = option.showonly
    // console.log(showonly)
    if(showonly == "true"){
      this.showonly = true
      this.setData({
        hiddenfooter: true
      })
    }

  },
  onLoad: function(option){

    this.beforeInit(option)
    let that = this;
    wx.showToast({
      title: "加载中",
      icon: 'loading',
      duration: 10000
    })

    let optionId = "moduleid";
    this.optionId = optionId;
    let albumUrl = "http://10.1.1.197:8080/dream-album/dream/album/common/getalbum.json"
    wx.request({
      url: albumUrl,
      data:{
        id: optionId
      },
      success:function(res){
        console.log(res)
      },
      fail:function(res){
        console.log(res)
      },
      complete: function(res){
        console.log(res)
        if(!debug){return}
        that.requestcontinue(res)
      }
    })

  },
  onReady: function(){

  },
  chooseImage: function(e){
  },
  back: function(e){
    let index = this.data.index;
    this.init(--index)

  },
  next: function(e){

    let index = this.data.index;
    let length = this.data.submodules.length;
    // console.log("1",index, length)
    if(index <length-1){
      this.init(index+1)
    }
    // console.log("2",index, length)
    if(index == length -1 && (!this.showonly)){
      this.gocreate(e)
    }

  },
  touchstart: function(e){

  },
  touchend: function(e){

  },
  touchmove: function(e){

  },
  gocreate: function(e){
    wx.navigateTo({
      url:"../create/create?optionId="+this.optionId
    })

  }
}
Page(pageData)
