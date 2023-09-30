import unyRandom from "../../src/uny-random-es5"; 

describe('.insideUnitCircle vs. UnityEngine.Random.insideUnitCircle', () => {
  
  test.each([
    { init: 0,          expected: { x: -0.5568735, y: 0.3252837   } },
    { init: 2147483647, expected: { x: 0.4653803,  y: -0.8426805  } },
    { init: 3351175,    expected: { x: 0.635841,   y: 1.11174E-07 } },
    { init: 7597963,    expected: { x: 0.5842606,  y: 0           } },
    { init: 96438,      expected: { x: -0.3490024, y: 0.5226312   } },
    { init: 4919044,    expected: { x: -0.2029198, y: 0.452485    } },
    { init: 11288839,   expected: { x: 0.9454173,  y: 0.2046462   } },
    { init: 77823943,   expected: { x: 0.7806057,  y: 0.03002666  } },
    { init: 1218593819, expected: { x: -0.3480174, y: 0.2446694   } },
    { init: 1585133052, expected: { x: 0.2043322,  y: 0.32606     } },
    { init: 1658364365, expected: { x: -0.3409346, y: 0.6978043   } },
  ])('should generate the same 2D Vector (error margin 0.00005%) - [Seed: $init]', ({ init, expected }) => {

    // Arrange
    const rand = unyRandom(init);

    // Act
    const result = rand.insideUnitCircle;

    // Assert
    expect(result.x).toBeCloseTo(expected.x, 6);
    expect(result.y).toBeCloseTo(expected.y, 6);
  });
});
