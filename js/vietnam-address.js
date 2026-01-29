/* Vietnam Address Selector - Cascading Dropdowns */
/* API v2 - 34 tỉnh/thành (sau sáp nhập 07/2025) */
/* Cấu trúc: Tỉnh/TP → Phường/Xã (không có cấp Quận/Huyện) */

(function() {
  'use strict';

  // API endpoint for Vietnam provinces data (v2 - 34 tỉnh/thành)
  const API_BASE = 'https://provinces.open-api.vn/api/v2';

  // Cache for loaded data
  const cache = {
    provinces: null,
    wards: {}
  };

  // Initialize address selectors
  function initAddressSelector() {
    const provinceSelect = document.getElementById('city');
    const wardSelect = document.getElementById('ward');

    if (!provinceSelect || !wardSelect) {
      console.log('Address selectors not found');
      return;
    }

    // Load provinces on init
    loadProvinces();

    // Province change -> load wards directly
    provinceSelect.addEventListener('change', function() {
      const provinceCode = this.value;
      resetSelect(wardSelect, 'Chọn Phường/Xã *');

      if (provinceCode) {
        loadWards(provinceCode);
      }
    });
  }

  // Reset select to default state
  function resetSelect(select, placeholder) {
    select.innerHTML = `<option value="">${placeholder}</option>`;
    select.disabled = true;
  }

  // Load provinces
  async function loadProvinces() {
    const provinceSelect = document.getElementById('city');

    try {
      provinceSelect.innerHTML = '<option value="">Đang tải...</option>';

      let provinces;
      if (cache.provinces) {
        provinces = cache.provinces;
      } else {
        const response = await fetch(`${API_BASE}/p/`);
        provinces = await response.json();
        cache.provinces = provinces;
      }

      provinceSelect.innerHTML = '<option value="">Chọn Tỉnh/Thành phố *</option>';

      // Separate cities and provinces
      const cities = provinces.filter(p => p.name.includes('Thành phố'));
      const others = provinces.filter(p => !p.name.includes('Thành phố'));

      if (cities.length > 0) {
        const optgroup = document.createElement('optgroup');
        optgroup.label = 'Thành phố';
        cities.forEach(p => {
          const option = document.createElement('option');
          option.value = p.code;
          option.textContent = p.name;
          option.dataset.name = p.name;
          optgroup.appendChild(option);
        });
        provinceSelect.appendChild(optgroup);
      }

      if (others.length > 0) {
        const optgroupOther = document.createElement('optgroup');
        optgroupOther.label = 'Tỉnh';
        others.forEach(p => {
          const option = document.createElement('option');
          option.value = p.code;
          option.textContent = p.name;
          option.dataset.name = p.name;
          optgroupOther.appendChild(option);
        });
        provinceSelect.appendChild(optgroupOther);
      }

      provinceSelect.disabled = false;

    } catch (error) {
      console.error('Failed to load provinces:', error);
      provinceSelect.innerHTML = '<option value="">Lỗi tải dữ liệu</option>';
    }
  }

  // Load wards for a province (API v2 has no district level)
  async function loadWards(provinceCode) {
    const wardSelect = document.getElementById('ward');

    try {
      wardSelect.innerHTML = '<option value="">Đang tải...</option>';

      let wards;
      if (cache.wards[provinceCode]) {
        wards = cache.wards[provinceCode];
      } else {
        const response = await fetch(`${API_BASE}/p/${provinceCode}?depth=2`);
        const data = await response.json();
        wards = data.wards || [];
        cache.wards[provinceCode] = wards;
      }

      wardSelect.innerHTML = '<option value="">Chọn Phường/Xã *</option>';

      wards.forEach(w => {
        const option = document.createElement('option');
        option.value = w.code;
        option.textContent = w.name;
        option.dataset.name = w.name;
        wardSelect.appendChild(option);
      });

      wardSelect.disabled = false;

    } catch (error) {
      console.error('Failed to load wards:', error);
      wardSelect.innerHTML = '<option value="">Lỗi tải dữ liệu</option>';
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAddressSelector);
  } else {
    initAddressSelector();
  }
})();
