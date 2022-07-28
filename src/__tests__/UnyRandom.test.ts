import { UnyRandom as Random } from '../UnyRandom';

/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable no-multi-spaces */
describe('Validation vs. result from UnityEngine.Random', () => {
  test.each([
    { init: 0,          expected: [0,          1,          1812433254, 1900727103] },
    { init: 2147483647, expected: [2147483647, 335050396,  3871623053, 2257956770] },
    { init: 3351175,    expected: [3351175,    1465376324, 1064899797, 1153316106] },
    { init: 7597963,    expected: [7597963,    1773921496, 2793464121, 3723451518] },
    { init: 708334,     expected: [708334,     3716350439, 33906468,   1980026165] },
    { init: 3653404,    expected: [3653404,    4110967309, 1394779170, 728691563] },
    { init: 255129647,  expected: [255129647,  4127199628, 2722027581, 1244591378] },
    { init: 926378578,  expected: [926378578,  4043363419, 3111484136, 1182246281] },
    { init: 1002426036, expected: [1002426036, 3476480261, 1647670266, 4261252003] },
    { init: 1074095615, expected: [1074095615, 2209330332, 3158162829, 4188487074] },
    { init: 1343453635, expected: [1343453635, 2620220656, 3950854833, 1878198486] },
    { init: 1822539692, expected: [1822539692, 957852381,  416394802,  3696262075] },
  ])('should be a new instance with expected state - [Seed: $init]', ({ init, expected }) => {
    // act
    const result = new Random(init);

    // assert
    expect(result.state).toEqual(expected);
  });

  test.each([
    { init: 0,          expected: [0,          1,          1812433254, 1900727103] },
    { init: 2147483647, expected: [2147483647, 335050396,  3871623053, 2257956770] },
    { init: 3351175,    expected: [3351175,    1465376324, 1064899797, 1153316106] },
    { init: 7597963,    expected: [7597963,    1773921496, 2793464121, 3723451518] },
    { init: 708334,     expected: [708334,     3716350439, 33906468,   1980026165] },
    { init: 3653404,    expected: [3653404,    4110967309, 1394779170, 728691563] },
    { init: 255129647,  expected: [255129647,  4127199628, 2722027581, 1244591378] },
    { init: 926378578,  expected: [926378578,  4043363419, 3111484136, 1182246281] },
    { init: 1002426036, expected: [1002426036, 3476480261, 1647670266, 4261252003] },
    { init: 1074095615, expected: [1074095615, 2209330332, 3158162829, 4188487074] },
    { init: 1343453635, expected: [1343453635, 2620220656, 3950854833, 1878198486] },
    { init: 1822539692, expected: [1822539692, 957852381,  416394802,  3696262075] },
  ])('should be reinitialised to expected state - [Seed: $init]', ({ init, expected }) => {
    // arrange
    const result = new Random();

    // act
    result.initState(init);

    // assert
    expect(result.state).toEqual(expected);
  });

  test.each([
    { init: 0,          expected: [1900725526, 1900725046, 559298752,  107093222,  556206921] },
    { init: 2147483647, expected: [102086792,  3599327808, 313896755,  964098680,  2450314278] },
    { init: 3351175,    expected: [3707764736, 877412378,  3278120442, 1992773369, 2870624289] },
    { init: 7597963,    expected: [1115684863, 4099165772, 1434251478, 4074199723, 1340785417] },
    { init: 25475,      expected: [381339354,  3446737248, 2617074705, 2742869483, 1664111432] },
    { init: 90772759,   expected: [179651335,  1371083844, 733875198,  2771647012, 87963902] },
    { init: 281080579,  expected: [925864690,  4219205596, 804418691,  245083390,  1164449757] },
    { init: 725160489,  expected: [712616497,  2436908603, 1906720091, 717515626,  3440075809] },
    { init: 1057110765, expected: [864774537,  3192334974, 2312269324, 324292227,  2080090689] },
    { init: 1360176782, expected: [1800605691, 4215042330, 2469457756, 3019070509, 1076670847] },
    { init: 1753568107, expected: [2715694542, 4207904545, 3804057795, 271312006,  1074516744] },
  ])('should be first $expected.length UInt - [Seed: $init]', ({ init, expected }) => {
    // arrange
    const rand = new Random(init);

    // act
    expected.forEach((uInt) => {
      // act
      const result = rand.nextUInt;

      // assert
      expect(result).toBe(uInt);
    });
  });

  test.each([
    { init: 0,          expected: [0.584139645, 0.584082425,  0.673606932,  0.76650703,   0.305031925] },
    { init: 2147483647, expected: [0.169693962, 0.0733108595, 0.419409215,  0.929518819,  0.100224271] },
    { init: 3351175,    expected: [0,           0.595706284,  0.782409072,  0.557097614,  0.205082089] },
    { init: 7597963,    expected: [1,           0.658639491,  0.976099849,  0.682454526,  0.83407712] },
    { init: 96438,      expected: [0.656293929, 0.605053961,  0.53988415,   0.861384153,  0.660397708] },
    { init: 4919044,    expected: [0.682905138, 0.754080892,  0.962516069,  0.110073224,  0.488956273] },
    { init: 11288839,   expected: [0.966072559, 0.0643060282, 0.764728308,  0.235906869,  0.981506705] },
    { init: 77823943,   expected: [0.993880987, 0.389753163,  0.102013245,  0.429189146,  0.635829866] },
    { init: 1218593819, expected: [0.597524107, 0.819020748,  0.121665016,  0.138770953,  0.679304779] },
    { init: 1585133052, expected: [0.839094877, 0.851933241,  0.736240685,  0.182731643,  0.995440602] },
    { init: 1658364365, expected: [0.677668631, 0.396832764,  0.0830729082, 0.0532721356, 0.226641923] },
  ])('should be first $expected.length [0, 1] float - [Seed: $init]', ({ init, expected }) => {
    // arrange
    const rand = new Random(init);

    // act
    expected.forEach((curr) => {
      // act
      const result = rand.value;

      // assert
      expect(result).toBe(curr);
    });
  });

  test.each([
    { init: 0,          min: -1366991463, max: -784454117,  expected: -1213877975 },
    { init: 2147483647, min: -1043932443, max: -856252661,  expected: -941845651 },
    { init: 3351175,    min: -325466,     max: -123544,     expected: -252494 },
    { init: 7597963,    min: -98753368,   max: 25678875,    expected: 21473551 },
    { init: 235411,     min: -1255655315, max: 1686777100,  expected: -946852315 },
    { init: 210997249,  min: -1626942927, max: 1528638503,  expected: 20149569 },
    { init: 862074862,  min: -752009940,  max: -662028012,  expected: -669142346 },
    { init: 1002426036, min: 121793303,   max: 541864847,   expected: 237046509 },
    { init: 1195436933, min: 1310399399,  max: 1393954301,  expected: 1352067444 },
    { init: 1606178519, min: 136878824,   max: 2026618656,  expected: 1690683117 },
    { init: 2121896975, min: -1939704969, max: -1652846112, expected: -1747287254 },
  ])('should be expected int from range [$min, $max] - [Seed: $init]', ({ init, min, max, expected }) => {
    // arrange
    const rand = new Random(init);

    // act
    const result = rand.rangeInt(min, max);

    // assert
    expect(result).toBe(expected);
  });

  test.each([
    { init: 0,          min: -100,         max: 500,        expected: 149.516205 },
    { init: 2147483647, min: -234.7656,    max: 56785.99,   expected: 47109.9102 },
    { init: 3351175,    min: -95732,       max: -1544,      expected: -1544 },
    { init: 7597963,    min: -11.33,       max: 20.99,      expected: -11.3299999 },
    { init: 235411,     min: -4444,        max: -234,       expected: -2665.12354 },
    { init: 210997249,  min: -9999,        max: 1000000,    expected: 647786.813 },
    { init: 862074862,  min: -132544.4562, max: 35421.544,  expected: -65151.0469 },
    { init: 1002426036, min: -7689.23546,  max: 234.46177,  expected: -6834.37598 },
    { init: 1195436933, min: -79.04523,    max: 1324.53992, expected: 890.720764 },
    { init: 1606178519, min: -678.00089,   max: 4325.42987, expected: 1811.4624 },
    { init: 2121896975, min: 613.36509,    max: 4356.89644, expected: 845.54187 },
  ])('should be less than 0.005 different to original UnityEngine.Random result in small float range [$min, $max] - [Seed: $init]', ({ init, min, max, expected }) => {
    // arrange
    const rand = new Random(init);

    // act
    const result = rand.rangeFloat(min, max);

    // assert
    expect(result).toBeCloseTo(expected);
  });

  test.each([
    { init: 0,          min: -1201661979.1,     max: 1331884683,       expected: -148060352 },
    { init: 2147483647, min: -567939757.08083,  max: 880460832.48783,  expected: 634676032 },
    { init: 3351175,    min: -3546723467,       max: 243563568,        expected: 243563568 },
    { init: 7597963,    min: -1155454545.33,    max: 2455454540.99,    expected: -1155454590 },
    { init: 235411,     min: -1999477199.21973, max: -874969105.46286, expected: -1524332030 },
    { init: 210997249,  min: -189151.45509,     max: 1334068561.59681, expected: 868777856 },
    { init: 862074862,  min: -861106178.61060,  max: 1772860600.12764, expected: 195726688 },
    { init: 1002426036, min: -3567407.95826,    max: 11315485.46177,   expected: -1961745.63 },
    { init: 1195436933, min: -997890042.04523,  max: 736548186.53992,  expected: 200469216 },
    { init: 1606178519, min: -335825361.00089,  max: 254722168.42987,  expected: -41997696 },
    { init: 2121896975, min: 761728340.36509,   max: 1196094308.89644, expected: 788668032 },
  ])('should be less than 0.0001% different to original UnityEngine.Random result in large float range [$min, $max] - [Seed: $init]', ({ init, min, max, expected }) => {
    // arrange
    const rand = new Random(init);
    const errorMargin = 1e-6;

    // act
    const result = rand.rangeFloat(min, max);
    const difference = Math.abs(expected - result) / expected;

    // assert
    expect(difference).toBeLessThan(errorMargin);
  });
});

describe('Functionality tests', () => {
  // setup
  const seed = 1234;
  const skipSteps = 778;
  const intMin = -100;
  const intMax = 100;
  const floatMin = -55.55;
  const floatMax = 55.55;

  test('should be set to new state', () => {
    // arrange
    const rand = new Random(seed);
    const newState = [43581, 243, 1238994, 789];

    // act
    rand.state = newState as [number, number, number, number];

    // assert
    expect(rand.state).toEqual(newState);
  });

  test('should be fluent', () => {
    // arrange
    const rand = new Random();
    const nonFluentRand = new Random(seed);
    nonFluentRand.skip(skipSteps);
    const expected = nonFluentRand.nextUInt;

    // act
    const result = rand.initState(seed).skip(skipSteps).nextUInt;

    // assert
    expect(result).toBe(expected);
  });

  test('should flip min and max in method .rangeInt', () => {
    // arrange
    const rand = new Random(seed);
    const expected = new Random(seed).rangeInt(intMin, intMax);

    // act
    const result = rand.rangeInt(intMax, intMin);

    // assert
    expect(result).toBe(expected);
  });

  test('should flip min and max in method .rangeFloat', () => {
    // arrange
    const expected = new Random(seed).rangeFloat(floatMin, floatMax);
    const rand = new Random(seed);
    // act
    const result = rand.rangeFloat(floatMax, floatMin);

    // assert
    expect(result).toBe(expected);
  });

  test('method .range should give floatRange when one argument is a float', () => {
    // arrange
    const expected = new Random(seed).rangeFloat(floatMin, intMax);
    const rand = new Random(seed);

    // act
    const result = rand.range(floatMin, intMax);

    // assert
    expect(result).toBe(expected);
  });

  test('method .range should give intRange when both argument are ints', () => {
    // arrange
    const expected = new Random(seed).rangeInt(intMin, intMax);
    const rand = new Random(seed);

    // act
    const result = rand.range(intMin, intMax);

    // assert
    expect(result).toBe(expected);
  });

  test.each([
    { init: 0,          steps: 87,  expected: [1132614473, 2909454521, 1372104530, 3836455820] },
    { init: 2147483647, steps: 77,  expected: [1307723799, 552490512,  3898723849, 2360864465] },
    { init: 3351175,    steps: 654, expected: [3584234488, 2691255134, 2292099010, 3469460065] },
    { init: 7597963,    steps: 37,  expected: [2231739152, 2033765001, 2260179569, 4111193051] },
    { init: 185423,     steps: 70,  expected: [1575249837, 685374958,  775893919,  2928260196] },
    { init: 31772479,   steps: 13,  expected: [2461492536, 63619573,   1030979126, 522036702] },
    { init: 262135318,  steps: 34,  expected: [923662666,  3421772121, 1043340524, 3782016168] },
    { init: 582038541,  steps: 11,  expected: [461757441,  3692252494, 1169677888, 2669906841] },
    { init: 1027291213, steps: 97,  expected: [2713057255, 643850262,  2084996529, 1417112826] },
    { init: 1216022583, steps: 712, expected: [2545655932, 1060991078, 2704064004, 15704702] },
    { init: 1632826035, steps: 40,  expected: [3878320095, 1128861853, 3449674407, 865087324] },
  ])('should have expected state after skipping $steps steps - [Seed: $init]', ({ init, steps, expected }) => {
    // arrange
    const rand = new Random(init);

    // act
    rand.skip(steps);

    // assert
    expect(rand.state).toEqual(expected);
  });
});
