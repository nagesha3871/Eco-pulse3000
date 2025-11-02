// ===== Global Variables =====
let co2Level = 419.5;
let devicesConnected = 7892543210;
let co2Removed = 2847392;
let aiEfficiency = 99.87;
let globalReduction = 15.3;
let activeProjects = 1247;

// Real-time data from APIs
let realCO2Data = null;
let weatherData = null;
let cryptoData = null;

// AI Log Messages
const aiMessages = [
    { text: 'Processing satellite imagery from 47 global stations', type: 'info' },
    { text: 'Carbon sequestration optimized in Amazon rainforest region', type: 'success' },
    { text: 'AI model updated - prediction accuracy: 99.94%', type: 'success' },
    { text: 'Detecting industrial emissions in Southeast Asia', type: 'process' },
    { text: 'Blockchain verification completed for 15,000 carbon credits', type: 'info' },
    { text: 'Quantum sensors deployed in Arctic monitoring stations', type: 'process' },
    { text: 'Real-time atmospheric pressure analysis across 6 continents', type: 'info' },
    { text: 'Neural network processing oceanic CO₂ absorption data', type: 'process' },
    { text: 'Partnership alert: New organizations joined EcoPulse network', type: 'success' },
    { text: 'Climate modeling complete - 2050 projections updated', type: 'info' },
    { text: 'Deep learning algorithms analyzing deforestation patterns', type: 'process' },
    { text: 'IoT sensors synchronized across 195 countries', type: 'success' },
    { text: 'Renewable energy optimization in progress - efficiency +12%', type: 'process' },
    { text: 'AI detecting anomalies in global temperature readings', type: 'info' },
    { text: 'Carbon capture technology efficiency increased by 8.5%', type: 'success' }
];

let aiLogEntries = [
    { time: getCurrentTime(), message: aiMessages[0].text, type: aiMessages[0].type },
    { time: getCurrentTime(), message: aiMessages[1].text, type: aiMessages[1].type },
    { time: getCurrentTime(), message: aiMessages[2].text, type: aiMessages[2].type },
    { time: getCurrentTime(), message: aiMessages[3].text, type: aiMessages[3].type },
    { time: getCurrentTime(), message: aiMessages[4].text, type: aiMessages[4].type }
];

// Partner Companies Data (Realistic for solo entrepreneur)
const partnerCompanies = [
    { name: 'NASA Open Data', sector: 'Satellite & Climate Data', logo: '🛰️', established: '1958' },
    { name: 'NOAA Climate.gov', sector: 'Atmospheric Research', logo: '🌡️', established: '1970' },
    { name: 'OpenWeatherMap', sector: 'Weather Data API', logo: '☁️', established: '2012' },
    { name: 'Carbon Interface', sector: 'Carbon Calculation API', logo: '🌿', established: '2019' },
    { name: 'Google Earth Engine', sector: 'Geospatial Analysis', logo: '🌍', established: '2010' },
    { name: 'Climate TRACE', sector: 'Emissions Tracking', logo: '📊', established: '2020' },
    { name: 'World Bank Climate', sector: 'Climate Finance Data', logo: '💼', established: '1944' },
    { name: 'UN Environment', sector: 'Global Climate Action', logo: '🌐', established: '1972' },
    { name: 'European Space Agency', sector: 'Earth Observation', logo: '🛸', established: '1975' },
    { name: 'MIT Climate Portal', sector: 'Research & Education', logo: '🎓', established: '1861' },
    { name: 'Climate Action Tracker', sector: 'Policy Analysis', logo: '📈', established: '2009' },
    { name: 'Global Carbon Project', sector: 'Carbon Budget Analysis', logo: '⚗️', established: '2001' }
];

// ===== Utility Functions =====
function getCurrentTime() {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
}

function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(2) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(2) + 'K';
    }
    return num.toString();
}

// ===== Real-time Data Fetching =====
async function fetchRealCO2Data() {
    try {
        // Using CO2 Signal API (free tier available) or fallback to simulation
        const response = await fetch('https://api.co2signal.com/v1/latest?countryCode=US', {
            headers: {
                'auth-token': 'demo' // Replace with your API key
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            realCO2Data = data;
            
            if (data.data && data.data.carbonIntensity) {
                co2Level = 400 + (data.data.carbonIntensity / 10); // Normalize to ppm range
                addAILogEntry({
                    text: `Real-time CO₂ intensity updated: ${data.data.carbonIntensity.toFixed(2)} gCO₂/kWh`,
                    type: 'success'
                });
            }
        }
    } catch (error) {
        console.log('Using simulated CO₂ data');
        // Fallback to simulated data
        co2Level = 419.5 + (Math.random() - 0.5) * 2;
    }
}

async function fetchWeatherData() {
    try {
        // Using OpenWeatherMap API (free tier)
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=demo&units=metric');
        
        if (response.ok) {
            const data = await response.json();
            weatherData = data;
            
            if (data.main && data.main.temp) {
                addAILogEntry({
                    text: `Global temperature monitoring: ${data.name} - ${data.main.temp.toFixed(1)}°C`,
                    type: 'info'
                });
            }
        }
    } catch (error) {
        console.log('Weather data unavailable');
    }
}

async function fetchCryptoCarbon() {
    try {
        // Bitcoin energy consumption data
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
        
        if (response.ok) {
            const data = await response.json();
            cryptoData = data;
            
            addAILogEntry({
                text: `Monitoring cryptocurrency carbon footprint - BTC: $${data.bpi.USD.rate}`,
                type: 'process'
            });
        }
    } catch (error) {
        console.log('Crypto data unavailable');
    }
}

async function fetchGlobalNews() {
    try {
        // Using a news API for climate-related headlines
        const response = await fetch('https://newsapi.org/v2/everything?q=climate+change&pageSize=1&apiKey=demo');
        
        if (response.ok) {
            const data = await response.json();
            if (data.articles && data.articles.length > 0) {
                addAILogEntry({
                    text: `Climate news: ${data.articles[0].title.substring(0, 80)}...`,
                    type: 'info'
                });
            }
        }
    } catch (error) {
        console.log('News data unavailable');
    }
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    initializeParticles();
    initializeAOS();
    initializeNavigation();
    initializeThemeToggle();
    initializeForm();
    startDataUpdates();
    renderPartners();
    updateFooterYear();
    renderAILog();
    
    // Fetch real-time data initially
    fetchRealCO2Data();
    fetchWeatherData();
    
    // Fetch real-time data periodically
    setInterval(fetchRealCO2Data, 300000); // Every 5 minutes
    setInterval(fetchWeatherData, 600000); // Every 10 minutes
});

// ===== Initialize App =====
function initializeApp() {
    showSection('home');
    updateDashboardMetrics();
}

// ===== Initialize AOS =====
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
}

// ===== Navigation =====
function initializeNavigation() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinkElements = document.querySelectorAll('.nav-link');
    
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
    
    navLinkElements.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href').substring(1);
            if (target) {
                showSection(target);
            }
        });
    });
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    if (typeof AOS !== 'undefined') {
        setTimeout(() => AOS.refresh(), 100);
    }
}

// ===== Theme Toggle =====
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
}

// ===== Particle Background =====
function initializeParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 0.5
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const isDarkMode = document.body.classList.contains('dark-mode');
        ctx.fillStyle = isDarkMode ? 'rgba(34, 197, 94, 0.5)' : 'rgba(34, 197, 94, 0.3)';
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===== Data Updates =====
function startDataUpdates() {
    setInterval(() => {
        updateMetrics();
        updateDashboardMetrics();
        addAILogEntry();
        
        // Occasionally fetch real-time data
        if (Math.random() > 0.7) {
            fetchCryptoCarbon();
        }
    }, 7000);
}

function updateMetrics() {
    // Update with real data if available, otherwise simulate
    if (!realCO2Data) {
        co2Level = Math.max(400, co2Level + (Math.random() - 0.52) * 0.15);
    }
    
    devicesConnected += Math.floor(Math.random() * 2000);
    co2Removed += Math.floor(Math.random() * 150);
    aiEfficiency = Math.min(99.99, Math.max(99.5, aiEfficiency + (Math.random() - 0.5) * 0.02));
    globalReduction = Math.min(20, Math.max(10, globalReduction + (Math.random() - 0.5) * 0.1));
    activeProjects += Math.floor(Math.random() * 10 - 3);
    
    const devicesCountEl = document.getElementById('devicesCount');
    const aiEfficiencyEl = document.getElementById('aiEfficiency');
    
    if (devicesCountEl) {
        devicesCountEl.textContent = formatNumber(devicesConnected);
    }
    
    if (aiEfficiencyEl) {
        aiEfficiencyEl.textContent = aiEfficiency.toFixed(2) + '%';
    }
}

function updateDashboardMetrics() {
    const co2LevelEl = document.getElementById('co2Level');
    const co2RemovedEl = document.getElementById('co2Removed');
    const activeProjectsEl = document.getElementById('activeProjects');
    
    if (co2LevelEl) {
        co2LevelEl.textContent = co2Level.toFixed(2);
    }
    
    if (co2RemovedEl) {
        co2RemovedEl.textContent = formatNumber(co2Removed);
    }
    
    if (activeProjectsEl) {
        activeProjectsEl.textContent = activeProjects.toLocaleString();
    }
}

// ===== AI Log =====
function renderAILog() {
    const aiLog = document.getElementById('aiLog');
    if (!aiLog) return;
    
    aiLog.innerHTML = aiLogEntries.map(entry => `
        <div class="ai-log-entry ${entry.type}">
            <span class="log-time">${entry.time}</span>
            <span class="log-message">${entry.message}</span>
        </div>
    `).join('');
}

function addAILogEntry(customEntry = null) {
    let newEntry;
    
    if (customEntry) {
        newEntry = {
            time: getCurrentTime(),
            message: customEntry.text || customEntry.message,
            type: customEntry.type || 'info'
        };
    } else {
        const randomMessage = aiMessages[Math.floor(Math.random() * aiMessages.length)];
        newEntry = {
            time: getCurrentTime(),
            message: randomMessage.text,
            type: randomMessage.type
        };
    }
    
    aiLogEntries.unshift(newEntry);
    aiLogEntries = aiLogEntries.slice(0, 7);
    
    renderAILog();
}

// ===== Partners =====
function renderPartners() {
    const partnersGrid = document.getElementById('partnersGrid');
    if (!partnersGrid) return;
    
    partnersGrid.innerHTML = partnerCompanies.map((partner, index) => `
        <div class="partner-card" data-aos="fade-up" data-aos-delay="${index * 50}">
            <div class="partner-logo">${partner.logo}</div>
            <h3 class="partner-name">${partner.name}</h3>
            <p class="partner-sector">${partner.sector}</p>
            <p class="partner-established">Est. ${partner.established}</p>
        </div>
    `).join('');
    
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// ===== Form Handling =====
function initializeForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {};
    
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Create mailto link - UPDATE THIS EMAIL
    const subject = encodeURIComponent(`EcoPulse 3000 - Partnership Inquiry from ${data.name}`);
    const body = encodeURIComponent(`
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company || 'Not provided'}
Country: ${data.country}
Area of Interest: ${data.interest}
Investment Range: ${data.investmentRange || 'Not specified'}

Message:
${data.message}

---
Sent via EcoPulse 3000 Contact Form
Timestamp: ${new Date().toLocaleString()}
    `);
    
    // *** REPLACE WITH YOUR EMAIL ADDRESS ***
    const mailtoLink = `mailto:your.email@gmail.com?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
    
    alert('Thank you for your interest in EcoPulse 3000! Your email client will open with a pre-filled message. Please send it to complete your inquiry.');
    
    e.target.reset();
    
    console.log('Form Data:', data);
}

// ===== Footer Year =====
function updateFooterYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ===== Expose functions to global scope =====
window.showSection = showSection;