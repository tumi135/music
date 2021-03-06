/**
 * Created by ASUS on 2018/3/25.
 */
var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);


var index = 0;
var songList ;
var audio  = new root.audioControl();
var flag = true;


function bindEvent() {
    // $scope.on("paly:change",function (index) {
    //
    //     console.log(index);
    //     audio.getAudio(songList[index].audio);
    //     if(audio.status == "play"){
    //         audio.play();
    //     }
    // });

    $scope.on("play:change",function (event,index) {
        // console.log(index);
        audio.getAudio(songList[index].audio);
        if(audio.status == "play"){
            audio.play();
            root.process.start();
        }
        root.render(songList[index]);
        root.process.renderAllTime(songList[index].duration);
        root.process.updata(0);
    })

    $scope.on("click",".next-btn",function () {
        // if(index == songList.length - 1){
        //     index = 0;
        // }else {
        //     index++;
        // }

        var index = controlManger.next();
        root.render(songList[index]);
        $scope.trigger("play:change",index);
        root.audioList(songList,index);

    });
    $scope.on("click",".prev-btn",function () {
        // if(index==0){
        //     index = songList.length - 1;
        // }else {
        //     index--;
        // }
        var index = controlManger.prev();
        root.render(songList[index]);
        $scope.trigger("play:change",index);
        root.audioList(songList,index);
    });

    $scope.on("click",".play-btn",function(){

        if(audio.status == "play"){
            audio.pause();
            root.process.stop();

            // audio.getAudio(songList[0].audio);
        }else {
            audio.play();
            root.process.start();

        }
        $(this).toggleClass("pause");
    });

    $scope.on("click",".list-btn",function(){
        // if(flag){
            $scope.find(".list").css("display","block");
        //     root.audioList(songList,index);
        //     flag = false;
        // }else {
        //     $scope.find(".list").css("display","block");
        //     root.audioList(songList,root.audioList());
        // }


    });
    $scope.on("click",".list-bottom",function(){
        $scope.find(".list").css("display","none");
        // $scope.find("ul").html("");

    });



}

function bindTouch() {
    var $slider = $scope.find(".slider-pointer");
    var offset = $scope.find(".pro-wrapper").offset();
    var left = offset.left;
    var width = offset.width;

    $slider.on("touchstart",function () {
        root.process.stop();
    }).on("touchmove",function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left)/width;
        console.log(per);
        if(per<0 || per >1){
            per = 0;
        }
        root.process.updata(per);
    }).on("touchend",function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left)/width;
        if(per<0 || per >1){
            per = 0;
        }

        var curDuration = songList[controlManger.index].duration;
        var curTime = per * curDuration;
        audio.playTo(curTime);
        root.process.start(per);

    })
}

function getData(url) {
    $.ajax({
        type:"GET",
        url:url,
        success:function (data) {
            root.render(data[0]);
            songList = data;

            root.audioList(data,0);
            console.log(root.audioList(data,0));

            bindEvent();
            controlManger =new root.controlManger(data.length);
            console.log(data);
            $scope.trigger("play:change",0);
            bindTouch();

        },
        error:function () {
            console.log("error")
        }
    })

}
getData("../mock/data.json");
