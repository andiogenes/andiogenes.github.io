(function() {
	var sidebar = null;
	var inQuery = false;
	hljs.configure({tabReplace : null, useBR: true});
	// подсветка синтаксиса в теге code после загрузки DOM
	document.onreadystatechange = function() {
	    if (document.readyState === "interactive") {
			Array.prototype.forEach.call(document.body.getElementsByTagName("code"), function(block, i, arr) {hljs.highlightBlock(block);});

			sidebar = document.getElementById("sidebar");
						
			document.getElementById("menu-button").addEventListener("click", function(e) {
				if (sidebar.style.display != "inline")
					sidebar.style.display = "inline";
				else
					sidebar.style.display = "none";
			});

			window.addEventListener("resize", function(e) {
			    if (!window.matchMedia("screen and (max-width: 720px)").matches) {
			        sidebar.style.display = "inline";
			        inQuery = false;
			    }
			    else {
			    	if (!inQuery)
			    		sidebar.style.display = "none";

			    	inQuery = true;   
			    }
			});
		}
	}
})();