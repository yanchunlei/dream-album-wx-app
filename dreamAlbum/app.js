//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
   //wx.clearStorageSync();
   let that = this
   wx.getSystemInfo({
     success: function(res){
       that.globalData.windowWidth = res.windowWidth;
       that.globalData.windowHeight = res.windowHeight;
     }
   })
  },
  globalData:{
    windowWidth: 375,
    windowHeight: 625,
    mkuser:{
        "userAlbumInfo": {
            "status": 0,
            "updateTime": "2016-12-12 13:20:03",
            "createTime": "2016-12-09 17:12:58",
            "id": 2,
            "userId": 2,
            "albumId": 1,
            "step": 4,
            "complete": 0,
            "priviewImg": "/Users/liuxinglong/Desktop/test3.png",
            "del": false,
            "ok": true
        },
        "albumItemInfos": [
            {
                "status": 0,
                "updateTime": "2016-12-12 13:21:11",
                "createTime": "2016-12-06 19:06:57",
                "id": 1,
                "albumId": 1,
                "editImgUrl": "http://10.1.1.197:8080/dream-album/images/1/detail/page.png",
                "previewImgUrl": "http://10.1.1.197:8080/dream-album/images/1/detail/page.png",
                "imgWidth": 750,
                "imgHeight": 1330,
                "rank": 0,
                "editCount": 0,
                "editImgInfos": "{\"cssElmWidth\": 240,\"cssElmHeight\": 240,\"cssElmMoveX\": 240,\"cssElmMoveY\": 240,\"cssElmRotate\": 4}",
                "editTextInfos": "{}",
                "del": false,
                "ok": true
            },
            {
                "status": 0,
                "updateTime": "2016-12-12 13:21:13",
                "createTime": "2016-12-06 19:06:57",
                "id": 2,
                "albumId": 1,
                "editImgUrl": "http://10.1.1.197:8080/dream-album/images/1/detail/1.png",
                "previewImgUrl": "http://10.1.1.197:8080/dream-album/images/1/detail/1.png",
                "imgWidth": 750,
                "imgHeight": 1330,
                "rank": 1,
                "editCount": 1,
                "editImgInfos": "{\"cssElmWidth\": 240,\"cssElmHeight\": 240,\"cssElmMoveX\": 240,\"cssElmMoveY\": 240,\"cssElmRotate\": 4}",
                "editTextInfos": "{}",
                "del": false,
                "ok": true
            },
            {
                "status": 0,
                "updateTime": "2016-12-12 13:21:14",
                "createTime": "2016-12-06 19:07:27",
                "id": 3,
                "albumId": 1,
                "editImgUrl": "http://10.1.1.197:8080/dream-album/images/1/detail/2.png",
                "previewImgUrl": "http://10.1.1.197:8080/dream-album/images/1/detail/2.png",
                "imgWidth": 750,
                "imgHeight": 1330,
                "rank": 2,
                "editCount": 1,
                "editImgInfos": "{\"cssElmWidth\": 240,\"cssElmHeight\": 240,\"cssElmMoveX\": 240,\"cssElmMoveY\": 240,\"cssElmRotate\": 4}",
                "editTextInfos": "{}",
                "del": false,
                "ok": true
            },
            {
                "status": 0,
                "updateTime": "2016-12-12 13:21:15",
                "createTime": "2016-12-06 19:07:46",
                "id": 4,
                "albumId": 1,
                "editImgUrl": "http://10.1.1.197:8080/dream-album/images/1/detail/3.png",
                "previewImgUrl": "http://10.1.1.197:8080/dream-album/images/1/detail/3.png",
                "imgWidth": 750,
                "imgHeight": 1330,
                "rank": 3,
                "editCount": 1,
                "editImgInfos": "{\"cssElmWidth\": 240,\"cssElmHeight\": 240,\"cssElmMoveX\": 240,\"cssElmMoveY\": 240,\"cssElmRotate\": 4}",
                "editTextInfos": "{}",
                "del": false,
                "ok": true
            },
            {
                "status": 0,
                "updateTime": "2016-12-12 13:21:16",
                "createTime": "2016-12-06 19:08:08",
                "id": 5,
                "albumId": 1,
                "editImgUrl": "http://10.1.1.197:8080/dream-album/images/1/detail/4.png",
                "previewImgUrl": "http://10.1.1.197:8080/dream-album/images/1/detail/4.png",
                "imgWidth": 750,
                "imgHeight": 1330,
                "rank": 4,
                "editCount": 1,
                "editImgInfos": "{\"cssElmWidth\": 240,\"cssElmHeight\": 240,\"cssElmMoveX\": 240,\"cssElmMoveY\": 240,\"cssElmRotate\": 4}",
                "editTextInfos": "{}",
                "del": false,
                "ok": true
            }
        ],
        "userAlbumItemInfos": [
            {
                "status": 0,
                "updateTime": "2016-12-09 18:34:17",
                "createTime": "2016-12-09 17:09:51",
                "id": 14,
                "userAlbumId": 2,
                "albumId": 1,
                "albumItemId": 0,
                "userOriginImgUrl": "http://10.1.1.197:8080/dream-album/images/1/detail/page.png",
                "previewImgUrl": "http://10.1.1.197:8080/dream-album/images/1/detail/page.png",
                "rank": 0,
                "editImgInfos": "{\"cssElmWidth\": 240,\"cssElmHeight\": 240,\"cssElmMoveX\": 240,\"cssElmMoveY\": 240,\"cssElmRotate\": 4}",
                "editTextInfos": null,
                "del": false,
                "ok": true
            },
            {
                "status": 0,
                "updateTime": "2016-12-09 18:38:12",
                "createTime": "2016-12-09 17:09:56",
                "id": 15,
                "userAlbumId": 2,
                "albumId": 1,
                "albumItemId": 0,
                "userOriginImgUrl": "http://10.1.1.197:8080/dream-album/images/made/album_1481279891754.png",
                "previewImgUrl": "http://10.1.1.197:8080/dream-album/images/made/album_pre_1481279891754.png",
                "rank": 1,
                "editImgInfos": "{\"cssElmWidth\": 240,\"cssElmHeight\": 240,\"cssElmMoveX\": 240,\"cssElmMoveY\": 240,\"cssElmRotate\": 4}",
                "editTextInfos": null,
                "del": false,
                "ok": true
            },
            {
                "status": 0,
                "updateTime": "2016-12-09 18:38:16",
                "createTime": "2016-12-09 17:10:06",
                "id": 16,
                "userAlbumId": 2,
                "albumId": 1,
                "albumItemId": 0,
                "userOriginImgUrl": "http://10.1.1.197:8080/dream-album/images/made/album_1481279896003.png",
                "previewImgUrl": "http://10.1.1.197:8080/dream-album/images/made/album_pre_1481279896003.png",
                "rank": 2,
                "editImgInfos": "{\"cssElmWidth\": 240,\"cssElmHeight\": 240,\"cssElmMoveX\": 240,\"cssElmMoveY\": 240,\"cssElmRotate\": 4}",
                "editTextInfos": null,
                "del": false,
                "ok": true
            },
            {
                "status": 0,
                "updateTime": "2016-12-09 18:38:19",
                "createTime": "2016-12-09 17:10:15",
                "id": 17,
                "userAlbumId": 2,
                "albumId": 1,
                "albumItemId": 0,
                "userOriginImgUrl": "http://10.1.1.197:8080/dream-album/images/made/album_1481279899636.png",
                "previewImgUrl": "http://10.1.1.197:8080/dream-album/images/made/album_pre_1481279899636.png",
                "rank": 3,
                "editImgInfos": "{\"cssElmWidth\": 240,\"cssElmHeight\": 240,\"cssElmMoveX\": 240,\"cssElmMoveY\": 240,\"cssElmRotate\": 4}",
                "editTextInfos": null,
                "del": false,
                "ok": true
            },
            {
                "status": 0,
                "updateTime": "2016-12-09 18:38:23",
                "createTime": "2016-12-09 17:10:21",
                "id": 18,
                "userAlbumId": 2,
                "albumId": 1,
                "albumItemId": 0,
                "userOriginImgUrl": "http://10.1.1.197:8080/dream-album/images/made/album_1481279903117.png",
                "previewImgUrl": "http://10.1.1.197:8080/dream-album/images/made/album_pre_1481279903117.png",
                "rank": 4,
                "editImgInfos": "{\"cssElmWidth\": 240,\"cssElmHeight\": 240,\"cssElmMoveX\": 240,\"cssElmMoveY\": 240,\"cssElmRotate\": 4}",
                "editTextInfos": null,
                "del": false,
                "ok": true
            }
        ]
    }
  }
})
