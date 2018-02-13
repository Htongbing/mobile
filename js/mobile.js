var mobile = (function(){
	var page1 = document.getElementById("page1"),
		page2 = document.getElementById("page2"),
		con = page1.getElementsByTagName("div")[0],
		camera = document.getElementById("camera"),
		btnBack = document.getElementById("btnBack"),
		music = document.getElementById("music"),
		musicAudio = document.getElementById("musicAudio"),
		on = document.getElementById("on"),
		off = document.getElementById("off"),
		timer = null;

	function comRadio(){
		var winWidth = document.documentElement.clientWidth,
			winHeight = document.documentElement.clientHeight,
			widthRadio = winWidth / 320,
			heightRadio = winHeight / 520;
		if(widthRadio > heightRadio){
			document.documentElement.style.fontSize = heightRadio * 100 + "px";
			con.id = "container";
			return;
		};
		document.documentElement.style.fontSize = widthRadio * 100 + "px";
		con.id = "container";
	};

	function bindEvent(){
		window.addEventListener("resize", comRadio);
		camera.addEventListener("click", function(){
			var winHeight = document.documentElement.clientHeight;
			window.clearInterval(timer);
			timer = window.setInterval(function(){
				if(parseFloat(getComputedStyle(page2, null)["top"]) - winHeight / 500 * 10 <= 0.5 * winHeight){
					page1.style.top = "-50%";
					page2.style.top = "50%";
					window.clearInterval(timer);
					con.id = "opacity";
					return;
				};
				page1.style.top = parseFloat(getComputedStyle(page1, null)["top"]) - winHeight / 500 * 10 + "px";
				page2.style.top = parseFloat(getComputedStyle(page2, null)["top"]) - winHeight / 500 * 10 + "px";
			}, 10);
		});
		btnBack.addEventListener("click", function(){
			var winHeight = document.documentElement.clientHeight;
			window.clearInterval(timer);
			timer = window.setInterval(function(){
				if(parseFloat(getComputedStyle(page2, null)["top"]) + winHeight / 500 * 10 >= 1.5 * winHeight){
					page1.style.top = "50%";
					page2.style.top = "150%";
					window.clearInterval(timer);
					con.id = "container";
					return;
				};
				page1.style.top = parseFloat(getComputedStyle(page1, null)["top"]) + winHeight / 500 * 10 + "px";
				page2.style.top = parseFloat(getComputedStyle(page2, null)["top"]) + winHeight / 500 * 10 + "px";
			}, 10);
		});
		musicAudio.addEventListener("canplay", function(){
			music.style.display = "block";
			music.className = "music move";
		});
		music.addEventListener("click", function(){
			if(musicAudio.paused){
				musicAudio.play();
				on.style.display = "block";
				off.style.display = "none";
				music.className = "music move";
				return;
			};
			musicAudio.pause();
			on.style.display = "none";
			off.style.display = "block";
			music.className = "music";
		});
	};

	function controlMusic(){
		musicAudio.volume = 0.1;
		musicAudio.play();
	};

	function init(){
		comRadio();
		bindEvent();
		window.setTimeout(controlMusic, 1000);
	};

	return {
		init: init
	};
})();

mobile.init();