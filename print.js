//画布宽度
var window_width=1024;
//画布高度
var window_height=768;
//圆的半径
var radius=8;
//设置画圆的与浏览器顶部距离
var margin_top=60;
//设置画圆的与浏览器左边的初始距离
var margin_left=30;
// 设置截止日期
var endTime=new Date();
//设置为当前日期的前一个小时
endTime.setTime(endTime.getTime()+3600*1000);
//设置倒计时需要秒数
var oSeconds=0;

//定义小球
var balls = [];
//定义小球的颜色
var colors=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];


window.onload=function() {

    window_width=document.body.clientWidth;
    window_height=document.body.clientHeight;
    margin_left=Math.round(window_width/10);
    radius=Math.round(window_width*4/5/108)-1;
    margin_top=Math.round(window_height/5);
   

	//配置canvas绘制环境
	var canvas=document.getElementById("canvas");
	var context=canvas.getContext("2d");

	canvas.width=window_width;
	canvas.height=window_height;
    oSeconds=getTimes();
	//开始绘制数字,调用绘制函数
	setInterval(
    function(){
       print(context);//当前画面
       update();//更新
    }
     ,
     50
   );

}
function update(){
	var nextTime=getTimes();

    var nextHours = parseInt(nextTime/3600);
    var nextMinutes = parseInt((nextTime-nextHours*3600)/60);
    var nextSeconds = nextTime%60;

    var nowHours = parseInt(oSeconds/3600);
    var nowMinutes = parseInt((oSeconds-nowHours*3600)/60);
    var nowSeconds = oSeconds%60;
//判断上一秒不等于下一秒进行更新
    if(nextSeconds!=nowSeconds){
        //当时间改变是，也就是个位十位变化时添加小球
        if( parseInt(nowHours/10) != parseInt(nextHours/10) ){
            addBalls( margin_left + 0 , margin_top , parseInt(nowHours/10) );
        }
        if( parseInt(nowHours%10) != parseInt(nextHours%10) ){
            addBalls( margin_left + 15*(radius+1) , margin_top , parseInt(nowHours/10) );
        }

        if( parseInt(nowMinutes/10) != parseInt(nextMinutes/10) ){
            addBalls( margin_left + 39*(radius+1) , margin_top , parseInt(nowMinutes/10) );
        }
        if( parseInt(nowMinutes%10) != parseInt(nextMinutes%10) ){
            addBalls( margin_left + 54*(radius+1) , margin_top , parseInt(nowMinutes%10) );
        }

        if( parseInt(nowSeconds/10) != parseInt(nextSeconds/10) ){
            addBalls( margin_left + 78*(radius+1) , margin_top , parseInt(nowSeconds/10) );
        }
        if( parseInt(nowSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( margin_left + 93*(radius+1) , margin_top , parseInt(nextSeconds%10) );
        }  
      oSeconds=nextTime;
    }
     updateBalls();
}

function getTimes(){
   

	var nowTime=new Date();
	// var oTime=endTime.getTime()-nowTime.getTime();
	// oTime=Math.round(oTime/1000);

    var oTime=nowTime.getHours()*3600+nowTime.getMinutes()*60+nowTime.getSeconds();
	// return oTime>=0?oTime:0;
    return oTime;

}

function print(con){
	//刷新
	con.clearRect(0,0,window_width,window_height);

    var hours = parseInt(oSeconds/3600);
    var minutes = parseInt((oSeconds-hours*3600)/60);
    var seconds = oSeconds%60;

    printNumber(margin_left,margin_top,parseInt(hours/10),con);
    //第二个数字距离左边是前一个的宽度，也就是正方形方块。由于数字长7为
    printNumber(margin_left+15*(radius+1),margin_top,parseInt(hours%10),con);
    printNumber(margin_left+30*(radius+1),margin_top,10,con);
    printNumber(margin_left+39*(radius+1),margin_top,parseInt(minutes/10),con);
    printNumber(margin_left+54*(radius+1),margin_top,parseInt(minutes%10),con);
    printNumber(margin_left+69*(radius+1),margin_top,10,con);
    printNumber(margin_left+78*(radius+1),margin_top,parseInt(seconds/10),con);
    printNumber(margin_left+93*(radius+1),margin_top,parseInt(seconds%10),con);

    for( var i = 0 ; i < balls.length ; i ++ ){
        con.fillStyle=balls[i].color;
        con.beginPath();
        con.arc( balls[i].x , balls[i].y , radius , 0 , 2*Math.PI , true );
        con.closePath();
        con.fill();
    }


}

//添加小球
function addBalls(x,y,num){
   for(var i=0;i<number[num].length;i++){
     for(var j=0;j<number[num][i].length;j++){
        //还是在原有的位置绘制加上小球
      if(number[num][i][j]==1){
        //为每一个小球添加属性,也就是json
        var aBall = {
            x:x+j*2*(radius+1)+(radius+1),
            y:y+i*2*(radius+1)+(radius+1),
            //小球重力加速度
            g:2+Math.random(),
            //小球x向速度
            vx:Math.pow( -1 , Math.ceil( Math.random()*10) ) * 5,
            vy:-5,
            //小球颜色随机
            color: colors[ Math.floor( Math.random()*colors.length)]
        }
        //添加小球到数组中
         balls.push(aBall);
         console.log(balls.length);
      }
     }
   }
}
//更新小球的位置，他才会动
function updateBalls(){
    for( var i = 0 ; i < balls.length ; i ++ ){
//每一次更新小球的位置，连起来形成动画
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
//当小球y的位置大于底部就出去了。此时将他的y轴速度设为
//负的也就往上跑
        if( balls[i].y >= window_height-radius ){
            balls[i].y = window_height-radius;
            balls[i].vy =-balls[i].vy*0.75;      
            // console.log(-balls[i].vy*0.75);
        }
        // if( balls[i].x >= window_width-radius ){
        //     balls[i].x = window_height-radius;
        //     balls[i].vx =-balls[i].vx*0.75;      
        //     // console.log(-balls[i].vy*0.75);
        // }
    }
//优化
        var count=0;
        for(var i=0;i<balls.length;i++){
            //当小球的右边大于0还在画面里，当小球x-r小于window_width时他也在画面里
         if((balls[i].x+radius>0)&&(balls[i].x-radius<window_width)){
           balls[count++]=balls[i];
           // count++;
         }
        }
        while (balls.length>count) {
             balls.pop();
    }
}
    //绘制单个数字
function printNumber(x,y,num,con){
    //填充数字颜色
	con.fillStyle = "#774939";
	//循环number三维数组,num代表数组的第一层下标，数组
	//从开始到结束代表0到9，最后一个代表冒号，若num=5
	//则为数字5

	//i=number[num].length 代表竖着，也就是y轴
	//j=number[num][i]length 代表横着，也就是x轴
    for(var i=0;i<number[num].length;i++){
    	//第二个for具体画
       for(var j=0;j<number[num][i].length;j++){
       	//循环，若等于1开始画圆，三维数组内有1和0
       	//组成，1画圆，竖着画，当i=0时，画完二维数组的第一行
         if(number[num][i][j]==1){
         con.beginPath();
         //canvas arc函数画圆，(x,y,r,0,pi)
         //x+j*2*(radius+1)+(radius+1),x轴从哪开始画？2*(radius+1)是就
         //相当于圆外面的小正方形，若j=5，画第六个圆，再加上原的半径，这个1就是每个
         //圆相隔1px;x轴同理
         con.arc(x+j*2*(radius+1)+(radius+1),y+i*2*(radius+1)+(radius+1),radius,0,2*Math.PI);
         //关闭绘画环境，下一次循环再次开启，其实不用写
         con.closePath()
         //填充颜色
         con.fill();
         }
       }
    }
}