import unyRandom from "../../src/uny-random-es5"; 

describe('.range', () => {

  const SEED = 1234;
  const INT_MIN = -100;
  const INT_MAX = 100;
  const FLOAT_MIN = -55.55;

  test('should use .floatRange when one argument is a float', () => {

    // Arrange
    const expected = unyRandom(SEED).rangeFloat(FLOAT_MIN, INT_MAX);
    const rand = unyRandom(SEED);

    // Act
    const result = rand.range(FLOAT_MIN, INT_MAX);

    // Assert
    expect(result).toEqual(expected);
  });

  test('should user .intRange when all argument are ints', () => {

    // Arrange
    const expected = unyRandom(SEED).rangeInt(INT_MIN, INT_MAX);
    const rand = unyRandom(SEED);

    // Act
    const result = rand.range(INT_MIN, INT_MAX);

    // Assert
    expect(result).toEqual(expected);
  });
});

describe('.rangeInt vs. UnityEngine.Random.range', () => {

  test.each([
    { init: 0,          min: -1366991463, max: -784454117,  expected: -1213877975 },
    { init: 2147483647, min: -1043932443, max: -856252661,  expected: -941845651  },
    { init: 3351175,    min: -325466,     max: -123544,     expected: -252494     },
    { init: 7597963,    min: -98753368,   max: 25678875,    expected: 21473551    },
    { init: 235411,     min: -1255655315, max: 1686777100,  expected: -946852315  },
    { init: 210997249,  min: -1626942927, max: 1528638503,  expected: 20149569    },
    { init: 862074862,  min: -752009940,  max: -662028012,  expected: -669142346  },
    { init: 1002426036, min: 121793303,   max: 541864847,   expected: 237046509   },
    { init: 1195436933, min: 1310399399,  max: 1393954301,  expected: 1352067444  },
    { init: 1606178519, min: 136878824,   max: 2026618656,  expected: 1690683117  },
    { init: 2121896975, min: -1939704969, max: -1652846112, expected: -1747287254 },
  ])('should generate the same int from range [$min, $max] - [Seed: $init]', ({ init, min, max, expected }) => {

    // Arrange
    const rand = unyRandom(init);

    // Act
    const result = rand.rangeInt(min, max);

    // Assert
    expect(result).toEqual(expected);
  });

  test.each([
    { init: 0,          min: -784454117,  max: -1366991463, expected: -937567605  },
    { init: 2147483647, min: -856252661,  max: -1043932443, expected: -958339453  },
    { init: 3351175,    min: -123544,     max: -325466,     expected: -196516     },
    { init: 7597963,    min: 25678875,    max: -98753368,   expected: -94548044   },
    { init: 235411,     min: 1686777100,  max: -1255655315, expected: 1377974100  },
    { init: 210997249,  min: 1528638503,  max: -1626942927, expected: -118453993  },
    { init: 862074862,  min: -662028012,  max: -752009940,  expected: -744895606  },
    { init: 1002426036, min: 541864847,   max: 121793303,   expected: 426611641   },
    { init: 1195436933, min: 1393954301,  max: 1310399399,  expected: 1352286256  },
    { init: 1606178519, min: 2026618656,  max: 136878824,   expected: 472814363   },
    { init: 2121896975, min: -1652846112, max: -1939704969, expected: -1845263827 },
  ])('should generate the same int from range [$min, $max], when max & min is reversed - [Seed: $init]', ({ init, min, max, expected }) => {

    // Arrange
    const rand = unyRandom(init);

    // Act
    const result = rand.rangeInt(min, max);

    // Assert
    expect(result).toEqual(expected);
  });
});

describe('.rangeFloat vs. UnityEngine.Random.range', () => {

  test.each([
    { init: 0,          min: -100,         max: 500,        expected: 149.5162  },
    { init: 2147483647, min: -234.7656,    max: 56785.99,   expected: 47109.91  },
    { init: 3351175,    min: -95732,       max: -1544,      expected: -1544     },
    { init: 7597963,    min: -11.33,       max: 20.99,      expected: -11.33    },
    { init: 235411,     min: -4444,        max: -234,       expected: -2665.124 },
    { init: 210997249,  min: -9999,        max: 1000000,    expected: 647786.8  },
    { init: 862074862,  min: -132544.4562, max: 35421.544,  expected: -65151.05 },
    { init: 1002426036, min: -7689.23546,  max: 234.46177,  expected: -6834.376 },
    { init: 1195436933, min: -79.04523,    max: 1324.53992, expected: 890.7208  },
    { init: 1606178519, min: -678.00089,   max: 4325.42987, expected: 1811.462  },
    { init: 2121896975, min: 613.36509,    max: 4356.89644, expected: 845.5419  },
  ])('should generate the same float (error margin 0.0005%) from small float range [$min, $max]  - [Seed: $init]', ({ init, min, max, expected }) => {

    // Arrange
    const rand = unyRandom(init);
    const errorMargin = 2e-6;

    // Act
    const result = rand.rangeFloat(min, max);
    const difference = Math.abs(expected - result) / expected;

    // Assert
    expect(difference).toBeLessThan(errorMargin);
  });

  test.each([
    { init: 0,          min: 500,        max: -100,         expected: 250.4838  },
    { init: 2147483647, min: 56785.99,   max: -234.7656,    expected: 9441.312  },
    { init: 3351175,    min: -1544,      max: -95732,       expected: -95732    },
    { init: 7597963,    min: 20.99,      max: -11.33,       expected: 20.99     },
    { init: 235411,     min: -234,       max: -4444,        expected: -2012.876 },
    { init: 210997249,  min: 1000000,    max: -9999,        expected: 342214.2  },
    { init: 862074862,  min: 35421.544,  max: -132544.4562, expected: -31971.86 },
    { init: 1002426036, min: 234.46177,  max: -7689.23546,  expected: -620.3977 },
    { init: 1195436933, min: 1324.53992, max: -79.04523,    expected: 354.7739  },
    { init: 1606178519, min: 4325.42987, max: -678.00089,   expected: 1835.966  },
    { init: 2121896975, min: 4356.89644, max: 613.36509,    expected: 4124.72   },
  ])('should generate the same float (error margin 0.0005%) from small float range [$min, $max], when max & min is reversed - [Seed: $init]', ({ init, min, max, expected }) => {

    // Arrange
    const rand = unyRandom(init);
    const errorMargin = 2e-6;

    // Act
    const result = rand.rangeFloat(min, max);
    const difference = Math.abs(expected - result) / expected;

    // Assert
    expect(difference).toBeLessThan(errorMargin);
  });

  test.each([
    { init: 0,          min: -1201661979.1,     max: 1331884683,       expected: -148060352  },
    { init: 2147483647, min: -567939757.08083,  max: 880460832.48783,  expected: 634676032   },
    { init: 3351175,    min: -3546723467,       max: 243563568,        expected: 243563568   },
    { init: 7597963,    min: -1155454545.33,    max: 2455454540.99,    expected: -1155454590 },
    { init: 235411,     min: -1999477199.21973, max: -874969105.46286, expected: -1524332030 },
    { init: 210997249,  min: -189151.45509,     max: 1334068561.59681, expected: 868777856   },
    { init: 862074862,  min: -861106178.61060,  max: 1772860600.12764, expected: 195726688   },
    { init: 1002426036, min: -3567407.95826,    max: 11315485.46177,   expected: -1961745.63 },
    { init: 1195436933, min: -997890042.04523,  max: 736548186.53992,  expected: 200469216   },
    { init: 1606178519, min: -335825361.00089,  max: 254722168.42987,  expected: -41997696   },
    { init: 2121896975, min: 761728340.36509,   max: 1196094308.89644, expected: 788668032   },
  ])('should generate the same float (error margin 0.0005%) from large float range [$min, $max] - [Seed: $init]', ({ init, min, max, expected }) => {

    // Arrange
    const rand = unyRandom(init);
    const errorMargin = 2e-6;

    // Act
    const result = rand.rangeFloat(min, max);
    const difference = Math.abs(expected - result) / expected;

    // Assert
    expect(difference).toBeLessThan(errorMargin);
  });
});
