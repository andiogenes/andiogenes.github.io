// Generated by Haxe 3.4.4
(function () { "use strict";
var Main = function() {
	this.worldMap = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,2,2,2,2,2,0,0,0,0,3,0,3,0,3,0,0,0,1],[1,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,2,0,0,0,2,0,0,0,0,3,0,0,0,3,0,0,0,1],[1,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,2,2,0,2,2,0,0,0,0,3,0,3,0,3,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,4,0,4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,4,0,0,0,0,5,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,4,0,4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,4,0,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
	var _gthis = this;
	var posX = 22;
	var posY = 12;
	var dirX = -1;
	var dirY = 0;
	var planeX = 0;
	var planeY = 0.66;
	var time = 0;
	var oldTime = 0;
	var frameTime = 0;
	var screen = window.document.createElement("canvas");
	var w = screen.width = 512;
	var h = screen.height = 384;
	window.document.body.style.margin = "0 0 0";
	screen.style.width = screen.style.height = "100%";
	screen.style.backgroundColor = "#000";
	window.document.head.title = screen.id = "Raycaster";
	var ctx = screen.getContext("2d",null);
	ctx.fillStyle = "#fff";
	ctx.font = "12pt sans-serif";
	window.document.body.appendChild(screen);
	window.setInterval(function() {
		ctx.clearRect(0,0,w,h);
		var _g1 = 0;
		var _g = w;
		while(_g1 < _g) {
			var x = _g1++;
			var cameraX = 2 * x / w - 1;
			var rayPosX = posX;
			var rayPosY = posY;
			var rayDirX = dirX + planeX * cameraX;
			var rayDirY = dirY + planeY * cameraX;
			var mapX = rayPosX | 0;
			var mapY = rayPosY | 0;
			var sideDistX;
			var sideDistY;
			var deltaDistX = Math.sqrt(1 + rayDirY * rayDirY / (rayDirX * rayDirX));
			var deltaDistY = Math.sqrt(1 + rayDirX * rayDirX / (rayDirY * rayDirY));
			var perpWallDist;
			var stepX;
			var stepY;
			var hit = 0;
			var side = 0;
			if(rayDirX < 0) {
				stepX = -1;
				sideDistX = (rayPosX - mapX) * deltaDistX;
			} else {
				stepX = 1;
				sideDistX = (mapX + 1 - rayPosX) * deltaDistX;
			}
			if(rayDirY < 0) {
				stepY = -1;
				sideDistY = (rayPosY - mapY) * deltaDistY;
			} else {
				stepY = 1;
				sideDistY = (mapY + 1 - rayPosY) * deltaDistY;
			}
			while(hit == 0) {
				if(sideDistX < sideDistY) {
					sideDistX += deltaDistX;
					mapX += stepX;
					side = 0;
				} else {
					sideDistY += deltaDistY;
					mapY += stepY;
					side = 1;
				}
				if(_gthis.worldMap[mapX][mapY] > 0) {
					hit = 1;
				}
			}
			if(side == 0) {
				perpWallDist = (mapX - rayPosX + (1 - stepX) / 2) / rayDirX;
			} else {
				perpWallDist = (mapY - rayPosY + (1 - stepY) / 2) / rayDirY;
			}
			var lineHeight = h / perpWallDist | 0;
			var drawStart = -lineHeight / 2 + h / 2 | 0;
			if(drawStart < 0) {
				drawStart = 0;
			}
			var drawEnd = lineHeight / 2 + h / 2 | 0;
			if(drawEnd >= h) {
				drawEnd = h - 1;
			}
			var color;
			var _g2 = _gthis.worldMap[mapX][mapY];
			switch(_g2) {
			case 1:
				if(side == 1) {
					color = "#7f0000";
				} else {
					color = "#f00";
				}
				break;
			case 2:
				if(side == 1) {
					color = "#007f00";
				} else {
					color = "#00ff00";
				}
				break;
			case 3:
				if(side == 1) {
					color = "#00007f";
				} else {
					color = "#0000ff";
				}
				break;
			case 4:
				if(side == 1) {
					color = "#7f7f7f";
				} else {
					color = "#fff";
				}
				break;
			default:
				if(side == 1) {
					color = "#7f7f00";
				} else {
					color = "#ffff00";
				}
			}
			ctx.strokeStyle = color;
			ctx.beginPath();
			ctx.lineTo(x,drawStart);
			ctx.lineTo(x,drawEnd);
			ctx.stroke();
		}
		oldTime = time;
		time = Date.now();
		frameTime = (time - oldTime) / 1000;
	},0);
	window.document.addEventListener("keydown",function(e) {
		if(e.keyCode == 37) {
			var oldDirX = dirX;
			dirX = dirX * Math.cos(frameTime * 3) - dirY * Math.sin(frameTime * 3);
			dirY = oldDirX * Math.sin(frameTime * 3) + dirY * Math.cos(frameTime * 3);
			var oldPlaneX = planeX;
			planeX = planeX * Math.cos(frameTime * 3) - planeY * Math.sin(frameTime * 3);
			planeY = oldPlaneX * Math.sin(frameTime * 3) + planeY * Math.cos(frameTime * 3);
		}
		if(e.keyCode == 38) {
			if(_gthis.worldMap[posX + dirX * frameTime * 5 | 0][posY | 0] == 0) {
				posX += dirX * frameTime * 5;
			}
			if(_gthis.worldMap[posX | 0][posY + dirY * frameTime * 5 | 0] == 0) {
				posY += dirY * frameTime * 5;
			}
		}
		if(e.keyCode == 39) {
			var oldDirX1 = dirX;
			dirX = dirX * Math.cos(-frameTime * 3) - dirY * Math.sin(-frameTime * 3);
			dirY = oldDirX1 * Math.sin(-frameTime * 3) + dirY * Math.cos(-frameTime * 3);
			var oldPlaneX1 = planeX;
			planeX = planeX * Math.cos(-frameTime * 3) - planeY * Math.sin(-frameTime * 3);
			planeY = oldPlaneX1 * Math.sin(-frameTime * 3) + planeY * Math.cos(-frameTime * 3);
		}
		if(e.keyCode == 40) {
			if(_gthis.worldMap[posX - dirX * frameTime * 5 | 0][posY | 0] == 0) {
				posX -= dirX * frameTime * 5;
			}
			if(_gthis.worldMap[posX | 0][posY - dirY * frameTime * 5 | 0] == 0) {
				posY -= dirY * frameTime * 5;
			}
		}
		if(e.keyCode >= 49 && e.keyCode <= 57) {
			screen.style.width = w * 0.25 * (e.keyCode - 48) + "px";
		}
	},false);
};
Main.main = function() {
	new Main();
};
Main.main();
})();
