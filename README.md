# UnyRandom [![npm version](https://img.shields.io/npm/v/uny-random.svg)](https://www.npmjs.com/package/uny-random) [![license](https://img.shields.io/npm/l/uny-random.svg)](LICENSE)

<h2 align="center">
  Open-source JavaScript Implementation of Unity's PRNG, <a href="https://docs.unity3d.com/ScriptReference/Random.html">UnityEngine.Random</a>
</h2>

UnyRandom allows seamless mimicry of the Unity Game Engine's PRNG behaviors in JavaScript / TypeScript projects, or directly in browsers.

---
> This package is not sponsored by or affiliated with Unity Technologies or its affiliates. "Unity" is a trademark or registered trademark of Unity Technologies or its affiliates in the U.S. and elsewhere. All the code in this package is only made to mirror the behavior of the original PRNG and is not to be seen as a representation of the original source code owned by Unity Technologies.
---

## Quick Start

1. **Install the package:**

    ```shell
    npm install uny-random
    ```

    Or, use your preferred package manager like yarn or pnpm.

1. **Import into your project:**

    ```js
    import unyRandom from 'UnyRandom'; // For a static version of the PRNG
    // or
    import { UnyRandom } from 'UnyRandom'; // To make the UnyRandom parent class available in case you need multiple copies
    ```
1. **For Direct Browser Use:**

    Add the mini version to your website. This version is ES5 backward compatible and globally available as a static instance called `unyRandom`.

    ```html
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/uny-random@1.6.1/dist/uny-random.min.js"></script>
    ```

## Features

UnyRandom is designed to replicate the methods and properties of the [UnityEngine.Random](https://docs.unity3d.com/ScriptReference/Random.html class. If something seems missing or off, please let us know!

### Example Usage

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

UnyRandom also includes enhanced functionalities like a basic fluent interface, the ability to skip forward, obtaining the internal uInt value with `.next`, and specifying whether you want an `intRange` or `floatRange`.

```js
unyRandom.initState(11288839).value; // => 0.9660726
unyRandom.skip(5).value; // => 0.3456783
unyRandom.rangeInt(-100, 200); // => 78
unyRandom.rangeFloat(-100, 200); // => 149.5162
unyRandom.next; // => 1434251478
```
## FAQ

### How accurate is UnyRandom compared to Unity's PRNG?
UnyRandom underwent extensive Test-Driven Development with a few hundred test cases to ensure accurate replication of UnityEngine.Random’s behavior. Note that discrepancies may occur due to differences in float processing between C++ and JavaScript.

### Can we contribute to or modify UnyRandom?
While UnyRandom is mostly feature-complete, contributions and improvements are welcome! If Unity releases updates or if you find bugs or missing features, feel free to contribute.

### Where has Unity published their source code? / How did you manage to decompile the C++ Runtime?
Unity's runtime is closed source but we did not decompile anything. UnyRandom was created from trial and error by testing various PRNG implementations based on open information made public by Unity Technologies themselves.

## Contributing

- Report issues or bugs [here](https://github.com/MoatShrimp/uny-random/issues)
- Contributions are welcome! While UnyRandom is largely feature-complete, we're open to any enhancements or fixes.

## License
[MIT License](LICENSE)
