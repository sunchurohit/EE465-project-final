pragma solidity >=0.4.20 <0.6.0;
import "./project_util.sol";

contract Football_transfers is Temp {
    
    constructor() public {
        association = msg.sender ;
    }
    
    modifier onlyOwner() { // Modifier
        require(
            msg.sender == association,
            "Only the association can call this."
        );
        _;
    }
    
    function register_team (string _team_name,address _team_address) public onlyOwner() {
        for (uint i=0; i < clubs.length; i++)
        {
            bool temp = stringsEqual(clubs[i].club_name,_team_name);
            require(temp == false, "This name is already taken, please find another one.") ;
        }
        require(AddressToClubId[_team_address] <= 0, "This address is already in use, please use another one.") ;
        require(AddressToPlayerId[_team_address] <= 0, "This address is already in use, please use another one.") ;
        Club memory c; 
        c.club_name = _team_name ;
        c.funds = 0;
        c.spent = 0;
        c.income = 0;
        clubs.push(c);
        AddressToClubId[_team_address] = number_of_clubs + 1;
        number_of_clubs ++ ;
    }
    
    function register_player(string _name,Position _pos,uint _team_id,uint _ww,uint _buyout_clause,address _player_address) public onlyOwner()
    {
        require(_team_id > 0 && _team_id <= number_of_clubs, "The team id is not valid, please enter a valid club name.");
        require(AddressToClubId[_player_address] <= 0, "This address is already in use, please use another one.") ; 
        require(AddressToPlayerId[_player_address] <= 0, "This address is already in use, please use another one.") ;
        Player memory p;
        p.name = _name ;
        p.position = _pos ;
        p.team_id = _team_id ;
        p.weekly_wage = _ww ;
        p.buyout_clause = _buyout_clause  ;
        p.pcp = 0;
        p.previous_club_id = _team_id ;
        AddressToPlayerId[_player_address] = number_of_players + 1;
        players.push(p);
        number_of_players++;
    }
    
    function () public payable { // conversion rate 1 ETH = 10000 value
        require(AddressToClubId[msg.sender] > 0, "Please register as a team and then pay."); // meaning only registered clubs can pay.
        uint amount = msg.value / 1000000000 ;
        uint club_id = AddressToClubId[msg.sender] ;
        clubs[club_id-1].funds += amount ;
    }
    
    function send_bid(uint _to_club_id,uint _pid, uint _amount,uint _pfpc,uint _ww,uint _buyout_clause) public {
        bool temp = (players[_pid-1].team_id == _to_club_id);
        require(temp == true, "This player does not belong to this team.") ; // check for the player to exist in the selling club.
        
        uint buying_club_funds = clubs[AddressToClubId[msg.sender]-1].funds ;
        require(buying_club_funds >= _amount, "Not enough funds for the buying club for the transfer to happen.") ; // checking for funds of buying club
        
        uint buying_club_income = clubs[AddressToClubId[msg.sender]-1].income ;
        uint buying_club_spent = clubs[AddressToClubId[msg.sender]-1].spent ;
        require(buying_club_spent - buying_club_income <= 250000000, "Financial Fair Play rules are violated, please increase your income.") ;
        
        Bid memory b;
        b.from_club_id = AddressToClubId[msg.sender] ;
        b.to_club_id = _to_club_id ;
        b.player_id = _pid ;
        require(AddressToClubId[msg.sender] != _to_club_id, "Buyer and Seller cannot be the same club.") ;
        bool temp1 = false ;
        for(uint i=0; i < active_bids.length; i++)
        {
            if(bids[active_bids[i]].from_club_id == AddressToClubId[msg.sender] && bids[active_bids[i]].to_club_id == _to_club_id && bids[active_bids[i]].player_id == _pid)
            {
                temp1 = true ; break;
            }
        }
        require(temp1 == false, "Cannot bid for the same player again, please withdraw your bid and then send.");
        b.amount = _amount ;
        b.percent_for_parent_club = _pfpc ;
        b.buyout_clause = _buyout_clause ;
        b.weekly_wage = _ww ;
        b.selling_club_agreed = false ;
        b.player_agreed = false ;
        if(_amount >= players[_pid-1].buyout_clause)
        {
            b.buyout_clause_activated = true ;
        }
        else
        {
            b.buyout_clause_activated = false ;
        }
        clubs[AddressToClubId[msg.sender]-1].funds -= _amount ;
        bids.push(b);
        active_bids.push(number_of_bids);
        number_of_bids++ ;
    }
    
    function withdraw_bid (uint _bid_id) public {
        bool temp = false ; uint t;
        for(uint i=0;i < active_bids.length; i++)
        {
            if(active_bids[i] == _bid_id)
            {
                t = i;
                temp = true ; break ;
            }
        }
        require(temp == true, "This bid is not active.") ;
        require(AddressToClubId[msg.sender] == bids[_bid_id].from_club_id, "Only the sender of a bid can withdraw their bid.") ;
        clubs[bids[_bid_id].from_club_id - 1].funds += bids[_bid_id].amount ;
        remove(t); // 
    }
    
    function accept_bid_club (uint _bid_id) public {
        bool temp = false ; uint t;
        for(uint i=0; i < active_bids.length; i++)
        {
            if(active_bids[i] == _bid_id)
            {
                t = i; temp = true ; break ;
            }
        }
        require(temp = true , "This bid is not active.") ;
        require(AddressToClubId[msg.sender] == bids[_bid_id].to_club_id, "Only the selling club can accept their bid.") ;
        bids[_bid_id].selling_club_agreed = true ;
    }
    
    function reject_bid_club (uint _bid_id) public {
        require(AddressToClubId[msg.sender] == bids[_bid_id].to_club_id, "Only the selling club can reject their bid.") ;
        bool temp = false ; uint t;
        for(uint i=0; i < active_bids.length; i++)
        {
            if(active_bids[i] == _bid_id)
            {
                t = i; temp = true ; break ;
            }
        }
        require(temp = true , "This bid is not active.") ;
        require(bids[_bid_id].buyout_clause_activated == false, "Buyout clause is activated, the selling club has no power to reject the bid.") ;
        require(bids[_bid_id].selling_club_agreed == false, "Once a bid is accepted by a club, it cannot be rejected.") ;
        clubs[bids[_bid_id].from_club_id - 1].funds += bids[_bid_id].amount ;
        remove(t) ; // remove the bids from the active_bids array.
    }
    
    function accept_bid_player (uint _bid_id) public {
        bool temp = false ; uint t;
        for(uint i=0; i < active_bids.length; i++)
        {
            if(active_bids[i] == _bid_id)
            {
                t = i; temp = true ; break ;
            }
        }
        require(temp = true , "This bid is not active.") ;
        require(bids[_bid_id].player_id == AddressToPlayerId[msg.sender], "Only the player involved in the transfer can accept their transfer.") ;
        bool t1 = bids[_bid_id].selling_club_agreed ;
        bool t2 = bids[_bid_id].buyout_clause_activated ;
        t2 = t2 || t1 ;
        require(t2 == true, "The bid is not yet accepted by the selling club nor the buyout clause is activated.") ;
        //make updates to the player and remove the bid now.
        uint p_id = bids[_bid_id].player_id ;
        uint s_id = bids[_bid_id].to_club_id ;
        uint b_id = bids[_bid_id].from_club_id ;
        uint pc_id = players[p_id-1].previous_club_id ;
        uint amount = bids[_bid_id].amount ;
        uint percent_for_parent_club = players[p_id-1].pcp ;
        clubs[pc_id-1].funds += percent_for_parent_club * amount / 100 ;
        clubs[s_id-1].funds += (100 - percent_for_parent_club) * amount / 100 ;
        clubs[pc_id-1].income += percent_for_parent_club * amount / 100 ;
        clubs[s_id-1].income += (100 - percent_for_parent_club) * amount / 100 ;
        // clubs[b_id-1].funds -= amount ; already deducted when the team has sent the bid.
        clubs[b_id-1].spent += amount ;
        players[p_id-1].team_id = b_id ;
        players[p_id-1].previous_club_id = s_id ;
        players[p_id-1].weekly_wage = bids[_bid_id].weekly_wage ;
        players[p_id-1].buyout_clause = bids[_bid_id].buyout_clause ;
        players[p_id-1].pcp = bids[_bid_id].percent_for_parent_club ;
        successful_bids.push(t);
        remove(t) ; //remove the bid from the active_bids array.
    }
    
    function reject_bid_player (uint _bid_id) public {
        bool temp = false ; uint t;
        for(uint i=0; i < active_bids.length; i++)
        {
            if(active_bids[i] == _bid_id)
            {
                t = i; temp = true ; break ;
            }
        }
        require(temp = true , "This bid is not active.") ;
        require(bids[_bid_id].player_id == AddressToPlayerId[msg.sender], "Only the player involved in the transfer can rejct the offer.") ;
        clubs[bids[_bid_id].from_club_id - 1].funds += bids[_bid_id].amount ;
        remove(t);
    }
}