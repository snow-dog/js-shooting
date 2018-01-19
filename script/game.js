// localStorage
var $storage = localStorage;
var $pastPoint = $storage.getItem('point');
// canvas 要素
var $ctx;
// 終了コード
var $end;
// 画面サイズ(canvas)の定義
$window = {
  w: 300,
  h: 400
};
// enemy の初期位置を定義
var $enemy = {
  x: 50,
  y: 30,
  w: 61,
  h: 51,
  speed: 5
}
// you の初期位置を定義
var $you = {
  x: 100,
  y: 350,
  w: 26,
  h: 31
}
// ball の初期位置を定義
// speed が-5なのは下から上に行くから
var $ball = {
  x: $window.w,
  y: $window.h,
  w: 8,
  h: 15,
  speed: -10
}
// 得点
var $point = 0;
// 画像
var $imageEnemy = new Image();
var $imageYou = new Image();
var $imageBall = new Image();
$imageEnemy.src = "./image/ufo.png";
$imageYou.src = "./image/gun.png";
$imageBall.src = "./image/ball.png";

// game内容 関数
function shooting() {
  //画面をクリア
  // context . clearRect(x, y, w, h)
  $ctx.clearRect(0, 0, $window.w, $window.h);

  // 画像表示
  // context . drawImage(image, dx, dy, dw, dh)
  $ctx.drawImage($imageEnemy, $enemy.x, $enemy.y, $enemy.w, $enemy.h);
  $ctx.drawImage($imageYou, $you.x, $you.y, $you.w, $you.h);
  $ctx.drawImage($imageBall, $ball.x, $ball.y, $ball.w, $ball.h);

  // 移動
  $enemy.x += $enemy.speed;
  $ball.y += $ball.speed;

  // 画面の折り返し
  var randLeft = random(-50, 50);
  var randRight = random(200, 350);
  var randSpeed = random(1, 7);
  if ($enemy.x < randLeft) {
    $enemy.speed = randSpeed;
  } else if ($enemy.x > randRight) {
    $enemy.speed = -1 * randSpeed;
  }

  // ヒット
  if ($ball.y < ($enemy.y + $enemy.w) && $ball.y > $enemy.y) {
    if ($ball.x > $enemy.x && $ball.x <= ($enemy.x + $enemy.w)) {
      $point += 10;
      add($point);
      $ball.y = $window.y;
    }
  }

  // クリックしたら玉を出す
  $('.game').click(function(){
    $ball.x = $you.x;
    $ball.y = $you.y;
  });

  // マウスを追跡して、銃を動かす
  $('.game').mousemove(function(e){
    // var $target = e.target.getBoundingClientRect();
    var $target = e.offsetX;
    $you.x = $target;
  });
}

// ポイント加算表示
function add(add){
  $('#point').text(add);
  if (add > $pastPoint) {
    $storage.setItem('point', add);
  }
}

// 画面が読み込まれたら
$(function(){
  // canvas 宣言
  $ctx = $('.game')[0].getContext('2d');
  // 過去ポイント
  if ($pastPoint) {
    $('#past').text($pastPoint);
  }
  $end = setInterval(shooting, 30);
  // タイマー & ゲームスタート
  timer();
  // shooting();
});




// タイマーの開始・ストップ
function timer() {
  $('.timer').text('');
  $('.timer').startTimer({
    onComplete: function() {
      $('.timer').addClass('stop-timer');
      $('.game').attr('id', 'game');
      clearInterval($end);
    }
  });
}

// 乱数生成
function random( min, max ) {
    var random = Math.floor( Math.random() * (max + 1 - min) ) + min;
    return random;
}
