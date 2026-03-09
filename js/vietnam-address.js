/* Vietnam Address Selector - Pancake POS Geo API */
/* Cấu trúc: Tỉnh/TP → Quận/Huyện → Phường/Xã */
/* Sử dụng API Pancake POS để đồng bộ mã địa chỉ với hệ thống POS */

(function() {
  'use strict';

  const GEO_API = 'https://pos.pages.fm/api/v1/geo';
  const API_KEY = '9bfa8af5dfbc41c2b8ad1db542e8ca73';

  // Cache
  const cache = {
    provinces: null,
    districts: {},
    communes: {}
  };

  function initAddressSelector() {
    const provinceSelect = document.getElementById('city');
    const districtSelect = document.getElementById('district');
    const wardSelect = document.getElementById('ward');

    if (!provinceSelect) {
      console.log('Address selectors not found');
      return;
    }

    // Auto-create district dropdown if not exists
    if (!districtSelect && wardSelect) {
      const districtGroup = document.createElement('div');
      districtGroup.className = 'form-group';
      districtGroup.innerHTML = `
        <label for="district">Quận/Huyện *</label>
        <select id="district" name="district" required disabled>
          <option value="">Chọn Quận/Huyện</option>
        </select>
      `;
      // Insert district before ward
      wardSelect.closest('.form-group').parentNode.insertBefore(
        districtGroup,
        wardSelect.closest('.form-group')
      );
    }

    loadProvinces();

    // Province → load Districts
    provinceSelect.addEventListener('change', function() {
      const provinceId = this.value;
      const dSelect = document.getElementById('district');
      const wSelect = document.getElementById('ward');

      resetSelect(dSelect, 'Chọn Quận/Huyện');
      resetSelect(wSelect, 'Chọn Phường/Xã');

      if (provinceId) {
        loadDistricts(provinceId);
      }
    });

    // District → load Communes/Wards
    document.addEventListener('change', function(e) {
      if (e.target.id === 'district') {
        const districtId = e.target.value;
        const wSelect = document.getElementById('ward');
        resetSelect(wSelect, 'Chọn Phường/Xã');

        if (districtId) {
          loadCommunes(districtId);
        }
      }
    });
  }

  function resetSelect(select, placeholder) {
    if (!select) return;
    select.innerHTML = `<option value="">${placeholder}</option>`;
    select.disabled = true;
  }

  // ========================================
  // LOAD PROVINCES (Pancake POS geo API)
  // ========================================
  async function loadProvinces() {
    const provinceSelect = document.getElementById('city');

    try {
      provinceSelect.innerHTML = '<option value="">Đang tải...</option>';

      let provinces;
      if (cache.provinces) {
        provinces = cache.provinces;
      } else {
        const response = await fetch(`${GEO_API}/provinces?api_key=${API_KEY}`);
        const result = await response.json();
        provinces = result.data || result;
        cache.provinces = provinces;
      }

      provinceSelect.innerHTML = '<option value="">Chọn Tỉnh/Thành phố *</option>';

      // Separate thành phố trung ương and tỉnh
      const cities = provinces.filter(p =>
        p.name.startsWith('Thành phố') || p.name === 'Hà Nội'
      );
      const others = provinces.filter(p =>
        !p.name.startsWith('Thành phố') && p.name !== 'Hà Nội'
      );

      if (cities.length > 0) {
        const optgroup = document.createElement('optgroup');
        optgroup.label = 'Thành phố';
        cities.forEach(p => {
          const option = document.createElement('option');
          option.value = p.id;
          option.textContent = p.name;
          option.dataset.name = p.name;
          option.dataset.newId = p.new_id || '';
          optgroup.appendChild(option);
        });
        provinceSelect.appendChild(optgroup);
      }

      if (others.length > 0) {
        const optgroup = document.createElement('optgroup');
        optgroup.label = 'Tỉnh';
        others.forEach(p => {
          const option = document.createElement('option');
          option.value = p.id;
          option.textContent = p.name;
          option.dataset.name = p.name;
          option.dataset.newId = p.new_id || '';
          optgroup.appendChild(option);
        });
        provinceSelect.appendChild(optgroup);
      }

      provinceSelect.disabled = false;

    } catch (error) {
      console.error('Failed to load provinces:', error);
      provinceSelect.innerHTML = '<option value="">Lỗi tải dữ liệu</option>';
    }
  }

  // ========================================
  // LOAD DISTRICTS
  // ========================================
  async function loadDistricts(provinceId) {
    const districtSelect = document.getElementById('district');
    if (!districtSelect) return;

    try {
      districtSelect.innerHTML = '<option value="">Đang tải...</option>';

      let districts;
      if (cache.districts[provinceId]) {
        districts = cache.districts[provinceId];
      } else {
        const response = await fetch(`${GEO_API}/districts?province_id=${provinceId}&api_key=${API_KEY}`);
        const result = await response.json();
        districts = result.data || result;
        cache.districts[provinceId] = districts;
      }

      districtSelect.innerHTML = '<option value="">Chọn Quận/Huyện *</option>';

      districts.forEach(d => {
        const option = document.createElement('option');
        option.value = d.id;
        option.textContent = d.name;
        option.dataset.name = d.name;
        districtSelect.appendChild(option);
      });

      districtSelect.disabled = false;

    } catch (error) {
      console.error('Failed to load districts:', error);
      districtSelect.innerHTML = '<option value="">Lỗi tải dữ liệu</option>';
    }
  }

  // ========================================
  // LOAD COMMUNES (WARDS)
  // ========================================
  async function loadCommunes(districtId) {
    const wardSelect = document.getElementById('ward');
    if (!wardSelect) return;

    try {
      wardSelect.innerHTML = '<option value="">Đang tải...</option>';

      let communes;
      if (cache.communes[districtId]) {
        communes = cache.communes[districtId];
      } else {
        const response = await fetch(`${GEO_API}/communes?district_id=${districtId}&api_key=${API_KEY}`);
        const result = await response.json();
        communes = result.data || result;
        cache.communes[districtId] = communes;
      }

      wardSelect.innerHTML = '<option value="">Chọn Phường/Xã *</option>';

      communes.forEach(c => {
        const option = document.createElement('option');
        option.value = c.id;
        option.textContent = c.name;
        option.dataset.name = c.name;
        option.dataset.newId = c.new_id || '';
        wardSelect.appendChild(option);
      });

      wardSelect.disabled = false;

    } catch (error) {
      console.error('Failed to load communes:', error);
      wardSelect.innerHTML = '<option value="">Lỗi tải dữ liệu</option>';
    }
  }

  // Expose loadProvinces globally (called from product pages)
  window.loadProvinces = loadProvinces;

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAddressSelector);
  } else {
    initAddressSelector();
  }
})();
