/**
 * Created by jacob on 10/31/2017.
 */

import {arr} from '../utils';


// 收益率
function getPNLList(data: number[]): number[] {
  const r = [];
  let pre = 1;
  for (const i of data) {
    r.push(i / pre - 1);
    pre = i;
  }
  return r.slice(1, r.length);
}

// 历史最高净值
function getHistoricMaxNetValueList(netValueList: number[]): number[] {
  const r = [netValueList[0]];
  netValueList.reduce((x, y) => {
    const rr = x >= y ? x : y;
    r.push(rr);
    return rr;
  });
  return r;
}

// 最大回撤
function getMaxDrawdownList(netValueList: number[]): number[] {
  const maxNetValueList = getHistoricMaxNetValueList(netValueList);
  return netValueList.map((x, y) => x / maxNetValueList[y] - 1);
}

// 总交易时间（日/周/月）
function getTotalTradingDates(dateList: any[]): number {
  return dateList.length;
}

// 存续时间
function getDuration(dateList: any[]): number {
  return getTotalTradingDates(dateList) / 365;
}

// 净值增长率
function getNetValueIncreasingRatio(netValueList: number[], duration: number): number {
  return (netValueList[netValueList.length - 1] / netValueList[0]) ** (1 / duration) - 1;
}

// 净值波动率
function getNetValueVolatilityRatio(PNLList: number[]): number {
  return arr.standardDeviation(PNLList) * Math.sqrt(250);
}

// 夏普比率
function getSharpRatio(netValueIncreasingRatio: number, netValueVolatilityRatio: number): number {
  return netValueIncreasingRatio / netValueVolatilityRatio;
}

// 索提诺比率
function getSortinoRatio(netValueIncreasingRatio: number, underHalfSTD: number): number {
  return netValueIncreasingRatio / underHalfSTD;
}

// Calmar比率
function getCalmarRation(netValueIncreasingRatio: number, maxDrawdown: number): number {
  return Math.abs(netValueIncreasingRatio / maxDrawdown);
}

// 投资胜率
function getInvestmentSuccessfulRatio(netValueList: number[], tradingDates: number): number {
  return netValueList.filter(num => num > 0).length / tradingDates;
}

// 最大回撤
function getMaxDrawdown(maxDrawdownList: number[]): number {
  return arr.min(maxDrawdownList);
}

// 下半标准差
function getUnderHalfSTD(netValueList: number[]): number {
  return arr.standardDeviation(netValueList.filter(num => num < 0)) * Math.sqrt(250);
}

export function getProductInfo(dateList: any[], netValueList: number[]) {
  if (dateList.length !== netValueList.length) {
    return null;
  }

  const PNLList = getPNLList(netValueList);
  const maxDrawdownList = getMaxDrawdownList(netValueList);
  const totalTradingDates = getTotalTradingDates(dateList);
  const duration = getDuration(dateList);

  const netValueIncreasingRatio = getNetValueIncreasingRatio(netValueList, duration);
  const netValueVolatilityRatio = getNetValueVolatilityRatio(PNLList);
  const sharpRatio = getSharpRatio(netValueIncreasingRatio, netValueVolatilityRatio);
  const underHalfSTD = getUnderHalfSTD(PNLList);
  const sortinoRatio = getSortinoRatio(netValueIncreasingRatio, underHalfSTD);
  const maxDrawdown = getMaxDrawdown(maxDrawdownList);
  const calmarRation = getCalmarRation(netValueIncreasingRatio, maxDrawdown);
  const investmentSuccessfulRatio = getInvestmentSuccessfulRatio(PNLList, totalTradingDates);

  return {
    'netValueIncreasingRatio': netValueIncreasingRatio,
    'netValueVolatilityRatio': netValueVolatilityRatio,
    'sharpRatio': sharpRatio,
    'sortinoRatio': sortinoRatio,
    'calmarRatio': calmarRation,
    'investmentSuccessfulRatio': investmentSuccessfulRatio,
    'maxDrawdown': maxDrawdown,
    'underHalfSTD': underHalfSTD
  };
}
