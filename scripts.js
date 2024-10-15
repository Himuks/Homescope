document.addEventListener('DOMContentLoaded', function() {
    const listings = [
        {id: 1, title: "2BHK Apartment in Ganj", rent: "₹12,000", location: "Ganj", size: "900 sq. ft.", furnished: "Yes", tenant: "Family"},
        {id: 2, title: "3BHK Apartment in Crescent", rent: "₹18,000", location: "Ganj", size: "1500 sq. ft.", furnished: "No", tenant: "Both"},
        {id: 3, title: "1BHK Studio in Mandi Road", rent: "₹8,000", location: "Ganj", size: "600 sq. ft.", furnished: "Yes", tenant: "Bachelor"},
        {id: 4, title: "2BHK Apartment in Nehru Colony", rent: "₹10,000", location: "Nehru Colony", size: "1000 sq. ft.", furnished: "No", tenant: "Both"},
        // Add more listings here...
    ];

    const listingsContainer = document.getElementById('listings-container');
    const showMoreButton = document.getElementById('show-more');
    const detailsSection = document.getElementById('details-section');
    const detailsContainer = document.getElementById('details-container');
    const backToListingsButton = document.getElementById('back-to-listings');
    const contactForm = document.getElementById('contact-form');

    // Show more listings on click
    showMoreButton.addEventListener('click', () => {
        listings.slice(2).forEach(listing => {
            const listingDiv = document.createElement('div');
            listingDiv.className = 'listing';
            listingDiv.setAttribute('data-id', listing.id);
            listingDiv.innerHTML = `
                <h3>${listing.title}</h3>
                <p>Price: ${listing.rent}/month</p>
                <p>Location: ${listing.location}</p>
                <button class="view-details">View Details</button>
            `;
            listingsContainer.appendChild(listingDiv);
        });
        showMoreButton.style.display = 'none';
    });

    // Handle view details button
    document.body.addEventListener('click', function(event) {
        if (event.target.classList.contains('view-details')) {
            const listingId = event.target.closest('.listing').dataset.id;
            const listing = listings.find(l => l.id == listingId);
            
            // Hide listings section and show details section
            document.getElementById('listings').style.display = 'none';
            detailsSection.style.display = 'block';
            
            // Populate details section
            detailsContainer.innerHTML = `
                <h3>${listing.title}</h3>
                <p><strong>Rent:</strong> ${listing.rent}/month</p>
                <p><strong>Size:</strong> ${listing.size}</p>
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

    // Prevent contact form submission from doing anything
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Do nothing
    });
});
