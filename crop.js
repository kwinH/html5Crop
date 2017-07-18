/**
 * Created by html5Crop.
 * User: Kwin
 * QQ: 284843370
 * Email: kwinwong@hotmail.com
 * GitHub: https://github.com/kwinH/html5Crop
 */
jQuery.fn.extend({
  crop: function(type, callback) {
    $this = $(this);
  
  var canvasId = $this.attr('id')+'Canvas';


    if($("#"+canvasId).length == 0 ){  
   attr = 'width='+$this.width()+' height='+$this.height()+' style=position:fixed;top:'+$this.offset().top+'px;left:'+$this.offset().left+'px;';
  var html = '<canvas id="'+canvasId+'" '+attr+'></canvas>';  
  $('body').append(html);
}

  var $canvasObj=$('#'+canvasId);

    type = type || 1;
    var position = {
      img:$this.attr('src'),
      type: type,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      circle: {
        x: 0,
        y: 0,
        radius: 0
      },
      rect: {
        width: 0,
        height: 0
      }
    };

    var c = $canvasObj[0];
    var ctx = c.getContext("2d");

    $canvasObj.mousedown(function() {
      c.height = c.height;
      position.startX = event.offsetX;
      position.startY = event.offsetY;

      // 移动事件对象
      document.onmousemove = function(ev) {
        position.endX = event.offsetX;
        position.endY = event.offsetY;

        if (type == 1) {
          drawCircle();
        } else {
          strokeRect();
        }
      }

    });

    $canvasObj.mouseup(function() {

      // 当松开鼠标时注意取消移动事件
      document.onmouseup = function(ev) {
        // event事件对象
        var oEvent = ev || window.event;

        document.onmousemove = null;
        oEvent.preventDefault();
      }

      position.endX = event.offsetX;
      position.endY = event.offsetY;

      if (type == 1) {
        drawCircle();

      } else {
        strokeRect();
      }

      if (typeof(callback) === 'function') {
        callback(position);
      }
    });

    function getRadius(x1, y1, x2, y2) {
      var xdiff = x2 - x1;
      var ydiff = y2 - y1;
      return (Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5) / 2).toFixed(2);
    }

    function drawCircle() {
      c.height = c.height;

      // ctx.beginPath();
      // ctx.strokeStyle = "purple";  // 紫色的路径
      // ctx.moveTo(position.startX, position.startY);
      // ctx.lineTo(position.endX, position.endY);
      // ctx.stroke();  // 画

      position.circle.radius = getRadius(position.startX, position.startY, position.endX, position.endY);
      position.circle.x = (position.startX + position.endX) / 2;
      position.circle.y = (position.startY + position.endY) / 2;

      ctx.beginPath();
      ctx.arc((position.startX + position.endX) / 2, (position.startY + position.endY) / 2, position.circle.radius, 0, 2 * Math.PI);
      ctx.stroke();

    }

    function strokeRect() {
      c.height = c.height;
      position.rect.width = Math.abs(position.startX - position.endX);
      position.rect.height = Math.abs(position.startY - position.endY);
      ctx.strokeRect(position.startX, position.startY, position.rect.width, position.rect.height);
    }

  }
});