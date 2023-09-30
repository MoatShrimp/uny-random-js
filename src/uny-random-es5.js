// ES5 version of the randomizer for use with sites such as MediaWiki

export default function unyRandom(seed) {
  
  var TAU = 2 * Math.PI;
	var MANTISSA_MAX = 8388607;
  
  function lerp(x, y, a) {
    return x * (1 - a) + y * a;
  }

  function toUnsigned(num) {
    return num >>> 0;
  }

  function borosh13(num) {
    return toUnsigned(toUnsigned(1289 * num) * 1406077 + 1);
  }

  function generateStateFromSeed(seed) {

    var s0 = toUnsigned(seed);
    var s1 = borosh13(s0);
    var s2 = borosh13(s1);
    var s3 = borosh13(s2);

    return [s0, s1, s2, s3];
  }

  function xorshift128(state) {

    var x = state[0];
    var y = state[3];

    x ^= x << 11;
    x ^= x >>> 8;
    y ^= y >>> 19;

    return toUnsigned(y ^ x);
  }

  function roundTo7(num) {
    return Number(num.toPrecision(7));
  }

  function value(rand) {
    return toUnsigned(rand & MANTISSA_MAX) / MANTISSA_MAX;
  }
  
  function valueInv(rand) {
    return 1 - value(rand);
  }

  function rangeInt(rand, min, max) {

    var result = (rand % (min - max)) + min;

    if (min > max) {
      return 2 * min - result;
    }

    return result;
  }

  function rangeFloat(rand, min, max) {
    return Math.fround(value(rand) * (min - max) + max);
  }

  function polarCoordinatesToVector(coordinates) {

    var theta = coordinates.theta;
    var radius = coordinates.radius;

    var x = radius * Math.cos(theta);
    var y = radius * Math.sin(theta);

    return { x: x, y: y };
  }

  function sphericalCoordinatesToVector(coordinates) {

    var theta = coordinates.theta;
    var phi = coordinates.phi;
    var radius = coordinates.radius;

    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    var sinPhi = Math.sin(phi);
    var cosPhi = Math.cos(phi);

    var x = radius * sinPhi * cosTheta;
    var y = radius * sinPhi * sinTheta;
    var z = radius * cosPhi;

    return { x: x, y: y, z: z };
  }

  function normalize3dVector(vector) {

    var baseX = vector.x;
    var baseY = vector.y;
    var baseZ = vector.z;

    var length = Math.sqrt(baseX * baseX + baseY * baseY + baseZ * baseZ);

    var x = baseX / length;
    var y = baseY / length;
    var z = baseZ / length;

    return { x: x, y: y, z: z };
  }

  function normalizeQuaternion(vector) {

    var baseX = vector.x;
    var baseY = vector.y;
    var baseZ = vector.z;
    var baseW = vector.w;

    var length = Math.sqrt(baseX * baseX + baseY * baseY + baseZ * baseZ + baseW * baseW) * ((baseW >= 0) || -1);

    var x = baseX / length;
    var y = baseY / length;
    var z = baseZ / length;
    var w = baseW / length;

    return { x: x, y: y, z: z, w: w };
  }

  function hopfMapping(vector) {

    var u1 = vector.x;
    var u2 = vector.y;
    var u3 = vector.z;

    var sqrtU1 = Math.sqrt(u1);
    var invSqrtU1 = Math.sqrt(1 - u1);
    var flipFactor = (u3 <= 0.25 || u3 > 0.75) || -1;

    var x = sqrtU1 * Math.sin(TAU * u2) * -flipFactor;
    var y = sqrtU1 * Math.cos(TAU * u2) * flipFactor;
    var z = invSqrtU1 * Math.sin(TAU * u3) * -flipFactor;
    var w = invSqrtU1 * Math.cos(TAU * u3) * flipFactor;

    return { x: x, y: y, z: z, w: w };
  }

  function hsvToRgb(h, s, v) {

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    var r = 0;
    var g = 0;
    var b = 0;

    switch (i % 6) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
    }

    return { r: r, g: g, b: b };
  }

  seed = seed === undefined ? Date.now() : seed;
  var state = generateStateFromSeed(seed);

  return {
    initState: function(seed) {
      seed = seed === undefined ? Date.now() : seed;
      state = generateStateFromSeed(seed);
      return this;
    },
    get state() {
      return state;
    },
    set state(newState) {
      state = newState;
    },
    get next() {
      var newRandom = xorshift128(state);
      state.shift();
      state.push(newRandom);

      return newRandom;
    },
    skip: function(steps) {
      for (var i = 0; i < steps; ++i) {
        this.next;
      }
      return this;
    },
    get value() {
      return roundTo7(value(this.next));
    },
    rangeFloat: function(min, max) {
      return roundTo7(rangeFloat(this.next, min, max));
    },
    rangeInt: function(min, max) {
      return rangeInt(this.next, min, max);
    },
    range: function(minOrMax, max) {
      return (Number.isInteger(minOrMax) && (max === undefined || Number.isInteger(max)))
        ? this.rangeInt(minOrMax, max)
        : this.rangeFloat(minOrMax, max);
    },
    get insideUnitCircle() {

      var polarCoordinates = {
        theta: valueInv(this.next) * TAU,
        radius: Math.sqrt(valueInv(this.next)),
      };

      var vector = polarCoordinatesToVector(polarCoordinates);

      return {
        x: roundTo7(vector.x),
        y: roundTo7(vector.y),
      };
    },
    get insideUnitSphere() {

      var sphericalCoordinates = {
        phi: Math.acos(2 * valueInv(this.next) - 1),
        theta: valueInv(this.next) * TAU,
        radius: Math.pow(value(this.next), (1 / 3)),
      };

      var vector = sphericalCoordinatesToVector(sphericalCoordinates);

      return {
        x: roundTo7(vector.x),
        y: roundTo7(vector.y),
        z: roundTo7(vector.z),
      };
    },
    get onUnitSphere() {

      var vector = normalize3dVector(this.insideUnitSphere);

      return {
        x: roundTo7(vector.x),
        y: roundTo7(vector.y),
        z: roundTo7(vector.z),
      };
    },
    get rotation() {

      var baseQuaternion = {
        x: rangeFloat(this.next, -1, 1),
        y: rangeFloat(this.next, -1, 1),
        z: rangeFloat(this.next, -1, 1),
        w: rangeFloat(this.next, -1, 1),
      };

      var quaternion = normalizeQuaternion(baseQuaternion);

      return {
        x: roundTo7(quaternion.x),
        y: roundTo7(quaternion.y),
        z: roundTo7(quaternion.z),
        w: roundTo7(quaternion.w),
      };
    },
    get rotationUniform() {

      var baseVector = {
        x: value(this.next),
        y: value(this.next),
        z: value(this.next),
      };

      var quaternion = hopfMapping(baseVector);

      return {
        x: roundTo7(quaternion.x),
        y: roundTo7(quaternion.y),
        z: roundTo7(quaternion.z),
        w: roundTo7(quaternion.w),
      };
    },
    colorHSV: function(hueMin, hueMax, saturationMin, saturationMax, valueMin, valueMax, alphaMin, alphaMax) {

      hueMin = hueMin === undefined ? 0 : hueMin;
      hueMax = hueMax === undefined ? 1 : hueMax;
      saturationMin = saturationMin === undefined ? 0 : saturationMin;
      saturationMax = saturationMax === undefined ? 1 : saturationMax;
      valueMin = valueMin === undefined ? 0 : valueMin;
      valueMax = valueMax === undefined ? 1 : valueMax;
      alphaMin = alphaMin === undefined ? 1 : alphaMin;
      alphaMax = alphaMax === undefined ? 1 : alphaMax;

      var h = lerp(hueMin, hueMax, value(this.next));
      var s = lerp(saturationMin, saturationMax, value(this.next));
      var v = lerp(valueMin, valueMax, value(this.next));
      var a = lerp(alphaMin, alphaMax, value(this.next));

      var color = hsvToRgb(h, s, v);

      return {
        r: roundTo7(color.r),
        g: roundTo7(color.g),
        b: roundTo7(color.b),
        a: roundTo7(a),
      };
    }
  };
}
