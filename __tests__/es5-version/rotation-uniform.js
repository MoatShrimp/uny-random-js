import unyRandom from "../../src/uny-random-es5"; 

describe('.rotationUniform vs. UnityEngine.Random.rotationUniform', () => {
  
  test.each([
    { init: 0,          expected: { x: -0.3852562, y: 0.6600888,  z: -0.572001,   w: 0.297784   } },
    { init: 2147483647, expected: { x: 0.1831105,  y: -0.3690048, z: 0.4419404,   w: 0.7968656  } },
    { init: 3351175,    expected: { x: 0,          y: 0,          z: 0.9793385,   w: 0.2022278  } },
    { init: 7597963,    expected: { x: 0.8397167,  y: -0.5430248, z: 0,           w: 0          } },
    { init: 96438,      expected: { x: -0.496745,  y: 0.6399518,  z: -0.1453847,  w: 0.5679519  } },
    { init: 4919044,    expected: { x: 0.8261091,  y: 0.02118684, z: 0.1314006,   w: 0.5475662  } },
    { init: 11288839,   expected: { x: -0.3864154, y: 0.9037454,  z: 0.1834059,   w: 0.01702113 } },
    { init: 77823943,   expected: { x: -0.6366615, y: -0.7671657, z: -0.04677578, w: 0.062698   } },
    { init: 1218593819, expected: { x: 0.7014403,  y: 0.3248164,  z: -0.4390977,  w: 0.4578964  } },
    { init: 1585133052, expected: { x: -0.734482,  y: -0.5473856, z: -0.3996317,  w: 0.03463545 } },
    { init: 1658364365, expected: { x: -0.4970253, y: -0.6562275, z: -0.2830662,  w: 0.4921431  } },
  ])('should generate the same Quaternion (error margin 0.00005%) - [Seed: $init]', ({ init, expected }) => {

    // Arrange
    const rand = unyRandom(init);

    // Act
    const result = rand.rotationUniform;

    // Assert
    expect(result.x).toBeCloseTo(expected.x, 6);
    expect(result.y).toBeCloseTo(expected.y, 6);
    expect(result.z).toBeCloseTo(expected.z, 6);
    expect(result.w).toBeCloseTo(expected.w, 6);
  });
});
