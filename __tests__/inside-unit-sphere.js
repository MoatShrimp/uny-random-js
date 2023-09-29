import { UnyRandom }  from '../src/uny-random'

describe('.insideUnitSphere vs. UnityEngine.Random.insideUnitSphere', () => {
  test.each([
    { init: 0,          expected: {x: -0.7462912, y: 0.4355676,   z: -0.1475139} },
    { init: 2147483647, expected: {x: 0.5033774,  y: -0.2497899,  z: 0.4944919} },
    { init: 3351175,    expected: {x: 0,          y: 0,           z: 0.9214631} },
    { init: 7597963,    expected: {x: 0,          y: 0,           z: -0.9919689} },
    { init: 96438,      expected: {x: -0.6109951, y: 0.4742682,   z: -0.25453} },
    { init: 4919044,    expected: {x: 0.02355918, y: 0.9186104,   z: -0.3611813} },
    { init: 11288839,   expected: {x: 0.3044533,  y: -0.1301754,  z: -0.8524179} },
    { init: 77823943,   expected: {x: -0.0560805, y: -0.04654053, z: -0.4615348} },
    { init: 1218593819, expected: {x: 0.2042176,  y: 0.4410074,   z: -0.09664896} },
    { init: 1585133052, expected: {x: 0.396535,   y: 0.5320708,   z: -0.6123849} },
    { init: 1658364365, expected: {x: -0.3251288, y: -0.2462519,  z: -0.155046} },
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
