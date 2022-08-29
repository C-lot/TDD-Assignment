const salePrice = 2;

const getYieldForPlant = (plant, environmentFactors) => {
  if (!environmentFactors) {
    return plant.yield;
  } else {
    const factors = plant.factor;
    let sunFactor;
    let windFactor;

    switch (environmentFactors.sun) {
      case "low":
        sunFactor = (factors.sun.low + 100) / 100;
        break;
      case "medium":
        sunFactor = (factors.sun.medium + 100) / 100;
        break;
      case "high":
        sunFactor = (factors.sun.high + 100) / 100;
        break;
      default:
        sunFactor = 1;
    }
    switch (environmentFactors.wind) {
      case "low":
        windFactor = (factors.wind.low + 100) / 100;
        break;
      case "medium":
        windFactor = (factors.wind.medium + 100) / 100;
        break;
      case "high":
        windFactor = (factors.wind.high + 100) / 100;
        break;
      default:
        windFactor = 1;
    }
    return plant.yield * sunFactor * windFactor;
  }
};

const getYieldForCrop = (crops, factor) => {
  const cropYield = crops.numCrops * crops.crop.yield;
  if (!factor) {
    return cropYield;
  } else {
    const factors = crops.crop.factor;
    let sunFactor;
    let windFactor;

    switch (factor.sun) {
      case "low":
        sunFactor = (factors.sun.low + 100) / 100;
        break;
      case "medium":
        sunFactor = (factors.sun.medium + 100) / 100;
        break;
      case "high":
        sunFactor = (factors.sun.high + 100) / 100;
        break;
      default:
        sunFactor = 1;
    }
    switch (factor.wind) {
      case "low":
        windFactor = (factors.wind.low + 100) / 100;
        break;
      case "medium":
        windFactor = (factors.wind.medium + 100) / 100;
        break;
      case "high":
        windFactor = (factors.wind.high + 100) / 100;
        break;
      default:
        windFactor = 1;
    }
    return cropYield * sunFactor * windFactor;
  }
};

const getTotalYield = (crop, factors) => {
  const crops = crop.input;
  const cropsYield = crops.map((crop) => getYieldForCrop(crop, factors));
  return cropsYield.reduce((total, cur) => total + cur);
};

const getCostsForCrop = (crop) => crop.numCrops * 1;

const getRevenueForCrop = (crops, factors) => {
  const cropYield = getYieldForCrop(crops, factors);
  const revenue = cropYield * salePrice;
  return revenue;
};

const getProfitForCrop = (crops, factors) => {
  const revenuePerCrop = getRevenueForCrop(crops, factors);
  const costPerCrop = getCostsForCrop(crops);
  return revenuePerCrop - costPerCrop;
};

const getTotalProfit = (crop, factors) => {
  const crops = crop.input;
  const profit = crops.map((crop) => getProfitForCrop(crop, factors));
  return profit.reduce((total, cur) => total + cur);
};

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};
