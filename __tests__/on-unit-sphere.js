import { UnyRandom }  from '../src/uny-random'

describe('.onUnitSphere vs. UnityEngine.Random.onUnitSphere', () => {
  test.each([
    { init: 0,          expected: {x: -0.8513461, y: 0.4968821,   z: -0.1682793} },
    { init: 2147483647, expected: {x: 0.6724826,  y: -0.3337047,  z: 0.6606121} },
    { init: 3351175,    expected: {x: 0,          y: 0,           z: 1} },
    { init: 7597963,    expected: {x: 0,          y: 0,           z: -1} },
    { init: 96438,      expected: {x: -0.7503621, y: 0.582448,    z: -0.3125879} },
    { init: 4919044,    expected: {x: 0.02386112, y: 0.9303835,   z: -0.3658103} },
    { init: 11288839,   expected: {x: 0.332929,   y: -0.1423508,  z: -0.9321451} },
    { init: 77823943,   expected: {x: -0.1200217, y: -0.09960454, z: -0.987762} },
    { init: 1218593819, expected: {x: 0.4121334,  y: 0.8900013,   z: -0.1950482} },
    { init: 1585133052, expected: {x: 0.4391454,  y: 0.5892453,   z: -0.6781898} },
    { init: 1658364365, expected: {x: -0.7451363, y: -0.5643646,  z: -0.3553373} },
  ])('should be less than 0.00005% different generating 3Dvectors [x:$expected.x, y:$expected.y, z:$expected.z] - [Seed: $init]', ({ init, expected }) => {
    // Arrange
    const rand = new UnyRandom(init);

    // Act
    const result = rand.insideUnitSphere;

    // Assert
    expect(result.x).toBeCloseTo(expected.x, 6);
    expect(result.y).toBeCloseTo(expected.y, 6);
    expect(result.z).toBeCloseTo(expected.z, 6);
  });
});
