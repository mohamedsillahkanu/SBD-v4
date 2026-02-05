// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzs_hVlsEQAu_4qeOaZUTjS_cnH3NR22ecQ8QUu5Zw_z8WpOzjnoMLo8Tm-hgQnohQ_zw/exec',
    GOOGLE_SHEET_URL: 'https://docs.google.com/spreadsheets/d/1tumwvxOoToPYDPdpXLyGYaiT2kbfN6Vw_HBd-8t6IAA/edit?gid=353413478#gid=353413478',
    LOGIN_USERNAME: 'bbc',
    LOGIN_PASSWORD: 'bbc',
    SHEETS: {
        SURVEY_DATA: 'SURVEY_DATA',
        SUMMARY: 'SUMMARY_REPORT'
    }
};

// ============================================
// REGION-DISTRICT MAPPING
// ============================================
const REGION_DISTRICT_MAP = {
    'Western Area': ['Western Area Urban District', 'Western Area Rural District'],
    'Northern Region': ['Bombali District', 'Falaba District', 'Koinadugu District', 'Tonkolili District'],
    'Southern Region': ['Bo District', 'Bonthe District', 'Moyamba District', 'Pujehun District'],
    'Eastern Region': ['Kailahun District', 'Kenema District', 'Kono District'],
    'North-Western Region': ['Kambia District', 'Karene District', 'Port Loko District']
};

// ============================================
// FORM SECTIONS DEFINITION
// ============================================
const FORM_SECTIONS = {
    'Section A: School Profile': {
        description: 'Basic information about the school receiving ITNs',
        fields: {
            school_name: { label: 'Name of School', type: 'text' },
            school_type: {
                label: 'Type of School',
                type: 'radio',
                options: ['Primary', 'Junior Secondary School (JSS)', 'Senior Secondary School (SSS)', 'Combined (Primary + JSS)', 'Combined (Primary + JSS + SSS)']
            },
            school_ownership: {
                label: 'School Ownership',
                type: 'radio',
                options: ['Government', 'Mission/Faith-based', 'Private', 'Community']
            },
            region: {
                label: 'Region',
                type: 'select',
                options: Object.keys(REGION_DISTRICT_MAP)
            },
            district: {
                label: 'District',
                type: 'select',
                options: [],
                cascadeFrom: 'region'
            },
            chiefdom: { label: 'Chiefdom', type: 'text' },
            community_name: { label: 'Community/Town/Village Name', type: 'text' },
            head_teacher_name: { label: 'Name of Head Teacher', type: 'text' },
            head_teacher_contact: { label: 'Head Teacher Contact Number', type: 'tel' }
        }
    },
    'Section B: Student Enrollment & Eligibility': {
        description: 'Student population and eligibility details for ITN distribution',
        fields: {
            total_enrollment: { label: 'Q1. Total number of students enrolled in the school', type: 'number' },
            total_male_students: { label: 'Q2. Total number of male students enrolled', type: 'number' },
            total_female_students: { label: 'Q3. Total number of female students enrolled', type: 'number' },
            total_eligible_students: { label: 'Q4. Total number of students eligible for ITN distribution', type: 'number' },
            eligible_male_students: { label: 'Q5. Number of eligible male students', type: 'number' },
            eligible_female_students: { label: 'Q6. Number of eligible female students', type: 'number' },
            students_present_distribution_day: { label: 'Q7. Number of students present on distribution day', type: 'number' },
            male_students_present: { label: 'Q8. Number of male students present on distribution day', type: 'number' },
            female_students_present: { label: 'Q9. Number of female students present on distribution day', type: 'number' },
            total_teachers: { label: 'Q10. Total number of teachers in the school', type: 'number' }
        }
    },
    'Section C: ITN Supply & Distribution': {
        description: 'Details of ITN stock received and distributed',
        fields: {
            distribution_date: { label: 'Q11. Date of ITN Distribution', type: 'date' },
            itns_received: { label: 'Q12. Total number of ITNs received for this school', type: 'number' },
            source_of_itns: {
                label: 'Q13. Source of ITNs',
                type: 'radio',
                options: ['National Malaria Control Programme (NMCP)', 'District Health Management Team (DHMT)', 'WHO', 'Global Fund', 'UNICEF', 'NGO/Partner Organization', 'Other']
            },
            source_of_itns_other: { label: 'If Other, Please Specify', type: 'text', required: false },
            itns_distributed_total: { label: 'Q14. Total number of ITNs distributed to students', type: 'number' },
            itns_distributed_male: { label: 'Q15. Number of ITNs distributed to male students', type: 'number' },
            itns_distributed_female: { label: 'Q16. Number of ITNs distributed to female students', type: 'number' },
            itns_distributed_teachers: { label: 'Q17. Number of ITNs distributed to teachers (if applicable)', type: 'number', required: false },
            itns_remaining: { label: 'Q18. Number of ITNs remaining after distribution', type: 'number' },
            itns_damaged: { label: 'Q19. Number of damaged/unusable ITNs found', type: 'number' },
            itn_brand: {
                label: 'Q20. Brand/Type of ITN distributed',
                type: 'radio',
                options: ['PermaNet', 'Olyset', 'DawaPlus', 'Interceptor', 'Royal Sentry', 'Other', "Don't know"]
            },
            itn_brand_other: { label: 'If Other, Please Specify', type: 'text', required: false }
        }
    },
    'Section D: Distribution Process & Logistics': {
        description: 'How the distribution was organized and conducted',
        fields: {
            distribution_method: {
                label: 'Q21. How were ITNs distributed to students?',
                type: 'radio',
                options: ['Classroom-by-classroom distribution', 'Central point (e.g., assembly hall)', 'Class teachers distributed to their students', 'Students lined up by grade', 'Other']
            },
            distribution_method_other: { label: 'If Other, Please Specify', type: 'text', required: false },
            distribution_supervised_by: {
                label: 'Q22. Who supervised the distribution? (Select all that apply)',
                type: 'checkbox',
                options: [
                    'Head Teacher',
                    'Class Teachers',
                    'District Health Management Team (DHMT) Staff',
                    'NMCP Staff',
                    'Community Health Workers (CHWs)',
                    'NGO/Partner Staff',
                    'School Management Committee (SMC)',
                    'Other'
                ]
            },
            distribution_supervised_other: { label: 'If Other, Please Specify', type: 'text', required: false },
            health_education_given: {
                label: 'Q23. Was health education on ITN use provided to students during distribution?',
                type: 'radio',
                options: ['Yes', 'No']
            },
            health_education_topics: {
                label: 'Q24. What topics were covered in health education? (Select all that apply)',
                type: 'checkbox',
                options: [
                    'How to hang/install the ITN',
                    'Importance of sleeping under ITN every night',
                    'How to care for and wash the ITN',
                    'Malaria prevention and symptoms',
                    'When to seek medical treatment for malaria',
                    'Not to use ITNs for fishing or farming'
                ],
                required: false,
                conditional: 'health_education_given',
                conditionalValue: 'Yes'
            },
            who_delivered_health_education: {
                label: 'Q25. Who delivered the health education?',
                type: 'radio',
                options: ['Teacher', 'Health Worker', 'NMCP Staff', 'NGO/Partner Staff', 'Community Health Worker', 'Other'],
                required: false,
                conditional: 'health_education_given',
                conditionalValue: 'Yes'
            },
            register_used: {
                label: 'Q26. Was a distribution register/list used to track ITNs given to each student?',
                type: 'radio',
                options: ['Yes', 'No']
            },
            student_signed_received: {
                label: 'Q27. Did students (or parents/guardians) sign or thumbprint to confirm receipt?',
                type: 'radio',
                options: ['Yes', 'No']
            }
        }
    },
    'Section E: Challenges & Observations': {
        description: 'Challenges encountered and additional observations during distribution',
        fields: {
            sufficient_itns: {
                label: 'Q28. Were there sufficient ITNs for all eligible students?',
                type: 'radio',
                options: ['Yes', 'No']
            },
            shortage_action: {
                label: 'Q29. If No, how was the shortage handled?',
                type: 'radio',
                options: [
                    'Prioritized younger students',
                    'Prioritized female students',
                    'First-come-first-served basis',
                    'Students without any nets at home were prioritized',
                    'Requested additional ITNs from DHMT',
                    'Not yet resolved',
                    'Other'
                ],
                required: false,
                conditional: 'sufficient_itns',
                conditionalValue: 'No'
            },
            shortage_action_other: { label: 'If Other, Please Specify', type: 'text', required: false },
            challenges_encountered: {
                label: 'Q30. Were any challenges encountered during the distribution?',
                type: 'radio',
                options: ['Yes', 'No']
            },
            challenge_types: {
                label: 'Q31. What challenges were encountered? (Select all that apply)',
                type: 'checkbox',
                options: [
                    'Insufficient ITNs for all students',
                    'Late delivery of ITNs to the school',
                    'Low student attendance on distribution day',
                    'Damaged or torn ITNs in the supply',
                    'Lack of transportation for ITNs',
                    'No distribution register/forms available',
                    'Inadequate storage space at the school',
                    'Community members demanding ITNs meant for students',
                    'Lack of supervision from health authorities',
                    'Students losing ITNs on the way home',
                    'Other'
                ],
                required: false,
                conditional: 'challenges_encountered',
                conditionalValue: 'Yes'
            },
            challenge_types_other: { label: 'If Other, Please Specify', type: 'text', required: false },
            itn_storage_before_distribution: {
                label: 'Q32. Where were ITNs stored before distribution?',
                type: 'radio',
                options: ['School store room', 'Head Teacher\'s office', 'Classroom', 'Community health center', 'District warehouse', 'Other']
            },
            itn_storage_other: { label: 'If Other, Please Specify', type: 'text', required: false },
            condition_of_itns: {
                label: 'Q33. Overall condition of ITNs received',
                type: 'radio',
                options: ['All in good condition', 'Most in good condition (few damaged)', 'Many damaged/torn', 'Expired or discolored']
            },
            previous_school_itn_distribution: {
                label: 'Q34. Has this school received ITN distribution before?',
                type: 'radio',
                options: ['Yes', 'No', "Don't know"]
            },
            last_distribution_year: {
                label: 'Q35. If Yes, when was the last school-based ITN distribution?',
                type: 'radio',
                options: ['Within the last year', '1-2 years ago', '3-4 years ago', '5+ years ago', "Don't know"],
                required: false,
                conditional: 'previous_school_itn_distribution',
                conditionalValue: 'Yes'
            },
            overall_distribution_rating: {
                label: 'Q36. Overall rating of the distribution process',
                type: 'radio',
                options: ['Excellent', 'Good', 'Fair', 'Poor', 'Very Poor']
            },
            additional_comments: { label: 'Q37. Additional comments or observations', type: 'textarea', required: false }
        }
    },
    'Respondent Information & Signature': {
        description: 'Information about the person completing this survey',
        fields: {
            respondent_name: { label: 'Name of Respondent', type: 'text' },
            respondent_position: { label: 'Position/Title', type: 'text' },
            respondent_organization: {
                label: 'Organization',
                type: 'radio',
                options: ['NMCP', 'DHMT', 'WHO', 'NGO/Partner', 'School Staff', 'Other']
            },
            respondent_organization_other: { label: 'If Other, Please Specify', type: 'text', required: false },
            respondent_contact: { label: 'Contact Number', type: 'tel' },
            respondent_email: { label: 'Email Address', type: 'email', required: false },
            survey_date: { label: 'Date of Survey', type: 'date' },
            respondent_signature: { label: 'Signature', type: 'signature' },
            gps_location: { label: 'GPS Location (Auto-captured)', type: 'gps', required: false }
        }
    }
};

// ============================================
// STATE
// ============================================
const state = {
    pendingSubmissions: [],
    drafts: [],
    isOnline: navigator.onLine,
    currentSection: 1,
    totalSections: 0,
    signaturePads: {},
    gpsLocation: null,
    formStatus: 'draft',
    currentDraftId: null,
    currentDraftName: null,
    gpsAttempted: false
};

// ============================================
// INITIALIZATION
// ============================================
function init() {
    const savedPending = localStorage.getItem('pendingSubmissions_itn');
    if (savedPending) {
        try { state.pendingSubmissions = JSON.parse(savedPending); } catch (e) { state.pendingSubmissions = []; }
    }

    const savedDrafts = localStorage.getItem('formDrafts_itn');
    if (savedDrafts) {
        try { state.drafts = JSON.parse(savedDrafts); } catch (e) { state.drafts = []; }
    }

    updateOnlineStatus();
    updatePendingCount();
    updateDraftCount();
    setupEventListeners();
    generateFormSections();

    setTimeout(() => { captureGPSAutomatically(); }, 1000);

    if (state.isOnline && state.pendingSubmissions.length > 0) {
        syncPendingSubmissions();
    }
}

function generateFormSections() {
    const container = document.getElementById('dynamicSections');
    let html = '';
    let sectionNum = 1;

    const sectionKeys = Object.keys(FORM_SECTIONS);
    state.totalSections = sectionKeys.length;

    sectionKeys.forEach((sectionTitle, index) => {
        const section = FORM_SECTIONS[sectionTitle];
        const isLastSection = index === sectionKeys.length - 1;

        html += `
            <div class="form-section ${sectionNum === 1 ? 'active' : ''}" data-section="${sectionNum}">
                <div class="section-header">
                    <h2 class="section-title">${sectionTitle.toUpperCase()}</h2>
                    <p class="section-description">${section.description}</p>
                </div>
        `;

        const fields = Object.entries(section.fields);
        fields.forEach(([fieldName, fieldConfig]) => {
            const label = fieldConfig.label;
            const type = fieldConfig.type || 'text';
            const required = fieldConfig.required !== false;
            const conditional = fieldConfig.conditional;
            const conditionalValue = fieldConfig.conditionalValue;
            const conditionalInverse = fieldConfig.conditionalInverse || false;
            const cascadeFrom = fieldConfig.cascadeFrom;

            const conditionalClass = conditional ? 'conditional-field' : '';
            const conditionalData = conditional ? `data-conditional="${conditional}" data-conditional-value="${conditionalValue}" data-conditional-inverse="${conditionalInverse}"` : '';

            html += `<div class="form-group ${conditionalClass}" ${conditionalData} id="group_${fieldName}">`;
            html += `<label class="form-label">${label.toUpperCase()} ${required ? '<span class="required">*</span>' : ''}</label>`;

            if (type === 'signature') {
                html += `
                    <div class="signature-container">
                        <canvas class="signature-canvas" id="${fieldName}_canvas" data-field="${fieldName}"></canvas>
                        <div class="signature-controls">
                            <button type="button" class="signature-btn" onclick="clearSignature('${fieldName}')">CLEAR</button>
                        </div>
                    </div>
                    <input type="hidden" name="${fieldName}" id="${fieldName}" ${required ? 'required' : ''}>
                `;
            } else if (type === 'gps') {
                html += `
                    <div class="gps-container">
                        <div class="gps-status">
                            <div class="gps-icon" id="gps_icon"></div>
                            <div>
                                <div class="gps-info" id="gps_status">Automatically capturing GPS location...</div>
                                <div class="gps-coords" id="gps_coords"></div>
                            </div>
                        </div>
                    </div>
                    <input type="hidden" name="gps_latitude" id="gps_latitude">
                    <input type="hidden" name="gps_longitude" id="gps_longitude">
                    <input type="hidden" name="gps_accuracy" id="gps_accuracy">
                    <input type="hidden" name="gps_timestamp" id="gps_timestamp">
                `;
            } else if (type === 'radio') {
                html += '<div class="radio-group">';
                fieldConfig.options.forEach((option, idx) => {
                    html += `
                        <div class="radio-item">
                            <input type="radio" name="${fieldName}" id="${fieldName}_${idx}" value="${option}" ${required ? 'required' : ''} data-field-name="${fieldName}">
                            <label for="${fieldName}_${idx}">${option}</label>
                        </div>
                    `;
                });
                html += '</div>';
                html += `<div class="field-error" id="error_${fieldName}">Please select an option</div>`;
            } else if (type === 'checkbox') {
                html += '<div class="checkbox-group">';
                fieldConfig.options.forEach((option, idx) => {
                    html += `
                        <div class="checkbox-item">
                            <input type="checkbox" name="${fieldName}" id="${fieldName}_${idx}" value="${option}">
                            <label for="${fieldName}_${idx}">${option}</label>
                        </div>
                    `;
                });
                html += '</div>';
            } else if (type === 'select' && fieldConfig.options) {
                const isDisabled = cascadeFrom ? 'disabled' : '';
                html += `<select class="form-select" name="${fieldName}" id="${fieldName}" ${required ? 'required' : ''} ${isDisabled} data-cascade-from="${cascadeFrom || ''}" data-field-name="${fieldName}">`;
                html += '<option value="">Select...</option>';
                fieldConfig.options.forEach(option => {
                    html += `<option value="${option}">${option}</option>`;
                });
                html += '</select>';
                html += `<div class="field-error" id="error_${fieldName}">Please select an option</div>`;
            } else if (type === 'date') {
                html += `<input type="date" class="form-input" name="${fieldName}" id="${fieldName}" ${required ? 'required' : ''} data-field-name="${fieldName}">`;
                html += `<div class="field-error" id="error_${fieldName}">This field is required</div>`;
            } else if (type === 'number') {
                const minAttr = fieldConfig.min !== undefined ? `min="${fieldConfig.min}"` : 'min="0"';
                const maxAttr = fieldConfig.max !== undefined ? `max="${fieldConfig.max}"` : '';
                html += `<input type="number" class="form-input" name="${fieldName}" id="${fieldName}" ${minAttr} ${maxAttr} step="1" ${required ? 'required' : ''} data-field-name="${fieldName}">`;
                html += `<div class="field-error" id="error_${fieldName}">This field is required</div>`;
            } else if (type === 'textarea') {
                html += `<textarea class="form-textarea" name="${fieldName}" id="${fieldName}" rows="4" ${required ? 'required' : ''} data-field-name="${fieldName}"></textarea>`;
                html += `<div class="field-error" id="error_${fieldName}">This field is required</div>`;
            } else if (type === 'tel') {
                html += `<input type="tel" class="form-input" name="${fieldName}" id="${fieldName}" ${required ? 'required' : ''} data-field-name="${fieldName}">`;
                html += `<div class="field-error" id="error_${fieldName}">This field is required</div>`;
            } else if (type === 'email') {
                html += `<input type="email" class="form-input" name="${fieldName}" id="${fieldName}" ${required ? 'required' : ''} data-field-name="${fieldName}">`;
                html += `<div class="field-error" id="error_${fieldName}">Please enter a valid email</div>`;
            } else {
                html += `<input type="text" class="form-input" name="${fieldName}" id="${fieldName}" ${required ? 'required' : ''} data-field-name="${fieldName}">`;
                html += `<div class="field-error" id="error_${fieldName}">This field is required</div>`;
            }

            html += '</div>';
        });

        // Navigation buttons
        html += '<div class="navigation-buttons">';
        if (sectionNum > 1) {
            html += '<button type="button" class="btn-nav btn-back" onclick="previousSection()">← BACK</button>';
        }
        html += '<button type="button" class="btn-nav btn-draft" onclick="showDraftNameModal()">💾 SAVE DRAFT</button>';
        if (isLastSection) {
            html += '<button type="button" class="btn-nav btn-finalize" id="finalizeBtn" onclick="finalizeForm()">✓ FINALIZE</button>';
            html += '<button type="submit" class="btn-nav btn-submit" id="submitBtn" disabled>📤 SUBMIT</button>';
        } else {
            html += '<button type="button" class="btn-nav btn-next" onclick="nextSection()">NEXT →</button>';
        }
        html += '</div></div>';
        sectionNum++;
    });

    container.innerHTML = html;
    updateProgress();

    setTimeout(() => {
        initializeSignaturePads();
        setupConditionalFields();
        setupCascadingDropdowns();
        setupRealTimeValidation();
    }, 100);
}

function setupConditionalFields() {
    const conditionalFields = document.querySelectorAll('.conditional-field');

    conditionalFields.forEach(field => {
        const parentFieldName = field.getAttribute('data-conditional');
        const expectedValue = field.getAttribute('data-conditional-value');
        const isInverse = field.getAttribute('data-conditional-inverse') === 'true';

        const parentRadios = document.querySelectorAll(`input[name="${parentFieldName}"]`);

        parentRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                let shouldShow = isInverse ? this.value !== expectedValue : this.value === expectedValue;

                if (shouldShow) {
                    field.classList.add('show');
                } else {
                    field.classList.remove('show');
                    const checkboxes = field.querySelectorAll('input[type="checkbox"]');
                    checkboxes.forEach(cb => cb.checked = false);
                    const radios = field.querySelectorAll('input[type="radio"]');
                    radios.forEach(r => r.checked = false);
                    const textInputs = field.querySelectorAll('input[type="text"], textarea');
                    textInputs.forEach(input => input.value = '');
                }
            });
        });

        const checkedRadio = document.querySelector(`input[name="${parentFieldName}"]:checked`);
        if (checkedRadio) {
            let shouldShow = isInverse ? checkedRadio.value !== expectedValue : checkedRadio.value === expectedValue;
            if (shouldShow) field.classList.add('show');
        }
    });
}

function setupCascadingDropdowns() {
    const regionSelect = document.getElementById('region');
    const districtSelect = document.getElementById('district');

    if (regionSelect && districtSelect) {
        regionSelect.addEventListener('change', function() {
            const selectedRegion = this.value;
            districtSelect.innerHTML = '<option value="">Select...</option>';

            if (selectedRegion && REGION_DISTRICT_MAP[selectedRegion]) {
                districtSelect.disabled = false;
                REGION_DISTRICT_MAP[selectedRegion].forEach(district => {
                    const option = document.createElement('option');
                    option.value = district;
                    option.textContent = district;
                    districtSelect.appendChild(option);
                });
            } else {
                districtSelect.disabled = true;
            }

            const districtError = document.getElementById('error_district');
            if (districtError) districtError.classList.remove('show');
            districtSelect.classList.remove('error');
        });
    }
}

function setupRealTimeValidation() {
    const numberInputs = document.querySelectorAll('input[type="number"][required]');
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
            const errorDiv = document.getElementById(`error_${this.id}`);
            if (errorDiv) errorDiv.classList.remove('show');
        });
    });

    const allInputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    allInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.type !== 'radio' && this.type !== 'number') validateField(this);
        });
        input.addEventListener('input', function() {
            if (this.type !== 'radio') {
                this.classList.remove('error');
                const fieldName = this.getAttribute('data-field-name') || this.id;
                const errorDiv = document.getElementById(`error_${fieldName}`);
                if (errorDiv) errorDiv.classList.remove('show');
            }
        });
    });
}

function validateField(field) {
    const fieldName = field.getAttribute('data-field-name') || field.id;
    const errorDiv = document.getElementById(`error_${fieldName}`);

    if (!field.value || field.value.trim() === '') {
        field.classList.add('error');
        if (errorDiv) errorDiv.classList.add('show');
        return false;
    } else {
        field.classList.remove('error');
        if (errorDiv) errorDiv.classList.remove('show');
        return true;
    }
}

function setupEventListeners() {
    document.getElementById('viewDataBtn').addEventListener('click', handleViewData);
    document.getElementById('viewAnalysisBtn').addEventListener('click', openAnalysisModal);
    document.getElementById('viewDraftsBtn').addEventListener('click', openDraftsModal);
    document.getElementById('dataForm').addEventListener('submit', handleFormSubmit);
    window.addEventListener('online', handleOnlineEvent);
    window.addEventListener('offline', handleOfflineEvent);

    document.getElementById('draftNameInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') confirmSaveDraft();
    });
}

function nextSection() {
    const currentSectionEl = document.querySelector(`.form-section[data-section="${state.currentSection}"]`);
    let isValid = true;
    let firstInvalidField = null;

    const inputs = currentSectionEl.querySelectorAll('input[required], select[required], textarea[required]');

    inputs.forEach(input => {
        const parentGroup = input.closest('.conditional-field');
        if (parentGroup && !parentGroup.classList.contains('show')) return;

        if (input.type === 'radio') {
            const radioGroup = currentSectionEl.querySelectorAll(`input[name="${input.name}"]`);
            const isChecked = Array.from(radioGroup).some(radio => radio.checked);
            if (!isChecked) {
                isValid = false;
                const fieldName = input.getAttribute('data-field-name') || input.name;
                const errorDiv = document.getElementById(`error_${fieldName}`);
                if (errorDiv) errorDiv.classList.add('show');
                input.closest('.radio-group').style.borderLeft = '4px solid #dc3545';
                setTimeout(() => { if (input.closest('.radio-group')) input.closest('.radio-group').style.borderLeft = ''; }, 3000);
                if (!firstInvalidField) firstInvalidField = input;
            }
        } else if (!input.value || input.value.trim() === '') {
            isValid = false;
            input.classList.add('error');
            const fieldName = input.getAttribute('data-field-name') || input.id;
            const errorDiv = document.getElementById(`error_${fieldName}`);
            if (errorDiv) errorDiv.classList.add('show');
            if (!firstInvalidField) firstInvalidField = input;
            setTimeout(() => { input.classList.remove('error'); }, 3000);
        }
    });

    if (!isValid) {
        showNotification('Please fill in all required fields correctly', 'error');
        if (firstInvalidField) {
            firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => { firstInvalidField.focus(); }, 500);
        }
        return;
    }

    if (state.currentSection < state.totalSections) {
        currentSectionEl.classList.remove('active');
        state.currentSection++;
        const nextSection = document.querySelector(`.form-section[data-section="${state.currentSection}"]`);
        if (nextSection) {
            nextSection.classList.add('active');
            updateProgress();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}

function previousSection() {
    if (state.currentSection > 1) {
        document.querySelector(`.form-section[data-section="${state.currentSection}"]`).classList.remove('active');
        state.currentSection--;
        document.querySelector(`.form-section[data-section="${state.currentSection}"]`).classList.add('active');
        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function updateProgress() {
    const progress = (state.currentSection / state.totalSections) * 100;
    document.getElementById('progressFill').style.width = progress + '%';

    let statusBadge = '';
    if (state.formStatus === 'draft') {
        statusBadge = '<span class="form-status-badge draft">DRAFT</span>';
    } else if (state.formStatus === 'finalized') {
        statusBadge = '<span class="form-status-badge finalized">FINALIZED</span>';
    }

    document.getElementById('progressText').innerHTML = `SECTION ${state.currentSection} OF ${state.totalSections} ${statusBadge}`;
}

function handleViewData() {
    if (!checkAdminLogin()) return;
    if (CONFIG.GOOGLE_SHEET_URL) {
        window.open(CONFIG.GOOGLE_SHEET_URL, '_blank');
    } else {
        showNotification('Please configure Google Sheet URL in the script', 'error');
    }
}

function checkAdminLogin() {
    const username = prompt('Enter admin username:');
    const password = prompt('Enter admin password:');
    if (username === CONFIG.LOGIN_USERNAME && password === CONFIG.LOGIN_PASSWORD) return true;
    showNotification('Invalid credentials. Access denied.', 'error');
    return false;
}

function handleOnlineEvent() {
    state.isOnline = true;
    updateOnlineStatus();
    showNotification('Back online - Syncing data...', 'info');
    syncPendingSubmissions();
}

function handleOfflineEvent() {
    state.isOnline = false;
    updateOnlineStatus();
    showNotification('You are offline - Data will be saved locally', 'info');
}

function updateOnlineStatus() {
    const indicator = document.getElementById('statusIndicator');
    const text = document.getElementById('statusText');
    if (state.isOnline) {
        indicator.className = 'status-indicator online';
        text.textContent = 'ONLINE';
    } else {
        indicator.className = 'status-indicator offline';
        text.textContent = 'OFFLINE';
    }
}

function updatePendingCount() {
    document.getElementById('pendingCount').textContent = state.pendingSubmissions.length;
}

function updateDraftCount() {
    document.getElementById('draftCount').textContent = state.drafts.length;
}

// ============================================
// GPS FUNCTIONS
// ============================================
function captureGPSAutomatically() {
    if (state.gpsAttempted) return;
    state.gpsAttempted = true;

    const statusIcon = document.getElementById('gps_icon');
    const statusText = document.getElementById('gps_status');
    const coordsText = document.getElementById('gps_coords');

    if (!navigator.geolocation) {
        if (statusIcon) statusIcon.classList.add('error');
        if (statusText) statusText.textContent = 'GPS not supported by your browser';
        return;
    }

    if (statusIcon) statusIcon.classList.add('loading');
    if (statusText) statusText.textContent = 'Capturing GPS location automatically...';

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const accuracy = position.coords.accuracy;
            const timestamp = new Date(position.timestamp).toISOString();

            state.gpsLocation = { latitude, longitude, accuracy, timestamp };

            const latInput = document.getElementById('gps_latitude');
            const lonInput = document.getElementById('gps_longitude');
            const accInput = document.getElementById('gps_accuracy');
            const timeInput = document.getElementById('gps_timestamp');

            if (latInput) latInput.value = latitude;
            if (lonInput) lonInput.value = longitude;
            if (accInput) accInput.value = accuracy;
            if (timeInput) timeInput.value = timestamp;

            if (statusIcon) { statusIcon.classList.remove('loading', 'error'); statusIcon.classList.add('success'); }
            if (statusText) statusText.textContent = 'GPS location captured successfully!';
            if (coordsText) coordsText.textContent = `Lat: ${latitude.toFixed(6)}, Lon: ${longitude.toFixed(6)} (±${Math.round(accuracy)}m)`;
        },
        (error) => {
            if (statusIcon) { statusIcon.classList.remove('loading', 'success'); statusIcon.classList.add('error'); }
            let errorMessage = 'Failed to capture GPS location (optional)';
            switch(error.code) {
                case error.PERMISSION_DENIED: errorMessage = 'GPS permission denied (optional)'; break;
                case error.POSITION_UNAVAILABLE: errorMessage = 'GPS position unavailable (optional)'; break;
                case error.TIMEOUT: errorMessage = 'GPS request timed out (optional)'; break;
            }
            if (statusText) statusText.textContent = errorMessage;
        },
        { enableHighAccuracy: true, timeout: 120000, maximumAge: 0 }
    );
}

// ============================================
// DRAFT MANAGEMENT
// ============================================
function showDraftNameModal() {
    const modal = document.getElementById('draftNameModal');
    const input = document.getElementById('draftNameInput');

    if (state.currentDraftName) {
        input.value = state.currentDraftName;
    } else {
        const schoolName = document.querySelector('[name="school_name"]')?.value || '';
        const surveyDate = document.querySelector('[name="survey_date"]')?.value || '';
        input.value = schoolName || surveyDate || 'Unnamed Draft';
    }

    modal.classList.add('show');
    input.focus();
    input.select();
}

function cancelDraftName() {
    document.getElementById('draftNameModal').classList.remove('show');
}

function confirmSaveDraft() {
    const draftName = document.getElementById('draftNameInput').value.trim();
    if (!draftName) { showNotification('Please enter a name for the draft', 'warning'); return; }
    cancelDraftName();
    saveAsDraft(draftName);
}

function saveAsDraft(draftName) {
    const formData = new FormData(document.getElementById('dataForm'));

    const data = {
        draftId: state.currentDraftId || generateDraftId(),
        draftName: draftName,
        savedAt: new Date().toISOString(),
        savedBy: 'surveyor',
        formStatus: 'draft',
        currentSection: state.currentSection
    };

    for (const [key, value] of formData.entries()) data[key] = value;

    const checkboxGroups = {};
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        if (checkbox.checked) {
            if (!checkboxGroups[checkbox.name]) checkboxGroups[checkbox.name] = [];
            checkboxGroups[checkbox.name].push(checkbox.value);
        }
    });
    for (const [key, values] of Object.entries(checkboxGroups)) data[key] = values.join(', ');

    Object.keys(state.signaturePads).forEach(fieldName => {
        const pad = state.signaturePads[fieldName];
        if (pad && !pad.isEmpty()) data[fieldName] = pad.toDataURL();
    });

    const existingIndex = state.drafts.findIndex(d => d.draftId === data.draftId);
    if (existingIndex !== -1) { state.drafts[existingIndex] = data; } else { state.drafts.push(data); }

    localStorage.setItem('formDrafts_itn', JSON.stringify(state.drafts));
    state.currentDraftId = data.draftId;
    state.currentDraftName = draftName;
    document.getElementById('draft_id').value = data.draftId;

    updateDraftCount();
    showNotification(`Draft "${draftName}" saved successfully!`, 'success');
}

function generateDraftId() {
    return 'draft_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function openDraftsModal() {
    const modal = document.getElementById('draftsModal');
    const modalBody = document.getElementById('draftsModalBody');

    if (state.drafts.length === 0) {
        modalBody.innerHTML = '<div class="no-drafts">No saved drafts</div>';
    } else {
        let html = '';
        const sortedDrafts = [...state.drafts].sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));

        sortedDrafts.forEach((draft) => {
            const savedDate = new Date(draft.savedAt).toLocaleString();
            const draftName = draft.draftName || 'Unnamed Draft';
            const schoolName = draft.school_name || '';

            html += `
                <div class="draft-item">
                    <div class="draft-item-header">
                        <div>
                            <div class="draft-item-title">${draftName}</div>
                            ${schoolName ? `<div class="draft-item-subtitle">School: ${schoolName}</div>` : ''}
                        </div>
                        <div class="draft-item-date">Saved: ${savedDate}</div>
                    </div>
                    <div class="draft-item-actions">
                        <button class="draft-action-btn load" onclick="loadDraft('${draft.draftId}')">📂 LOAD</button>
                        <button class="draft-action-btn delete" onclick="deleteDraft('${draft.draftId}')">🗑️ DELETE</button>
                    </div>
                </div>
            `;
        });
        modalBody.innerHTML = html;
    }

    modal.classList.add('show');
}

function closeDraftsModal() {
    document.getElementById('draftsModal').classList.remove('show');
}

function loadDraft(draftId) {
    const draft = state.drafts.find(d => d.draftId === draftId);
    if (!draft) { showNotification('Draft not found', 'error'); return; }

    clearForm(false);

    state.currentDraftId = draftId;
    state.currentDraftName = draft.draftName;
    state.formStatus = draft.formStatus || 'draft';
    document.getElementById('draft_id').value = draftId;
    document.getElementById('form_status').value = state.formStatus;

    Object.keys(draft).forEach(key => {
        if (['draftId', 'draftName', 'savedAt', 'savedBy', 'formStatus', 'currentSection'].includes(key)) return;

        const field = document.querySelector(`[name="${key}"]`);
        if (field) {
            if (field.type === 'hidden' && key.includes('signature')) {
                const canvas = document.getElementById(`${key}_canvas`);
                if (canvas && draft[key]) {
                    const pad = state.signaturePads[key];
                    if (pad) {
                        const img = new Image();
                        img.onload = () => { const ctx = canvas.getContext('2d'); ctx.drawImage(img, 0, 0); };
                        img.src = draft[key];
                        field.value = draft[key];
                    }
                }
            } else if (field.type === 'radio') {
                const radio = document.querySelector(`input[name="${key}"][value="${draft[key]}"]`);
                if (radio) { radio.checked = true; radio.dispatchEvent(new Event('change')); }
            } else if (field.type === 'checkbox') {
                if (draft[key]) {
                    const values = draft[key].split(', ');
                    values.forEach(val => {
                        const checkbox = document.querySelector(`input[name="${key}"][value="${val}"]`);
                        if (checkbox) checkbox.checked = true;
                    });
                }
            } else {
                field.value = draft[key];
                if (field.tagName === 'SELECT') field.dispatchEvent(new Event('change'));
            }
        }
    });

    if (draft.currentSection) {
        document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
        state.currentSection = draft.currentSection;
        const targetSection = document.querySelector(`.form-section[data-section="${draft.currentSection}"]`);
        if (targetSection) targetSection.classList.add('active');
    }

    updateProgress();
    updateSubmitButton();
    closeDraftsModal();
    showNotification(`Draft "${draft.draftName}" loaded successfully!`, 'success');
}

function deleteDraft(draftId) {
    const draft = state.drafts.find(d => d.draftId === draftId);
    const draftName = draft ? draft.draftName : 'this draft';
    if (!confirm(`Are you sure you want to delete "${draftName}"?`)) return;

    state.drafts = state.drafts.filter(d => d.draftId !== draftId);
    localStorage.setItem('formDrafts_itn', JSON.stringify(state.drafts));

    if (state.currentDraftId === draftId) {
        state.currentDraftId = null;
        state.currentDraftName = null;
        document.getElementById('draft_id').value = '';
    }

    updateDraftCount();
    openDraftsModal();
    showNotification('Draft deleted', 'info');
}

// ============================================
// FINALIZE & SUBMIT
// ============================================
function finalizeForm() {
    let isValid = true;
    let firstInvalidSection = null;

    document.querySelectorAll('.form-section').forEach((section, index) => {
        const inputs = section.querySelectorAll('input[required], select[required], textarea[required]');
        inputs.forEach(input => {
            const parentGroup = input.closest('.conditional-field');
            if (parentGroup && !parentGroup.classList.contains('show')) return;

            if (input.type === 'radio') {
                const radioGroup = section.querySelectorAll(`input[name="${input.name}"]`);
                const isChecked = Array.from(radioGroup).some(radio => radio.checked);
                if (!isChecked && firstInvalidSection === null) { isValid = false; firstInvalidSection = index + 1; }
            } else if (!input.value) {
                isValid = false;
                input.classList.add('error');
                if (firstInvalidSection === null) firstInvalidSection = index + 1;
            }
        });
    });

    if (!isValid) {
        showNotification(`Please complete all required fields. Check Section ${firstInvalidSection}`, 'error');
        document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
        state.currentSection = firstInvalidSection;
        document.querySelector(`.form-section[data-section="${firstInvalidSection}"]`).classList.add('active');
        updateProgress();
        return;
    }

    state.formStatus = 'finalized';
    document.getElementById('form_status').value = 'finalized';
    updateProgress();
    updateSubmitButton();

    if (state.currentDraftName) { saveAsDraft(state.currentDraftName); } else { showDraftNameModal(); }
    showNotification('Form finalized! You can now submit.', 'success');
}

function updateSubmitButton() {
    const submitBtn = document.getElementById('submitBtn');
    const finalizeBtn = document.getElementById('finalizeBtn');

    if (state.formStatus === 'finalized') {
        submitBtn.disabled = false;
        finalizeBtn.disabled = true;
        finalizeBtn.textContent = '✓ FINALIZED';
    } else {
        submitBtn.disabled = true;
        finalizeBtn.disabled = false;
        finalizeBtn.textContent = '✓ FINALIZE';
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (state.formStatus !== 'finalized') {
        showNotification('Please finalize the form before submitting', 'warning');
        return;
    }

    const formData = new FormData(e.target);

    const data = {
        timestamp: new Date().toISOString(),
        submittedBy: 'surveyor',
        form_status: 'submitted'
    };

    for (const [key, value] of formData.entries()) data[key] = value;

    const checkboxGroups = {};
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        if (checkbox.checked) {
            if (!checkboxGroups[checkbox.name]) checkboxGroups[checkbox.name] = [];
            checkboxGroups[checkbox.name].push(checkbox.value);
        }
    });
    for (const [key, values] of Object.entries(checkboxGroups)) data[key] = values.join(', ');

    if (state.isOnline) { await submitToServer(data); } else { saveOffline(data); }
}

async function submitToServer(data) {
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'SUBMITTING...';

    try {
        await fetch(CONFIG.SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (state.currentDraftId) {
            state.drafts = state.drafts.filter(d => d.draftId !== state.currentDraftId);
            localStorage.setItem('formDrafts_itn', JSON.stringify(state.drafts));
            updateDraftCount();
        }

        showNotification('Data submitted successfully!', 'success');
        clearForm(true);
    } catch (error) {
        console.error('Submit error:', error);
        showNotification('Failed to submit - Saved offline', 'error');
        saveOffline(data);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '📤 SUBMIT';
    }
}

function saveOffline(data) {
    state.pendingSubmissions.push(data);
    localStorage.setItem('pendingSubmissions_itn', JSON.stringify(state.pendingSubmissions));

    if (state.currentDraftId) {
        state.drafts = state.drafts.filter(d => d.draftId !== state.currentDraftId);
        localStorage.setItem('formDrafts_itn', JSON.stringify(state.drafts));
        updateDraftCount();
    }

    updatePendingCount();
    showNotification('Data saved offline - Will sync when online', 'info');
    clearForm(true);
}

async function syncPendingSubmissions() {
    if (state.pendingSubmissions.length === 0) return;
    showNotification('Syncing pending submissions...', 'info');
    const successfulSyncs = [];

    for (let i = 0; i < state.pendingSubmissions.length; i++) {
        try {
            await fetch(CONFIG.SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(state.pendingSubmissions[i])
            });
            successfulSyncs.push(i);
        } catch (error) { console.error('Sync error:', error); }
    }

    if (successfulSyncs.length > 0) {
        state.pendingSubmissions = state.pendingSubmissions.filter((_, index) => !successfulSyncs.includes(index));
        localStorage.setItem('pendingSubmissions_itn', JSON.stringify(state.pendingSubmissions));
        updatePendingCount();
        showNotification(`Successfully synced ${successfulSyncs.length} submission(s)`, 'success');
    }
}

function clearForm(resetStatus = true) {
    document.getElementById('dataForm').reset();

    Object.keys(state.signaturePads).forEach(fieldName => clearSignature(fieldName));
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);

    const districtSelect = document.getElementById('district');
    if (districtSelect) { districtSelect.innerHTML = '<option value="">Select...</option>'; districtSelect.disabled = true; }

    document.querySelectorAll('.conditional-field').forEach(field => field.classList.remove('show'));

    state.gpsLocation = null;
    state.gpsAttempted = false;
    const gpsIcon = document.getElementById('gps_icon');
    const gpsStatus = document.getElementById('gps_status');
    const gpsCoords = document.getElementById('gps_coords');

    if (gpsIcon) gpsIcon.className = 'gps-icon';
    if (gpsStatus) gpsStatus.textContent = 'Automatically capturing GPS location...';
    if (gpsCoords) gpsCoords.textContent = '';

    ['gps_latitude', 'gps_longitude', 'gps_accuracy', 'gps_timestamp'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });

    if (resetStatus) {
        state.formStatus = 'draft';
        state.currentDraftId = null;
        state.currentDraftName = null;
        document.getElementById('form_status').value = 'draft';
        document.getElementById('draft_id').value = '';
    }

    state.currentSection = 1;
    document.querySelectorAll('.form-section').forEach(section => section.classList.remove('active'));
    const section1 = document.querySelector('.form-section[data-section="1"]');
    if (section1) section1.classList.add('active');

    updateProgress();
    updateSubmitButton();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => { initializeSignaturePads(); captureGPSAutomatically(); }, 100);
}

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    const text = document.getElementById('notificationText');

    notification.className = `notification ${type} show`;
    text.textContent = message;

    const timeout = type === 'error' && message.length > 100 ? 8000 : 4000;
    setTimeout(() => { notification.classList.remove('show'); }, timeout);
}

// ============================================
// SIGNATURE PAD FUNCTIONS
// ============================================
function initializeSignaturePads() {
    const canvases = document.querySelectorAll('.signature-canvas');

    canvases.forEach(canvas => {
        const fieldName = canvas.getAttribute('data-field');
        const container = canvas.parentElement;
        canvas.width = container.offsetWidth - 20;
        canvas.height = 150;

        const signaturePad = new SignaturePad(canvas, {
            backgroundColor: 'rgb(255, 255, 255)',
            penColor: 'rgb(0, 0, 0)',
            minWidth: 1,
            maxWidth: 3
        });

        state.signaturePads[fieldName] = signaturePad;

        signaturePad.addEventListener('endStroke', () => {
            const hiddenInput = document.getElementById(fieldName);
            if (hiddenInput) hiddenInput.value = signaturePad.toDataURL();
        });
    });
}

function clearSignature(fieldName) {
    const signaturePad = state.signaturePads[fieldName];
    if (signaturePad) {
        signaturePad.clear();
        const hiddenInput = document.getElementById(fieldName);
        if (hiddenInput) hiddenInput.value = '';
    }
}

function resizeSignaturePads() {
    Object.keys(state.signaturePads).forEach(fieldName => {
        const canvas = document.getElementById(`${fieldName}_canvas`);
        if (canvas && canvas.parentElement) {
            const signaturePad = state.signaturePads[fieldName];
            const data = signaturePad.toData();
            const container = canvas.parentElement;
            canvas.width = container.offsetWidth - 20;
            canvas.height = 150;
            signaturePad.fromData(data);
        }
    });
}

window.addEventListener('resize', resizeSignaturePads);

// ============================================
// ANALYSIS DASHBOARD FUNCTIONS
// ============================================
async function openAnalysisModal() {
    if (!checkAdminLogin()) return;

    const modal = document.getElementById('analysisModal');
    const body = document.getElementById('analysisBody');

    modal.classList.add('show');
    body.innerHTML = '<div class="analysis-loading"><p>Loading analysis data...</p></div>';

    try {
        const response = await fetch(CONFIG.SCRIPT_URL + '?action=getAnalysis', { method: 'GET' });
        const data = await response.json();

        if (data.status === 'success') {
            renderAnalysisDashboard(data.data);
        } else {
            throw new Error(data.message || 'Failed to load data');
        }
    } catch (error) {
        console.error('Analysis error:', error);
        body.innerHTML = `
            <div class="analysis-error">
                <p>⚠️ Unable to load analysis data</p>
                <p style="font-size: 12px; margin-top: 10px;">${error.message}</p>
                <p style="font-size: 12px; margin-top: 10px;">Please ensure the Google Apps Script is properly deployed and the data sheet contains survey responses.</p>
            </div>
        `;
    }
}

function closeAnalysisModal() {
    document.getElementById('analysisModal').classList.remove('show');
}

function renderAnalysisDashboard(data) {
    const body = document.getElementById('analysisBody');

    let html = `
        <!-- KEY STATISTICS -->
        <div class="dashboard-grid">
            <div class="stat-card">
                <div class="stat-label">TOTAL SCHOOLS SURVEYED</div>
                <div class="stat-value">${data.totalSubmissions || 0}</div>
                <div class="stat-sublabel">Schools with ITN distribution</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">TOTAL STUDENTS ENROLLED</div>
                <div class="stat-value">${(data.totalEnrollment || 0).toLocaleString()}</div>
                <div class="stat-sublabel">Across all surveyed schools</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">TOTAL ITNs DISTRIBUTED</div>
                <div class="stat-value">${(data.totalITNsDistributed || 0).toLocaleString()}</div>
                <div class="stat-sublabel">Nets given to students</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">ITN COVERAGE RATE</div>
                <div class="stat-value">${data.coverageRate || 0}%</div>
                <div class="stat-sublabel">ITNs distributed / eligible students</div>
            </div>
        </div>

        <!-- SCHOOL TYPE DISTRIBUTION -->
        <div class="chart-container">
            <div class="chart-title">🏫 SCHOOL TYPE DISTRIBUTION</div>
            <canvas id="schoolTypeChart" class="chart-canvas"></canvas>
        </div>

        <!-- REGIONAL DISTRIBUTION -->
        <div class="chart-container">
            <div class="chart-title">🗺️ REGIONAL DISTRIBUTION OF SCHOOLS</div>
            <canvas id="regionalChart" class="chart-canvas"></canvas>
        </div>

        <!-- DISTRICT DISTRIBUTION -->
        <div class="chart-container">
            <div class="chart-title">📍 DISTRICT DISTRIBUTION</div>
            <canvas id="districtChart" class="chart-canvas"></canvas>
        </div>

        <!-- GENDER DISTRIBUTION OF STUDENTS -->
        <div class="chart-container">
            <div class="chart-title">👥 STUDENT ENROLLMENT BY GENDER</div>
            <canvas id="genderChart" class="chart-canvas"></canvas>
        </div>

        <!-- ITN DISTRIBUTION BY GENDER -->
        <div class="chart-container">
            <div class="chart-title">🛏️ ITN DISTRIBUTION BY GENDER</div>
            <canvas id="itnGenderChart" class="chart-canvas"></canvas>
        </div>

        <!-- ITN SOURCE -->
        <div class="chart-container">
            <div class="chart-title">📦 SOURCE OF ITNs</div>
            <canvas id="itnSourceChart" class="chart-canvas"></canvas>
        </div>

        <!-- ITN BRAND -->
        <div class="chart-container">
            <div class="chart-title">🏷️ ITN BRAND/TYPE DISTRIBUTED</div>
            <canvas id="itnBrandChart" class="chart-canvas"></canvas>
        </div>

        <!-- SCHOOL OWNERSHIP -->
        <div class="chart-container">
            <div class="chart-title">🏛️ SCHOOL OWNERSHIP TYPE</div>
            <canvas id="ownershipChart" class="chart-canvas"></canvas>
        </div>

        <!-- DISTRIBUTION METHOD -->
        <div class="chart-container">
            <div class="chart-title">📋 DISTRIBUTION METHOD USED</div>
            <canvas id="distributionMethodChart" class="chart-canvas"></canvas>
        </div>

        <!-- HEALTH EDUCATION -->
        <div class="chart-container">
            <div class="chart-title">📚 HEALTH EDUCATION PROVIDED</div>
            <canvas id="healthEducationChart" class="chart-canvas"></canvas>
        </div>

        <!-- SUFFICIENT ITNs -->
        <div class="chart-container">
            <div class="chart-title">✅ SUFFICIENCY OF ITN SUPPLY</div>
            <canvas id="sufficiencyChart" class="chart-canvas"></canvas>
        </div>

        <!-- CHALLENGES -->
        <div class="chart-container">
            <div class="chart-title">🚧 DISTRIBUTION CHALLENGES ENCOUNTERED</div>
            <canvas id="challengesChart" class="chart-canvas"></canvas>
        </div>

        <!-- CONDITION OF ITNs -->
        <div class="chart-container">
            <div class="chart-title">📊 CONDITION OF ITNs RECEIVED</div>
            <canvas id="conditionChart" class="chart-canvas"></canvas>
        </div>

        <!-- PREVIOUS DISTRIBUTION -->
        <div class="chart-container">
            <div class="chart-title">🔄 PREVIOUS SCHOOL ITN DISTRIBUTION</div>
            <canvas id="previousDistChart" class="chart-canvas"></canvas>
        </div>

        <!-- OVERALL RATING -->
        <div class="chart-container">
            <div class="chart-title">⭐ OVERALL DISTRIBUTION PROCESS RATING</div>
            <canvas id="ratingChart" class="chart-canvas"></canvas>
        </div>

        <!-- COMPREHENSIVE ITN OVERVIEW -->
        <div class="chart-container">
            <div class="chart-title">📊 COMPREHENSIVE ITN DISTRIBUTION OVERVIEW</div>
            <canvas id="comprehensiveChart" class="chart-canvas"></canvas>
        </div>
    `;

    body.innerHTML = html;

    setTimeout(() => {
        if (data.schoolTypes) renderBarChart('schoolTypeChart', data.schoolTypes, '#004080', 'Number of Schools');
        if (data.regions) renderDoughnutChart('regionalChart', data.regions);
        if (data.districts) renderHorizontalBarChart('districtChart', data.districts, '#17a2b8');
        if (data.totalMaleStudents !== undefined) renderPieChart('genderChart', { 'Male Students': data.totalMaleStudents, 'Female Students': data.totalFemaleStudents });
        if (data.itnsMale !== undefined) renderPieChart('itnGenderChart', { 'ITNs to Males': data.itnsMale, 'ITNs to Females': data.itnsFemale });
        if (data.itnSource) renderDoughnutChart('itnSourceChart', data.itnSource);
        if (data.itnBrand) renderBarChart('itnBrandChart', data.itnBrand, '#28a745', 'Number of Schools');
        if (data.schoolOwnership) renderDoughnutChart('ownershipChart', data.schoolOwnership);
        if (data.distributionMethod) renderHorizontalBarChart('distributionMethodChart', data.distributionMethod, '#ffc107');
        if (data.healthEducation) renderPieChart('healthEducationChart', data.healthEducation);
        if (data.sufficientITNs) renderPieChart('sufficiencyChart', data.sufficientITNs);
        if (data.challenges) renderHorizontalBarChart('challengesChart', data.challenges, '#dc3545');
        if (data.itnCondition) renderBarChart('conditionChart', data.itnCondition, '#17a2b8', 'Number of Schools');
        if (data.previousDistribution) renderDoughnutChart('previousDistChart', data.previousDistribution);
        if (data.overallRating) renderPolarChart('ratingChart', data.overallRating);
        if (data.totalEnrollment !== undefined) {
            renderComprehensiveChart(data);
        }
    }, 100);
}

// Generic chart rendering functions
function renderBarChart(canvasId, chartData, color, label) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(chartData),
            datasets: [{ label: label, data: Object.values(chartData), backgroundColor: color, borderColor: color, borderWidth: 1 }]
        },
        options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
    });
}

function renderHorizontalBarChart(canvasId, chartData, color) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(chartData),
            datasets: [{ label: 'Count', data: Object.values(chartData), backgroundColor: color, borderColor: color, borderWidth: 1 }]
        },
        options: { responsive: true, maintainAspectRatio: true, indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true, ticks: { stepSize: 1 } } } }
    });
}

function renderPieChart(canvasId, chartData) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(chartData),
            datasets: [{ data: Object.values(chartData), backgroundColor: ['#004080', '#dc3545', '#28a745', '#ffc107', '#17a2b8', '#6f42c1'], borderWidth: 2, borderColor: '#ffffff' }]
        },
        options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'bottom' } } }
    });
}

function renderDoughnutChart(canvasId, chartData) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(chartData),
            datasets: [{ data: Object.values(chartData), backgroundColor: ['#004080', '#0056b3', '#17a2b8', '#28a745', '#ffc107', '#dc3545', '#6f42c1'], borderWidth: 2, borderColor: '#ffffff' }]
        },
        options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'right' } } }
    });
}

function renderPolarChart(canvasId, chartData) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: Object.keys(chartData),
            datasets: [{ data: Object.values(chartData), backgroundColor: ['#28a745', '#5cb85c', '#ffc107', '#fd7e14', '#dc3545'], borderWidth: 2, borderColor: '#ffffff' }]
        },
        options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'right' } } }
    });
}

function renderComprehensiveChart(data) {
    const ctx = document.getElementById('comprehensiveChart');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Total Enrolled', 'Eligible', 'Present on Day', 'ITNs Received', 'ITNs Distributed', 'ITNs Remaining'],
            datasets: [{
                label: 'Count',
                data: [
                    data.totalEnrollment || 0,
                    data.totalEligible || 0,
                    data.totalPresent || 0,
                    data.totalITNsReceived || 0,
                    data.totalITNsDistributed || 0,
                    data.totalITNsRemaining || 0
                ],
                backgroundColor: ['#004080', '#0056b3', '#17a2b8', '#28a745', '#ffc107', '#dc3545'],
                borderWidth: 1
            }]
        },
        options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
    });
}

// Close modals when clicking outside
document.getElementById('draftsModal').addEventListener('click', function(e) { if (e.target === this) closeDraftsModal(); });
document.getElementById('draftNameModal').addEventListener('click', function(e) { if (e.target === this) cancelDraftName(); });
document.getElementById('analysisModal').addEventListener('click', function(e) { if (e.target === this) closeAnalysisModal(); });

// Initialize on load
init();
