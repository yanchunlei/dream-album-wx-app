let pageData = {
  data:{
    next:"下一步",
    bgimgs:[
      "https://raw.githubusercontent.com/yanchunlei/res/master/crs/crs_1.png",
      "https://raw.githubusercontent.com/yanchunlei/res/master/crs/crs_2.png",
      "https://raw.githubusercontent.com/yanchunlei/res/master/crs/crs_3.png",
      "https://raw.githubusercontent.com/yanchunlei/res/master/crs/crs_4.png"],
    eleimgs:[
      "https://raw.githubusercontent.com/yanchunlei/res/master/ele/start0.png",
      "https://raw.githubusercontent.com/yanchunlei/res/master/ele/start1.png",
      "https://raw.githubusercontent.com/yanchunlei/res/master/ele/start2.png",
      "https://raw.githubusercontent.com/yanchunlei/res/master/ele/start3.png"],
    index : 0,
    length: 4,
    hiddenfooter: false
  },
  init:function(index){
    this.index = index;
    // init data
    this.translatex = 42;
    this.translatey = 100;
    this.scalex = 1;
    this.scaley = 1;
    this.width = 300;
    this.height = 200;
    this.translateXlimit = 375 - this.width;
    this.translateYlimit = 650 - this.height;
    this.scalelimit = 150;

    // touchstap, 用于间隔tap和touch时间
    this.lasttouchstap = Date.parse(new Date())
    // 用于在点击下一步时判断是否已经选择了照片
    this.choosed = false;

    // 设置数据：
    this.setData({
      index: this.index
    })
  },
  onLoad: function(options){
    this.init(0)
    this.animation = wx.createAnimation({
      duration: 10,
      timingFunction: 'linear', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
      delay: 0,
      transformOrigin: '50% 50% 0'
    })
    this.animation.translate(this.translatex, this.translatey)
    .scale(this.scalex, this.scaley).step();
    this.setData({
      animation:this.animation.export()
    })
  },
  onReady: function(){

  },
  chooseImage: function(e){
    let timestap = Date.parse(new Date());
    console.log(timestap, this.lasttouchstap)
    if(timestap - this.lasttouchstap < 100){
      return
    }
    var that = this;
    let eleimgs = that.data.eleimgs;
    let index = this.data.index;
    wx.chooseImage({
      sizeType:["original","compressed"],
      scourceType:["album","camera"],
      success: function(res){
        console.log(res)
        that.choosed = true;
        eleimgs[index] = res.tempFilePaths[0]
        that.setData({
          eleimgs: eleimgs
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
    let length = this.data.length;
    if(index <length-1){
      this.init(index+1)
    }
    if(index == length-1){
      this.setData({
        next: "制作"
      })
    }


  },
  touchstart: function(e){
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

      console.log(this.translatex, this.translatey)
      this.animation.translate(this.translatex, this.translatey).step();

    }else if(this.scale){
      let p1 = e.touches[1]
      let scalex = (p1.pageX - p0.pageX)/(this.p1.pageX - this.p0.pageX)
      let scaley = (p1.pageY - p0.pageY)/(this.p1.pageY - this.p0.pageY)
      let scalerate = (scalex + scaley)/2
      if(scalerate * this.width > this.scalelimit){
        this.animation.scale((scalex+scaley)/2).step();
      }
    }
    this.setData({
      animation:this.animation.export()
    })
  }
}
Page(pageData)
