const contract_address = "0x2FD0d89271f9841eaf194B2202799595701aEF70";
const abi = [{"constant":true,"inputs":[],"name":"association","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_bid_id","type":"uint256"}],"name":"withdraw_bid","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_team_name","type":"string"},{"name":"_team_address","type":"address"}],"name":"register_team","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to_club_id","type":"uint256"},{"name":"_pid","type":"uint256"},{"name":"_amount","type":"uint256"},{"name":"_pfpc","type":"uint256"},{"name":"_ww","type":"uint256"},{"name":"_buyout_clause","type":"uint256"}],"name":"send_bid","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get_successful_bids","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"bids","outputs":[{"name":"from_club_id","type":"uint256"},{"name":"to_club_id","type":"uint256"},{"name":"player_id","type":"uint256"},{"name":"amount","type":"uint256"},{"name":"percent_for_parent_club","type":"uint256"},{"name":"buyout_clause","type":"uint256"},{"name":"weekly_wage","type":"uint256"},{"name":"buyout_clause_activated","type":"bool"},{"name":"selling_club_agreed","type":"bool"},{"name":"player_agreed","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_bid_id","type":"uint256"}],"name":"accept_bid_club","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"AddressToPlayerId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"AddressToClubId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_bid_id","type":"uint256"}],"name":"accept_bid_player","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_pos","type":"uint8"},{"name":"_team_id","type":"uint256"},{"name":"_ww","type":"uint256"},{"name":"_buyout_clause","type":"uint256"},{"name":"_player_address","type":"address"}],"name":"register_player","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"number_of_bids","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_bid_id","type":"uint256"}],"name":"reject_bid_player","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"active_bids","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"clubs","outputs":[{"name":"club_name","type":"string"},{"name":"funds","type":"uint256"},{"name":"spent","type":"uint256"},{"name":"income","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"number_of_players","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_bid_id","type":"uint256"}],"name":"reject_bid_club","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"successful_bids","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_active_bids","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"name","type":"string"},{"name":"position","type":"uint8"},{"name":"team_id","type":"uint256"},{"name":"weekly_wage","type":"uint256"},{"name":"buyout_clause","type":"uint256"},{"name":"pcp","type":"uint256"},{"name":"previous_club_id","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"number_of_clubs","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}] ;

let contract;
let acc ;

function AcceptBid(bid_id) {
  console.log("testinhg");
  contract.accept_bid_club.sendTransaction(bid_id, (error, result) => {
    if (error) {
      return console.log(error);
    }
    console.log("txhash: " + result);
  }
  );
}

function RejectBid(bid_id) {
  contract.reject_bid_club.sendTransaction(bid_id, (error, result) => {
    if (error) {
      return console.log(error);
    }
    console.log("txhash: " + result);
  }
  );
}

function WithdrawBid(bid_id) {
	contract.withdraw_bid.sendTransaction(bid_id, (error,result) => {
		if(error) {
			return console.log(error) ;
		}
		console.log("txhash: " + result) ;
	}) ;
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
              var info_template = "<tr><td>" + club[1] + "</td><td>" + club[2] + "</td><td>" + club[3] + "</td></tr>";
              var club_info = $("#ClubInfo");
              club_info.empty();
              club_info.append(info_template);

              //players
              contract.number_of_players.call( (error, num_players) => {
                if (error) {
                  console.log(error);
                }
                else {
                  var squad = $("#ClubPlayers");
                  squad.empty();
                  var counter = 1;
                  // console.log(parseInt(num_players)) ;
                  var dummy = new Array(parseInt(num_players)).fill(0);
                  console.log(dummy.length);
                  console.log('final') ;
                  dummy.forEach(function(val, i) {
                  	console.log("p_test");
                    contract.players.call(i, function(err, player) {
                      if (parseInt(player[2]) == parseInt(club_id)) {
                        position = "Goalkeeper";
                        if (player[1] == 1) position = "Defender";
                        if (player[1] == 2) position = "Midfielder";
                        if (player[1] == 3) position = "Striker";

                        var player_template = "<tr><td>" + (counter++) + "</td><td>" + player[0] + "</td><td>" + position + 
                          "</td><td>" + player[3] + "</td><td>" + player[4] + "</td></tr>";
                        squad.append(player_template);
                      }
                    });
                  });
                }
              });
              contract.get_active_bids.call( (error, active_bids) => {
                if (error) {
                  console.log(error);
                }
                else {
                  //received bids
                  var received_bids = $("#BidsActive");
                  received_bids.empty();
                  var counter1 = 1;
                  var num_bids = active_bids.length;
                  active_bids.forEach(function(bid_id, i) {
                    contract.bids.call(bid_id, function(err, bid) {
                      if (err) {
                        console.log(err);
                      }
                      else if ( !bid[7] && !bid[8] && parseInt(bid[1]) == parseInt(club_id)) {
                        contract.clubs.call(bid[0] - 1, function(err, from_club) {
                          var from_club_name = from_club[0];
                          contract.players.call(bid[2] - 1, function(err, bid_player) {
                            if (err) {
                              console.log(err);
                            }
                            var bid_player = bid_player[0];
                            var bid_template = "<tr><td>" + (counter1++) + "</td><td>" + from_club_name + "</td><td>" + bid_player + 
                              "</td><td>" + bid[3] + "</td><td>" +
                              "<button onclick=\"AcceptBid("+ bid_id +")\" style=\"color:green\">Accept</button> <button onclick=\"RejectBid(" + 
                              bid_id + ")\" style=\"color:red\">Reject</button>" + "</td></tr>";
                            received_bids.append(bid_template);	
                          });
                        });
                      }
                    });
                  });
                  
                  //in-progress bids
                  var in_progress_bids = $("#InProgressBids");
                  in_progress_bids.empty();
                  var counter1 = 1;
                  var num_bids = active_bids.length;
                  active_bids.forEach(function(bid_id, i) {
                    contract.bids.call(bid_id, function(err, bid) {
                      if (err) {
                        console.log(err);
                      }
                      else if ( !bid[7] && bid[8] && parseInt(bid[1]) == parseInt(club_id)) {
                        contract.clubs.call(bid[0] - 1, function(err, from_club) {
                          var from_club_name = from_club[0];
                          contract.players.call(bid[2] - 1, function(err, bid_player) {
                            if (err) {
                              console.log(err);
                            }
                            var bid_player = bid_player[0];
                            var bid_template = "<tr><td>" + (counter1++) + "</td><td>" + from_club_name + "</td><td>" + bid_player + 
                              "</td><td>" + bid[3] + "</td></tr>";
                            in_progress_bids.append(bid_template);	
                          });
                        });
                      }
                    });
                  });
                  //buyout clauses activated
                  var buyout_clauses = $("#BuyoutClausesActivated");
                  buyout_clauses.empty();
                  var counter2 = 1;
                  active_bids.forEach(function(bid_id, i) {
                    contract.bids.call(bid_id, function(err, bid) {
                      if ( bid[7] && !bid[9] && parseInt(bid[1]) == parseInt(club_id)) {
                        contract.clubs.call(bid[0] - 1, function(err, from_club) {
                          var from_club_name = from_club[0];
                          contract.players.call(bid[2] - 1, function(err, bid_player) {
                            var bid_player = bid_player[0];
                            var bid_template = "<tr><td>" + (counter2++) + "</td><td>" + from_club_name + "</td><td>" + bid_player + "</td></tr>";
                            buyout_clauses.append(bid_template);
                          });
                        });
                      }
                    });
                  });
                  //sent bids
                  var sent_bids = $("#SentBids");
                  sent_bids.empty();
                  var counter3 = 1;
                  active_bids.forEach(function(bid_id, i) {
                    contract.bids.call(bid_id, function(err, bid) {
                      if (parseInt(bid[0]) == parseInt(club_id)) {
                        contract.clubs.call(bid[1] - 1, function(err, to_club) {
                          var to_club_name = to_club[0];
                          contract.players.call(bid[2] - 1, function(err, bid_player) {
                            var bid_player = bid_player[0];
                            var bid_template = "<tr><td>" + (counter3++) + "</td><td>" + to_club_name + 
                              "</td><td>" + bid_player + "</td><td>" + bid[3] + "</td><td>" +
                              "<button onclick=\"WithdrawBid("+bid_id+")\">Withdraw</button>" + "</td></tr>";
                            sent_bids.append(bid_template);
                          });
                        });
                      }
                    });
                  });
                  // completed transfers
                  var completed_tranfers = $("#CompletedTransfers");
                  completed_tranfers.empty();
                  var counter4 = 1;
                  contract.get_successful_bids.call((error, successful_bids) => {
                  	if(error) {
                  		console.log(error) ;
                  	}
                  	else {
                  		successful_bids.forEach(function(bid_id,i) {
                  			contract.bids.call(bid_id, function(err,bid) {
                  				if(parseInt(bid[0]) == parseInt(club_id)) {
                  					contract.clubs.call(bid[1] - 1, function(error,to_club) {
                  						if(error) {
                  							console.log(error) ;
                  						}
                  						else {
                  							contract.players.call(bid[2]-1, function(err,bid_player) {
                  								if(err) {
                  									console.log(err) ;
                  								}
                  								else {
                  									contract.clubs.call(club_id-1,(err,from_club) => {
                  										if(err) {
                  											console.log(err) ;
                  										}
                  										else {
                  											var from_club_name = from_club[0];
                  											var to_club_name = to_club[0];
                  											var player_name = bid_player[0] ;
                  											var amount = bid[3];
                  											var template = "<tr><td>" + (counter4++) + "</td><td>" +
                  											from_club_name + "</td><td>" + to_club_name + "</td><td>" + 
                  											player_name + "</td><td>" + amount + "</td></tr>" ;
                  											completed_tranfers.append(template);
                  										}
                  									})
                  								}
                  							})
                  						}
                  					})
                  				}

                  				else if(parseInt(bid[1]) == parseInt(club_id)) {
                  					contract.clubs.call(bid[0] - 1, function(error,from_club) {
                  						if(error) {
                  							console.log(error) ;
                  						}
                  						else {
                  							contract.players.call(bid[2]-1, function(err,bid_player) {
                  								if(err) {
                  									console.log(err) ;
                  								}
                  								else {
                  									contract.clubs.call(club_id-1,(err,to_club) => {
                  										if(err) {
                  											console.log(err) ;
                  										}
                  										else {
                  											var from_club_name = from_club[0];
                  											var to_club_name = to_club[0];
                  											var player_name = bid_player[0] ;
                  											var amount = bid[3];
                  											var template = "<tr><td>" + (counter4++) + "</td><td>" +
                  											from_club_name + "</td><td>" + to_club_name + "</td><td>" + 
                  											player_name + "</td><td>" + amount + "</td></tr>" ;
                  											completed_tranfers.append(template);
                  										}
                  									})
                  								}
                  							})
                  						}
                  					})
                  				}
                  			})
                  		})
                  	}
                  })
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

