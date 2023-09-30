const MANTISSA_MAX = 2 ** 23 - 1;
const BOROSH_INIT = 1812433253;
const TAU = Math.fround(2 * Math.PI);

const toUnsigned = (num) => num >>> 0;
const roundTo7 = (num) => Number(num.toPrecision(7));
const borosh13 = (num) => toUnsigned(Math.imul(BOROSH_INIT, num) + 1);
const value = (rand) => Math.fround(toUnsigned(rand & MANTISSA_MAX) / MANTISSA_MAX);
const valueInv = (rand) => Math.fround(1 - value(rand));
const lerp = (x, y, a) => x * (1 - a) + y * a;

const rangeInt = (rand, min, max) => {
  const result = (rand % (min - max)) + min;
  if ( min > max) {
    return 2 * min - result;
  }
  return result;
}

const rangeFloat = (rand, min, max) => {
  const roundedMin = Math.fround(min);
  const roundedMax = Math.fround(max);
  return Math.fround(value(rand) * (roundedMin - roundedMax) + roundedMax);
};

const generateStateFromSeed = (seed) => {
  const s0 = toUnsigned(seed);
  const s1 = borosh13(s0);
  const s2 = borosh13(s1);
  const s3 = borosh13(s2);

  return [s0, s1, s2, s3];
};

const xorshift128 = ([x, , , y]) => {
  x ^= x << 11;
  x ^= x >>> 8;
  y ^= y >>> 19;
  
  return toUnsigned(y ^ x);
};

/** Non-static implementation of the UnityEngine.Random class
 * @see {@link https://docs.unity3d.com/ScriptReference/Random.html UnityEngine.Random}
 */
export class UnyRandom {
  
  #state;

  /** @param seed Default value = Date.now() */
  constructor(seed = Date.now()) {
    this.#state = generateStateFromSeed(seed);
  };

  /** Initializes the random number generator state with a seed
   * @see {@link https://docs.unity3d.com/ScriptReference/Random.InitState.html UnityEngine.Random.InitState}
   * @param seed Default value = Date.now()
   */
  initState(seed = Date.now()) {
    this.#state = generateStateFromSeed(seed);
    return this;
  };

  /** Gets or sets the internal Xorshift 128 state array of the random number generator
   * @see {@link https://docs.unity3d.com/ScriptReference/Random-state.html UnityEngine.Random.state}
   * @return {[number,number,number,number]}
   */
  get state() {
    return this.#state;
  }
  set state(newState) {
    this.#state = newState;
  }

  /** Returns a random unsigned int within [0..MAX_UINT32] (range is inclusive)
   * @returns {number}
   * @readonly
   */
  get next() {
    const newRandom = xorshift128(this.#state);
    this.#state = [...this.#state.slice(1), newRandom];

    return newRandom;
  };

  /** Skips 'step' number of generated numbers.
   * @param {number} steps
   */
  skip(steps) {
    for (let i = 0; i < steps; ++i) {
      this.next;
    }
    return this;
  }

  /** Returns a random float within [0.0..1.0] (range is inclusive)
   * @see {@link https://docs.unity3d.com/ScriptReference/Random-value.html UnityEngine.Random.value}
   * @readonly
   */
  get value() {
    return roundTo7(value(this.next));
  };

  /** Returns a random float within [min..max] (range is inclusive).  
   * Used to controll behaviour since JS auto-converts whole numbers to Integers
   * @see {@link https://docs.unity3d.com/ScriptReference/Random.Range.html UnityEngine.Random.Range}
   * @param {number} min
   * @param {number} max
   */
  rangeFloat(min, max) {
    return roundTo7(rangeFloat(this.next, min, max));
  };

  /** Returns a random int within [min..max) (range max is eclusive).  
   * Used to controll behaviour since JS auto-converts whole numbers to Integers
   * @see {@link https://docs.unity3d.com/ScriptReference/Random.Range.html UnityEngine.Random.Range}
   * @param {number} min
   * @param {number} max
   */
  rangeInt(min, max) {
    return rangeInt(this.next, min, max);
  };

  /** Returns a random number in a range.
   * Using {@link rangeInt rangeInt} if both parameters are integers,
   * else using {@link rangeFloat rangeFloat}.  
   * Minimum value is == 0 if called with only one parameter.
   * 
   * @see {@link https://docs.unity3d.com/ScriptReference/Random.Range.html UnityEngine.Random.Range}
   * @param {number} minOrMax Max value if called with one parameter, else minimum
   * @param {number} [max]
   */
  range(minOrMax, max) {
    return (Number.isInteger(minOrMax) && (max === undefined || Number.isInteger(max)))
      ? this.rangeInt(minOrMax, max)
      : this.rangeFloat(minOrMax, max);
  };

  /** Returns a random point inside or on a circle with radius 1.0
   * @see {@link https://docs.unity3d.com/ScriptReference/Random-insideUnitCircle.html UnityEngine.Random.insideUnitCircle}
   * @readonly
   */
  get insideUnitCircle() {
    const theta = valueInv(this.next) * TAU;
    const radius = Math.sqrt(valueInv(this.next));

    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);

    return {
      x: roundTo7(x),
      y: roundTo7(y),
    };
  }

  /** Returns a random point inside or on a sphere with radius 1.0
   * @see {@link https://docs.unity3d.com/ScriptReference/Random-insideUnitSphere.html UnityEngine.Random.insideUnitSphere}
   * @readonly
   */
  get insideUnitSphere() {

    const phi = Math.acos(2 * valueInv(this.next) - 1);
    const theta = valueInv(this.next) * TAU;
    const radius = value(this.next) ** (1/3);

    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);
    const sinPhi = Math.sin(phi);
    const cosPhi = Math.cos(phi);

    const x = radius * sinPhi * cosTheta;
    const y = radius * sinPhi * sinTheta;
    const z = radius * cosPhi;

    return {
      x: roundTo7(x),
      y: roundTo7(y),
      z: roundTo7(z),
    };
  }

  /** Returns a random point on the surface of a sphere with radius 1.0
   * @see {@link https://docs.unity3d.com/ScriptReference/Random-onUnitSphere.html UnityEngine.Random.onUnitSphere}
   * @readonly
   */
  get onUnitSphere() {
    const baseVector = this.insideUnitSphere;
    const length = Math.sqrt(baseVector.x ** 2 + baseVector.y ** 2 + baseVector.z ** 2);

    const x = baseVector.x / length;
    const y = baseVector.y / length;
    const z = baseVector.z / length;

    return {
      x: roundTo7(x),
      y: roundTo7(y),
      z: roundTo7(z),
    };
  }

  /** Returns a random rotation
   * @see {@link https://docs.unity3d.com/ScriptReference/Random-rotation.html UnityEngine.Random.rotation}
   * @readonly
   */
  get rotation() {

    const baseX = rangeFloat(this.next, -1, 1);
    const baseY = rangeFloat(this.next, -1, 1);
    const baseZ = rangeFloat(this.next, -1, 1);
    const baseW = rangeFloat(this.next, -1, 1);

    const length = Math.sqrt(baseW ** 2 + baseX ** 2 + baseY ** 2 + baseZ ** 2) * ((baseW >= 0) || -1);

    const x = baseX / length;
    const y = baseY / length;
    const z = baseZ / length;
    const w = baseW / length;

    return {
      x: roundTo7(x),
      y: roundTo7(y),
      z: roundTo7(z),
      w: roundTo7(w),
    };
  }

  /** Returns a random rotation with uniform distribution
   * @see {@link https://docs.unity3d.com/ScriptReference/Random-rotationUniform.html UnityEngine.Random.rotationUniform}
   * @readonly
   */
  get rotationUniform() {
    const u1 = value(this.next);
    const u2 = value(this.next);
    const u3 = value(this.next);

    const x = Math.sqrt(u1) * Math.sin(TAU*u2);
    const y = Math.sqrt(u1) * Math.cos(TAU*u2);
    const z = Math.sqrt(1 - u1) * Math.sin(TAU*u3);
    const w = Math.sqrt(1 - u1) * Math.cos(TAU*u3);

    const isWNegative = (w < 0);

    return {
      x: roundTo7(x) * (isWNegative || -1),
      y: roundTo7(y) * (!isWNegative || -1),
      z: roundTo7(z) * (isWNegative || -1),
      w: roundTo7(w) * (!isWNegative || -1),
    };
  }

  /** Generates a random color from HSV and alpha ranges.
   * @see {@link https://docs.unity3d.com/ScriptReference/Random.ColorHSV.html UnityEngine.Random.ColorHSV}
   */
  colorHSV(hueMin = 0, hueMax = 1, saturationMin = 0, saturationMax = 1, valueMin = 0, valueMax = 1, alphaMin = 1, alphaMax = 1) {
    const h = lerp(hueMin, hueMax, value(this.next));
    const s = lerp(saturationMin, saturationMax, value(this.next));
    const v = lerp(valueMin, valueMax, value(this.next));
    const a = lerp(alphaMin, alphaMax, value(this.next));

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    let r = 0;
    let g = 0;
    let b = 0;

    switch (i % 6) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
  }

    return {
      r: roundTo7(r),
      g: roundTo7(g),
      b: roundTo7(b),
      a: roundTo7(a),
    }
  };
}

export default new UnyRandom();
