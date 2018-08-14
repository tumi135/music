/**
 * Created by ASUS on 2018/3/26.
 */
// (function ($,root) {
//
//     function audioControl() {
//         this.audio = new Audio();
//         this.status = "pause";
//         console.log(status + "this");
//
//     }
//
//     audioControl.prototype = {
//         play:function () {
//             this.audio.play();
//             this.status = "play";
//             console.log("play");
//
//         },
//         pause:function () {
//             this.audio.pause();
//             this.status = "pause";
//             console.log("pause");
//         },
//         getAudio:function (src) {
//             console.log("get");
//             this.audio.src = src;
//             this.audio.load();
//         }
//     }
//     root.audioControl = audioControl;
//
// })(window.Zepto,window.player);

(function ($,root) {
    function audioControl() {
        this.audio = new Audio();
        this.status = "pause";

    }
    audioControl.prototype = {
        play:function () {
            this.audio.play();

            this.status = "play";
        },
        pause:function () {
            this.audio.pause();

            this.status = "pause";
        },
        getAudio:function (src) {
            this.audio.src = src;
            this.audio.load();
        },
        playTo:function (time) {
            this.audio.currentTime = time;
            this.play();
        }
    }
    root.audioControl = audioControl;
    
})(window.Zepto,window.player)


