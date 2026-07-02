// Dr. Life Learning Hub - JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
  // Initialize upload buttons
  initializeUploadButtons();
  
  // Add smooth scrolling
  initializeSmoothScrolling();
  
  // Add block click interactions
  initializeBlockInteractions();
});

// Initialize upload button functionality
function initializeUploadButtons() {
  const uploadBtns = document.querySelectorAll('.upload-btn');
  uploadBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const block = this.closest('.block');
      const blockId = block.getAttribute('data-block');
      handleUpload(blockId);
    });
  });
}

// Handle file upload for a specific block
function handleUpload(blockId) {
  // Create a hidden file input
  const input = document.createElement('input');
  input.type = 'file';
  input.multiple = true;
  input.accept = '.pdf,.doc,.docx,.txt,.pptx,.xlsx,.jpg,.png,.gif';
  
  input.addEventListener('change', function(e) {
    const files = e.target.files;
    if (files.length > 0) {
      const fileNames = Array.from(files).map(f => f.name).join(', ');
      console.log(`Files uploaded to Block ${blockId}:`, fileNames);
      alert(`Successfully uploaded ${files.length} file(s) to Block ${blockId}`);
    }
  });
  
  input.click();
}

// Initialize smooth scrolling for navigation
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Initialize block interaction effects
function initializeBlockInteractions() {
  const blocks = document.querySelectorAll('.block');
  blocks.forEach(block => {
    block.addEventListener('click', function() {
      const blockId = this.getAttribute('data-block');
      // Optional: Add additional interactivity here
      console.log(`Block ${blockId} clicked`);
    });
  });
}

// Utility function to get all uploaded documents for a block
function getBlockDocuments(blockId) {
  // This would be connected to a backend in a real implementation
  const storedDocs = localStorage.getItem(`block_${blockId}_docs`);
  return storedDocs ? JSON.parse(storedDocs) : [];
}

// Utility function to save documents for a block
function saveBlockDocuments(blockId, documents) {
  localStorage.setItem(`block_${blockId}_docs`, JSON.stringify(documents));
}

// Export functions for potential API integration
window.DrLife = {
  uploadToBlock: handleUpload,
  getBlockDocuments: getBlockDocuments,
  saveBlockDocuments: saveBlockDocuments
};
