const contract_address = "0x2FD0d89271f9841eaf194B2202799595701aEF70";
const abi = [{"constant":true,"inputs":[],"name":"association","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_bid_id","type":"uint256"}],"name":"withdraw_bid","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_team_name","type":"string"},{"name":"_team_address","type":"address"}],"name":"register_team","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to_club_id","type":"uint256"},{"name":"_pid","type":"uint256"},{"name":"_amount","type":"uint256"},{"name":"_pfpc","type":"uint256"},{"name":"_ww","type":"uint256"},{"name":"_buyout_clause","type":"uint256"}],"name":"send_bid","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get_successful_bids","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"bids","outputs":[{"name":"from_club_id","type":"uint256"},{"name":"to_club_id","type":"uint256"},{"name":"player_id","type":"uint256"},{"name":"amount","type":"uint256"},{"name":"percent_for_parent_club","type":"uint256"},{"name":"buyout_clause","type":"uint256"},{"name":"weekly_wage","type":"uint256"},{"name":"buyout_clause_activated","type":"bool"},{"name":"selling_club_agreed","type":"bool"},{"name":"player_agreed","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_bid_id","type":"uint256"}],"name":"accept_bid_club","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"AddressToPlayerId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"AddressToClubId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_bid_id","type":"uint256"}],"name":"accept_bid_player","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_pos","type":"uint8"},{"name":"_team_id","type":"uint256"},{"name":"_ww","type":"uint256"},{"name":"_buyout_clause","type":"uint256"},{"name":"_player_address","type":"address"}],"name":"register_player","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"number_of_bids","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_bid_id","type":"uint256"}],"name":"reject_bid_player","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"active_bids","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"clubs","outputs":[{"name":"club_name","type":"string"},{"name":"funds","type":"uint256"},{"name":"spent","type":"uint256"},{"name":"income","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"number_of_players","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_bid_id","type":"uint256"}],"name":"reject_bid_club","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"successful_bids","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_active_bids","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"name","type":"string"},{"name":"position","type":"uint8"},{"name":"team_id","type":"uint256"},{"name":"weekly_wage","type":"uint256"},{"name":"buyout_clause","type":"uint256"},{"name":"pcp","type":"uint256"},{"name":"previous_club_id","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"number_of_clubs","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}] ;
let contract;
var acc;

window.addEventListener('load', () => {
  if(typeof(web3) === 'undefined') {
    return console.log("Metamask is not installed");
  }
  contract = web3.eth.contract(abi).at(contract_address);

  web3.eth.getCoinbase(function(err, account) {
    if (err === null) {
      acc = account;
      console.log("testing");
      console.log(account);
    }
    else
    { 
      console.log("account not found. Please login to Metamask") ; 
    }
    contract.AddressToClubId.call(acc,function(err, club_id){
      if(err) {
        console.log(error);
      }
      else if (club_id > 0) {
        location.replace("club_page.html");
      }
      else {
      contract.AddressToPlayerId.call(acc,function(err, player_id){
        if(err) {
          console.log(error);
        }
        else if (player_id > 0) {
          location.replace("player_page.html");
        }
        else window.alert("Invalid account");
      });
      }
    });
  });
});
