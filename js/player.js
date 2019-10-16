const contract_address = "0x2FD0d89271f9841eaf194B2202799595701aEF70";
const abi = [{"constant":true,"inputs":[],"name":"association","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_bid_id","type":"uint256"}],"name":"withdraw_bid","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_team_name","type":"string"},{"name":"_team_address","type":"address"}],"name":"register_team","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to_club_id","type":"uint256"},{"name":"_pid","type":"uint256"},{"name":"_amount","type":"uint256"},{"name":"_pfpc","type":"uint256"},{"name":"_ww","type":"uint256"},{"name":"_buyout_clause","type":"uint256"}],"name":"send_bid","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get_successful_bids","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"bids","outputs":[{"name":"from_club_id","type":"uint256"},{"name":"to_club_id","type":"uint256"},{"name":"player_id","type":"uint256"},{"name":"amount","type":"uint256"},{"name":"percent_for_parent_club","type":"uint256"},{"name":"buyout_clause","type":"uint256"},{"name":"weekly_wage","type":"uint256"},{"name":"buyout_clause_activated","type":"bool"},{"name":"selling_club_agreed","type":"bool"},{"name":"player_agreed","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_bid_id","type":"uint256"}],"name":"accept_bid_club","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"AddressToPlayerId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"AddressToClubId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_bid_id","type":"uint256"}],"name":"accept_bid_player","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_pos","type":"uint8"},{"name":"_team_id","type":"uint256"},{"name":"_ww","type":"uint256"},{"name":"_buyout_clause","type":"uint256"},{"name":"_player_address","type":"address"}],"name":"register_player","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"number_of_bids","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_bid_id","type":"uint256"}],"name":"reject_bid_player","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"active_bids","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"clubs","outputs":[{"name":"club_name","type":"string"},{"name":"funds","type":"uint256"},{"name":"spent","type":"uint256"},{"name":"income","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"number_of_players","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_bid_id","type":"uint256"}],"name":"reject_bid_club","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"successful_bids","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_active_bids","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"name","type":"string"},{"name":"position","type":"uint8"},{"name":"team_id","type":"uint256"},{"name":"weekly_wage","type":"uint256"},{"name":"buyout_clause","type":"uint256"},{"name":"pcp","type":"uint256"},{"name":"previous_club_id","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"number_of_clubs","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}] ;
let contract;
let acc ;

function AcceptBid(bid_id) {
  console.log("test_accept") ;
  contract.accept_bid_player.sendTransaction(bid_id, (error, result) => {
    if (error) {
      return console.log(error);
    }
    console.log("txhash: " + result);
  }
  );
}

function RejectBid(bid_id) {
	console.log("test_reject");
  contract.reject_bid_player.sendTransaction(bid_id, (error, result) => {
    if (error) {
      return console.log(error);
    }
    console.log("txhash: " + result);
  }
  );
}



window.addEventListener('load', () => {
	contract = web3.eth.contract(abi).at(contract_address);
	web3.eth.getCoinbase(function(err,account) {
		if(err) {
			console.log(err) ;
		}
		else {
			acc = account ; console.log(acc);
			contract.AddressToPlayerId.call(acc,function(err, player_id) {
				if(err) {
					console.log(err) ;
				}
				else {
					contract.players.call(player_id - 1, function(err, player) {
						if(err) {
							console.log(err) ;
						}
						else {
							$("#player_content").show();
							$("#player_name").html(player[0]);
							var team_id = player[2] ;
							contract.clubs.call(team_id-1, function(err, team) {
								if(err) {
									console.log(err) ;
								}
								else {
									$("#player_club_name").html("Club : " + team[0]) ;
									$("#player_weekly_wage").html(String("Wage : " + player[3]));
									$("#player_buyout_clause").html(String("Buyout clause : " + player[4]));
									contract.get_active_bids.call(function (err,active_bids) {
										if(err) {
											console.log(err) ;
										}
										else {
											// iterate through the active bids array.
											var counter1 = 1;
											$("#OffersForPlayer").empty() ;
											active_bids.forEach(function(bid_id,i) {
												contract.bids.call(bid_id,function(err,bid) {
													if(err) {
														console.log(err) ;
													}
													else {
														if(parseInt(bid[2]) == parseInt(player_id) && (bid[8] || bid[7])) {
															var from_club_name ;
															console.log(parseInt(bid[0])) ;
															contract.clubs.call(parseInt(bid[0])-1, function(err,clu) {
																if(err) {
																	console.log(err);
																}
																else {
																	from_club_name = clu[0] ;
																	var offer_template = "<tr><td>" + (counter1++) + "</td><td>" + String(from_club_name) +
																	"</td><td>" + String(bid[6]) + "</td><td>" + String(bid[5]) + "</td><td>" +
																	"<button onclick=\"AcceptBid("+ bid_id +")\" style=\"color:green\">Accept</button> <button onclick=\"RejectBid(" + 
		                              								bid_id + ")\" style=\"color:red\">Reject</button>" + "</td></tr>" ;
																	$("#OffersForPlayer").append(offer_template);
																}
															}) ;
														}
													}
												}) ;
											}) ; 
										}
									}) ; 

								}
							}) ; 
						}
					}) ;
				}
			}); 
		}
	}) ; 
}) ; 

