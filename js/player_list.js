const contract_address = "0x2FD0d89271f9841eaf194B2202799595701aEF70";
const abi = [{"constant":true,"inputs":[],"name":"association","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_bid_id","type":"uint256"}],"name":"withdraw_bid","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_team_name","type":"string"},{"name":"_team_address","type":"address"}],"name":"register_team","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to_club_id","type":"uint256"},{"name":"_pid","type":"uint256"},{"name":"_amount","type":"uint256"},{"name":"_pfpc","type":"uint256"},{"name":"_ww","type":"uint256"},{"name":"_buyout_clause","type":"uint256"}],"name":"send_bid","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get_successful_bids","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"bids","outputs":[{"name":"from_club_id","type":"uint256"},{"name":"to_club_id","type":"uint256"},{"name":"player_id","type":"uint256"},{"name":"amount","type":"uint256"},{"name":"percent_for_parent_club","type":"uint256"},{"name":"buyout_clause","type":"uint256"},{"name":"weekly_wage","type":"uint256"},{"name":"buyout_clause_activated","type":"bool"},{"name":"selling_club_agreed","type":"bool"},{"name":"player_agreed","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_bid_id","type":"uint256"}],"name":"accept_bid_club","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"AddressToPlayerId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"AddressToClubId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_bid_id","type":"uint256"}],"name":"accept_bid_player","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_pos","type":"uint8"},{"name":"_team_id","type":"uint256"},{"name":"_ww","type":"uint256"},{"name":"_buyout_clause","type":"uint256"},{"name":"_player_address","type":"address"}],"name":"register_player","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"number_of_bids","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_bid_id","type":"uint256"}],"name":"reject_bid_player","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"active_bids","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"clubs","outputs":[{"name":"club_name","type":"string"},{"name":"funds","type":"uint256"},{"name":"spent","type":"uint256"},{"name":"income","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"number_of_players","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_bid_id","type":"uint256"}],"name":"reject_bid_club","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"successful_bids","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_active_bids","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"name","type":"string"},{"name":"position","type":"uint8"},{"name":"team_id","type":"uint256"},{"name":"weekly_wage","type":"uint256"},{"name":"buyout_clause","type":"uint256"},{"name":"pcp","type":"uint256"},{"name":"previous_club_id","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"number_of_clubs","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}] ;
let contract;
let acc ;

function SendBid(to_club_id, player_id) {
  console.log("testing");
  var amount = $('#' + player_id + 'bid_value').val();
  var pfpc = $('#' + player_id + 'pfpc').val();
  var ww = $('#' + player_id + 'weekly_wage').val();
  var bc = $('#' + player_id + 'buyout_clause').val();
  console.log(amount);
  console.log(pfpc);
  console.log(ww);
  console.log(bc);
  contract.send_bid.sendTransaction(to_club_id, player_id, amount,
    pfpc, ww, bc, (error, result) => {
    if (error) {
      return console.log(error);
    }
    console.log("txhash: " + result);
  }
  );
}


window.addEventListener('load', () => {
  if(typeof(web3) === 'undefined') {
    return console.log("Metamask is not installed");
  }
  contract = web3.eth.contract(abi).at(contract_address);

  web3.eth.getCoinbase(function(err, account) {
    if (err === null) {
      acc = account;
      console.log(acc);

      contract.AddressToClubId.call(acc,function(err, club_id){
        if(err) {
          console.log(error);
        }   
        else if (club_id <= 0) {
          console.log("Invalid Club");
        }
        else {
          contract.clubs.call(club_id - 1, function(err, club) {
            if (err === null) {
              $("#club_content").show();
              $("#club_name").html("Club: " + club[0]);
              //players
              contract.number_of_players.call( (error, num_players) => {
                if (error) {
                  console.log(error);
                }
                else {
                  var plist = $("#PlayerList");
                  plist.empty();
                  var counter = 1;
                  var dummy = new Array(parseInt(num_players)).fill(0);

                  dummy.forEach(function(val, i) {
                    contract.players.call(i, function(err, player) {
                      if (parseInt(player[2]) != parseInt(club_id)) {
                        contract.clubs.call(player[2] - 1, function(err, player_club) {

                          var player_template = "<tr><td>" + (counter++) + "</td><td>" + player_club[0] + "</td><td>" + player[0] + 
                            "</td><td>" + player[3] + "</td><td>" + player[4] + "</td><td>" +
                            "<input type=\"number\" id=\"" + (i+1) + "bid_value\"  />" + "</td><td>" +
                            "<input type=\"number\" id=\"" + (i+1) + "weekly_wage\"  />" + "</td><td>" +
                            "<input type=\"number\" id=\"" + (i+1) + "buyout_clause\"  />" + "</td><td>" +
                            "<input type=\"number\" id=\"" + (i+1) + "pfpc\"  />" + "</td><td>" +
                            "<button onclick=\"SendBid(" + player[2] + ", " + (i+1) + ")\" style=\"color:green\">Bid</button>";
                          plist.append(player_template);
                        });
                      }
                    });
                  });

                }
              });
            }
            else console.log(error);
          });
        }
      }); 
    }
  });

});

