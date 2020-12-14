# Julia Sets Generator

# Usage
* Launch the `run.bat` file. <br />
* Specify the name of the folder in which to store the rendered frames <br />
* Specify the number of frames to render <br />
* Specify the resolution multiplier <br />
ex: `0.5 = 960x540`,`1 = 1920x1080 HD`, `2 = 3840x2160 4K`

# Default formula

The default formula is `Zn+1 = Zn^2 + c + e` <br />



 `t = nb of total frames` <br />
 `a = current frame index`<br />
  `c = Zn` (Complex number)<br />
  `e = sin( (2*PI/t)*a ) + cos( (2*PI/t)*a )i` (Complex number)<br />

   trig functions are in radians. <br />


# Video example
https://youtu.be/gsstxaBSgMY
