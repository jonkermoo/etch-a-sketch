/* initial creation of grid and resizing grid */
document.addEventListener("DOMContentLoaded", () => {
    const screen = document.querySelector(".screen");
    const sizeBtn  = document.getElementById("size-display");

 
    function createGrid(n) {
        screen.innerHTML = "";

        for (let i = 0; i < n * n; i++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-square");

        const pct = 100 / n;
        cell.style.width  = `${pct}%`;
        cell.style.height = `${pct}%`;

        screen.appendChild(cell);
        }
    }
    
    function changeSize() {
        const result = confirm("Changing the grid will clear your drawing");
        if (result) {
            const input = prompt("Enter new grid size (e.g. 16 for 16×16):", "");
            const newSize = parseInt(input, 10);
        
            if (!isNaN(newSize) && newSize > 0 && newSize <= 128) {
                createGrid(newSize);
                sizeBtn.textContent = `size: ${newSize}`;
            } else if (newSize > 128) {
                alert("Please enter a number less than 129")
            } else {
                alert("Please enter a positive whole number.");
            }
        }
    }
    createGrid(16);
    sizeBtn.textContent = `size: 16`;

    sizeBtn.addEventListener("click", changeSize);
});
/* ========================================================================== */

/* drawing feature */
let isDrawing = false;

document.addEventListener("mousedown", () => {
    isDrawing = true;
})