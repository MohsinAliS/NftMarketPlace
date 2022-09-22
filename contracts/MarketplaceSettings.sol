/**
 *Submitted for verification at polygonscan.com on 2022-07-08
*/

// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

interface IERC165 {

    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}


abstract contract ERC165 is IERC165 {

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC165).interfaceId;
    }
}


library Strings {
    bytes16 private constant _HEX_SYMBOLS = "0123456789abcdef";
    uint8 private constant _ADDRESS_LENGTH = 20;

    function toString(uint256 value) internal pure returns (string memory) {

        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }


    function toHexString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0x00";
        }
        uint256 temp = value;
        uint256 length = 0;
        while (temp != 0) {
            length++;
            temp >>= 8;
        }
        return toHexString(value, length);
    }

    function toHexString(uint256 value, uint256 length) internal pure returns (string memory) {
        bytes memory buffer = new bytes(2 * length + 2);
        buffer[0] = "0";
        buffer[1] = "x";
        for (uint256 i = 2 * length + 1; i > 1; --i) {
            buffer[i] = _HEX_SYMBOLS[value & 0xf];
            value >>= 4;
        }
        require(value == 0, "Strings: hex length insufficient");
        return string(buffer);
    }


    function toHexString(address addr) internal pure returns (string memory) {
        return toHexString(uint256(uint160(addr)), _ADDRESS_LENGTH);
    }
}


interface IAccessControl {

    event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole);

    event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender);

    event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender);


    function hasRole(bytes32 role, address account) external view returns (bool);


    function getRoleAdmin(bytes32 role) external view returns (bytes32);


    function grantRole(bytes32 role, address account) external;


    function revokeRole(bytes32 role, address account) external;


    function renounceRole(bytes32 role, address account) external;
}


abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

abstract contract AccessControl is Context, IAccessControl, ERC165 {
    struct RoleData {
        mapping(address => bool) members;
        bytes32 adminRole;
    }

    mapping(bytes32 => RoleData) private _roles;

    bytes32 public constant DEFAULT_ADMIN_ROLE = 0x00;


    modifier onlyRole(bytes32 role) {
        _checkRole(role);
        _;
    }


    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IAccessControl).interfaceId || super.supportsInterface(interfaceId);
    }


    function hasRole(bytes32 role, address account) public view virtual override returns (bool) {
        return _roles[role].members[account];
    }


    function _checkRole(bytes32 role) internal view virtual {
        _checkRole(role, _msgSender());
    }


    function _checkRole(bytes32 role, address account) internal view virtual {
        if (!hasRole(role, account)) {
            revert(
                string(
                    abi.encodePacked(
                        "AccessControl: account ",
                        Strings.toHexString(account),
                        " is missing role ",
                        Strings.toHexString(uint256(role), 32)
                    )
                )
            );
        }
    }


    function getRoleAdmin(bytes32 role) public view virtual override returns (bytes32) {
        return _roles[role].adminRole;
    }


    function grantRole(bytes32 role, address account) public virtual override onlyRole(getRoleAdmin(role)) {
        _grantRole(role, account);
    }


    function revokeRole(bytes32 role, address account) public virtual override onlyRole(getRoleAdmin(role)) {
        _revokeRole(role, account);
    }

    function renounceRole(bytes32 role, address account) public virtual override {
        require(account == _msgSender(), "AccessControl: can only renounce roles for self");

        _revokeRole(role, account);
    }


    function _setupRole(bytes32 role, address account) internal virtual {
        _grantRole(role, account);
    }

    function _setRoleAdmin(bytes32 role, bytes32 adminRole) internal virtual {
        bytes32 previousAdminRole = getRoleAdmin(role);
        _roles[role].adminRole = adminRole;
        emit RoleAdminChanged(role, previousAdminRole, adminRole);
    }


    function _grantRole(bytes32 role, address account) internal virtual {
        if (!hasRole(role, account)) {
            _roles[role].members[account] = true;
            emit RoleGranted(role, account, _msgSender());
        }
    }

    function _revokeRole(bytes32 role, address account) internal virtual {
        if (hasRole(role, account)) {
            _roles[role].members[account] = false;
            emit RoleRevoked(role, account, _msgSender());
        }
    }
}


abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        _transferOwnership(_msgSender());
    }


    modifier onlyOwner() {
        _checkOwner();
        _;
    }


    function owner() public view virtual returns (address) {
        return _owner;
    }

    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }


    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }


    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }


    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}


library SafeMath {

    function tryAdd(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            uint256 c = a + b;
            if (c < a) return (false, 0);
            return (true, c);
        }
    }


    function trySub(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b > a) return (false, 0);
            return (true, a - b);
        }
    }

    function tryMul(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
          
            if (a == 0) return (true, 0);
            uint256 c = a * b;
            if (c / a != b) return (false, 0);
            return (true, c);
        }
    }

    function tryDiv(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a / b);
        }
    }

    function tryMod(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a % b);
        }
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return a - b;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }

    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return a % b;
    }

    function sub(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b <= a, errorMessage);
            return a - b;
        }
    }

    function div(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a / b;
        }
    }

    function mod(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a % b;
        }
    }
}
interface IMarketplaceSettings {
   
    function getMarketplaceMaxValue() external view returns (uint256);

    function getMarketplaceMinValue() external view returns (uint256);


    function getMarketplaceFeePercentage() external view returns (uint8);


    function calculateMarketplaceFee(uint256 _amount)
        external
        view
        returns (uint256);


    function getERC721ContractPrimarySaleFeePercentage(address _contractAddress)
        external
        view
        returns (uint8);

    
     // @dev Utility function for calculating the primary sale fee for given amount of wei

    function calculatePrimarySaleFee(address _contractAddress, uint256 _amount)
        external
        view
        returns (uint256);


     // @dev Check whether the ERC721 token has sold at least once.
    
    function hasERC721TokenSold(address _contractAddress, uint256 _tokenId)
        external
        view
        returns (bool);

   
     // @dev Mark a token as sold.


    function markERC721Token(
        address _contractAddress,
        uint256 _tokenId,
        bool _hasSold
    ) external;
}

 // @title MarketplaceSettings Settings governing the marketplace fees.

contract MarketplaceSettings is Ownable, AccessControl, IMarketplaceSettings {
    using SafeMath for uint256;

   

    bytes32 public constant TOKEN_MARK_ROLE = "TOKEN_MARK_ROLE";


    // Max wei value within the marketplace
    uint256 private maxValue;

    // Min wei value within the marketplace
    uint256 private minValue;

    // Percentage fee for the marketplace, 3 == 3%
    uint8 private marketplaceFeePercentage;

    // Mapping of ERC721 contract to the primary sale fee. If primary sale fee is 0 for an origin contract then primary sale fee is ignored. 1 == 1%
    mapping(address => uint8) private primarySaleFees;

    // Mapping of ERC721 contract to mapping of token ID to whether the token has been sold before.
    mapping(address => mapping(uint256 => bool)) private soldTokens;


    constructor() {
        maxValue = 2**254; 

        minValue = 1000; // all amounts must be greater than 1000 Wei.

        marketplaceFeePercentage = 3; // 3% marketplace fee on all txs.

        _setupRole(AccessControl.DEFAULT_ADMIN_ROLE, owner());
        grantRole(TOKEN_MARK_ROLE, owner());
    }

    /////////////////////////////////////////////////////////////////////////
    // grantMarketplaceMarkTokenAccess
    /////////////////////////////////////////////////////////////////////////
    /**
     * @dev Grants a marketplace contract access to marke
     * @param _account address of the account that can perform the token mark role.
     */
    function grantMarketplaceAccess(address _account) external {
        require(
            hasRole(AccessControl.DEFAULT_ADMIN_ROLE, msg.sender),
            "grantMarketplaceAccess::Must be admin to call method"
        );
        grantRole(TOKEN_MARK_ROLE, _account);
    }

    /////////////////////////////////////////////////////////////////////////
    // getMarketplaceMaxValue
    /////////////////////////////////////////////////////////////////////////
    /**
     * @dev Get the max value to be used with the marketplace.
     * @return uint256 wei value.
     */
    function getMarketplaceMaxValue() external override view returns (uint256) {
        return maxValue;
    }

    /////////////////////////////////////////////////////////////////////////
    // setMarketplaceMaxValue
    /////////////////////////////////////////////////////////////////////////
    /**
     * @dev Set the maximum value of the marketplace settings.
     * @param _maxValue uint256 maximum wei value.
     */
    function setMarketplaceMaxValue(uint256 _maxValue) external onlyOwner {
        maxValue = _maxValue;
    }

    /////////////////////////////////////////////////////////////////////////
    // getMarketplaceMinValue
    /////////////////////////////////////////////////////////////////////////
    /**
     * @dev Get the max value to be used with the marketplace.
     * @return uint256 wei value.
     */
    function getMarketplaceMinValue() external override view returns (uint256) {
        return minValue;
    }

    /////////////////////////////////////////////////////////////////////////
    // setMarketplaceMinValue
    /////////////////////////////////////////////////////////////////////////
    /**
     * @dev Set the minimum value of the marketplace settings.
     * @param _minValue uint256 minimum wei value.
     */
    function setMarketplaceMinValue(uint256 _minValue) external onlyOwner {
        minValue = _minValue;
    }

    /////////////////////////////////////////////////////////////////////////
    // getMarketplaceFeePercentage
    /////////////////////////////////////////////////////////////////////////
    /**
     * @dev Get the marketplace fee percentage.
     * @return uint8 wei fee.
     */
    function getMarketplaceFeePercentage()
        external
        override
        view
        returns (uint8)
    {
        return marketplaceFeePercentage;
    }

    /////////////////////////////////////////////////////////////////////////
    // setMarketplaceFeePercentage
    /////////////////////////////////////////////////////////////////////////
    /**
     * @dev Set the marketplace fee percentage.
     * Requirements:

     * - `_percentage` must be <= 100.
     * @param _percentage uint8 percentage fee.
     */
    function setMarketplaceFeePercentage(uint8 _percentage) external onlyOwner {
        require(
            _percentage <= 100,
            "setMarketplaceFeePercentage::_percentage must be <= 100"
        );
        marketplaceFeePercentage = _percentage;
    }

    /////////////////////////////////////////////////////////////////////////
    // calculateMarketplaceFee
    /////////////////////////////////////////////////////////////////////////
    /**
     * @dev Utility function for calculating the marketplace fee for given amount of wei.
     * @param _amount uint256 wei amount.
     * @return uint256 wei fee.
     */
    function calculateMarketplaceFee(uint256 _amount)
        external
        override
        view
        returns (uint256)
    {
        return _amount.mul(marketplaceFeePercentage).div(100);
    }

    /////////////////////////////////////////////////////////////////////////
    // getERC721ContractPrimarySaleFeePercentage
    /////////////////////////////////////////////////////////////////////////
    /**
     * @dev Get the primary sale fee percentage for a specific ERC721 contract.
     * @param _contractAddress address ERC721Contract address.
     * @return uint8 wei primary sale fee.
     */
    function getERC721ContractPrimarySaleFeePercentage(address _contractAddress)
        external
        override
        view
        returns (uint8)
    {
        return primarySaleFees[_contractAddress];
    }

    /////////////////////////////////////////////////////////////////////////
    // setERC721ContractPrimarySaleFeePercentage
    /////////////////////////////////////////////////////////////////////////
    /**
     * @dev Set the primary sale fee percentage for a specific ERC721 contract.

     * Requirements:
     *
     * - `_contractAddress` cannot be the zero address.
     * - `_percentage` must be <= 100.

     * @param _contractAddress address ERC721Contract address.
     * @param _percentage uint8 percentage fee for the ERC721 contract.
     */
    function setERC721ContractPrimarySaleFeePercentage(
        address _contractAddress,
        uint8 _percentage
    ) external onlyOwner {
        require(
            _percentage <= 100,
            "setERC721ContractPrimarySaleFeePercentage::_percentage must be <= 100"
        );
        primarySaleFees[_contractAddress] = _percentage;
    }

    /////////////////////////////////////////////////////////////////////////
    // calculatePrimarySaleFee
    /////////////////////////////////////////////////////////////////////////
    /**
     * @dev Utility function for calculating the primary sale fee for given amount of wei
     * @param _contractAddress address ERC721Contract address.
     * @param _amount uint256 wei amount.
     * @return uint256 wei fee.
     */
    function calculatePrimarySaleFee(address _contractAddress, uint256 _amount)
        external
        override
        view
        returns (uint256)
    {
        return _amount.mul(primarySaleFees[_contractAddress]).div(100);
    }

    /////////////////////////////////////////////////////////////////////////
    // hasERC721TokenSold
    /////////////////////////////////////////////////////////////////////////
    /**
     * @dev Check whether the ERC721 token has sold at least once.
     * @param _contractAddress address ERC721Contract address.
     * @param _tokenId uint256 token ID.
     * @return bool of whether the token has sold.
     */
    function hasERC721TokenSold(address _contractAddress, uint256 _tokenId)
        external
        override
        view
        returns (bool)
    {
        return soldTokens[_contractAddress][_tokenId];
    }

    /////////////////////////////////////////////////////////////////////////
    // markERC721TokenAsSold
    /////////////////////////////////////////////////////////////////////////
    /**
     * @dev Mark a token as sold.

     * Requirements:
     *
     * - `_contractAddress` cannot be the zero address.

     * @param _contractAddress address ERC721Contract address.
     * @param _tokenId uint256 token ID.
     * @param _hasSold bool of whether the token should be marked sold or not.
     */
    function markERC721Token(
        address _contractAddress,
        uint256 _tokenId,
        bool _hasSold
    ) external override {
        require(
            hasRole(TOKEN_MARK_ROLE, msg.sender),
            "markERC721Token::Must have TOKEN_MARK_ROLE role to call method"
        );
        soldTokens[_contractAddress][_tokenId] = _hasSold;
    }

    /////////////////////////////////////////////////////////////////////////
    // markTokensAsSold
    /////////////////////////////////////////////////////////////////////////
    /**
     * @dev Function to set an array of tokens for a contract as sold, thus not being subject to the primary sale fee, if one exists.
     * @param _originContract address of ERC721 contract.
     * @param _tokenIds uint256[] array of token ids.
     */
    function markTokensAsSold(
        address _originContract,
        uint256[] calldata _tokenIds
    ) external {
        require(
            hasRole(TOKEN_MARK_ROLE, msg.sender),
            "markERC721Token::Must have TOKEN_MARK_ROLE role to call method"
        );
        // limit to batches of 2000
        require(
            _tokenIds.length <= 2000,
            "markTokensAsSold::Attempted to mark more than 2000 tokens as sold"
        );

        // Mark provided tokens as sold.
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            soldTokens[_originContract][_tokenIds[i]] = true;
        }
    }
}
