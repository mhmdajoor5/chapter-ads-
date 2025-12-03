/* ========================================
   Lavender Salon - JavaScript Implementation
   Demonstrating all JavaScript requirements for RAD Project
   ======================================== */

// ========================================
// 1. OBJECTS IN JAVASCRIPT (10%)
// ========================================

// Salon configuration object
const salonConfig = {
    name: 'صالون لافندر',
    location: 'الأحساء، المملكة العربية السعودية',
    phone: '+966 50 123 4567',
    email: 'info@lavender-salon.com',
    workingHours: {
        saturday: '9:00 - 22:00',
        sunday: '9:00 - 22:00',
        monday: '9:00 - 22:00',
        tuesday: '9:00 - 22:00',
        wednesday: '9:00 - 22:00',
        thursday: '9:00 - 22:00',
        friday: '14:00 - 22:00'
    },
    services: [
        { id: 1, name: 'قص شعر', price: 150, duration: 45 },
        { id: 2, name: 'صبغة', price: 300, duration: 180 },
        { id: 3, name: 'مكياج', price: 250, duration: 90 },
        { id: 4, name: 'عناية بالبشرة', price: 200, duration: 60 }
    ],
    stylists: [
        { id: 1, name: 'سارة', specialty: 'قص وتصفيف', rating: 4.9 },
        { id: 2, name: 'مها', specialty: 'صبغات', rating: 4.8 },
        { id: 3, name: 'نورة', specialty: 'مكياج', rating: 5.0 },
        { id: 4, name: 'لينا', specialty: 'عناية بالبشرة', rating: 4.7 }
    ]
};

// Booking object constructor
class Booking {
    constructor(name, phone, service, date, time) {
        this.id = Date.now();
        this.name = name;
        this.phone = phone;
        this.service = service;
        this.date = date;
        this.time = time;
        this.status = 'pending';
        this.createdAt = new Date().toISOString();
    }

    confirm() {
        this.status = 'confirmed';
        console.log(`تم تأكيد الحجز رقم ${this.id}`);
    }

    cancel() {
        this.status = 'cancelled';
        console.log(`تم إلغاء الحجز رقم ${this.id}`);
    }

    getDetails() {
        return {
            id: this.id,
            customerName: this.name,
            service: this.service,
            appointmentDate: this.date,
            appointmentTime: this.time,
            status: this.status
        };
    }
}

// Array to store bookings
let bookingsArray = [];

// ========================================
// 2. BUILT-IN FUNCTIONS & CUSTOM FUNCTIONS
//    (Arrow, Anonymous, Callback) (10%)
// ========================================

// Arrow function example 1: Calculate service price with discount
const calculateDiscountedPrice = (originalPrice, discountPercent) => {
    return originalPrice - (originalPrice * discountPercent / 100);
};

// Arrow function example 2: Format currency
const formatCurrency = amount => `${amount} ريال`;

// Arrow function example 3: Validate phone number
const isValidPhone = phone => /^05[0-9]{8}$/.test(phone);

// Anonymous function stored in variable
const greetCustomer = function(customerName) {
    return `مرحباً ${customerName}، نحن سعداء بزيارتك!`;
};

// Higher-order function with callback
function processBooking(bookingData, successCallback, errorCallback) {
    setTimeout(() => {
        if (bookingData.name && bookingData.phone) {
            successCallback(bookingData);
        } else {
            errorCallback('بيانات الحجز غير مكتملة');
        }
    }, 1000);
}

// Callback function example
const onBookingSuccess = (data) => {
    console.log('تم معالجة الحجز بنجاح:', data);
    showNotification('تم الحجز بنجاح!', 'success');
};

const onBookingError = (error) => {
    console.error('خطأ في الحجز:', error);
    showNotification(error, 'error');
};

// Custom function with multiple parameters
function createServiceCard(service) {
    return {
        html: `
            <div class="service-card">
                <h3>${service.name}</h3>
                <p>السعر: ${formatCurrency(service.price)}</p>
                <p>المدة: ${service.duration} دقيقة</p>
            </div>
        `,
        data: service
    };
}

// ========================================
// 3. ARRAYS AND ARRAY METHODS
//    (Map, Filter, Find, Reduce) (10%)
// ========================================

// Array of customer reviews
const customerReviews = [
    { id: 1, name: 'فاطمة', rating: 5, comment: 'خدمة ممتازة!', date: '2025-01-15' },
    { id: 2, name: 'مريم', rating: 4, comment: 'جيد جداً', date: '2025-01-20' },
    { id: 3, name: 'نوف', rating: 5, comment: 'احترافية عالية', date: '2025-02-01' },
    { id: 4, name: 'سارة', rating: 3, comment: 'جيد', date: '2025-02-10' },
    { id: 5, name: 'ريم', rating: 5, comment: 'الأفضل!', date: '2025-02-15' }
];

// MAP: Transform array - Get all review ratings
const allRatings = customerReviews.map(review => review.rating);
console.log('جميع التقييمات:', allRatings);

// MAP: Create HTML elements from array
const reviewsHTML = customerReviews.map(review => {
    return `
        <div class="review-item">
            <h4>${review.name}</h4>
            <p>${'⭐'.repeat(review.rating)}</p>
            <p>${review.comment}</p>
        </div>
    `;
});

// FILTER: Get only 5-star reviews
const fiveStarReviews = customerReviews.filter(review => review.rating === 5);
console.log('تقييمات 5 نجوم:', fiveStarReviews);

// FILTER: Get recent reviews (from 2025-02-01)
const recentReviews = customerReviews.filter(review => {
    return new Date(review.date) >= new Date('2025-02-01');
});

// FILTER: Get high-rated services (price > 200)
const premiumServices = salonConfig.services.filter(service => service.price > 200);
console.log('الخدمات المميزة:', premiumServices);

// FIND: Find specific review by ID
const findReviewById = (id) => {
    return customerReviews.find(review => review.id === id);
};

// FIND: Find service by name
const findServiceByName = (serviceName) => {
    return salonConfig.services.find(service => service.name === serviceName);
};

// FIND: Find stylist by specialty
const findStylistBySpecialty = (specialty) => {
    return salonConfig.stylists.find(stylist => stylist.specialty === specialty);
};

// REDUCE: Calculate average rating
const averageRating = customerReviews.reduce((sum, review) => {
    return sum + review.rating;
}, 0) / customerReviews.length;
console.log('متوسط التقييم:', averageRating.toFixed(2));

// REDUCE: Calculate total revenue
const totalRevenue = salonConfig.services.reduce((total, service) => {
    return total + service.price;
}, 0);
console.log('إجمالي الأسعار:', formatCurrency(totalRevenue));

// REDUCE: Group reviews by rating
const reviewsByRating = customerReviews.reduce((groups, review) => {
    const rating = review.rating;
    if (!groups[rating]) {
        groups[rating] = [];
    }
    groups[rating].push(review);
    return groups;
}, {});
console.log('التقييمات مجمعة:', reviewsByRating);

// Complex array operations combining multiple methods
const getTopRatedServices = () => {
    return salonConfig.services
        .filter(service => service.price > 150)
        .map(service => ({
            ...service,
            discountedPrice: calculateDiscountedPrice(service.price, 10)
        }))
        .sort((a, b) => b.price - a.price);
};

// ========================================
// 4. LOOPS IN JAVASCRIPT (10%)
// ========================================

// FOR loop: Display all services
function displayAllServices() {
    console.log('=== جميع الخدمات ===');
    for (let i = 0; i < salonConfig.services.length; i++) {
        const service = salonConfig.services[i];
        console.log(`${i + 1}. ${service.name} - ${formatCurrency(service.price)}`);
    }
}

// FOR...OF loop: Iterate through stylists
function displayStylists() {
    console.log('=== فريق العمل ===');
    for (const stylist of salonConfig.stylists) {
        console.log(`${stylist.name} - ${stylist.specialty} (${stylist.rating}⭐)`);
    }
}

// FOR...IN loop: Iterate through working hours
function displayWorkingHours() {
    console.log('=== ساعات العمل ===');
    for (const day in salonConfig.workingHours) {
        console.log(`${day}: ${salonConfig.workingHours[day]}`);
    }
}

// WHILE loop: Generate time slots
function generateTimeSlots() {
    const slots = [];
    let hour = 9;
    
    while (hour <= 21) {
        const timeSlot = `${hour.toString().padStart(2, '0')}:00`;
        slots.push(timeSlot);
        hour++;
    }
    
    return slots;
}

// DO...WHILE loop: Validate form inputs
function validateFormInputs(inputs) {
    let index = 0;
    const errors = [];
    
    do {
        if (!inputs[index] || inputs[index].trim() === '') {
            errors.push(`الحقل ${index + 1} مطلوب`);
        }
        index++;
    } while (index < inputs.length);
    
    return errors;
}

// FOREACH loop: Process each booking
function processAllBookings() {
    bookingsArray.forEach((booking, index) => {
        console.log(`معالجة الحجز ${index + 1}:`, booking.getDetails());
    });
}

// ========================================
// 5. DOM MANIPULATION & TRAVERSAL (10%)
// ========================================

// DOM Traversal: Navigate through elements
function demonstrateDOMTraversal() {
    // Get element by ID
    const navbar = document.getElementById('navMenu');
    
    if (navbar) {
        // Get parent element
        const parent = navbar.parentElement;
        console.log('Parent:', parent);
        
        // Get children
        const children = navbar.children;
        console.log('Children count:', children.length);
        
        // Get first and last child
        const firstChild = navbar.firstElementChild;
        const lastChild = navbar.lastElementChild;
        
        // Get next and previous sibling
        const nextSibling = navbar.nextElementSibling;
        const previousSibling = navbar.previousElementSibling;
        
        // Get all links
        const links = navbar.querySelectorAll('a');
        links.forEach(link => {
            console.log('Link text:', link.textContent);
        });
    }
}

// DOM Manipulation: Create and modify elements
function createServiceElements() {
    const container = document.querySelector('.services-preview');
    
    if (container) {
        // Clear existing content
        container.innerHTML = '';
        
        // Create new elements for each service
        salonConfig.services.forEach(service => {
            // Create div element
            const serviceDiv = document.createElement('div');
            serviceDiv.className = 'service-item';
            
            // Create and append title
            const title = document.createElement('h3');
            title.textContent = service.name;
            serviceDiv.appendChild(title);
            
            // Create and append price
            const price = document.createElement('p');
            price.className = 'price';
            price.textContent = formatCurrency(service.price);
            serviceDiv.appendChild(price);
            
            // Create and append button
            const button = document.createElement('button');
            button.textContent = 'احجزي الآن';
            button.className = 'btn-primary';
            button.onclick = () => handleServiceSelection(service);
            serviceDiv.appendChild(button);
            
            // Append to container
            container.appendChild(serviceDiv);
        });
    }
}

// Modify element attributes and properties
function modifyElementAttributes() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Set attributes
        img.setAttribute('loading', 'lazy');
        img.setAttribute('alt', img.alt || 'صالون لافندر');
        
        // Add class
        img.classList.add('responsive-img');
        
        // Modify style
        img.style.borderRadius = '10px';
    });
}

// Clone and insert elements
function duplicateElement(selector) {
    const original = document.querySelector(selector);
    
    if (original) {
        const clone = original.cloneNode(true);
        clone.id = original.id + '-clone';
        original.parentNode.insertBefore(clone, original.nextSibling);
    }
}

// ========================================
// 6. DOM EVENTS (Single and Multiple)
//    (Add, Remove, Create, Update) (10%)
// ========================================

// Event: Mobile menu toggle
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        // Add click event
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
}

// Event: Service card interactions
function setupServiceCardEvents() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Mouse enter event
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        // Mouse leave event
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Click event
        card.addEventListener('click', function(e) {
            const serviceName = this.querySelector('h3')?.textContent;
            if (serviceName) {
                console.log('Selected service:', serviceName);
                highlightSelectedCard(this);
            }
        });
        
        // Double click event
        card.addEventListener('dblclick', function() {
            window.location.href = 'booking.html';
        });
    });
}

// Event: Highlight selected card
function highlightSelectedCard(card) {
    // Remove highlight from all cards
    document.querySelectorAll('.service-card').forEach(c => {
        c.classList.remove('selected');
    });
    
    // Add highlight to clicked card
    card.classList.add('selected');
}

// Event: Time slot selection
function setupTimeSlots() {
    const timeSlots = document.querySelectorAll('.time-slot');
    
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            if (!this.classList.contains('booked')) {
                // Remove previous selection
                timeSlots.forEach(s => s.classList.remove('selected'));
                
                // Add selection to current
                this.classList.add('selected');
                
                // Update appointment time in form
                const timeInput = document.getElementById('appointmentTime');
                if (timeInput) {
                    timeInput.value = this.textContent.trim();
                }
            }
        });
    });
}

// Event: Scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.feature-card, .service-card, .package-card').forEach(el => {
        observer.observe(el);
    });
}

// Event: Remove event listener example
function setupTemporaryEvent() {
    const button = document.querySelector('.cta-button');
    
    if (button) {
        const handleClick = () => {
            console.log('Button clicked!');
            // Remove event after first click
            button.removeEventListener('click', handleClick);
        };
        
        button.addEventListener('click', handleClick);
    }
}

// Custom event creation and dispatch
function createCustomEvent() {
    const bookingCompletedEvent = new CustomEvent('bookingCompleted', {
        detail: {
            bookingId: Date.now(),
            customerName: 'Test Customer',
            timestamp: new Date().toISOString()
        }
    });
    
    // Listen for custom event
    document.addEventListener('bookingCompleted', (e) => {
        console.log('Booking completed:', e.detail);
        showNotification('تم الحجز بنجاح!', 'success');
    });
    
    // Dispatch custom event
    // document.dispatchEvent(bookingCompletedEvent);
}

// ========================================
// 7. FORM EVENTS (15%)
// ========================================

// Form validation and submission
function setupBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        // Form submit event
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const bookingData = {
                fullName: formData.get('fullName'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                appointmentDate: formData.get('appointmentDate'),
                appointmentTime: formData.get('appointmentTime'),
                serviceType: formData.get('serviceType'),
                additionalServices: formData.getAll('additionalServices'),
                specialRequests: formData.get('specialRequests')
            };
            
            // Validate form
            if (validateBookingForm(bookingData)) {
                // Show loading state
                showLoadingState(this);
                
                // Process booking
                await handleBookingSubmission(bookingData);
                
                // Hide loading state
                hideLoadingState(this);
            }
        });
        
        // Form reset event
        bookingForm.addEventListener('reset', function() {
            console.log('Form reset');
            clearFormErrors();
        });
        
        // Input change events
        setupInputEvents(bookingForm);
    }
}

// Setup input events
function setupInputEvents(form) {
    // Phone input validation
    const phoneInput = form.querySelector('#phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            validatePhoneInput(this);
        });
        
        phoneInput.addEventListener('blur', function() {
            if (!isValidPhone(this.value)) {
                showFieldError(this, 'رقم الجوال غير صحيح');
            }
        });
    }
    
    // Email input validation
    const emailInput = form.querySelector('#email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            validateEmailInput(this);
        });
    }
    
    // Date input validation
    const dateInput = form.querySelector('#appointmentDate');
    if (dateInput) {
        dateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                showFieldError(this, 'لا يمكن اختيار تاريخ في الماضي');
                this.value = '';
            } else {
                clearFieldError(this);
            }
        });
    }
    
    // Service type change event
    const serviceSelect = form.querySelector('#serviceType');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', function() {
            updateBookingSummary();
            const selectedService = findServiceByName(this.value);
            if (selectedService) {
                console.log('Selected:', selectedService);
            }
        });
    }
    
    // Textarea character counter
    const textareas = form.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            updateCharacterCounter(this);
        });
    });
    
    // Range input (budget slider)
    const budgetRange = form.querySelector('#budget');
    const budgetOutput = form.querySelector('#budgetOutput');
    
    if (budgetRange && budgetOutput) {
        budgetRange.addEventListener('input', function() {
            budgetOutput.textContent = formatCurrency(this.value);
        });
    }
    
    // Checkbox change events
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            console.log(`${this.name} is now ${this.checked ? 'checked' : 'unchecked'}`);
            updateBookingSummary();
        });
    });
    
    // Radio button change events
    const radios = form.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            console.log(`Selected: ${this.value}`);
        });
    });
}

// Validate booking form
function validateBookingForm(data) {
    let isValid = true;
    const errors = [];
    
    if (!data.fullName || data.fullName.length < 3) {
        errors.push('الاسم يجب أن يكون 3 أحرف على الأقل');
        isValid = false;
    }
    
    if (!isValidPhone(data.phone)) {
        errors.push('رقم الجوال غير صحيح');
        isValid = false;
    }
    
    if (!data.email || !data.email.includes('@')) {
        errors.push('البريد الإلكتروني غير صحيح');
        isValid = false;
    }
    
    if (!data.appointmentDate) {
        errors.push('يرجى اختيار تاريخ الموعد');
        isValid = false;
    }
    
    if (!data.serviceType) {
        errors.push('يرجى اختيار نوع الخدمة');
        isValid = false;
    }
    
    if (!isValid) {
        displayFormErrors(errors);
    }
    
    return isValid;
}

// Helper functions for form validation
function validatePhoneInput(input) {
    const phone = input.value;
    if (phone.length > 0 && !isValidPhone(phone)) {
        input.style.borderColor = 'red';
    } else {
        input.style.borderColor = '';
    }
}

function validateEmailInput(input) {
    const email = input.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        showFieldError(input, 'البريد الإلكتروني غير صحيح');
    } else {
        clearFieldError(input);
    }
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    errorElement.textContent = message;
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
}

function clearFormErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}

function displayFormErrors(errors) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.innerHTML = errors.map(error => `<p class="error">❌ ${error}</p>`).join('');
        formMessage.style.display = 'block';
    }
}

function updateCharacterCounter(textarea) {
    const maxLength = textarea.getAttribute('maxlength') || 500;
    const currentLength = textarea.value.length;
    const counter = textarea.parentElement.querySelector('.char-counter');
    
    if (counter) {
        counter.textContent = `${currentLength} / ${maxLength} حرف`;
        
        if (currentLength >= maxLength * 0.9) {
            counter.style.color = 'red';
        } else {
            counter.style.color = '';
        }
    }
}

function updateBookingSummary() {
    const summary = document.getElementById('bookingSummary');
    if (summary) {
        const form = document.getElementById('bookingForm');
        const formData = new FormData(form);
        
        const selectedService = formData.get('serviceType');
        const additionalServices = formData.getAll('additionalServices');
        
        let content = '<div class="summary-content">';
        content += selectedService ? `<p><strong>الخدمة:</strong> ${selectedService}</p>` : '';
        
        if (additionalServices.length > 0) {
            content += '<p><strong>خدمات إضافية:</strong></p><ul>';
            additionalServices.forEach(service => {
                content += `<li>${service}</li>`;
            });
            content += '</ul>';
        }
        content += '</div>';
        
        summary.innerHTML = content;
    }
}

// ========================================
// 8. PROMISES & ASYNC/AWAIT (15%)
// ========================================

// Promise example 1: Simulate booking API call
function submitBooking(bookingData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (bookingData.fullName && bookingData.phone) {
                const booking = new Booking(
                    bookingData.fullName,
                    bookingData.phone,
                    bookingData.serviceType,
                    bookingData.appointmentDate,
                    bookingData.appointmentTime
                );
                
                bookingsArray.push(booking);
                resolve({
                    success: true,
                    message: 'تم الحجز بنجاح',
                    booking: booking
                });
            } else {
                reject({
                    success: false,
                    message: 'بيانات غير كاملة'
                });
            }
        }, 1500);
    });
}

// Promise example 2: Check availability
function checkAvailability(date, time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const randomAvailability = Math.random() > 0.3;
            
            if (randomAvailability) {
                resolve({
                    available: true,
                    message: 'الموعد متاح'
                });
            } else {
                reject({
                    available: false,
                    message: 'الموعد محجوز'
                });
            }
        }, 1000);
    });
}

// Promise example 3: Send confirmation email
function sendConfirmationEmail(email, bookingDetails) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`إرسال بريد تأكيد إلى: ${email}`);
            resolve({ sent: true, email: email });
        }, 800);
    });
}

// Using async/await
async function handleBookingSubmission(bookingData) {
    try {
        // Step 1: Check availability
        console.log('جارٍ التحقق من التوفر...');
        const availability = await checkAvailability(
            bookingData.appointmentDate,
            bookingData.appointmentTime
        );
        
        if (availability.available) {
            // Step 2: Submit booking
            console.log('جارٍ حجز الموعد...');
            const result = await submitBooking(bookingData);
            
            // Step 3: Send confirmation
            console.log('جارٍ إرسال البريد...');
            await sendConfirmationEmail(bookingData.email, result.booking);
            
            // Success
            showNotification('تم الحجز بنجاح! سنتواصل معك قريباً', 'success');
            
            // Reset form after successful submission
            document.getElementById('bookingForm')?.reset();
            
            return result;
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification(error.message || 'حدث خطأ، يرجى المحاولة مرة أخرى', 'error');
    }
}

// Promise chaining example
function processMultipleBookings(bookingsData) {
    return submitBooking(bookingsData[0])
        .then(result1 => {
            console.log('Booking 1 completed:', result1);
            return submitBooking(bookingsData[1]);
        })
        .then(result2 => {
            console.log('Booking 2 completed:', result2);
            return submitBooking(bookingsData[2]);
        })
        .then(result3 => {
            console.log('Booking 3 completed:', result3);
            return { success: true, message: 'All bookings completed' };
        })
        .catch(error => {
            console.error('Error in booking chain:', error);
            return { success: false, error: error };
        });
}

// Promise.all example
async function fetchMultipleResources() {
    try {
        const [services, reviews, availability] = await Promise.all([
            fetchServices(),
            fetchReviews(),
            fetchAvailability()
        ]);
        
        console.log('All data loaded:', { services, reviews, availability });
        return { services, reviews, availability };
    } catch (error) {
        console.error('Error loading resources:', error);
    }
}

// ========================================
// 9. API CALL (Fetch from external API) (10%)
// ========================================

// API Call 1: Fetch weather data
async function fetchWeatherData() {
    try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=25.4&longitude=49.5&current=temperature_2m,relative_humidity_2m&timezone=Asia/Riyadh');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Weather data:', data);
        
        // Display weather in page
        displayWeatherData(data);
        
        return data;
    } catch (error) {
        console.error('Error fetching weather:', error);
        showNotification('فشل في تحميل بيانات الطقس', 'error');
    }
}

// API Call 2: Fetch random beauty tip
async function fetchBeautyTip() {
    try {
        const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
        
        const data = await response.json();
        console.log('Random fact:', data);
        
        // You would translate or use a beauty tips API in production
        displayBeautyTip(data.text);
        
        return data;
    } catch (error) {
        console.error('Error fetching tip:', error);
    }
}

// API Call 3: Fetch holidays data
async function fetchSaudiHolidays() {
    try {
        const response = await fetch('https://date.nager.at/api/v3/PublicHolidays/2025/SA');
        
        if (!response.ok) {
            throw new Error('Failed to fetch holidays');
        }
        
        const holidays = await response.json();
        console.log('Saudi holidays:', holidays);
        
        displayUpcomingHolidays(holidays);
        
        return holidays;
    } catch (error) {
        console.error('Error fetching holidays:', error);
    }
}

// API Call 4: Fetch inspirational quote
async function fetchInspirationQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random?tags=happiness,success');
        
        const data = await response.json();
        console.log('Quote:', data);
        
        displayQuote(data.content, data.author);
        
        return data;
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
}

// Display functions for API data
function displayWeatherData(data) {
    const weatherContainer = document.querySelector('.weather-widget');
    if (weatherContainer && data.current) {
        weatherContainer.innerHTML = `
            <div class="weather-info">
                <h3>الطقس في الأحساء</h3>
                <p>🌡️ درجة الحرارة: ${data.current.temperature_2m}°C</p>
                <p>💧 الرطوبة: ${data.current.relative_humidity_2m}%</p>
            </div>
        `;
    }
}

function displayBeautyTip(tip) {
    const tipContainer = document.querySelector('.beauty-tip');
    if (tipContainer) {
        tipContainer.innerHTML = `
            <div class="tip-content">
                <h3>💡 نصيحة اليوم</h3>
                <p>${tip}</p>
            </div>
        `;
    }
}

function displayUpcomingHolidays(holidays) {
    const holidaysContainer = document.querySelector('.holidays-list');
    if (holidaysContainer) {
        const upcomingHolidays = holidays.slice(0, 3);
        
        const html = upcomingHolidays.map(holiday => `
            <div class="holiday-item">
                <strong>${holiday.localName}</strong>
                <span>${holiday.date}</span>
            </div>
        `).join('');
        
        holidaysContainer.innerHTML = html;
    }
}

function displayQuote(quote, author) {
    const quoteContainer = document.querySelector('.inspiration-quote');
    if (quoteContainer) {
        quoteContainer.innerHTML = `
            <blockquote>
                <p>"${quote}"</p>
                <footer>— ${author}</footer>
            </blockquote>
        `;
    }
}

// Helper API functions
function fetchServices() {
    return Promise.resolve(salonConfig.services);
}

function fetchReviews() {
    return Promise.resolve(customerReviews);
}

function fetchAvailability() {
    return Promise.resolve(generateTimeSlots());
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 2rem',
        background: type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        zIndex: 10000,
        animation: 'slideIn 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showLoadingState(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'جارٍ المعالجة...';
        submitButton.style.opacity = '0.6';
    }
}

function hideLoadingState(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'تأكيد الحجز';
        submitButton.style.opacity = '1';
    }
}

function handleServiceSelection(service) {
    console.log('Service selected:', service);
    localStorage.setItem('selectedService', JSON.stringify(service));
    window.location.href = 'booking.html';
}

// ========================================
// NEWSLETTER FORM HANDLER
// ========================================

function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Simulate API call
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                showNotification('تم الاشتراك بنجاح!', 'success');
                emailInput.value = '';
            } catch (error) {
                showNotification('حدث خطأ، يرجى المحاولة مرة أخرى', 'error');
            }
        });
    }
}

// ========================================
// CONTACT FORM HANDLER
// ========================================

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            console.log('Contact form data:', data);
            
            // Simulate sending message
            showLoadingState(this);
            
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                showNotification('تم إرسال رسالتك بنجاح!', 'success');
                this.reset();
            } catch (error) {
                showNotification('فشل إرسال الرسالة', 'error');
            } finally {
                hideLoadingState(this);
            }
        });
    }
}

// ========================================
// INITIALIZATION - Run when DOM is loaded
// ========================================

document.addEventListener('DOMContentLoaded', async function() {
    console.log('🎨 Lavender Salon - JavaScript Initialized');
    
    // Display initial data
    displayAllServices();
    displayStylists();
    displayWorkingHours();
    
    // Setup event listeners
    setupMobileMenu();
    setupServiceCardEvents();
    setupTimeSlots();
    setupScrollAnimations();
    setupBookingForm();
    setupNewsletterForm();
    setupContactForm();
    
    // Demonstrate DOM manipulation
    demonstrateDOMTraversal();
    modifyElementAttributes();
    
    // Fetch API data
    try {
        await Promise.all([
            fetchWeatherData(),
            fetchBeautyTip(),
            fetchSaudiHolidays(),
            fetchInspirationQuote()
        ]);
        console.log('✅ All API calls completed');
    } catch (error) {
        console.error('Error in initialization:', error);
    }
    
    // Log some statistics
    console.log('📊 Statistics:');
    console.log('- Average rating:', averageRating.toFixed(2));
    console.log('- 5-star reviews:', fiveStarReviews.length);
    console.log('- Total bookings:', bookingsArray.length);
    console.log('- Premium services:', premiumServices.length);
});

// Page visibility change event
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('👋 User left the page');
    } else {
        console.log('👀 User returned to the page');
    }
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        salonConfig,
        Booking,
        calculateDiscountedPrice,
        isValidPhone,
        findServiceByName,
        averageRating
    };
}

/* ========================================
   END OF JAVASCRIPT FILE
   All requirements implemented:
   ✅ 1. Built-in & Custom Functions (10%)
   ✅ 2. Objects in JavaScript (10%)
   ✅ 3. Arrays (Map, Filter, Find, Reduce) (10%)
   ✅ 4. Loops (10%)
   ✅ 5. DOM Manipulation & Traversal (10%)
   ✅ 6. DOM Events (10%)
   ✅ 7. Form Events (15%)
   ✅ 8. Promises & Async/Await (15%)
   ✅ 9. API Calls (10%)
   ======================================== */
