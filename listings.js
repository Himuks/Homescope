document.addEventListener('DOMContentLoaded', function() {
    const listings = [
        {id: 1, bhk: 2, rent: "₹12,000", size: "900", floor: "Ground", areaType: "Super", location: "Ganj", furnished: "Yes", tenant: "Family"},
        {id: 2, bhk: 3, rent: "₹18,000", size: "1500", floor: "1-1 of 2", areaType: "Good", location: "Ganj", furnished: "No", tenant: "Both"},
        {id: 3, bhk: 1, rent: "₹8,000", size: "600", floor: "Ground", areaType: "Normal", location: "Ganj", furnished: "Yes", tenant: "Bachelor"},
        {id: 4, bhk: 2, rent: "₹10,000", size: "1000", floor: "1-1 of 1", areaType: "Moderate", location: "Nehru Colony", furnished: "No", tenant: "Both"},
        {id: 5, bhk: 3, rent: "₹15,000", size: "1400", floor: "1-1 of 3", areaType: "Normal", location: "Nehru Colony", furnished: "Yes", tenant: "Family"},
        {id: 6, bhk: 1, rent: "₹7,000", size: "500", floor: "Ground", areaType: "Moderate", location: "Nehru Colony", furnished: "No", tenant: "Bachelor"},
        {id: 7, bhk: 2, rent: "₹9,000", size: "950", floor: "1-1 of 2", areaType: "Moderate", location: "Railway Station", furnished: "No", tenant: "Family"},
        {id: 8, bhk: 3, rent: "₹20,000", size: "1700", floor: "1-1 of 3", areaType: "Good", location: "Railway Station", furnished: "Yes", tenant: "Both"},
        {id: 9, bhk: 1, rent: "₹7,500", size: "650", floor: "Ground", areaType: "Normal", location: "Railway Station", furnished: "Yes", tenant: "Bachelor"},
        {id: 10, bhk: 2, rent: "₹12,000", size: "1100", floor: "1-1 of 2", areaType: "Moderate", location: "Mandi Road", furnished: "No", tenant: "Family"},
        {id: 11, bhk: 1, rent: "₹8,500", size: "750", floor: "Ground", areaType: "Normal", location: "Mandi Road", furnished: "Yes", tenant: "Both"},
        {id: 12, bhk: 3, rent: "₹17,000", size: "1600", floor: "1-1 of 3", areaType: "Moderate", location: "Mandi Road", furnished: "No", tenant: "Family"},
        {id: 13, bhk: 2, rent: "₹14,000", size: "1300", floor: "Ground", areaType: "Super", location: "Chanakyapuri", furnished: "Yes", tenant: "Family"},
        {id: 14, bhk: 3, rent: "₹20,000", size: "1800", floor: "1-1 of 2", areaType: "Good", location: "Chanakyapuri", furnished: "No", tenant: "Both"},
        {id: 15, bhk: 1, rent: "₹9,500", size: "700", floor: "Ground", areaType: "Good", location: "Chanakyapuri", furnished: "Yes", tenant: "Bachelor"},
        {id: 16, bhk: 2, rent: "₹15,000", size: "1200", floor: "1-1 of 2", areaType: "Super", location: "Cresent", furnished: "No", tenant: "Family"},

    ];

    const listingsPerPage = 5; // Number of listings per page
    let currentPage = 1; // Current page number

    const listingsContainer = document.getElementById('listings-container');
    const detailsSection = document.getElementById('details-section');
    const detailsContainer = document.getElementById('details-container');
    const backToListingsButton = document.getElementById('back-to-listings');
    const paginationContainer = document.getElementById('pagination-container');

    const urlParams = new URLSearchParams(window.location.search);
    const listingId = urlParams.get('id');

    if (listingId) {
        const listing = listings.find(l => l.id == listingId);

        if (listing) {
            // Hide listings section and show details section
            document.getElementById('listings').style.display = 'none';
            detailsSection.style.display = 'block';

            // Populate details section
            detailsContainer.innerHTML = `
                <h3>${listing.bhk}BHK in ${listing.location}</h3>
                <p><strong>Rent:</strong> ${listing.rent}/month</p>
                <p><strong>Size:</strong> ${listing.size} sq. ft.</p>
                <p><strong>Floor:</strong> ${listing.floor}</p>
                <p><strong>Area Type:</strong> ${listing.areaType}</p>
                <p><strong>Furnished:</strong> ${listing.furnished}</p>
                <p><strong>Tenant Preference:</strong> ${listing.tenant}</p>
                <p><strong>Location:</strong> ${listing.location}</p>
            `;
        }
    }


    backToListingsButton.addEventListener('click', () => {
        detailsSection.style.display = 'none';
        document.getElementById('listings').style.display = 'block';
    });

    // Global Filters Object
    const filters = {
        location: [],
        bhk: [],
        furnished: [],
        tenant: []
    };

    // Function to filter listings
    function filterListings() {
        return listings.filter(listing => {
            return (filters.location.length === 0 || filters.location.includes(listing.location)) &&
                   (filters.bhk.length === 0 || filters.bhk.includes(listing.bhk.toString())) &&
                   (filters.furnished.length === 0 || filters.furnished.includes(listing.furnished)) &&
                   (filters.tenant.length === 0 || filters.tenant.includes(listing.tenant));
        });
    }

    // Function to sort listings
    function sortListings(listings, sortBy) {
        const sortedListings = [...listings]; // Create a copy to avoid modifying the original array

        switch (sortBy) {
            case 'rent-asc':
                sortedListings.sort((a, b) => parseInt(a.rent.replace(/[₹,]/g, '')) - parseInt(b.rent.replace(/[₹,]/g, '')));
                break;
            case 'rent-desc':
                sortedListings.sort((a, b) => parseInt(b.rent.replace(/[₹,]/g, '')) - parseInt(a.rent.replace(/[₹,]/g, '')));
                break;
            case 'size-asc':
                sortedListings.sort((a, b) => parseInt(a.size) - parseInt(b.size));
                break;
            case 'size-desc':
                sortedListings.sort((a, b) => parseInt(b.size) - parseInt(a.size));
                break;
            case 'location-asc':
                sortedListings.sort((a, b) => a.location.localeCompare(b.location));
                break;
            case 'location-desc':
                sortedListings.sort((a, b) => b.location.localeCompare(a.location));
                break;
        }

        return sortedListings;
    }

    // Function to display listings for a given page
    function displayListings(page) {
        listingsContainer.innerHTML = ''; // Clear current listings

        const filteredListings = filterListings();
        const sortedListings = sortListings(filteredListings, document.getElementById('sort-select').value);

        const startIndex = (page - 1) * listingsPerPage;
        const endIndex = startIndex + listingsPerPage;
        const listingsToDisplay = sortedListings.slice(startIndex, endIndex);

        listingsToDisplay.forEach(listing => {
            const listingDiv = document.createElement('div');
            listingDiv.className = 'listing';
            listingDiv.setAttribute('data-id', listing.id);
            listingDiv.innerHTML = `
                <h3>${listing.bhk}BHK Apartment in ${listing.location}</h3>
                <p>Price: ${listing.rent}/month</p>
                <p>Location: ${listing.location}</p>
                <button class="view-details">View Details</button>
            `;
            listingsContainer.appendChild(listingDiv);
        });

        updatePagination(page, sortedListings.length);
    }

    // Function to update pagination controls
    function updatePagination(currentPage, totalListings) {
        paginationContainer.innerHTML = ''; // Clear current pagination

        const totalPages = Math.ceil(totalListings / listingsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.className = 'page-button';
            pageButton.textContent = i;
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            pageButton.addEventListener('click', () => {
                displayListings(i);
            });
            paginationContainer.appendChild(pageButton);
        }
    }

    // Add event listener for sort select
    document.getElementById('sort-select').addEventListener('change', () => {
        displayListings(1); // Go back to the first page when sorting
    });

    // Add event listeners for filter checkboxes
    document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const filterType = checkbox.dataset.filterType;
            const filterValue = checkbox.value;

            if (checkbox.checked) {
                filters[filterType].push(filterValue);
            } else {
                filters[filterType] = filters[filterType].filter(value => value !== filterValue);
            }

            displayListings(1); // Go back to the first page when filtering
        });
    });

    // Show initial listings
    displayListings(currentPage);

    // Handle view details button
    listingsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('view-details')) {
            const listingId = event.target.closest('.listing').dataset.id;
            const listing = listings.find(l => l.id == listingId);
            
            // Hide listings section and show details section
            document.getElementById('listings').style.display = 'none';
            detailsSection.style.display = 'block';
            
            // Populate details section
            detailsContainer.innerHTML = `
            <h3>${listing.bhk}BHK in ${listing.location}</h3>
            <p><strong>Rent:</strong> ${listing.rent}/month</p>
            <p><strong>Size:</strong> ${listing.size} sq. ft.</p>
            <p><strong>Floor:</strong> ${listing.floor}</p>
            <p><strong>Area Type:</strong> ${listing.areaType}</p>
            <p><strong>Furnished:</strong> ${listing.furnished}</p>
            <p><strong>Tenant Preference:</strong> ${listing.tenant}</p>
            <p><strong>Location:</strong> ${listing.location}</p>
        `;
        }
    });

    // Back to listings
    backToListingsButton.addEventListener('click', () => {
        detailsSection.style.display = 'none';
        document.getElementById('listings').style.display = 'block';
    });
});
