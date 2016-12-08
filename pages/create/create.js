let debug = true;

var app = getApp();
let pageData = {
  data:{
    next:"下一步",
    back:"返回",
    backhidden: true,
    submodules:[],
    hiddenfooter: true,
    index:0,
    elm_fnt: false,  // 元素前面的控制view是否显示（首页不需要添加照片元素的页不显示）
    pressed: false
  },
  save: function(index){
    // 点击下一步时保存数据
    let submodule = this.data.submodules[index];
    submodule.translatex = this.translatex
    submodule.translatey = this.translatey
    submodule.scalex = this.scalex
    submodule.scaley = this.scaley
    submodule.rotate = this.rotate


    // 上传服务器：
    wx.uploadFile({
      url:"http://10.1.1.197:8080/dream-album/dream/album/common/uploadalbumpage.json",
      filePath: submodule.elesrc,
      name:'image',
      formData:{
        userId:this.albumId,
        albumId:1,
        rank:index,
        positionX: this.translatex,
        positionY: this.translatey,
        rotate:this.rotate,
        width:this.scalex * this.width,
        height:this.scaley * this.height
      },
      success: function(res){
        console.log(res)
      }
    })
  },
  init:function(index){
    this.index = index;
    // init data
    let submodule = this.data.submodules[index]

    this.translatex = submodule.translatex;
    this.translatey = submodule.translatey;
    this.scalex = submodule.scalex;
    this.scaley = submodule.scaley;
    this.rotate = submodule.rotate;

    let elm_fnt = submodule.elecount>0?false:true

    this.translateXlimit = 375 - this.width * this.scalex;
    this.translateYlimit = 650 - this.height * this.scaley;
    this.scalelimit = 150;

    // touchstap, 用于间隔tap和touch时间
    this.lasttouchstap = Date.parse(new Date())
    // 用于在点击下一步时判断是否已经选择了照片

    this.choosed = elm_fnt || this.mostforward >=index

    this.animation = wx.createAnimation({
      duration: 10,
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: '0 0 0'
    })
    this.animation.translate(this.translatex, this.translatey)
    .scale(this.scalex, this.scaley).rotate(this.rotate).step();

    let backhidden = true;
    if(index >0){
      backhidden = false;
    }

    let length = this.data.submodules.length;
    let next = this.data.next;
    if(index == length-1){
      next= "制作"
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
  requestcontinue: function(request_from, res){

    if(request_from === 'getalbum'){
      this.getalbum = true
    }
    if(request_from === 'startmakeuseralbum'){
      this.startmakeuseralbum = true
    }
    if(this.getalbum && this.startmakeuseralbum){

      let albumModule = app.globalData.moduleobj;

      let album = {}
      function sortModule(am1, am2){
        return am1.rank - am2.rank
      }
      if(albumModule.hasOwnProperty(submodules)){
        albumModule.submodules.sort(sorModule)
      }
      if(album.hasOwnProperty(submodules)){
        album.submodules.sort(sorModule)
        this.mostforward = album.submodules.length;
      }else{
        this.mostforward = -1;
        this.currentIndex = 0;
      }
      // 循环读取 albumModule中的数据
      let submodules = []
      if(albumModule.hasOwnProperty(submodules) && album.hasOwnProperty(submodules)){
        let i = 0
        let j = 0
        while (i< albumModule.submodules.length && j<album.submodules.length){
          let subm1 = albumModule.submodules[i]
          let subm2 = album.submodules[j]
          if(subm1.rank === subm2.rank){
            subm1.userOriginImgUrl = subm2.userOriginImgUrl
            subm1.editImageInfos = subm2.editImageInfos
            i++
            j++
          }
          if(subm1.rank < subm2.rank){
            i++
          }
          if(subm1.rank > subm2.rank){
            j++
          }
        }
      }
      for(let amodule of albumModule.submodules){
        let submodule = {}
        submodule.bgsrc = amodule.editImgUrl;
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

      // this.loadStorage();
      this.init(this.currentIndex)
      wx.hideToast()
    }
  },
  beforeInit: function(option){
    this.albumId = option.id;
    this.userId = wx.getStorageSync('userId');
    this.currentIndex = wx.getStorageSync("currentIndex")||0
    this.width = 300;
    this.height = 200;
  },
  onLoad: function(option){
    // let optionId = "abc";
    this.beforeInit(option)
    let that = this;
    wx.showToast({
      title: "加载中",
      icon: 'loading',
      duration: 10000
    })
    this.getalbum = false
    this.startmakeuseralbum = false
    wx.request({
      url:"http://10.1.1.197:8080/dream-album/dream/album/common/getalbum.json",
      data:{
        id:this.albumId
      },
      success:function(res){
        console.log(res);
      },
      fail: function(res){
        console.log(res);
      },
      complete: function(res){
        console.log(res);
        if(!debug){return}
        that.requestcontinue("getalbum", res)
      }
    })

    wx.request({
      url: "http://10.1.1.197:8080/dream-album/dream/album/common/startmakeuseralbum.json",
      data:{
        userId: this.albumId,
        albumId: this.userId
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
        that.requestcontinue("startmakeuseralbum", res)
      }
    })
  },
  onReady: function(){

  },
  chooseImage: function(e){
    let timestap = Date.parse(new Date());

    if(timestap - this.lasttouchstap < 100){
      return
    }
    let that = this;
    let index = this.data.index;
    wx.chooseImage({
      sizeType:["original","compressed"],
      scourceType:["album","camera"],
      success: function(res){
        that.choosed = true;
        that.mostforward = index > that.mostforward? index: that. mostforward
        that.data.submodules[index].elesrc = res.tempFilePaths[0]
        that.setData({
          submodules: that.data.submodules
        })
      }
    })
  },
  next: function(e){
    if(!this.choosed){
      wx.showModal({
        title:"提示",
        content: "请先选择照片",
        success:function(res){}
      })
      return
    }
    let index = this.data.index;
    let length = this.data.submodules.length;

    this.save(index)
    if(index <length-1){
      this.init(++index)
    }
  },
  back: function(e){
    let index = this.data.index;
    this.init(--index)

  },
  touchstart: function(e){
    this.setData({
      pressed: true
    })
    this.translate = false;
    this.scale = false;
    if(e.touches.length == 1){
      this.translate = true;
      this.p0 = e.touches[0];
      this.lastx = 0;
      this.lasty = 0;

    }else if(e.touches.length >1){
      this.scale = true;
      this.p0 = e.touches[0];
      this.p1 = e.touches[1];
    }
  },
  touchend: function(e){
    this.translate = false;
    this.scale = false;

    this.rotate = this.tmprotate == undefined? this.rotate: this.tmprotate;
    this.scalex = this.tmpscalex == undefined? this.scalex: this.tmpscalex;
    this.scaley = this.tmpscaley == undefined? this.scaley: this.tmpscaley;
    this.tmprotate = undefined
    this.tmpscalex = undefined
    this.tmpscaley = undefined

    this.setData({
      pressed: false
    })
  },
  angle: function(start,end){
    let diff_x = end.pageX - start.pageX
    let diff_y = end.pageY - start.pageY
    return 360 * Math.atan(diff_y/diff_x)/(2*Math.PI);
  },
  touchmove: function(e){
    // touch step 用于间隔tap和 touch
    this.lasttouchstap = Date.parse(new Date())

    let p0 = e.touches[0]
    let tmp0x = p0.pageX - this.p0.pageX - this.lastx;
    let tmp0y = p0.pageY -  this.p0.pageY - this.lasty;
    this.lastx = p0.pageX - this.p0.pageX
    this.lasty = p0.pageY - this.p0.pageY

    if(this.translate){
      this.translatex += tmp0x;
      this.translatey += tmp0y;
      if(this.translatex > this.translateXlimit){
        this.translatex = this.translateXlimit;
      }
      if(this.translatex < 0){
        this.translatex = 0;
      }
      if(this.translatey > this.translateYlimit){
        this.translatey = this.translateYlimit;
      }
      if(this.translatey < 0){
        this.translatey = 0;
      }


      this.animation.translate(this.translatex, this.translatey).step();

    }else if(this.scale){
      let p1 = e.touches[1]
      this.tmpscalex =this.scalex * (p1.pageX - p0.pageX)/(this.p1.pageX - this.p0.pageX)
      this.tmpscaley =this.scaley * (p1.pageY - p0.pageY)/(this.p1.pageY - this.p0.pageY)
      let scalerate = (this.tmpscalex + this.tmpscaley)/2
      if(scalerate * this.width > this.scalelimit){
        this.animation.scale(this.tmpscalex, this.tmpscaley).step();
      }

      let ang1 = this.angle(p0, p1)

      let ang2 = this.angle(this.p0, this.p1)
      this.tmprotate =this.rotate+ ang1-ang2
      this.animation.rotate(this.tmprotate).step();

    }
    this.setData({
      animation:this.animation.export()
    })
  },
  onHide:function(){
    wx.getStorageSync("currentIndex", this.currentIndex)
  },
  onUnload:function(){
    wx.getStorageSync("currentIndex", this.currentIndex)
  }
}
Page(pageData)
