var rows = [[], [], [], [], [], [], [], [], []];
var cols = [[], [], [], [], [], [], [], [], []];
var boxes = [[], [], [], [], [], [], [], [], []];
var original = [[], [], [], [], [], [], [], [], []];
var edit = true;

function clr() {
    "use strict";
    var i;
    for (i = 0; i < 9; i += 1) {
        rows[i].length = 0;
        cols[i].length = 0;
        boxes[i].length = 0;
        original[i].length = 0;
    }
}

function cont(sub) {
    "use strict";
    var seen = [], i;
	for (i = 0; i < 10; i += 1) {
		seen.push(0);
    }
	for (i = 0; i < 9; i += 1) {
		seen[sub[i]] += 1;
    }
	for (i = 1; i < 10; i += 1) {
		if (seen[i] > 1) {
			return true;
        }
    }
	return false;
}

function solve() {
	"use strict";
    var unknown = [], i, j, cur, flag;
	for (i = 0; i < 9; i += 1) {
		for (j = 0; j < 9; j += 1) {
			if (rows[i][j] === 0) {
				unknown.push([i, j]);
            } else {
                if (cont(rows[i]) || cont(cols[j]) || cont(boxes[3 * (Math.floor(i / 3)) + Math.floor(j / 3)])) {
                    return [[], [], [], [], [], [], [], [], []];
                }
            }
        }
    }
    
    cur = 0;
	while (cur < unknown.length) {
		i = unknown[cur][0];
		j = unknown[cur][1];
		flag = true;
		while (rows[i][j] < 9 && flag) {
			rows[i][j] += 1;
			cols[j][i] += 1;
			boxes[3 * (Math.floor(i / 3)) + Math.floor(j / 3)][3 * (i % 3) + j % 3] += 1;
			if (!(cont(rows[i]) || cont(cols[j]) || cont(boxes[3 * (Math.floor(i / 3)) + Math.floor(j / 3)]))) {
				cur += 1;
				flag = false;
			}
		}
		if (rows[i][j] >= 9 && flag) {
			rows[i][j] = 0;
			cols[j][i] = 0;
			boxes[3 * (Math.floor(i / 3)) + Math.floor(j / 3)][3 * (i % 3) + j % 3] = 0;
			cur -= 1;
		}
	}

	return rows;
}

function solveButton() {
    "use strict";
    var i, j, val, out, inp;
    //var time //used for calculating time elapsed in solving a puzzle; uncomment this line and the other two commented lines below to see this output in the console
    if (!edit) {
        return;
    }
    for (i = 0; i < 9; i += 1) {
        for (j = 0; j < 9; j += 1) {
            val = document.getElementById("sudoku").childNodes[i].childNodes[j].childNodes[0].value;
            if (val === "") {
                original[i].push(0);
                rows[i].push(0);
                cols[j].push(0);
                boxes[3 * (Math.floor(i / 3)) + Math.floor(j / 3)].push(0);
            } else {
                original[i].push(val);
                rows[i].push(val);
                cols[j].push(val);
                boxes[3 * (Math.floor(i / 3)) + Math.floor(j / 3)].push(val);
            }
        }
    }
    //time = new Date().getTime();
    rows = solve(rows, cols, boxes);
    //console.log(new Date().getTime() - time);
    if (rows[0].length === 0) {
        alert("Invalid sudoku");
        clr();
        return;
    }
    for (i = 0; i < 9; i += 1) {
        for (j = 0; j < 9; j += 1) {
            out = document.createElement("p");
            val = document.createTextNode(rows[i][j].toString());
            out.appendChild(val);
            out.className = "answer";
            inp = document.getElementById("sudoku").childNodes[i].childNodes[j].childNodes[0];
            document.getElementById("sudoku").childNodes[i].childNodes[j].replaceChild(out, inp);
        }
    }
    edit = false;
}

function editButton() {
    "use strict";
    var i, j, inp, out, val, box;
    if (edit) {
        return;
    }
    for (i = 0; i < 9; i += 1) {
        for (j = 0; j < 9; j += 1) {
            inp = document.createElement("input");
            inp.setAttribute("type", "number");
            inp.setAttribute("min", "1");
            inp.setAttribute("max", "9");
            val = original[i][j];
            if (val === 0 || val === undefined) {
                val = "";
            } else {
                val = val.toString();
            }
            inp.setAttribute("value", val);
            out = document.getElementById("sudoku").childNodes[i].childNodes[j].childNodes[0];
            document.getElementById("sudoku").childNodes[i].childNodes[j].replaceChild(inp, out);
        }
    }
    clr();
    edit = true;
}

function resetButton() {
    "use strict";
    var i, j;
    if (!edit) {
        clr();
        editButton();
    } else {
        for (i = 0; i < 9; i += 1) {
            for (j = 0; j < 9; j += 1) {
                document.getElementById("sudoku").childNodes[i].childNodes[j].childNodes[0].value = "";
            }
        }
    }    
}

window.onload = function () {
    "use strict";
    var i, j, text, box, row, main = document.getElementById("sudoku");
    for (i = 0; i < 9; i += 1) {
        row = document.createElement("div");
        row.className = "row";
        for (j = 0; j < 9; j += 1) {
            box = document.createElement("div");
            box.className = "box";
            if (i === 0) {
                box.style.borderTopWidth = "2px";
            } else if (i === 8) {
                box.style.borderBottomWidth = "2px";
            }
            if (j === 0) {
                box.style.borderLeftWidth = "2px";
            } else if (j === 8) {
                box.style.borderRightWidth = "2px";
            }
            if (i % 3 === 2) {
                if (i === 8) {
                    box.style.borderBottomWidth = "4px";
                } else {
                    box.style.borderBottomWidth = "2px";
                }
            } else if (i % 3 === 0) {
                if (i === 0) {
                    box.style.borderTopWidth = "4px";
                } else {
                    box.style.borderTopWidth = "2px";
                }
            }
            if (j % 3 === 2) {
                if (j === 8) {
                    box.style.borderRightWidth = "4px";
                } else {
                    box.style.borderRightWidth = "2px";
                }
            } else if (j % 3 === 0) {
                if (j === 0) {
                    box.style.borderLeftWidth = "4px";
                } else {
                    box.style.borderLeftWidth = "2px";
                }
            }
            text = document.createElement("input");
            text.setAttribute("type", "number");
            text.setAttribute("min", "1");
            text.setAttribute("max", "9");
            box.appendChild(text);
            row.appendChild(box);
        }
        main.appendChild(row);
    }
    document.getElementById("solve").onclick = solveButton;
    document.getElementById("edit").onclick = editButton;
    document.getElementById("reset").onclick = resetButton;
};