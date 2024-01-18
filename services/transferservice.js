function TransferAmount(amount,accbalance){
var remaingAccBalance = (parseInt(accbalance)- parseInt(amount));
return remaingAccBalance;
}
module.exports = {TransferAmount} ;