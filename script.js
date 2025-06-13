document.addEventListener("DOMContentLoaded", () => {
    /* initial drawing at start */
    const preloadPattern = [
        "................................",
        "................................",
        "...####.......##.......####.....",
        "...#..........#..#......#.......",
        "...###........#...#.....###.....",
        "...#..........#..#......#.......",
        "...####.......##.......####.....",
        "................................",
        "................................",
        "............##..................",
        ".............#..................",
        "............###.................",
        "................................",
        "................................",
        ".##...#...##...#..#...####......",
        ".#.#..#..#..#..#..#..#..........",
        ".##...#..#..#..#..#...###.......",
        ".#.#..#..#..#..#..#......#......",
        ".#..#..##...##....#...####......",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................"
    ];
    /* ====================================================================== */
    
    function applyPreload(gridSize, pattern) {
        const cells = screen.querySelectorAll(".grid-square");
        pattern.forEach((rowStr, y) => {
            if (y >= gridSize) return;
            [...rowStr].forEach((ch, x) => {
            if (x >= gridSize) return;
            if (ch === "#") {
                const idx = y * gridSize + x;
                const cell = cells[idx];
                cell.style.backgroundColor = "#000";
                cell.dataset.shade = "1";
            }
            });
        });
    }
    const screen = document.querySelector(".screen");
    const sizeBtn  = document.getElementById("size-display");

    const colorBtn = document.getElementById("color");
    const colorPicker = document.getElementById("color-picker");

    let drawMode;

    let currentGrid = 32;
    let currentColor = "#000000";

    /* initial creation of grid and resizing grid */
    function createGrid(n) {
        screen.innerHTML = "";

        for (let i = 0; i < n * n; i++) {
            const cell = document.createElement("div");
            cell.classList.add("grid-square");

            const pct = 100 / n;
            cell.style.width  = `${pct}%`;
            cell.style.height = `${pct}%`;

            cell.dataset.shade = "0";

            /* drawing feature */
            cell.addEventListener("mouseenter", () => {
                if (isDrawing) {
                    if (drawMode === "draw") {
                        cell.style.backgroundColor = currentColor;
                        cell.dataset.shade = "1"; 
                    } else if (drawMode === "shade") {
                        let level = parseFloat(cell.dataset.shade);
                        if (level >= 1) return;  
                        level = Math.min(level + 0.1, 1);
                        cell.dataset.shade = level.toFixed(1);
                        cell.style.backgroundColor = hexToRGBA(currentColor, 
                                                                level);
                    } else if (drawMode === "rainbow") {
                        const color = rainbowColors[rainbowIndex];
                        cell.style.backgroundColor = color;
                        cell.dataset.shade = "1";
                        rainbowIndex = 
                                    (rainbowIndex + 1) % rainbowColors.length;
                    }
                }
            });
            cell.addEventListener("mousedown", () => {
                if (isDrawing) {
                    if (drawMode === "draw") {
                        cell.style.backgroundColor = currentColor;
                        cell.dataset.shade = "1"; 
                    } else if (drawMode === "shade") {
                        let level = parseFloat(cell.dataset.shade);
                        if (level >= 1) return;  
                        level = Math.min(level + 0.1, 1);
                        cell.dataset.shade = level.toFixed(1);
                        cell.style.backgroundColor = hexToRGBA(currentColor, 
                                                                level);
                    } else if (drawMode === "rainbow") {
                        const color = rainbowColors[rainbowIndex];
                        cell.style.backgroundColor = color;
                        cell.dataset.shade = "1";
                        rainbowIndex = 
                                    (rainbowIndex + 1) % rainbowColors.length;
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
    
    createGrid(currentGrid);
    sizeBtn.textContent = `size: ${currentGrid}`;
    applyPreload(currentGrid, preloadPattern);
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
        clearInterval(rainbowAnimation);
        pencil.style.background = "gray";
        shade.style.backgroundColor = "#fff"
        rainbow.style.backgroundColor = "#fff";
        drawMode = "draw";
    })
    /* ======================================================================= */

    /* shade button */
    const shade = document.getElementById("shade");
    shade.addEventListener("click", () => {
        clearInterval(rainbowAnimation);
        shade.style.backgroundColor = "gray";
        pencil.style.background = "#fff";
        rainbow.style.backgroundColor = "#fff";
        drawMode = "shade";
    });
    /* ======================================================================= */

    /* rainbow button */
    const rainbowColors = [
        "#FF0000",
        "#FF7F00",
        "#FFFF00",
        "#00FF00",
        "#0000FF",
        "#4B0082",
        "#9400D3"
    ];
    let rainbowAnimation;
    let rainbowIndex = 0;

    const rainbow = document.getElementById("rainbow");
    rainbow.addEventListener("click", () => {
        pencil.style.background = "#fff";
        shade.style.backgroundColor = "#fff"
        drawMode = "rainbow";

        clearInterval(rainbowAnimation);

        let index = 0;
        rainbowAnimation = setInterval(() => {
            rainbow.style.backgroundColor = rainbowColors[index];
            index = (index + 1) % rainbowColors.length;
        }, 200);
    })
    /* ======================================================================= */

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
    /* ====================================================================== */

    

});