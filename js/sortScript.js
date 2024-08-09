document.addEventListener("DOMContentLoaded", function () {
    const selectFormTitles = document.querySelectorAll('.select-form-title');
    
    //pour chaque éléments avec la classe select-form-title
    selectFormTitles.forEach(function(selectFormTitle) {
        const selectForm = selectFormTitle.closest('.select-form');
        const openSelectForm = selectForm.querySelector('.open-form-select');
        const selectFormIcon = selectForm.querySelector('.select-form-icon');
        const input = selectForm.querySelector('#search-input');
        const clearIcon = selectForm.querySelector('#clear-icon');
  
        selectFormTitle.addEventListener('click', function() {
            if (openSelectForm.classList.contains('active')) {
            selectFormIcon.classList.remove('fa-chevron-up');
            selectFormIcon.classList.add('fa-chevron-down');
            } else {
            selectFormIcon.classList.remove('fa-chevron-down');
            selectFormIcon.classList.add('fa-chevron-up');
            }
            selectForm.classList.toggle('active');
            openSelectForm.classList.toggle('active');
        });
  
        input.addEventListener('input', function() {
            if (input.value.length > 0) {
            clearIcon.style.display = 'block';
            } else {
            clearIcon.style.display = 'none';
            }
        });
  
        clearIcon.addEventListener('click', function() {
            input.value = '';
            clearIcon.style.display = 'none';
            input.focus();
        });
    });
  });
  