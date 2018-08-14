/**
 * Created by ASUS on 2018/3/26.
 */
(function ($,root) {
    var $scope = $(document.body);
    var root = window.player;

    function renderIInfo(info) {
        var html = '<div class="song-name">'+ info.song +'</div>\
            <div class="singer-name">'+ info.singer+'</div>\
            <div class="album-name">'+info.album+'</div>';

        $scope.find(".song-info").html(html);
        // $scope.find("ul").html("");



    }

    function renderImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            root.blurImg(img,$scope);
            $scope.find(".song-img img").attr("src",src);
        }

    }
    
    function renderIsLike(islike) {
        if(islike){
            $scope.find(".like-btn").addClass("liking");
        }else {
            $scope.find(".like-btn").removeClass("liking");
        }
    }

    root.render = function render(data) {
        renderIInfo(data);
        renderImg(data.image);
        renderIsLike(data.isLike)
    }

    // root.render = render;

})(window.Zepto,window.player||(window.player={}));
//通过window.player暴露函数