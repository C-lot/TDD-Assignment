const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      wind: {
        low: 0,
        medium: -30,
        high: -60,
      },
    },
  };

  const environmentFactors = {
    sun: "low",
  };
  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });

  test(" get yield for plant with environment factors", () => {
    expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
  });
});

describe("getYieldForCrop", () => {
  test("Get yield for crop, no environmental factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input)).toBe(30);
  });
  test("Get yield with environmental factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    const environmentFactors = {
      sun: "low",
    };
    expect(getYieldForCrop(input, environmentFactors)).toBe(15);
  });
});

describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const input = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ input })).toBe(23);
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ input })).toBe(0);
  });
  test("calculate total yield with environment factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const input = [{ crop: corn, numCrops: 4 }];

    const environmentFactors = {
      sun: "low",
    };
    expect(getTotalYield({ input }, environmentFactors)).toBe(6);
  });
});

// tested check

describe("getCostsForCrop", () => {
  test("Calculate total cost for one crop", () => {
    const input = {
      name: "corn",
      cost: 1,
      numCrops: 230,
    };

    expect(getCostsForCrop(input)).toBe(230);
  });
});

describe("getRevenueForCrop", () => {
  test("Calculate revenue for one crop", () => {
    const corn = {
      name: "corn",
      yield: 3,
      cost: 1,
    };
    const input = {
      crop: corn,
      numCrops: 1,
    };
    expect(getRevenueForCrop(input)).toBe(6);
  });
  test("calculate revenue for one crop with environment factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      cost: 1,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const input = {
      crop: corn,
      numCrops: 1,
    };

    const environmentFactors = {
      sun: "low",
    };
    expect(getRevenueForCrop(input, environmentFactors)).toBe(3);
  });
});

describe("getProfitForCrop", () => {
  test("calculate profit for one crop", () => {
    const corn = {
      name: "corn",
      yield: 2,
    };
    const input = {
      crop: corn,
      numCrops: 1,
    };
    expect(getProfitForCrop(input)).toBe(3);
  });
  test("calculate profit of a crop with environmental factors", () => {
    const corn = {
      name: "corn",
      yield: 2,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const input = {
      crop: corn,
      numCrops: 1,
    };
    const environmentFactors = {
      sun: "low",
    };
    expect(getProfitForCrop(input, environmentFactors)).toBe(1);
  });
});

describe("getTotalProfit", () => {
  test("calculate total profit for 2 crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const avocado = {
      name: "avocado",
      yield: 4,
    };
    const input = [
      { crop: corn, numCrops: 5 },
      { crop: avocado, numCrops: 2 },
    ];
    expect(getTotalProfit({ input })).toBe(39);
  });
  test("calculate total profit with environmental factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const avocado = {
      name: "avocado",
      yield: 4,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const input = [
      { crop: corn, numCrops: 5 },
      { crop: avocado, numCrops: 2 },
    ];
    const environmentFactors = {
      sun: "low",
    };

    expect(getTotalProfit({ input }, environmentFactors)).toBe(16);
  });
});
