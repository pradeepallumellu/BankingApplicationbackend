function DepositedAmount(amount, accbalance) {
    const Amount = parseInt(amount);
    const Accbalance = parseInt(accbalance);
    const totalAccBal = (Amount + Accbalance);
    return totalAccBal;
}
module.exports = { DepositedAmount };
