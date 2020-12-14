# Julia Sets Generator

# Usage
* Launch the `run.bat` file. <br />
* Specify the name of the video you want to generate with the number of total frames to generate<br />
ex: `video1 240 `

# Default formula

The default formula is `Zn+1 = Zn^2 + c + e` <br />



 `t = nb of total frames` <br />
 `a = current frame index`<br />
  `c = Zn` (Complex number)<br />
  `e = sin( (2*PI/t)*a ) + cos( (2*PI/t)*a )i` (Complex number)<br />
 
   trig functions are in radians. <br />


