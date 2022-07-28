# UnyRandom [![npm version](https://img.shields.io/npm/v/uny-random.svg)](https://www.npmjs.com/package/uny-random) [![license](https://img.shields.io/npm/l/uny-random.svg)](LICENSE.md)

With UnyRandom, you easily can mimic the behaviour of the Unity Game Engine's PRNG [**UnityEngine.Random**](https://docs.unity3d.com/ScriptReference/Random.html) using JavaScript.

---

> This package is not sponsored by or affiliated with Unity Technologies or its affiliates. "Unity" is a trademark or registered trademark of Unity Technologies or its affiliates in the U.S. and elsewhere. All the code in this package is only made to mirror the behaviour of the original PRNG and is not to be seen as a representation of the original source code written by Unity Technologies.

---

## How to install

UnyRandom is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/), available for installation via any popular JavaScript package manager.

To add the module to a Node.js project, make sure you have at least Node.js v13 or higher installed and add the package via the appropriate command:

```sh
npm install uny-random
# or
pnpm add uny-random
# or
yarn add uny-random
```

The package can then be added to your project via ES6 import:

```JavaScript
import unyRandom from 'UnyRandom'; // For a static version of the PRNG
// or
import { UnyRandom } from 'UnyRandom'; // To make the UnyRandom parent class available
```


UnyRandom can also be added directly to an HTML page:

```html
<script type="module">
  import unyRandom from 'https://cdn.jsdelivr.net/npm/uny-random@![npm version]/lib/UnyRandom.min.js';
  window.unyRandom = unyRandom; // To expose the imported object to the rest of the page
</script>
```

---

## How to use

The class is made to replicate behaviour of the [UnityEngine.Random](https://docs.unity3d.com/ScriptReference/Random.html)
