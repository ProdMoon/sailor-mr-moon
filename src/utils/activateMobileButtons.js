import { copyObject } from "./util.js"

function toggleFullscreen() {
    let doc = window.document;
    let docEl = doc.documentElement;

    let requestFullscreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    let cancelFullscreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullscreen.call(docEl);
    } else {
        cancelFullscreen.call(doc);
    }
}

export default function ActivateMobileButtons(player, isGameOver, slot) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.getElementById("mobile-buttons").style.display = "block";
    }

    const toggleFullscreenButton = document.getElementById("toggle-fullscreen");
    toggleFullscreenButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFullscreen();
    });

    const buttonNames = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "z", "Shift"];

    for (let buttonName of buttonNames) {
        const button = document.getElementById(buttonName);
        button.addEventListener("touchstart", (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isGameOver.value) {
                player.handleKeydown({ key: buttonName });
                if (buttonName === "z" && slot.catchedItems.length > 0) {
                    slot.itemWillBeUsed = copyObject(slot.catchedItems[0]);
                    slot.catchedItems.splice(0, 1);
                }
            }
        });
        button.addEventListener("touchend", (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isGameOver.value) {
                player.handleKeyup({ key: buttonName });
            }
        });
    }
}