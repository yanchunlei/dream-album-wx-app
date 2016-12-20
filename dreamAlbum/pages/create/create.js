let debug = true;

var app = getApp();
let pageData = {
  data:{
    next:"下一步",
    back:"上一步",
    backhidden: true,
    submodules:[],
    hiddenfooter: true,
    index:0,
    elm_fnt: false,  // 元素前面的控制view是否显示（首页不需要添加照片元素的页不显示）
    pressed: false
  },
  save: function(index){
    var that = this;
    // 点击下一步时保存数据
    let submodule = this.data.submodules[index];
    submodule.translatex = this.translatex-40
    submodule.translatey = this.translatey-40
    submodule.scalex = this.scalex
    submodule.scaley = this.scaley
    submodule.rotate = this.rotate
    // console.log(index == this.data.submodules.length-1?1:0)
    console.log(submodule);
    console.log("User album id:" + this.data.userAlbumId);
    // 上传服务器：
    if(submodule.choosed){
      wx.uploadFile({
        url: "https://api.mokous.com/wx/dream/album/common/uploadalbumpage.json",
        filePath: submodule.elesrc,
        name: 'image',
        formData: {
          id:"id",// 用户模板的id
          albumItemId :'',// 相册 某一页的id
          cssMoveX :"",
          cssMoveY :"",
          cssRotate:"",
          cssImgWidth:"",
          cssImgHeight:"",
          bgImgWidth:"",
          bgImgHeight:"",
          // 'userId': this.userId,
          // 'albumId': this.albumId,
          // 'rank': submodule.rank,
            // 'userAlbumId': "" + this.data.userAlbumId,
            // 'imgCssInfo': "",
            // 'albumItemId': "" + submodule.id,
          // 'positionX': submodule.translatex,
          // 'positionY': submodule.translatey,
          // 'rotate': submodule.rotate,
          // 'width': submodule.scalex * this.width,
          // 'height': submodule.scaley * this.height,
          // 'bgWidth': this.windowWidth-80,
          // 'bgHeight': this.windowHeight-100,
          // 'isMadeStatus': index == this.data.submodules.length-1?1:0
        },
        success: function(res){
          console.log(res);
        },
        fail: function(res){
          that.requestfailed(res);
        }
      })
    }
  },
  init:function(index){
    this.index = index;
    // init data
    let submodule = this.data.submodules[index]

    this.translatex = submodule.translatex +40;
    this.translatey = submodule.translatey +40;
    this.scalex = submodule.scalex;
    this.scaley = submodule.scaley;
    this.rotate = submodule.rotate;

    let elm_fnt = submodule.elecount>0?false:true

    this.translateXlimit = this.windowWidth - this.width * this.scalex -40;
    this.translateYlimit = this.windowHeight - this.height * this.scaley -40-60;
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
    this.anim_bg = wx.createAnimation({
      duration: 10,
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: '0 0 0'
    })
    this.anim_icon = wx.createAnimation({
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

    this.anim_bg.translate(this.bg_tr_x, this.bg_tr_y).step()

    let fnt_view_width = this.width * this.scalex;
    let fnt_view_height = this.height * this.scaley;
    let trans_x = (fnt_view_width - 30)/2
    let trans_y = (fnt_view_height- 80)/2

    this.anim_icon.translate(trans_x, trans_y).rotate(-this.rotate).step()

    // 设置数据：
    this.setData({
      index: this.index,
      backhidden: backhidden,
      animation: this.animation.export(),
      anim_icon: this.anim_icon.export(),
      anim_bg: this.anim_bg.export(),
      elm_fnt: elm_fnt,
      next: next,
      contentWidth: (this.windowWidth * 0.9)+"px",
      contentHeight: (this.windowHeight * 0.9)+"px",
      bgWidth: (this.windowWidth-80)+"px",
      bgHeight: (this.windowHeight-100)+"px",
      choosed: this.choosed
    })
  },
  requestcontinue: function(res){
    // 构建模拟数据
    res = app.globalData.mkuser

    // 处理res返回的数据
    this.albumModule = res.albumItemInfos
    this.album = res.userAlbumItemInfos

    // 获取index
    this.currentIndex = res.userAlbumInfo.step
    console.log(this.currentIndex)

    // 按处理好的数据继续操作
    let albumModule = this.albumModule;

    let album = this.album;
    function sortModule(am1, am2){
      return am1.rank - am2.rank;
    }
    if(albumModule.length >0){
      albumModule.sort(sortModule)
    }
    if(album != undefined && album.length >0){
      album.sort(sortModule)
      this.mostforward = album.length;
    }else{
      album = [];
      this.mostforward = -1;
    }

    // 循环读取 albumModule中的数据
    if(albumModule.length >0 && album.length >0){
      let i = 0
      let j = 0
      while (i< albumModule.length && j<album.length){
        let subm1 = albumModule[i]
        let subm2 = album[j]
        if(subm1.rank === subm2.rank){
          // 添加上传的图片url
          subm1.userOriginImgUrl = subm2.userOriginImgUrl
          // 添加元素图片位置信息
          subm1.editElmInfos = subm2.editImgInfos
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
    console.log("albumModule", albumModule)
    let submodules = []
    for(let amodule of albumModule){
      let submodule = {}
      submodule.bgsrc = amodule.editImgUrl;
      submodule.elesrc = amodule.userOriginImgUrl
      if(submodule.elesrc == undefined || submodule.elesrc == ""){
        submodule.elesrc = amodule.previewImgUrl
      }
      submodule.imgOriWidth = amodule.imgWidth
      submodule.imgOriHeight = amodule.imgHeight

      // 背景可编辑区域的位置信息（shadow 的位置）
      let editImgInfos = this.convertEditImgInfos(false, true, amodule.editImageInfos, submodule.imgOriWidth ,submodule.imgOriHeight)
      submodule.shadowTranslatex = editImgInfos.cssElmMoveX
      submodule.shadowTranslatey = editImgInfos.cssElmMoveY
      submodule.shadowRotate = editImgInfos.cssElmRotate
      submodule.shadowWidth = editImgInfos.cssElmWidth
      submodule.shadowHeight = editImgInfos.cssElmHeight

      if(amodule.editElmInfos != undefined){
        let elmImgInfos = this.convertEditImgInfos(false, true, amodule.editElmInfos, submodule.imgOriWidth, submodule.imgOriHeight)
        submodule.elmTranslatex = elmImgInfos.cssElmMoveX
        submodule.elmTranslatey = elmImgInfos.cssElmMoveY
        submodule.elmRotate = elmImgInfos.cssElmRotate
        submodule.elmWidth = elmImgInfos.cssElmWidth
        submodule.elmHeight = elmImgInfos.cssElmHeight
      }else{
        submodule.elmTranslatex = submodule.cssElmMoveX
        submodule.elmTranslatey = submodule.cssElmMoveY
        submodule.elmRotate = submodule.cssElmRotate
        submodule.elmWidth = submodule.cssElmWidth
        submodule.elmHeight = submodule.cssElmHeight
      }


      submodule.scalex = editImgInfos.width / this.width
      submodule.scaley = editImgInfos.height / this.height
      submodule.rank = amodule.rank
      submodule.elecount = amodule.editCount
      submodule.choosed = false;
      submodule.id = amodule.id
      submodules.push(submodule)
    }

    this.setData({
      submodules: submodules,
      userAlbumId: res.data.userAlbumInfo.id
    })
    // this.loadStorage();
    this.init(this.currentIndex)
    wx.hideToast()
  },
  beforeInit: function(option){
    console.log("beforeInit", option)
    // 读取传入和本地数据
    this.albumId = option.albumId;
    this.userId = wx.getStorageSync('userId');

    // this.currentIndex (step)直接取线上数据，不保留本地
    // this.currentIndex = wx.getStorageSync("currentIndex")||0

    this.width = 300;
    this.height = 200;
    this.windowWidth = app.globalData.windowWidth;
    this.windowHeight = app.globalData.windowHeight;
    //设置bg图片的位置 周围的预留边界
    this.margin_top = 40;
    this.margin_left = 40;
    this.margin_right = 40;
    this.margin_bottom = 60;
    this.bg_tr_x = this.margin_left
    this.bg_tr_y = this.margin_top
  },
  requestfailed: function(res){
    wx.showModal({
      title:"提示",
      content: "网络错误，请稍后再试！"
    })
    wx.hideToast()
  },
  convertEditImgInfos: function(is2Ori,needConvert2Obj, editImgInfos, oriBgWidth, oriBgHeight){
    // is2Ori: true:phone size 转换 ori size; false: ori size 转换为phone size
    // needConvert2Obj: true: 传入的editImgInfos为字符串，需转换为obj对象，否则不需要
    if(needConvert2Obj){
      editImgInfos = JSON.parse(editImgInfos)
    }
    let bgPhWidth = this.windowWidth - this.margin_left - this.margin_right
    let bgPhHeight = this.windowHeight - this.margin_top - this.margin_bottom
    let scalex = oriBgWidth / bgPhWidth
    let scaley = oriBgHeight/ bgPhHeight
    let newEII = {}
    if(is2Ori){
        newEII.cssElmWidth = editImgInfos.cssElmWidth * scalex
        newEII.cssElmHeight = editImgInfos.cssElmHeight *scaley
        newEII.cssElmMoveX = editImgInfos.cssElmMoveX * scalex
        newEII.cssElmMoveY = editImgInfos.cssElmMoveY * scaley
    }else{
        newEII.cssElmWidth = editImgInfos.cssElmWidth / scalex
        newEII.cssElmHeight = editImgInfos.cssElmHeight /scaley
        newEII.cssElmMoveX = editImgInfos.cssElmMoveX / scalex
        newEII.cssElmMoveY = editImgInfos.cssElmMoveY / scaley
    }
  }
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
  //Modify TODO
    wx.request({
      url: "http://10.1.0.121:8080/dream-album/dream/album/common/startmakeuseralbum.json",
      data:{
        albumId: this.albumId,
        userId: this.userId
      },
      success:function(res){
        console.log("success", res)
        if(debug){return}
        that.requestcontinue(res)
      },
      fail:function(res){
        console.log("failed", res)
        if(debug){return}
        that.requestfailed(res)
      },
      complete: function(res){
        console.log("complete", res)
        if(!debug){return}
        that.requestcontinue(res)
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
        that.data.submodules[index].userImg = res.tempFilePaths[0]
        that.data.submodules[index].choosed = true
        that.setData({
          submodules: that.data.submodules,
          choosed: that.choosed
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
      });
      return;
    }
    let index = this.data.index;
    let length = this.data.submodules.length;

    this.save(index)
    if(index <length-1){
      this.init(++index)
    }else{
      let ok = true;
      for(let submodule of this.data.submodules){
        if((!submodule.choosed) && submodule.elecount >0){
          ok = false
          wx.showModal({
            title:"提示",
            content:"制作未完成，您有模板页未上传图片"
          })
        }
      }
      if(ok){
        wx.showModal({
          title:"提示",
          content:"制作完成，请返回个人中心查看相册"
        })
      }
    }
  },
  back: function(e){
    let index = this.data.index;
    if(index >0){
      this.init(--index)
    }

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
    // console.log("Move img");
    // touch step 用于间隔tap和 touch
    this.lasttouchstap = Date.parse(new Date())

    let p0 = e.touches[0]
    let tmp0x = p0.pageX - this.p0.pageX - this.lastx;
    let tmp0y = p0.pageY -  this.p0.pageY - this.lasty;
    this.lastx = p0.pageX - this.p0.pageX
    this.lasty = p0.pageY - this.p0.pageY

    if(this.translate){
      console.log("translate");
      this.translatex += tmp0x;
      this.translatey += tmp0y;
      if(this.translatex > this.translateXlimit){
        this.translatex = this.translateXlimit;
      }
      if(this.translatex < this.bg_tr_x){
        this.translatex = this.bg_tr_x;
      }

      if(this.translatey > this.translateYlimit){
        this.translatey = this.translateYlimit;
      }
      if(this.translatey < this.bg_tr_y){
        this.translatey = this.bg_tr_y;
      }


      this.animation.translate(this.translatex, this.translatey).step();

    }else if(this.scale){
      console.log("scale");
      // let p1 = e.touches[1]
      // this.tmpscalex =this.scalex * (p1.pageX - p0.pageX)/(this.p1.pageX - this.p0.pageX)
      // this.tmpscaley =this.scaley * (p1.pageY - p0.pageY)/(this.p1.pageY - this.p0.pageY)
      // let scalerate = (this.tmpscalex + this.tmpscaley)/2
      // if(scalerate * this.width > this.scalelimit){
      //   this.animation.scale(this.tmpscalex, this.tmpscaley).step();
      // }

      // let ang1 = this.angle(p0, p1)

      // let ang2 = this.angle(this.p0, this.p1)
      // this.tmprotate =this.rotate+ ang1-ang2
      // this.animation.rotate(this.tmprotate).step();

    }
    // console.log(this.animation.export());
    this.setData({
      animation:this.animation.export()
    })
  },
  onHide:function(){
    // wx.getStorageSync("currentIndex", this.currentIndex)
  },
  onUnload:function(){
    // wx.getStorageSync("currentIndex", this.currentIndex)
  }
}
Page(pageData)
