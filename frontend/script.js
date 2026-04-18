// script.js

// Constants and Variables
const templateSelector = document.getElementById('template-selector');
const yamlInput = document.getElementById('yaml-input');
const previewArea = document.getElementById('preview-area');
const pdfDownloadButton = document.getElementById('pdf-download-button');
const statusMessage = document.getElementById('status-message');

// Function to load templates
function loadTemplates() {
    // Load template options (this is just a placeholder)
    const templates = ['Template 1', 'Template 2'];
    templates.forEach(template => {
        const option = document.createElement('option');
        option.value = template;
        option.textContent = template;
        templateSelector.appendChild(option);
    });
}

// Function to validate YAML
function validateYAML(yaml) {
    try {
        jsyaml.load(yaml); // using jsyaml library for YAML validation
        return true;
    } catch (e) {
        return false;
    }
}

// Function to render PDF
function renderPDF(content) {
    const pdf = new jsPDF();
    pdf.text(content, 10, 10);
    return pdf;
}

// Handle PDF download
function downloadPDF(pdf) {
    pdf.save('cv.pdf');
    statusMessage.textContent = 'PDF Downloaded';
}

// Update the preview display
function updatePreview(yaml) {
    const valid = validateYAML(yaml);
    if (!valid) {
        statusMessage.textContent = 'Invalid YAML format!';
        return;
    }
    const parsedData = jsyaml.load(yaml);
    previewArea.textContent = JSON.stringify(parsedData, null, 2); // Render preview as JSON
    statusMessage.textContent = 'Preview updated';
}

// Event listeners
templateSelector.addEventListener('change', () => {
    // Load selected template (placeholder)
    statusMessage.textContent = `Loaded ${templateSelector.value}`;
});

yamlInput.addEventListener('input', () => {
    updatePreview(yamlInput.value);
});

pdfDownloadButton.addEventListener('click', () => {
    const pdf = renderPDF(previewArea.textContent);
    downloadPDF(pdf);
});

// Initial load
loadTemplates();
