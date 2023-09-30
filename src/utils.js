const TAU = Math.fround(2 * Math.PI);
const MANTISSA_MAX = 2 ** 23 - 1;
const BOROSH_INIT = 1812433253;

const toUnsigned = (num) => num >>> 0;
const borosh13 = (num) => toUnsigned(Math.imul(BOROSH_INIT, num) + 1);
const lerp = (x, y, a) => x * (1 - a) + y * a;
const roundTo7 = (num) => Number(num.toPrecision(7));
const value = (rand) => Math.fround(toUnsigned(rand & MANTISSA_MAX) / MANTISSA_MAX);
const valueInv = (rand) => Math.fround(1 - value(rand));

const xorshift128 = ([x, , , y]) => {
  
  x ^= x << 11;
  x ^= x >>> 8;
  y ^= y >>> 19;
  
  return toUnsigned(y ^ x);
};

const generateStateFromSeed = (seed) => {

  const s0 = toUnsigned(seed);
  const s1 = borosh13(s0);
  const s2 = borosh13(s1);
  const s3 = borosh13(s2);

  return [s0, s1, s2, s3];
};

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

const polarCoordinatesToVector = ({theta, radius}) => {

  const x = radius * Math.cos(theta);
  const y = radius * Math.sin(theta);

  return {x, y};
}

const sphericalCoordinatesToVector = ({theta, phi, radius}) => {

    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);
    const sinPhi = Math.sin(phi);
    const cosPhi = Math.cos(phi);

    const x = radius * sinPhi * cosTheta;
    const y = radius * sinPhi * sinTheta;
    const z = radius * cosPhi;

    return {x, y, z};
}

const normalize3dVector = ({x: baseX, y: baseY, z: baseZ}) => {

  const length = Math.sqrt(baseX ** 2 + baseY ** 2 + baseZ ** 2);

  const x = baseX / length;
  const y = baseY / length;
  const z = baseZ / length;

  return {x, y, z};
}

const normalizeQuaternion = ({x: baseX, y: baseY, z: baseZ, w: baseW}) => {
  
  const length = Math.sqrt(baseW ** 2 + baseX ** 2 + baseY ** 2 + baseZ ** 2) * ((baseW >= 0) || -1);

  const x = baseX / length;
  const y = baseY / length;
  const z = baseZ / length;
  const w = baseW / length;

  return {x, y, z, w};
}

const hopfMapping = ({x: u1, y: u2, z: u3}) => {
  
  const sqrtU1 = Math.sqrt(u1);
  const invSqrtU1 = Math.sqrt(1 - u1);
  const flipFactor = (u3 <= 0.25 || u3 > 0.75) || -1;

  const x = sqrtU1 * Math.sin(TAU*u2) * -flipFactor;
  const y = sqrtU1 * Math.cos(TAU*u2) * flipFactor;
  const z = invSqrtU1 * Math.sin(TAU*u3) * -flipFactor;
  const w = invSqrtU1 * Math.cos(TAU*u3) * flipFactor;

  return {x, y, z, w};
}

const hsvToRgb = (h, s, v) => {

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

  return {r, g, b};
}

export {
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
}
