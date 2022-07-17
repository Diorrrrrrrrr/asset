function setValue(key, value){
	if ($('#'+key+'').text() != value) {
		if (!isNaN(value)){
			var $this = $('#'+key+'');
			jQuery({ Counter: parseInt($this.text(), 10) }).animate({ Counter: value }, {
				duration: 2000,
				easing: 'swing',
				step: function (now) {
					$this.text(Math.ceil(now));
				}
			});
		} else {
			$('#'+key+'').text(''+value+'')
		}
	}
}
function setJobIcon(value){
	$("#jobpic").removeClass();
	$("#jobpic").addClass(value);
}
$(function(){
	window.addEventListener('message', function(event) {
		if (event.data.action == "setValue"){
			if (event.data.key == "job"){
				setJobIcon(event.data.icon)
			}
			setValue(event.data.key, event.data.value)
		}else if (event.data.action == "toggle"){
			if (!event.data.show){
				$('body').fadeOut();
			} else{
				$('body').fadeIn();
			}
		}
	});
});
var currentSize = 25
function SetCrosshairURL(url) {
    var element = document.getElementById("crosshair"); 
    var input = document.getElementById("crosshair-ui-url");
    input.value = url;
    element.setAttribute("src", url)
    if (input.value != "") {
        SetCrosshairStatus(true)
    }
    else {
        SetCrosshairStatus(false)
    }
    SetCrosshairSize(currentSize)
}
function SetCrosshairSize(size) {
    var element = document.getElementById("crosshair");
    var input = document.getElementById("crosshair-ui-size");
    input.value = size;
    currentSize = size;
    element.setAttribute("width", size)
    element.setAttribute("height", size)
}
function SetCrosshairStatus(bool) {
    var element = document.getElementById("crosshair");
    element.style.display = bool ? "block" : "none";
}
function SetConfigDisplay(bool) {
    var element = document.getElementById("crosshair-ui");
    element.style.display = bool ? "block" : "none";
    if (bool == false) {
        fetch(`https://L2T-assets/CloseCrosshairConfig`, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(["a"])
        }).then(resp => resp.json()).then(resp => console.log(resp));
    }
}
function UpdateCrosshairData() {
    var url = document.getElementById("crosshair-ui-url").value
    var size = document.getElementById("crosshair-ui-size").value
    SetCrosshairURL(url)
    SetCrosshairSize(size)
    fetch(`https://L2T-assets/UpdateCrosshairData`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            url: url, 
            size: size,
        })
    }).then(resp => resp.json()).then(resp => console.log(resp));
    SetConfigDisplay(false)
}
document.addEventListener("DOMContentLoaded", function(){
    window.addEventListener('message', function(event) {
        if (event.data != null) {
            var data = event.data.data;
            var toggleUI = event.data.toggleUI;
            if (data != null) {
                var url = data.url;
                var size = data.size;
                SetCrosshairURL(url);
                SetCrosshairSize(size);
            }
            else if (toggleUI != null) {
                SetConfigDisplay(toggleUI);
            }
        }
    });
});
$(function () {
    let height = 25.5
    window.addEventListener('message', function (event) {
        if (event.data.type == "updateStatusHud") {
            $("#varSetHealth").find(".progressBar").attr("style", "width: "+event.data.varSetHealth + "%;")
            $("#varSetArmor").find(".progressBar").attr("style", "width: "+event.data.varSetArmor + "%;")
            $("#varSetOxy").find(".progressBar").attr("style", "width: "+event.data.varSetOxy + "%;")
            $("#varSetStress").find(".progressBar").attr("style", "width: "+event.data.varSetStress + "%;")
            if (event.data.hasParachute == true)
            {
                $("#varSetArmor").addClass("hidden")
                $("#varSetHealth").addClass("hidden")
                $("#varSetOxy").addClass("hidden")
                $("#varSetStress").addClass("hidden")
            } else {
                $("#varSetOxy").removeClass("hidden")
                $("#varSetStress").removeClass("hidden")
                $("#varSetArmor").removeClass("hidden")
                $("#varSetHealth").removeClass("hidden")
            }
            changeColor($("#varSetHealth"), event.data.varSetHealth, false)
            changeColor($("#varSetArmor"), event.data.varSetArmor, false)
            changeColor($("#varSetOxy"), event.data.varSetOxy, false)
            changeColor($("#varSetStress"), event.data.varSetStress, false)
            if (event.data.varSetArmor <= 0) {
                $("#varSetArmor").find(".barIcon").removeClass("danger")
            }
        }
    })
    function widthHeightSplit(value, ele) {
        let eleHeight = (value / 100) * height;
        let leftOverHeight = height - eleHeight;
        ele.attr("style", "height: "+eleHeight+"px; top: "+leftOverHeight+"px;")
    }
    function changeColor(ele, value, flip) {
        let add = false
        if (flip) {
            if (value > 85) {
                add = true
            }
        }
        else {
            if (value < 25) {
                add = true
            }
        }
        if (add) {
            ele.find(".progressBar").addClass("dangerGrad")
        }
        else {
            ele.find(".progressBar").removeClass("dangerGrad")
        }
    }
})