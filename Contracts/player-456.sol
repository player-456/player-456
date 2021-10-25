// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Player456Game is ERC721, ERC721Enumerable, AccessControl, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIdCounter;

    bytes32 public constant FRONTMAN_ROLE = keccak256("FRONTMAN_ROLE");

    uint256 public MAX_PLAYERS_GAME = 456;
    uint256 public constant maxPlayersPurchase = 10;
    uint256 public playerPrice = 100000000000000; //0.0001ETH
    // uint256 public playerPrice = 55000000000000000; //0.055 ETH
    bool public saleIsActive = false;
    uint256 public currentSeason = 0;
    uint256 public mintedPlayersForSeason = 0;

    string public baseURI;
    string public baseExtension = ".json";

    constructor(string memory _initBaseURI) ERC721("Player 456 Game", "PLYR") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(FRONTMAN_ROLE, msg.sender);
        setBaseURI(_initBaseURI);
    }

    /**
     * Mints Players
     */
    function mintPlayer(uint256 numberOfPlayers) public payable {
        require(saleIsActive, "Sale must be active to mint a Player");

        require(numberOfPlayers <= maxPlayersPurchase, "Can only mint 10 players at a time");

        require(
            (mintedPlayersForSeason + numberOfPlayers) <= MAX_PLAYERS_GAME,
            "Purchase would exceed max supply of Players"
        );

        require((playerPrice * numberOfPlayers) <= msg.value, "Ether value sent is not correct");

        for (uint256 i=0; i<numberOfPlayers; i++) {
            _safeMint(msg.sender, _tokenIdCounter.current());
            _tokenIdCounter.increment();
        }


        mintedPlayersForSeason = mintedPlayersForSeason + numberOfPlayers;
        if (mintedPlayersForSeason == 456) {
            saleIsActive = false;
            currentSeason == 1;
        }
    }

    function startSale() public onlyRole(FRONTMAN_ROLE) {
        require(currentSeason == 0, "Sale was already started once.");
        saleIsActive = true;
    }

    function nextSeason() public onlyRole(FRONTMAN_ROLE) {
        currentSeason++;
        saleIsActive = true;
        mintedPlayersForSeason = 0;
        playerPrice = 70000000000000000; //0.07 ETH
    }

    function setPlayerPrice(uint256 _newPlayerPrice) public onlyOwner {
        playerPrice = _newPlayerPrice;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(abi.encodePacked(currentBaseURI, (tokenId + 1).toString(), baseExtension))
                : "";
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
        baseExtension = _newBaseExtension;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}