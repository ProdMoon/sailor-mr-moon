export default function ActivateMobileButtons() {
    const buttonNames = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "z", "Shift"];

    for (let buttonName of buttonNames) {
        const button = document.getElementById(buttonName);
        button.addEventListener("touchstart", (e) => {
            e.preventDefault();
            e.stopPropagation();
            alert("keydown")
            window.dispatchEvent(new KeyboardEvent("keydown", { key: buttonName }));
        });
        button.addEventListener("touchend", (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.dispatchEvent(new KeyboardEvent("keyup", { key: buttonName }));
        });
    }
}