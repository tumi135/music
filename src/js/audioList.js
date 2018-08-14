/**
 * Created by ASUS on 2018/3/31.
 */
(function ($,root) {
    function audioList(data,index) {
        var len =data.length;
        var html = "";
        for(var i = 0;i < len;i++){
            html += '<li class="'+ i +' ">'+ data[i].song + '-'+data[i].singer +'</li>';
        }
        $scope.find("ul").html(html);
        $scope.find("."+index).css("color","red");


        $scope.find("li").on("click",function (e) {
            index = Number(this.className);
            console.log(index);
            root.render(data[index],index);

            $scope.trigger("play:change",index);
            $scope.find(".list").css("display","none");
            $scope.find("ul").html("");

           audioList(data,index);
            return index;


        })
        return index;

    }
    root.audioList = audioList;

})(window.Zepto,window.player||(window.player={}))