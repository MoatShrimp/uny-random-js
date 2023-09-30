import unyRandom from "../../src/uny-random-es5"; 

describe('.next vs. UnityEngine.Random.state', () => {
  
  test.each([
    { init: 0,          expected: [1900725526, 1900725046, 559298752,  107093222,  556206921 ] },
    { init: 2147483647, expected: [102086792,  3599327808, 313896755,  964098680,  2450314278] },
    { init: 3351175,    expected: [3707764736, 877412378,  3278120442, 1992773369, 2870624289] },
    { init: 7597963,    expected: [1115684863, 4099165772, 1434251478, 4074199723, 1340785417] },
    { init: 25475,      expected: [381339354,  3446737248, 2617074705, 2742869483, 1664111432] },
    { init: 90772759,   expected: [179651335,  1371083844, 733875198,  2771647012, 87963902  ] },
    { init: 281080579,  expected: [925864690,  4219205596, 804418691,  245083390,  1164449757] },
    { init: 725160489,  expected: [712616497,  2436908603, 1906720091, 717515626,  3440075809] },
    { init: 1057110765, expected: [864774537,  3192334974, 2312269324, 324292227,  2080090689] },
    { init: 1360176782, expected: [1800605691, 4215042330, 2469457756, 3019070509, 1076670847] },
    { init: 1753568107, expected: [2715694542, 4207904545, 3804057795, 271312006,  1074516744] },
  ])('should generate the same first $expected.length ints - [Seed: $init]', ({ init, expected }) => {

    // Arrange
    const rand = unyRandom(init);

    for (const int of expected) {
      // Act
      const result = rand.next;
      // Assert
      expect(result).toEqual(int);
    }
  });
});
