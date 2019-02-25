# Introduction
## Problem Scenario
One of my friends, who works at Parker Steel, approached me with an issue he was having at work.  He knew I was into programming and asked if there was any way to write a program to do what he was asking.  In short, he wanted a program that would help him determine the best cutting order for pieces in order to have one large remaining piece at the end, rather than several shorter pieces.

## Example
Parker Steel uses stock approximately 12 feet long.  Sometimes they use longer stock, such as 20 feet, but for the most part it is 12 feet.  They take this metal and cut it down to a customers ordered length and quantity.  For this pretend order, we are going to pretend the customer has two lines on their order:
    1. 15 pieces of 19 inch lengths
    2. 30 pieces of 16 inch lengths

Typically, the cutting engineers will spend about 30 minutes - 1 hour trying to find an optimal way to cut the metal; however, they often end up just cutting the metal in order, especially if they have several orders come in.
    
### Normal Cutting Method
<table>
    <tr>
        <th></th>
        <th colspan="2">Pieces Cut</th>
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
        <th colspan="2">Pieces Cut</th>
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
        <td>5</td>
        <td>3</td>
        <td></td>
        <td>12</td>
        <td>3</td>
        <td></td>
        <td>11 in. x 1, 1 in. x 1</td>
    </tr>
    <tr>
        <th>Bar 3</th>
        <td>0</td>
        <td>9</td>
        <td></td>
        <td>12</td>
        <td>12</td>
        <td></td>
        <td>11 in. x 1, 1 in. x 1</td>
    </tr>
    <tr>
        <th>Bar 4</th>
        <td>0</td>
        <td>9</td>
        <td></td>
        <td>12</td>
        <td>21</td>
        <td></td>
        <td>11 in. x 1, 1 in. x 1</td>
    </tr>
    <tr>
        <th>Bar 5</th>
        <td>0</td>
        <td>9</td>
        <td></td>
        <td>12</td>
        <td>30</td>
        <td></td>
        <td>11 in. x 1, 1 in. x 1</td>
    </tr>
     <tr>
        <th>Bar 6</th>
        <td>3</td>
        <td>0</td>
        <td></td>
        <td>15</td>
        <td>30</td>
        <td></td>
        <td>87 in x 1, 11 in. x 1, 1 in. x 1</td>
    </tr>
</table>

#### Results
The key in this peoject are the remaining pieces.  You want to have as few remaining pieces as possible, make the remaining pieces as small as possible, and end up with one piece that is as long as possible.  You'll notice the optomized solution, only has three left over pieces of metal, where as normally the cutting engineers would end up with four pieces, with the last piece being almost 2 feet shorter than optimal.  This is just a simple example.  Typically orders may have 5-15 different cutting lengths all with different quantities.  They also usually aren't nice round cutting lengths either.  Most of the time they are random lengths such as 45.125 inches, 19.375 inch, 32.2 inches and 27.122 inches.  You can see how this can get quite complicated, especially if you add in larger quantites of 50 or 100 pieces per line.

## Process
I began my process by solving small problems on a sheet of paper.  I used the example above and wrote out every possile way to cut a bar using those lengths along with their remaining piece.  I then chose the cutting order, by selecting the cutting combination that had the smallest remaining piece as long as I still needed those number of pieces.  If I would end up with having more pieces than neccessary, I would move on to the next lowest remainder.  Once I figured out this brute force solution, I began coding.
