pragma solidity >=0.4.20 <0.6.0;
contract Temp {
    
    function stringsEqual(string storage _a, string memory _b) internal returns (bool) {
        bytes storage a = bytes(_a);
        bytes memory b = bytes(_b);
        if (a.length != b.length)
        return false;
        // @todo unroll this loop
        for (uint i = 0; i < a.length; i ++)
        if (a[i] != b[i])
        return false;
        return true;
    }
    
    function get_active_bids() public view returns (uint[]) {
        return active_bids ;
    }
    
    function get_successful_bids() public view returns (uint[]) {
        return successful_bids ;
    }
    
    function remove(uint index) internal {
        if (index >= active_bids.length) return;

        for (uint i = index; i<active_bids.length-1; i++){
            active_bids[i] = active_bids[i+1];
        }
        delete active_bids[active_bids.length-1];
        active_bids.length--;
    }
    
    enum Position { Goalkeeper, Defender, Midfielder, Striker } 
    
    struct Bid {
        uint from_club_id ;
        uint to_club_id ;
        uint player_id ;    
        uint amount ;
        uint percent_for_parent_club;
        uint buyout_clause ;
        uint weekly_wage ;
        bool buyout_clause_activated;
        bool selling_club_agreed ;
        bool player_agreed ;
    }
    
    struct Player {
        string name ;
        Position position ;
        uint team_id ;
        uint weekly_wage ;
        uint buyout_clause ;
        uint pcp ;
        uint previous_club_id ;
    }
    
    struct Club {
        string club_name ;
        // Player[] squad;
        uint funds ;
        uint spent ;
        // uint squad_size ;
        uint income ;
    }

    address public association ;
    
    uint public number_of_clubs = 0;
    uint public number_of_players = 0;
    uint public number_of_bids = 0;
    Club[] public clubs ;
    Player[] public players ;
    Bid[] public bids ;
    uint[] public active_bids ;
    uint[] public successful_bids ;
    mapping (address => uint) public AddressToClubId ;
    mapping (address => uint) public AddressToPlayerId ;
}