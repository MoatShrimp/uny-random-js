import { UnyRandom }  from '../src/uny-random'

describe('.colorHSV vs. UnityEngine.Random.ColorHSV', () => {
  test.each([
    { init: 0,          expected: {r: 0.280165,   g: 0.4749825,  b: 0.6736069} },
    { init: 2147483647, expected: {r: 0.4188507,  g: 0.4194092,  b: 0.388662} },
    { init: 3351175,    expected: {r: 0.7824091,  g: 0.3163231,  b: 0.3163231} },
    { init: 7597963,    expected: {r: 0.9760998,  g: 0.3332019,  b: 0.3332019 } },
    { init: 96438,      expected: {r: 0.2132251,  g: 0.2335552,  b: 0.5398842} },
    { init: 4919044,    expected: {r: 0.3074178,  g: 0.2367011,  b: 0.9625161} },
    { init: 11288839,   expected: {r: 0.7647283,  g: 0.7155517,  b: 0.7255623} },
    { init: 77823943,   expected: {r: 0.1020132,  g: 0.06225326, b: 0.06371301} },
    { init: 1218593819, expected: {r: 0.02201884, g: 0.06335761, b: 0.121665} },
    { init: 1585133052, expected: {r: 0.7362407,  g: 0.1090128,  b: 0.7145579} },
    { init: 1658364365, expected: {r: 0.05228301, g: 0.05010686, b: 0.08307291} },
  ])('should be less than 0.00005% different generating a Color [r:$expected.r, g:$expected.g, b:$expected.b] - [Seed: $init]', ({ init, expected }) => {
    // Arrange
    const rand = new UnyRandom(init);

    // Act
    const result = rand.colorHSV();

    // Assert
    expect(result.r).toBeCloseTo(expected.r, 6);
    expect(result.g).toBeCloseTo(expected.g, 6);
    expect(result.b).toBeCloseTo(expected.b, 6);
  });

  test.each([
    { init: 4919044, hueMin: 0.4112355, hueMax: 0.9567251, saturationMin: 0.5220811, saturationMax: 0.8733672, valueMin: 0.03283918, valueMax: 0.6109516,
      expected: {r: 0.4513241, g: 0.1255293, b: 0.5892817} },
    { init: 77823943, hueMin: 0.1589235, hueMax: 0.8536462, saturationMin: 0.3470565, saturationMax: 0.7604165, valueMin: 0.5185792, valueMax: 0.9612151,
      expected: {r: 0.5637339, g: 0.2772641, b: 0.5361265} },
    { init: 1218593819, hueMin: 0, hueMax: 0.2928473, saturationMin: 0.5587336, saturationMax: 1, valueMin: 0, valueMax: 1,
      expected: {r: 0.1160788, g: 0.121665, b: 0.009716179} },
  ])('should be less than 0.00005% different generating a Color within range [r:$expected.r, g:$expected.g, b:$expected.b] - [Seed: $init]', 
      ({ init, hueMin, hueMax, saturationMin, saturationMax, valueMin, valueMax, expected }) => {
    // Arrange
    const rand = new UnyRandom(init);

    // Act
    const result = rand.colorHSV(hueMin, hueMax, saturationMin, saturationMax, valueMin, valueMax);

    // Assert
    expect(result.r).toBeCloseTo(expected.r, 6);
    expect(result.g).toBeCloseTo(expected.g, 6);
    expect(result.b).toBeCloseTo(expected.b, 6);
  });

  test.each([
    { init: 96438, hueMin: 0.4776986, hueMax: 0.5658471, saturationMin: 0.1417581, saturationMax: 0.7545162, valueMin: 0.2890312, valueMax: 0.8724657, alphaMin: 0.09216214, alphaMax: 0.9967413,
      expected: {r: 0.294453, g: 0.5379881, b: 0.6040183, a: 0.8713523} },
    { init: 1585133052, hueMin: 0.3103028, hueMax: 0.6900989, saturationMin: 0.2188076, saturationMax: 0.4164305, valueMin: 0.1378517, valueMax: 0.7215825, alphaMin: 0.09216214, alphaMax: 0.9967413,
      expected: {r: 0.3478539, g: 0.3975368, b: 0.5676181, a: 0.2574574} },
    { init: 1658364365, hueMin: 0.1839423, hueMax: 0.8481582, saturationMin: 0.3851734, saturationMax: 1, valueMin: 0, valueMax: 0.06329382, alphaMin: 0, alphaMax: 1,
      expected: {r: 0.001949894, g: 0.002597082, b: 0.005258002, a: 0.05327214} },
  ])('should be less than 0.00005% different generating a Color within range, with alpha [r:$expected.r, g:$expected.g, b:$expected.b] - [Seed: $init]', 
      ({ init, hueMin, hueMax, saturationMin, saturationMax, valueMin, valueMax, expected, alphaMin, alphaMax }) => {
    // Arrange
    const rand = new UnyRandom(init);

    // Act
    const result = rand.colorHSV(hueMin, hueMax, saturationMin, saturationMax, valueMin, valueMax, alphaMin, alphaMax);

    // Assert
    expect(result.r).toBeCloseTo(expected.r, 6);
    expect(result.g).toBeCloseTo(expected.g, 6);
    expect(result.b).toBeCloseTo(expected.b, 6);
    expect(result.ba).toBeCloseTo(expected.a, 6);
  });
});
