import { UnyRandom }  from '../src/uny-random'

describe('.rotation vs. UnityEngine.Random.rotation', () => {
  test.each([
    { init: 0,          expected: {w: 0.7848133,  x: 0.2477755,  y: 0.247607,   z: 0.5112399} },
    { init: 2147483647, expected: {w: 0.6185752,  x: -0.475693,  y: -0.6145,    z: -0.1160635} },
    { init: 3351175,    expected: {w: 0.09760993, x: -0.8547637, y: 0.1636125,  z: 0.482786} },
    { init: 7597963,    expected: {w: 0.249417,   x: 0.6835046,  y: 0.2168617,  z: 0.6508329 } },
    { init: 96438,      expected: {w: 0.882598,   x: 0.3817121,  y: 0.2565702,  z: 0.0974079} },
    { init: 4919044,    expected: {w: 0.5724474,  x: -0.2685211, y: -0.3730135, z: -0.679015} },
    { init: 11288839,   expected: {w: 0.3571178,  x: -0.6302427, y: 0.5891635,  z: -0.3579766} },
    { init: 77823943,   expected: {w: 0.1093312,  x: -0.7625467, y: 0.1702199,  z: 0.6144871} },
    { init: 1218593819, expected: {w: 0.5822422,  x: -0.1571929, y: -0.5142093, z: 0.6098142} },
    { init: 1585133052, expected: {w: 0.5046116,  x: -0.5393264, y: -0.5597456, z: -0.375738} },
    { init: 1658364365, expected: {w: 0.6929523,  x: -0.2755948, y: 0.1600303,  z: 0.6467262} },
  ])('should be less than 0.00005% different generating Quaternions [w:$expected.x, x:$expected.x, y:$expected.y, z:$expected.z] - [Seed: $init]', ({ init, expected }) => {
    // Arrange
    const rand = new UnyRandom(init);

    // Act
    const result = rand.rotation;

    // Assert
    expect(result.w).toBeCloseTo(expected.w, 6);
    expect(result.x).toBeCloseTo(expected.x, 6);
    expect(result.y).toBeCloseTo(expected.y, 6);
    expect(result.z).toBeCloseTo(expected.z, 6);
  });
});
