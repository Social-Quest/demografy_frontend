export const formatNumber = (value) => String(value ?? '').replace(/[^\d.\-]/g, '')

export function calculateStampDuty({ price, state, propertyType, firstHomeBuyer }) {
  const numericPrice = Number(price) || 0
  let stampDuty = 0
  let concession = 0

  if (state === 'NSW') {
    if (numericPrice <= 14000) stampDuty = numericPrice * 0.0125
    else if (numericPrice <= 32000) stampDuty = 175 + (numericPrice - 14000) * 0.015
    else if (numericPrice <= 85000) stampDuty = 445 + (numericPrice - 32000) * 0.0175
    else if (numericPrice <= 319000) stampDuty = 1372.5 + (numericPrice - 85000) * 0.035
    else if (numericPrice <= 1064000) stampDuty = 9562.5 + (numericPrice - 319000) * 0.045
    else stampDuty = 43087.5 + (numericPrice - 1064000) * 0.055

    if (firstHomeBuyer === 'yes' && propertyType !== 'investment') {
      if (numericPrice <= 650000) concession = stampDuty
      else if (numericPrice <= 800000) concession = stampDuty * ((800000 - numericPrice) / 150000)
    }
  } else if (state === 'VIC') {
    if (numericPrice <= 25000) stampDuty = numericPrice * 0.014
    else if (numericPrice <= 130000) stampDuty = 350 + (numericPrice - 25000) * 0.024
    else if (numericPrice <= 960000) stampDuty = 2870 + (numericPrice - 130000) * 0.06
    else stampDuty = 52670 + (numericPrice - 960000) * 0.055

    if (firstHomeBuyer === 'yes' && propertyType !== 'investment') {
      if (numericPrice <= 600000) concession = stampDuty
      else if (numericPrice <= 750000) concession = stampDuty * ((750000 - numericPrice) / 150000)
    }
  } else {
    stampDuty = numericPrice * 0.04
    if (firstHomeBuyer === 'yes' && numericPrice <= 600000 && propertyType !== 'investment') {
      concession = stampDuty * 0.5
    }
  }

  const finalDuty = Math.max(0, stampDuty - concession)
  const transferFee = 150
  const mortgageReg = 120
  const legalFees = 1500
  const totalCosts = finalDuty + transferFee + mortgageReg + legalFees

  return {
    finalDuty,
    concession,
    totalCosts,
    stampDuty,
    transferFee,
    mortgageReg,
    legalFees,
  }
}

export function calculateMortgage({ loan, rate, term, frequency }) {
  const numericLoan = Number(loan) || 0
  const numericRate = Number(rate) / 100 || 0
  const numericTerm = Number(term) || 0
  let paymentsPerYear = 12

  if (frequency === 'fortnightly') paymentsPerYear = 26
  else if (frequency === 'weekly') paymentsPerYear = 52

  const periodicRate = numericRate / paymentsPerYear
  const totalPayments = numericTerm * paymentsPerYear

  if (periodicRate === 0 || totalPayments === 0) {
    return {
      repayment: 0,
      totalInterest: 0,
      totalRepaid: numericLoan,
      frequencyLabel: frequency === 'fortnightly' ? 'per fortnight' : frequency === 'weekly' ? 'per week' : 'per month',
      summary: {
        loanAmount: numericLoan,
        interestRate: numericRate * 100,
        termYears: numericTerm,
        totalInterest: 0,
        totalRepaid: numericLoan,
      },
      comparison: [],
    }
  }

  const repayment =
    numericLoan *
    ((periodicRate * Math.pow(1 + periodicRate, totalPayments)) /
      (Math.pow(1 + periodicRate, totalPayments) - 1))

  const totalRepaid = repayment * totalPayments
  const totalInterest = totalRepaid - numericLoan
  const frequencyLabel =
    frequency === 'fortnightly' ? 'per fortnight' : frequency === 'weekly' ? 'per week' : 'per month'

  const repaymentForFrequency = (paymentsPerYearOption) => {
    if (!numericTerm || !numericLoan) return { payment: 0, totalInterest: 0 }
    const ratePerPeriod = numericRate / paymentsPerYearOption
    const periods = numericTerm * paymentsPerYearOption

    if (ratePerPeriod === 0 || periods === 0) {
      const total = numericLoan
      return {
        payment: periods === 0 ? 0 : total / periods,
        totalInterest: 0,
      }
    }

    const payment =
      numericLoan *
      ((ratePerPeriod * Math.pow(1 + ratePerPeriod, periods)) /
        (Math.pow(1 + ratePerPeriod, periods) - 1))
    const totalPaid = payment * periods
    return {
      payment,
      totalInterest: totalPaid - numericLoan,
    }
  }

  const monthly = repaymentForFrequency(12)
  const fortnightly = repaymentForFrequency(26)
  const weekly = repaymentForFrequency(52)

  const comparison = [
    {
      id: 'monthly',
      label: 'Monthly',
      cadence: 'month',
      payment: monthly.payment,
      totalInterest: monthly.totalInterest,
      savings: 0,
    },
    {
      id: 'fortnightly',
      label: 'Fortnightly',
      cadence: 'fortnight',
      payment: fortnightly.payment,
      totalInterest: fortnightly.totalInterest,
      savings: Math.max(0, monthly.totalInterest - fortnightly.totalInterest),
    },
    {
      id: 'weekly',
      label: 'Weekly',
      cadence: 'week',
      payment: weekly.payment,
      totalInterest: weekly.totalInterest,
      savings: Math.max(0, monthly.totalInterest - weekly.totalInterest),
    },
  ]

  return {
    repayment,
    totalInterest,
    totalRepaid,
    frequencyLabel,
    summary: {
      loanAmount: numericLoan,
      interestRate: numericRate * 100,
      termYears: numericTerm,
      totalInterest,
      totalRepaid,
    },
    comparison,
  }
}

export function calculateBorrowing({ income, otherIncome, expenses, debts, dependents, deposit }) {
  const numericIncome = Number(income) || 0
  const numericOtherIncome = Number(otherIncome) || 0
  const numericExpenses = Number(expenses) || 0
  const numericDebts = Number(debts) || 0
  const numericDependents = Number(dependents) || 0
  const numericDeposit = Number(deposit) || 0

  const totalIncome = numericIncome + numericOtherIncome
  const monthlyIncome = totalIncome / 12
  const minLivingExpenses = 2000 + numericDependents * 500
  const totalExpenses = Math.max(numericExpenses, minLivingExpenses)
  const netSurplus = monthlyIncome - totalExpenses - numericDebts
  const incomeMultiple = totalIncome * 6
  const assessmentRate = 0.095
  const loanTermYears = 30
  const monthlyRate = assessmentRate / 12
  const paymentPeriods = loanTermYears * 12

  const denominator = monthlyRate * Math.pow(1 + monthlyRate, paymentPeriods)
  const maxLoanServiceability =
    denominator === 0
      ? 0
      : (netSurplus * (Math.pow(1 + monthlyRate, paymentPeriods) - 1)) /
        denominator

  const maxLoan = Math.max(0, Math.min(incomeMultiple, maxLoanServiceability))
  const propertyBudget = maxLoan + numericDeposit

  const currentRate = 0.065
  const currentMonthlyRate = currentRate / 12
  const repaymentDenominator =
    currentMonthlyRate * Math.pow(1 + currentMonthlyRate, paymentPeriods)
  const monthlyRepayment =
    repaymentDenominator === 0
      ? 0
      : maxLoan * (repaymentDenominator / (Math.pow(1 + currentMonthlyRate, paymentPeriods) - 1))

  const dti = totalIncome === 0 ? 0 : maxLoan / totalIncome

  return {
    maxLoan,
    propertyBudget,
    monthlyRepayment,
    monthlyIncome,
    dti,
    totalExpenses,
    debts: numericDebts,
    netSurplus,
  }
}

export function calculateRentalYield({ value, rent, rates, insurance, management, maintenance }) {
  const propertyValue = Number(value) || 0
  const weeklyRent = Number(rent) || 0
  const councilRates = Number(rates) || 0
  const insuranceCost = Number(insurance) || 0
  const managementPercent = Number(management) || 0
  const maintenanceCost = Number(maintenance) || 0

  const annualRent = weeklyRent * 52
  const managementFee = annualRent * (managementPercent / 100)
  const totalExpenses = managementFee + councilRates + insuranceCost + maintenanceCost
  const netIncome = annualRent - totalExpenses
  const grossYield = propertyValue === 0 ? 0 : (annualRent / propertyValue) * 100
  const netYield = propertyValue === 0 ? 0 : (netIncome / propertyValue) * 100

  return {
    annualRent,
    managementFee,
    councilRates,
    insuranceCost,
    maintenanceCost,
    totalExpenses,
    netIncome,
    grossYield,
    netYield,
  }
}

export function calculateAffordability({ income, deposit, expenses, rate, term }) {
  const numericIncome = Number(income) || 0
  const numericDeposit = Number(deposit) || 0
  const numericExpenses = Number(expenses) || 0
  const numericRate = Number(rate) / 100 || 0
  const numericTerm = Number(term) || 0

  const monthlyIncome = numericIncome / 12
  const netSurplus = monthlyIncome - numericExpenses
  const maxLoanIncome = numericIncome * 6
  const monthlyRate = numericRate / 12
  const totalPayments = numericTerm * 12

  const denominator = monthlyRate * Math.pow(1 + monthlyRate, totalPayments)
  const maxLoanServiceability =
    denominator === 0
      ? 0
      : (netSurplus * (Math.pow(1 + monthlyRate, totalPayments) - 1)) /
        denominator

  const maxLoan = Math.max(0, Math.min(maxLoanIncome, maxLoanServiceability))
  const maxPrice = maxLoan + numericDeposit
  const stampDuty = maxPrice * 0.04
  const otherCosts = maxPrice * 0.01
  const affordablePrice = maxPrice - stampDuty - otherCosts

  const repaymentDenominator = monthlyRate * Math.pow(1 + monthlyRate, totalPayments)
  const monthlyRepayment =
    repaymentDenominator === 0
      ? 0
      : maxLoan * (repaymentDenominator / (Math.pow(1 + monthlyRate, totalPayments) - 1))

  return {
    maxLoan,
    maxPrice,
    stampDuty,
    otherCosts,
    affordablePrice,
    monthlyRepayment,
  }
}


