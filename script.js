document.addEventListener("DOMContentLoaded", () => {
    const screen = document.querySelector(".screen");
    const sizeBtn  = document.getElementById("size-display");

    const colorBtn = document.getElementById("color");
    const colorPicker = document.getElementById("color-picker");

    let drawMode;

    let currentGrid = 16;
    let currentColor = "#000000";
    cell.dataset.shade = "0";

    /* initial creation of grid and resizing grid */
    function createGrid(n) {
        screen.innerHTML = "";

        for (let i = 0; i < n * n; i++) {
            const cell = document.createElement("div");
            cell.classList.add("grid-square");

            const pct = 100 / n;
            cell.style.width  = `${pct}%`;
            cell.style.height = `${pct}%`;

            /* drawing feature */
            cell.addEventListener("mouseenter", () => {
                if (isDrawing) {
                    if (drawMode === "draw") {
                        cell.style.backgroundColor = currentColor;
                    }
                }
            });
            cell.addEventListener("mousedown", () => {
                if (isDrawing) {
                    if (drawMode === "draw") {
                        cell.style.backgroundColor = currentColor;
                    }
                }
            });
            
            screen.appendChild(cell);
        }
    }
    /* ====================================================================== */
   
    /* button to change size of grid */
    function changeSize() {
        const result = confirm("Changing the grid will clear your drawing");
        if (result) {
            const input = prompt("Enter new grid size:", "");
            const newSize = parseInt(input, 10);
        
            if (!isNaN(newSize) && newSize > 0 && newSize <= 128) {
                currentGrid = newSize;
                createGrid(newSize);
                sizeBtn.textContent = `size: ${newSize}`;
            } else if (newSize > 128) {
                alert("Please enter a number less than 129")
            } else {
                alert("Please enter a positive whole number.");
            }
        }
    }
    /* ====================================================================== */
    
    createGrid(16);
    sizeBtn.textContent = `size: 16`;
    sizeBtn.addEventListener("click", changeSize);

    /* clear button */
    const clear = document.getElementById("clear");
        clear.addEventListener("click", () => {
        createGrid(currentGrid);
    });
    /* ====================================================================== */

    /* check if mouse is down */
    let isDrawing = false;

    document.addEventListener("mousedown", () => {
        isDrawing = true;
    });
    document.addEventListener("mouseup", () => {
        isDrawing = false;
    });
    /* ====================================================================== */
    
    /* change color button */
    colorBtn.addEventListener("click", () => {
        colorPicker.click();
    });

    colorPicker.addEventListener("input", (e) => {
        currentColor = e.target.value;
    });
    /* ======================================================================= */

    /* pencil button */
    const pencil = document.getElementById("draw");
    pencil.addEventListener("click", () => {
        pencil.style.background = "gray";
        shade.style.backgroundColor = "#fff"
        drawMode = "draw";
    })

    /* shade button */
    const shade = document.getElementById("shade");
    shade.addEventListener("click", () => {
        shade.style.backgroundColor = "gray";
        pencil.style.background = "#fff";
        drawMode = "shade";
    });
    
    /* make button change color when clicked on */
    const click = document.querySelectorAll("button");
    click.forEach(button => {
        button.addEventListener("mousedown", () => {
            button.style.backgroundColor = "gray";
        });
    });
    click.forEach(button => {
        button.addEventListener("drag", () => {
            button.style.backgroundColor = "#fff";
        });
    });
    click.forEach(button => {
        button.addEventListener("mouseup", () => {
            button.style.backgroundColor = "#fff";
        });
    });
    /* ====================================================================== */

    /* function to convert hex to RGBA */
    function hexToRGBA(hex, alpha) {
        const r = parseInt(hex.substr(1, 2), 16);
        const g = parseInt(hex.substr(3, 2), 16);
        const b = parseInt(hex.substr(5, 2), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
});


