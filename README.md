Sudoku-Solver
=============
This is a sudoku solver written in JavaScript. It was originally in Python, but I rewrote it in JavaScript since it's used more often in web applications. Also, it turns out that JavaScript's just-in-time compiler is much faster than Python's interpreter.

<h4>Features</h4>
<ul>
<li><strong>Solve</strong> - this will solve the current puzzle. If the puzzle has multiple solutions, it will only provide one.</li>
<li><strong>Edit</strong> - this will edit the original puzzle if its solution is currently being displayed.</li>
<li><strong>Reset</strong> - this will clear either the input or the current puzzle solution, which removes the need to refresh the page to enter a completely new puzzle.</li>
<li>Informs user if puzzle is invalid.</li>
</ul>

<h4>Algorithm</h4>
<p>The algorithm used here is a simple backtracking algorithm. It starts off by checking if the puzzle is valid, then goes to each empty square and iterates through numbers from 1 to 9. If there are no contradictions with the current number, it will move to the next blank spot on the grid (note the iteration order for this algorithm is left-to-right, top-to-bottom). If all possible numbers make contraditions at the current spot, then the solver will move to the previous spot and continue iterating from its current number. The solver will be done once it goes through all empty spots and fills in a number in each of them, without creating any contradictions.</p>
<p>This algorithm isn't really optimized, except for the fact that it will only check for contradictions <strong>at the current spot</strong>. This significantly reduces the number of computations it would if it checked every single spot for contradictions.</p>

<h4>Planned Improvements</h4>
<ul>
<li>Make the page look better.</li>
<li>Allow the user to cycle through multiple solutions, if applicable. It only shows one solution right now, so it would help if the user knew their puzzle had more than one solution.</li>
</ul>
