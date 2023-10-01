# UnyRandom [![npm version](https://img.shields.io/npm/v/uny-random.svg)](https://www.npmjs.com/package/uny-random) [![license](https://img.shields.io/npm/l/uny-random.svg)](LICENSE)

<div align="center">
  <h2>
    An open source JavaScript implementation of the PRNG <a href="https://docs.unity3d.com/ScriptReference/Random.html">UnityEngine.Random</a> </br>
    With UnyRandom, you easily can mimic the behavior of the Unity Game Engine's PRNG in any JS / TS project, or even in the browser directly</br>
  </h2>
</div>

---
> This package is not sponsored by or affiliated with Unity Technologies or its affiliates. "Unity" is a trademark or registered trademark of Unity Technologies or its affiliates in the U.S. and elsewhere. All the code in this package is only made to mirror the behavior of the original PRNG and is not to be seen as a representation of the original source code owned by Unity Technologies.
---

## Quick start

Install the [uny-random npm package](https://www.npmjs.com/package/uny-random):

```sh
npm install uny-random # or via any other package manager you might use such as yarn or pnpm
```

The package can then be easily added to your project via ES6 import:

```JavaScript
import unyRandom from 'UnyRandom'; // For a static version of the PRNG
// or
import { UnyRandom } from 'UnyRandom'; // To make the UnyRandom parent class available in case you need multiple copies
```

The randomizer can also be added directly to a website (mini version is ES5 backwards compatible), and will be globally available as an instance called `unyRandom`

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/uny-random@1.6.1/dist/uny-random.min.js"></script>
```

## Features

UnyRandom is made to replicate the behavior of all the methods and properties attached to the [UnityEngine.Random](https://docs.unity3d.com/ScriptReference/Random.html) class and all UnityEngine.Random. If you find something missing, please reach out!

### Example usage

```js
const unyRandom = new UnyRandom();
unyRandom.value; // => 0.8190207
unyRandom.initState(926378578) // => new state = [926378578, 4043363419, 3111484136, 1182246281]
unyRandom.range(-1200, 123544); // => 2494
unyRandom.range(-10.5, 99.6); // => 11.33
unyRandom.state; // => [255129647,  4127199628, 2722027581, 1244591378] 
unyRandom.insideUnitCircle; // => { x: -0.5568735, y: 0.3252837 }
unyRandom.colorHSV(0.18, 0.85, 0.38, 1, 0, 0.05, 0, 1) // => { r: 0.001949894, g: 0.002597082, b: 0.005258002, a: 0.05327214 }
unyRandom.rotationUniform; // => { x: -0.6366615, y: -0.7671657, z: -0.04677578, w: 0.062698 }
```

there are also some additional functionality added such as a basic fluent interface, the ability to skip forward, getting the UInt value all the test of values are based on via `.next` and specifying if you want an intRange or floatRange
```js
unyRandom.initState(11288839).value; // => 0.9660726
unyRandom.skip(5).value; // => 0.3456783
unyRandom.rangeInt(-100, 200); // => 78
unyRandom.rangeFloat(-100, 200); // => 149.5162
unyRandom.next; // => 1434251478
```
## FAQ

### Where has Unity published this code?
They have not. Their runtime is closed source.

### How did you manage to decompile the C++ Runtime?
I did not decompile anything. UnyRandom was created from open information made public by Unity Technologies themselves

### Closed source and no decompilation? How did yo make it then?
Trial and error. This project has been 100% test driven with test cases being created based on results from Unity and testing various PRNG implementations based on the data till the tests pass. [TDD!](https://en.wikipedia.org/wiki/Test-driven_development)

### If you did not use Unity's code directly, how can we be sure it's correct?
There are 350 different test cases added to this relativly small project for that reason, to make sure that UnyRandom properly reflects the behaviour of UnityEngine.Random. [Feel free to check them out!](__tests__/)

### I'm getting some weird rounding errors sometimes when I'm asking for floats! Eg. `.insideUnitCircle` from Unity gives me `y: 0.03002666`, but UnyRandom gives me `y: 0.03002665`
This is an effect of `UnityEngine.Random` being made in C++ and `UnyRandom` using JavaScript. C++ is using [extended precision](https://en.wikipedia.org/wiki/Extended_precision) for floating point arithmetic (80 bit during calculation, rounding it down to a 32 bit at the end), while JS is natively always working with 64 bit floats. So you get some very, very, very small differences... sometimes. I've added as much sane rounding as possible to replicate the result of UnityEngine.Random without going complete overkill. At it's worse it's about 0.00005% incorrect which should be well within margin of error for 99% of applications

## Contributing

- Missing something or found a bug? [Report here](https://github.com/MoatShrimp/uny-random/issues).
- Want to contribute? UnyRandom is mostly feature complete, so unless there is an update from Unity, there is not much more or add. But if you have anything feel free to reach out!
