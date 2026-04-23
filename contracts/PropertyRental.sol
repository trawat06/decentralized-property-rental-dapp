// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract PropertyRental {
    struct Property {
        uint256 id;
        string title;
        string location;
        string contactNumber;
        uint256 monthlyRent;
        uint256 securityDeposit;
        address payable landlord;
        address tenant;
        bool isAvailable;
        bool isRented;
    }

    uint256 public propertyCount;
    mapping(uint256 => Property) public properties;

    event PropertyListed(
        uint256 indexed propertyId,
        address indexed landlord,
        string title,
        uint256 monthlyRent,
        uint256 securityDeposit
    );
    event PropertyRented(
        uint256 indexed propertyId,
        address indexed landlord,
        address indexed tenant,
        uint256 amountPaid
    );
    event PropertyUpdated(
        uint256 indexed propertyId,
        bool isAvailable,
        bool isRented
    );

    function listProperty(
        string memory _title,
        string memory _location,
        string memory _contactNumber,
        uint256 _monthlyRent,
        uint256 _securityDeposit
    ) external {
        require(bytes(_title).length > 0, "Title required");
        require(bytes(_location).length > 0, "Location required");
        require(bytes(_contactNumber).length > 0, "Contact number required");
        require(_monthlyRent > 0, "Monthly rent must be greater than 0");

        propertyCount++;

        properties[propertyCount] = Property({
            id: propertyCount,
            title: _title,
            location: _location,
            contactNumber: _contactNumber,
            monthlyRent: _monthlyRent,
            securityDeposit: _securityDeposit,
            landlord: payable(msg.sender),
            tenant: address(0),
            isAvailable: true,
            isRented: false
        });

        emit PropertyListed(
            propertyCount,
            msg.sender,
            _title,
            _monthlyRent,
            _securityDeposit
        );
    }

    function rentProperty(uint256 _propertyId) external payable {
        require(_propertyId > 0 && _propertyId <= propertyCount, "Property does not exist");

        Property storage property = properties[_propertyId];
        require(property.isAvailable, "Property is not available");
        require(!property.isRented, "Property already rented");
        require(msg.sender != property.landlord, "Landlord cannot rent own property");

        uint256 totalRequired = property.monthlyRent + property.securityDeposit;
        require(msg.value >= totalRequired, "Insufficient payment");

        property.tenant = msg.sender;
        property.isAvailable = false;
        property.isRented = true;

        // Transfer rent + security deposit directly to the landlord.
        property.landlord.transfer(msg.value);

        emit PropertyRented(_propertyId, property.landlord, msg.sender, msg.value);
        emit PropertyUpdated(_propertyId, false, true);
    }

    function markPropertyAvailable(uint256 _propertyId) external {
        require(_propertyId > 0 && _propertyId <= propertyCount, "Property does not exist");

        Property storage property = properties[_propertyId];
        require(msg.sender == property.landlord, "Only landlord can manage this property");

        property.tenant = address(0);
        property.isAvailable = true;
        property.isRented = false;

        emit PropertyUpdated(_propertyId, true, false);
    }

    function getAllProperties() external view returns (Property[] memory) {
        Property[] memory allProperties = new Property[](propertyCount);

        for (uint256 i = 1; i <= propertyCount; i++) {
            allProperties[i - 1] = properties[i];
        }

        return allProperties;
    }
}
