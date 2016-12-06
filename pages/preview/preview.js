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
    // console.log(this.data.submodules)
    this.index = index;
    // init data
    let submodule = this.data.submodules[index]
    this.translatex = submodule.translatex;
    this.translatey = submodule.translatey;
    this.scalex = submodule.scale;
    this.scaley = submodule.scaley;
    let elm_fnt = true


    // touchstap, 用于间隔tap和touch时间
    this.lasttouchstap = Date.parse(new Date())
    this.choosed = true;

    this.animation = wx.createAnimation({
      duration: 10,
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: '50% 50% 0'
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
  onLoad: function(option){

    let showonly = option.showonly
    console.log(showonly)
    if(showonly == "true"){
      this.showonly = true
      this.setData({
        hiddenfooter: true
      })
    }

    let optionId = "moduleid";
    this.optionId = optionId;
    let that = this;
    wx.request({
      url: "test.php",
      data:{
        optionId: optionId
      },
      success:function(res){

      },
      fail:function(res){

      },
      complete: function(res){
        if(!debug){return}

        let resobj = app.globalData.moduleobj;
        that.setData({
          submodules: resobj.submodules
        })
      }
    })
    this.init(0)

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
