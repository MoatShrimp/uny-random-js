type seedState = [number, number, number, number];

const MANTISSA_MAX = 0x7FFFFF;
const BOROSH_INIT = 1812433253;

const toUInt32 = (num:number) => num >>> 0;
const toFloat = (num:number) => Number(Math.fround(num).toPrecision(9));

/**
 * @function borosh13 - PRNG used to initialize the uRandom internal Xorshift 128 state array
 */
const borosh13 = (num:number) => toUInt32(Math.imul(BOROSH_INIT, num) + 1);

/**
 * Non-static JavaScript implementation of the UnityEngine.Random class
 * @see {@link https://docs.unity3d.com/ScriptReference/Random.html UnityEngine.Random}
 * @see Based on Xorshift 128, more info on {@link https://en.wikipedia.org/wiki/Xorshift  Wikipedia}
 */
export class UnyRandom {
  private seedState!:seedState;

  constructor(seed?:number) {
    this.initState(seed);
  }

  /**
   * Initializes the random number generator state with a seed.
   * @see {@link https://docs.unity3d.com/ScriptReference/Random.InitState.html UnityEngine.Random.InitState}
   * @param [seed=Date.now()] - Seed used to initialize the random number generator,
   * default value = Date.now()
   * @return the current instance of uRandom
   */
  initState(seed = Date.now()):this {
    const s0 = toUInt32(seed);
    const s1 = borosh13(s0);
    const s2 = borosh13(s1);
    const s3 = borosh13(s2);

    this.seedState = [s0, s1, s2, s3];

    return this;
  }

  /**
   * Gets the internal Xorshift 128 state array of the random number generator
   * @see {@link https://docs.unity3d.com/ScriptReference/Random-state.html UnityEngine.Random.state}
   * @return number[] containing the four Xorshift 128 seeds
   */
  get state():seedState {
    return this.seedState;
  }

  /**
   * Sets the internal Xorshift 128 state array of the random number generator
   * @see {@link https://docs.unity3d.com/ScriptReference/Random-state.html UnityEngine.Random.state}
   * @return the current instance of uRandom
   */
  set state(newState:seedState) {
    this.seedState = newState;
  }

  /**
   * Generates a random unsigned integer
   * @returns a random unsigned integer within [0..UInt32.MaxValue]
   * @readonly
   */
  get nextUInt():number {
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

  /**
   * Skips 'steps' number of generated numbers.
   * @returns the current instance of uRandom
   */
  skip(steps:number):this {
    for (let i = 0; i < steps; ++i) {
      /* eslint-disable-next-line no-unused-expressions */
      this.nextUInt;
    }
    return this;
  }

  /**
   * Generates a random float within [0.0..1.0] (range is inclusive)
   * @see {@link https://docs.unity3d.com/ScriptReference/Random-value.html UnityEngine.Random.value}
   * @returns a random float
   * @readonly
   */
  get value() {
    return toFloat(toUInt32(this.nextUInt & MANTISSA_MAX) / MANTISSA_MAX);
  }

  /**
   * Genrates a random number in a range.
   * {@link rangeInt Integer} if both parameters are integers,
   * else a {@link rangeFloat floating point number}
   * @see {@link https://docs.unity3d.com/ScriptReference/Random.Range.html UnityEngine.Random.Range}
   * @param min minmal number
   * @param max maximal number
   * @returns a random number between min and max
   */
  range(min:number, max:number):number {
    return (!Number.isInteger(min) || !Number.isInteger(max))
      ? this.rangeFloat(min, max)
      : this.rangeInt(min, max);
  }

  /**
   * Genrates a random int within [minInclusive..maxExclusive)
   * @see {@link https://docs.unity3d.com/ScriptReference/Random.Range.html UnityEngine.Random.Range}
   * @param minInclusive minmal integerr
   * @param maxExclusive maximal integer
   * @returns a random integer between min and max
   */
  rangeInt(minInclusive:number, maxExclusive:number) {
    /* eslint-disable no-param-reassign */
    if (minInclusive > maxExclusive) {
      [minInclusive, maxExclusive] = [maxExclusive, minInclusive];
    }
    /* eslint-enable no-param-reassign */

    return (this.nextUInt % (maxExclusive - minInclusive)) + minInclusive;
  }

  /**
   * Genrates a random float within [minInclusive..maxInclusive]
   * @see {@link https://docs.unity3d.com/ScriptReference/Random.Range.html UnityEngine.Random.Range}
   * @param minInclusive minmal float
   * @param maxInclusive maximal float
   * @returns a random float between min and max based on the current state
   */
  rangeFloat(minInclusive:number, maxInclusive:number) {
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

export default new UnyRandom();
