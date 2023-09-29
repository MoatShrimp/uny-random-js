const MANTISSA_MAX = 0x7FFFFF;
const BOROSH_INIT = 1812433253;

const toUInt32 = (num) => num >>> 0;
const toFloat = (num) => Number(Math.fround(num).toPrecision(9));

const borosh13 = (num) => toUInt32(Math.imul(BOROSH_INIT, num) + 1);

/** Non-static implementation of the UnityEngine.Random class
 * @see {@link https://docs.unity3d.com/ScriptReference/Random.html UnityEngine.Random}
 */
export class UnyRandom {
  #seedState;

  /** @param seed Default value = Date.now() */
  constructor(seed) {
    this.initState(seed);
  }

  /** Initializes the random number generator state with a seed
   * @see {@link https://docs.unity3d.com/ScriptReference/Random.InitState.html UnityEngine.Random.InitState}
   * @param seed Default value = Date.now()
   */
  initState(seed = Date.now()) {
    const s0 = toUInt32(seed);
    const s1 = borosh13(s0);
    const s2 = borosh13(s1);
    const s3 = borosh13(s2);

    this.seedState = [s0, s1, s2, s3];

    return this;
  }

  /** Gets or sets the internal Xorshift 128 state array of the random number generator
   * @see {@link https://docs.unity3d.com/ScriptReference/Random-state.html UnityEngine.Random.state}
   * @return {[number,number,number,number]}
   */
  get state() {
    return this.seedState;
  }
  set state(newState) {
    this.seedState = newState;
  }

  /** Returns a random unsigned int within [0..MAX_UINT32] (range is inclusive)
   * @returns {number}
   * @readonly
   */
  get nextUInt() {
    let x = this.seedState[0];
    let y = this.seedState[3];

    x ^= x << 11;
    x ^= x >>> 8;
    y ^= y >>> 19;
    y = toUInt32(y ^ x);

    this.seedState.shift();
    this.seedState.push(y);

    return y;
  }

  /** Skips 'step' number of generated numbers.
   * @param {number} steps
   */
  skip(steps) {
    for (let i = 0; i < steps; ++i) {
      /* eslint-disable-next-line no-unused-expressions */
      this.nextUInt;
    }
    return this;
  }

  /** Returns a random float within [0.0..1.0] (range is inclusive)
   * @see {@link https://docs.unity3d.com/ScriptReference/Random-value.html UnityEngine.Random.value}
   * @readonly
   */
  get value() {
    return toFloat(toUInt32(this.nextUInt & MANTISSA_MAX) / MANTISSA_MAX);
  }

  /** Returns a random number in a range.
   * Using {@link rangeInt rangeInt} if both parameters are integers,
   * else using {@link rangeFloat rangeFloat}.  
   * Minimum value is == 0 if called with only one parameter.
   * 
   * @see {@link https://docs.unity3d.com/ScriptReference/Random.Range.html UnityEngine.Random.Range}
   * @param {number} minOrMax Max value if called with one parameter, else minimum
   * @param {number} [max]
   */
  range(min, max) {
    return (!Number.isInteger(min) || !Number.isInteger(max))
      ? this.rangeFloat(min, max)
      : this.rangeInt(min, max);
  }

  /** Returns a random int within [min..max) (range max is eclusive).  
   * Used to controll behaviour since JS auto-converts whole numbers to Integers
   * @see {@link https://docs.unity3d.com/ScriptReference/Random.Range.html UnityEngine.Random.Range}
   * @param {number} min
   * @param {number} max
   */
  rangeInt(minInclusive, maxExclusive) {
    /* eslint-disable no-param-reassign */
    if (minInclusive > maxExclusive) {
      [minInclusive, maxExclusive] = [maxExclusive, minInclusive];
    }
    /* eslint-enable no-param-reassign */

    return (this.nextUInt % (maxExclusive - minInclusive)) + minInclusive;
  }

  /** Returns a random float within [min..max] (range is inclusive).  
   * Used to controll behaviour since JS auto-converts whole numbers to Integers
   * @see {@link https://docs.unity3d.com/ScriptReference/Random.Range.html UnityEngine.Random.Range}
   * @param {number} min
   * @param {number} max
   */
  rangeFloat(minInclusive, maxInclusive) {
    /* eslint-disable no-param-reassign */
    if (minInclusive > maxInclusive) {
      [minInclusive, maxInclusive] = [maxInclusive, minInclusive];
    }
    minInclusive = Math.fround(minInclusive);
    maxInclusive = Math.fround(maxInclusive);
    /* eslint-enable no-param-reassign */

    return toFloat(maxInclusive + this.value * (minInclusive - maxInclusive));
  }
}

  /**
   * Instance of UnyRandom
   */
export default new UnyRandom();
