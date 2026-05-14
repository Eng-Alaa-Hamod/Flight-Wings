/* booking */
let bookingReq = [];
const storedData = localStorage.getItem('bookingRequest');
if (storedData) {
    try {
        bookingReq = JSON.parse(storedData);
    } catch (e) {
        bookingReq = [];
    }
} else {
    bookingReq = [];
}

const bookingFormEl = document.getElementById('bookingForm');
if (bookingFormEl) {
    function cleanData() {
        bookingFormEl.reset();
    }

    function completeBooking() {
        const F_name = document.getElementById('booking-f-name').value.trim();
        const S_name = document.getElementById('booking-s-name').value.trim();
        const date_brith = document.getElementById('booking-birth').value;
        const gender = document.getElementById('booking-gender').value;
        const nationality = document.getElementById('booking-nationality').value.trim();
        const fromCity = document.getElementById('booking-from').value.trim();
        const toCity = document.getElementById('booking-to').value.trim();
        const email = document.getElementById('booking-email').value.trim();
        const number = document.getElementById('booking-number').value.trim();

        const errors = [];
        if (!F_name) errors.push('First name is required');
        if (!S_name) errors.push('Second name is required');
        if (!date_brith) errors.push('Date is required');
        if (!gender) errors.push('Gender is required');
        if (!nationality) errors.push('Nationality is required');
        if (!fromCity) errors.push('From is required');
        if (!toCity) errors.push('To is required');
        if (!email) errors.push('Email is required');
        if (!number) errors.push('Phone number is required');

        const nameRegex = /^[A-Za-z\u0621-\u064A\s'-]+$/;
        if (F_name && !nameRegex.test(F_name)) errors.push("First name must contain letters only");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) errors.push("Email format is incorrect");

        const phoneRegex = /^\d{7,15}$/;
        if (number && !phoneRegex.test(number)) errors.push("Phone number should be 7-15 digits");

        if (date_brith) {
            const birthDate = new Date(date_brith);
            const today = new Date();
            if (birthDate > today) errors.push("The date of birth can't be from the future");
        }

        if (errors.length) {
            alert(errors.join('\n'));
            return false;
        }

        const NewReq = {
            F_name,
            S_name,
            date_brith,
            gender,
            nationality,
            from: fromCity,
            to: toCity,
            email,
            number,
        };

        bookingReq.push(NewReq);
        localStorage.setItem('bookingRequest', JSON.stringify(bookingReq));

        cleanData();
        return true;
    }

    window.completeBooking = completeBooking;
    window.cleanData = cleanData;
}

function show_bookings() {
    if (!document.getElementById('my-books')) return;
    let my_bookings_table = '';
    for (let i = 0; i < bookingReq.length; i++) {
        my_bookings_table += `
            <tr>
                <td>${bookingReq[i].F_name}</td>
                <td>${bookingReq[i].S_name}</td>
                <td>${bookingReq[i].date_brith}</td>
                <td>${bookingReq[i].gender}</td>
                <td>${bookingReq[i].nationality}</td>
                <td>${bookingReq[i].from}</td>
                <td>${bookingReq[i].to}</td>
                <td>
                    <span class="btn btn-danger" onclick="deletData(${i})" style="margin:2px">Cancel</span>
                </td>
            </tr>
        `;
    }
    const myBooksEl = document.getElementById('my-books');
    myBooksEl.innerHTML = my_bookings_table;
}

if (document.getElementById('my-books')) {
    show_bookings();
}

function deletData(index) {
    bookingReq.splice(index, 1);
    localStorage.setItem('bookingRequest', JSON.stringify(bookingReq));
    show_bookings();
}

/* search */

let flightData = [
    {
        search_image: "../images/airport.jpg",
        search_from:"Qatar",
        search_to: "New York",
        search_class:"Economy",
        search_departure:"2026-05-02",
        search_return:"2026-05-05",
        Go_take_off :"08:00 AM",
        Return_take_off :"08:00 AM",
        Travel_duration :"8h 00m",
        price:"$1,400",
    },

    {
        search_image:"../images/airport 2.webp",
        search_from:"China",
        search_to:"France",
        search_class:"Economy",
        search_departure:"2026-06-02",
        search_return:"2026-06-05",
        Go_take_off :"12:00 AM",
        Return_take_off :"11:00 PM",
        Travel_duration :"9h 30m",
        price:"$2,400",
    },

    {
        search_image:"../images/airport 3.jfif",
        search_from:"USA",
        search_to:"Japan",
        search_class:"First class",
        search_departure:"2026-07-02",
        search_return:"2026-07-05",
        Go_take_off :"12:00 PM",
        Return_take_off :"11:00 AM",
        Travel_duration :"5h 30m",
        price:"$1,200",
    },

    {
        search_image:"../images/airport 4jpg.jpg",
        search_from:"Russa",
        search_to:"Italy",
        search_class:"First class",
        search_departure:"2026-08-02",
        search_return:"2026-08-05",
        Go_take_off :"08:00 PM",
        Return_take_off :"09:00 AM",
        Travel_duration :"20h 00m",
        price:"$4,000",
    },
       
    {
        search_image: "../images/airport 5.webp",
        search_from: "India",
        search_to: "Spain",
        search_class: "Business",
        search_departure: "2026-04-02",
        search_return:"2026-04-05",
        Go_take_off :"07:00 AM",
        Return_take_off :"05:00 PM",
        Travel_duration :"7h 00m",
        price:"$1,000",
    },

    {
        search_image: "../images/airport 6.jpg",
        search_from: "Belgium",
        search_to: "Iraq",
        search_class: "Business",
        search_departure: "2026-12-02",
        search_return:"2026-12-05",
        Go_take_off :"01:00 PM",
        Return_take_off :"06:00 PM",
        Travel_duration :"12h 45m",
        price:"$1,750",
    },


]




const searchFrom = document.getElementById('search-from');
const searchTo = document.getElementById('search-to');
const searchDepartureDate = document.getElementById('search-departure-date');
const searchReturnDate = document.getElementById('search-return-date');
const searchClass = document.getElementById('search-class');


function searchData() {
    const searchReq = {
        search_from: searchFrom.value.trim(),
        search_to: searchTo.value.trim(),
        search_departure: searchDepartureDate.value,
        search_return: searchReturnDate.value,
        search_class: searchClass.value.trim()
    };

    const results = flightsData.filter(flight => {
        return flight.search_from.toLowerCase() === searchReq.search_from.toLowerCase() &&
               flight.search_to.toLowerCase() === searchReq.search_to.toLowerCase() &&
               flight.search_departure === searchReq.search_departure &&
               flight.search_return === searchReq.search_return &&
               flight.search_class.toLowerCase() === searchReq.search_class.toLowerCase();
    });

    localStorage.setItem('flightResults', JSON.stringify(results));

}