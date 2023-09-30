import {
  TAU,
  lerp,
  roundTo7,
  xorshift128,
  generateStateFromSeed,
  value,
  valueInv,
  rangeInt,
  rangeFloat,
  polarCoordinatesToVector,
  sphericalCoordinatesToVector,
  normalize3dVector,
  normalizeQuaternion,
  hopfMapping,
  hsvToRgb,
} from "./utils";

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

    const polarCoordinates = {
      theta: valueInv(this.next) * TAU,
      radius: Math.sqrt(valueInv(this.next)),
    }

    const {x, y} = polarCoordinatesToVector(polarCoordinates);
    
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

    const sphericalCoordinates = {
      phi: Math.acos(2 * valueInv(this.next) - 1),
      theta: valueInv(this.next) * TAU,
      radius: value(this.next) ** (1/3),
    }

    const {x, y, z} = sphericalCoordinatesToVector(sphericalCoordinates);

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

    const {x, y, z} = normalize3dVector(this.insideUnitSphere);

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

    const baseQuaternion = {
      x: rangeFloat(this.next, -1, 1),
      y: rangeFloat(this.next, -1, 1),
      z: rangeFloat(this.next, -1, 1),
      w: rangeFloat(this.next, -1, 1),
    };

    const {x, y, z, w} = normalizeQuaternion(baseQuaternion);

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

    const baseVector = {
      x: value(this.next),
      y: value(this.next),
      z: value(this.next),
    }

    const {x, y, z, w} = hopfMapping(baseVector);

    return {
      x: roundTo7(x),
      y: roundTo7(y),
      z: roundTo7(z),
      w: roundTo7(w),
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

    const {r, g, b} = hsvToRgb(h, s, v);

    return {
      r: roundTo7(r),
      g: roundTo7(g),
      b: roundTo7(b),
      a: roundTo7(a),
    }
  };
}

export default new UnyRandom();
