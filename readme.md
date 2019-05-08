# Introduction
## Problem Scenario
One of my friends, who works at Parker Steel, approached me with an issue he was having at work.  He knew I was into programming and asked if there was any way to write a program to do what he was asking.  In short, he wanted a program that would help him determine the best cutting order for pieces in order to have one large remaining piece at the end, rather than several shorter pieces.  For a more detailed explination, view the Wikipedia page on <a href="https://en.wikipedia.org/wiki/Cutting_stock_problem">The Cutting Stock Problem</a>.

## Example
Parker Steel uses stock approximately 12 feet long.  Sometimes they use longer stock, such as 20 feet, but for the most part it is 12 feet.  They take this metal and cut it down to a customers ordered length and quantity.  For this pretend order, we are going to pretend the customer has two lines on their order:
1. 15 pieces of 19 inch lengths
1. 30 pieces of 16 inch lengths

Typically, the cutting engineers will spend about 30 minutes - 1 hour trying to find an optimal way to cut the metal; however, they often end up just cutting the metal in order, especially if they have several orders come in.
    
### Normal Cutting Method
<table>
    <tr>
        <th></th>
        <th colspan="2">Pattern Cut</th>
        <th></th>
        <th colspan="2">Total Pieces</th>
        <th></th>
        <th>Remaining Pieces</th>
    </tr>
    <tr>
        <th></th>
        <th>19 in.</th>
        <th>16 in.</th>
        <th></th>
        <th>19 in.</th>
        <th>16 in.</th>
        <th></th>
        <th></th>
    </tr>
    <tr>
        <th>Bar 1</th>
        <td>7</td>
        <td>0</td>
        <td></td>
        <td>7</td>
        <td>0</td>
        <td></td>
        <td>11 in. x 1</td>
    </tr>
    <tr>
        <th>Bar 2</th>
        <td>7</td>
        <td>0</td>
        <td></td>
        <td>14</td>
        <td>0</td>
        <td></td>
        <td>11 in. x 2</td>
    </tr>
    <tr>
        <th>Bar 3</th>
        <td>1</td>
        <td>7</td>
        <td></td>
        <td>15</td>
        <td>7</td>
        <td></td>
        <td>13 in x 1, 11 in. x 2</td>
    </tr>
    <tr>
        <th>Bar 4</th>
        <td>0</td>
        <td>9</td>
        <td></td>
        <td>15</td>
        <td>16</td>
        <td></td>
        <td>13 in x 1, 11 in. x 2</td>
    </tr>
     <tr>
        <th>Bar 5</th>
        <td>0</td>
        <td>9</td>
        <td></td>
        <td>15</td>
        <td>25</td>
        <td></td>
        <td>13 in x 1, 11 in. x 2</td>
    </tr>
     <tr>
        <th>Bar 4</th>
        <td>0</td>
        <td>5</td>
        <td></td>
        <td>15</td>
        <td>30</td>
        <td></td>
        <td>64 in x 1, 13 in x 1, 11 in. x 2</td>
    </tr>
</table>

### Optimized Cutting Method
<table>
    <tr>
        <th></th>
        <th colspan="2">Pattern Cut</th>
        <th></th>
        <th colspan="2">Total Pieces</th>
        <th></th>
        <th>Remaining Pieces</th>
    </tr>
    <tr>
        <th></th>
        <th>19 in.</th>
        <th>16 in.</th>
        <th></th>
        <th>19 in.</th>
        <th>16 in.</th>
        <th></th>
        <th></th>
    </tr>
    <tr>
        <th>Bar 1</th>
        <td>5</td>
        <td>3</td>
        <td></td>
        <td>5</td>
        <td>3</td>
        <td></td>
        <td>1 in. x 1</td>
    </tr>
    <tr>
        <th>Bar 2</th>
        <td>5</td>
        <td>3</td>
        <td></td>
        <td>10</td>
        <td>6</td>
        <td></td>
        <td>1 in. x 2</td>
    </tr>
    <tr>
        <th>Bar 3</th>
        <td>5</td>
        <td>3</td>
        <td></td>
        <td>15</td>
        <td>9</td>
        <td></td>
        <td>1 in. x 3</td>
    </tr>
    <tr>
        <th>Bar 4</th>
        <td>0</td>
        <td>9</td>
        <td></td>
        <td>15</td>
        <td>18</td>
        <td></td>
        <td>1 in. x 3</td>
    </tr>
    <tr>
        <th>Bar 5</th>
        <td>0</td>
        <td>9</td>
        <td></td>
        <td>15</td>
        <td>27</td>
        <td></td>
        <td>1 in. x 3</td>
    </tr>
     <tr>
        <th>Bar 6</th>
        <td>0</td>
        <td>3</td>
        <td></td>
        <td>15</td>
        <td>30</td>
        <td></td>
        <td>96 in. x 1, 1 in. x 3</td>
    </tr>
</table>

If you would like, here is a link to all the possible combinations of pieces you can cut from on 12' bar:
<a href="https://docs.google.com/spreadsheets/d/1IK04p6xg_xAWejvg_z6wSyJp6e6cCbD35AotJlRn0PQ/edit?usp=sharing">Google Doc Link</a>

### Results
The key in this peoject are the remaining pieces.  You want to have as few remaining pieces as possible, make the remaining pieces as small as possible, and end up with one piece that is as long as possible.  You'll notice the optomized solution has a remaining length of 96 inches.  This gives them almost 3 feet more of usable metal for future orders.  This is just a simple example.  Typically orders may have several different cutting lengths all with different quantities.  They also usually aren't nice round cutting lengths either.  Most of the time they are random lengths such as 45.125 inches, 19.375 inch, 32.2 inches and 27.122 inches.  You can see how this can get quite complicated, especially if you add in larger quantites of 50 or 100 pieces per line.

## Process
I began my process by solving small problems on a sheet of paper.  I used the example above and wrote out every possile way to cut a bar using those lengths along with their remaining piece.  I then chose the cutting order, by selecting the cutting combination that had the smallest remaining piece as long as I still needed those number of pieces.  If I would end up with having more pieces than neccessary, I would move on to the next lowest remainder.  Once I figured out this brute force solution, I began coding.  I then stumbled upon a better solution for the example above.  Orginally I had what I made a program that did exactly that.  I creates every single possible cutting pattern, then chooses the pattern that has the smallest remaining length, as long as all the pieces in that pattern were still needed.

I then realized that this was not always the perfect solution, and began doing some research which lead me to the stock cutting problem on Wikipedia.  After further research, I discovered there is not a mathematical way of solving this other than by going through each and every possible solution.  So I have gone back to using my method as a quick and mostly correct method to solving this problem.
