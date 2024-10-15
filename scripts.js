document.addEventListener('DOMContentLoaded', function() {
    const detailsSection = document.getElementById('details-section');
    const propertyDetails = document.getElementById('property-details');
    const listingsSection = document.getElementById('listings');
    const loadMoreButton = document.getElementById('load-more');

    // Property data
    const properties = [
        {id: 1, bhk: 2, rent: '₹12,000', size: '900 sq.ft.', floor: 'Ground', location: 'Ganj', furnished: 'Yes', tenant: 'Family'},
        {id: 2, bhk: 3, rent: '₹18,000', size: '1,500 sq.ft.', floor: '1 of 2', location: 'Crescent', furnished: 'No', tenant: 'Both'},
        {id: 3, bhk: 1, rent: '₹7,000', size: '500 sq.ft.', floor: 'Ground', location: 'Nehru Colony', furnished: 'No', tenant: 'Bachelor'},
        {id: 4, bhk: 2, rent: '₹9,000', size: '950 sq.ft.', floor: '1 of 2', location: 'Station', furnished: 'No', tenant: 'Family'},
        {id: 5, bhk: 1, rent: '₹8,500', size: '750 sq.ft.', floor: 'Ground', location: 'Mandi Road', furnished: 'Yes', tenant: 'Both'}
    ];

    const viewButtons = document.querySelectorAll('.view-details');

    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const property = properties.find(p => p.id == id);

            propertyDetails.innerHTML = `
                <h3>${property.bhk}BHK Apartment in ${property.location}</h3>
                <p>Rent: ${property.rent}</p>
                <p>Size: ${property.size}</p>
                <p>Floor: ${property.floor}</p>
                <p>Furnished: ${property.furnished}</p>
                <p>Tenant Preference: ${property.tenant}</p>
            `;
            listingsSection.style.display = 'none';
            detailsSection.style.display = 'block';
        });
    });

    document.getElementById('go-back').addEventListener('click', () => {
        detailsSection.style.display = 'none';
        listingsSection.style.display = 'block';
    });

    loadMoreButton.addEventListener('click', () => {
        const moreListings = properties.slice(2).map(property => `
            <div class="listing">
                <h3>${property.bhk}BHK Apartment in ${property.location}</h3>
                <p>Price: ${property.rent}/month</p>
                <p>Size: ${property.size}</p>
                <p>Floor: ${property.floor}</p>
                <p>Furnished: ${property.furnished}</p>
                <p>Tenant Preference: ${property.tenant}</p>
                <button class="view-details" data-id="${property.id}">View Details</button>
            </div>
        `).join('');

        listingsSection.innerHTML += moreListings;
        loadMoreButton.style.display = 'none';
    });
});
