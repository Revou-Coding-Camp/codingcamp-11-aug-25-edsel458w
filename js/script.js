function setError(fieldName, message) {
    const errorEl = document.querySelector('[data-error-for="' + fieldName + '"]');
    if (errorEl) {
      errorEl.textContent = message || '';
    }
}


document.addEventListener('DOMContentLoaded', function () {
  let userName = prompt('Masukkan nama anda:');
  if (userName) {
    userName = userName.replace(/[^a-zA-Z\s]/g, '').trim();
    if (userName.length === 0) {
      userName = 'Friend';
    }
  } else {
    userName = 'Friend';
  }
  const greetName = document.getElementById('greetName');
  if (greetName) {
    greetName.textContent = userName;
  }
});

// Fungsi: Update waktu realtime dengan format HH:MM:SS - DD/MM/YYYY
const currentTimeEl = document.getElementById('currentTime');
if (currentTimeEl) {
  const updateTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    currentTimeEl.textContent = `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;
  };
  updateTime();
  setInterval(updateTime, 1000);
}

// Set tahun otomatis di footer
const yearNow = document.getElementById('yearNow');
if (yearNow) {
  yearNow.textContent = new Date().getFullYear();
}


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}



const messageForm = document.getElementById('messageForm');
if (messageForm) {
  messageForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const gender = messageForm.querySelector('input[name="gender"]:checked');
    const message = document.getElementById('messageField').value.trim();

    document.getElementById('rName').textContent = name || '-';
    document.getElementById('rEmail').textContent = email || '-';
    document.getElementById('rPhone').textContent = phone || '-';
    document.getElementById('rGender').textContent = gender ? gender.value : '-';
    document.getElementById('rMessage').textContent = message || '-';
  });
}

// Validasi nama - mencegah input angka dan simbol
const nameInput = document.getElementById('name');
const nameError = document.getElementById('error-name');

if (nameInput && nameError) {
  nameInput.addEventListener('keypress', function(e) {
    // Hanya izinkan huruf (a-z, A-Z) dan spasi
    const char = String.fromCharCode(e.which);
    const pattern = /[a-zA-Z\s]/;
    
    if (!pattern.test(char)) {
      e.preventDefault();
      nameError.textContent = 'Nama hanya boleh berisi huruf dan spasi';
      nameError.style.display = 'block';
      
      // Hilangkan pesan error setelah 2 detik
      setTimeout(() => {
        nameError.textContent = '';
        nameError.style.display = 'none';
      }, 2000);
    }
  });
  
  nameInput.addEventListener('input', function() {
    // Bersihkan karakter yang tidak valid jika ada yang lolos
    this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
    
    if (this.value.trim() === '') {
      nameError.textContent = '';
      nameError.style.display = 'none';
    }
  });
}


// Validasi nomor HP sederhana - hanya angka dan simbol +
const phoneInput = document.getElementById('phone');
const phoneError = document.getElementById('error-phone');

if (phoneInput && phoneError) {
  phoneInput.addEventListener('keypress', function(e) {
    const char = String.fromCharCode(e.which);
    const pattern = /[0-9+]/;
    
    
    if (char === '+' && this.value.length > 0) {
      e.preventDefault();
      phoneError.textContent = 'Simbol + hanya boleh digunakan di awal nomor';
      phoneError.style.display = 'block';
      
      setTimeout(() => {
        phoneError.textContent = '';
        phoneError.style.display = 'none';
      }, 2000);
      return;
    }
    
    if (!pattern.test(char)) {
      e.preventDefault();
      phoneError.textContent = 'Nomor HP hanya boleh berisi angka dan simbol +';
      phoneError.style.display = 'block';
      
      setTimeout(() => {
        phoneError.textContent = '';
        phoneError.style.display = 'none';
      }, 2000);
    }
  });
  
  phoneInput.addEventListener('input', function() {
    // Bersihkan karakter selain angka dan +
    let cleanValue = this.value.replace(/[^0-9+]/g, '');
    
   
    if (cleanValue.includes('+')) {
      const firstPlus = cleanValue.indexOf('+');
      if (firstPlus !== 0) {
        cleanValue = cleanValue.replace(/\+/g, '');
      } else {
        cleanValue = '+' + cleanValue.substring(1).replace(/\+/g, '');
      }
    }
    
    this.value = cleanValue;
  });
}


