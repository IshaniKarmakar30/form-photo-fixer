const presets = {
  upsc: { width: 350, height: 450, maxKB: 50 },  // 3.5 x 4.5 ratio
  ssc:  { width: 350, height: 450, maxKB: 20 },
  bank: { width: 450, height: 350, maxKB: 50 },
  custom: { width: 350, height: 450, maxKB: 50 }
};

const imageInput = document.getElementById('imageInput');
const presetSelect = document.getElementById('presetSelect');
const customSettings = document.getElementById('customSettings');
const processBtn = document.getElementById('processBtn');
const downloadBtn = document.getElementById('downloadBtn');
const canvas = document.getElementById('cropCanvas');
const ctx = canvas.getContext('2d');
const faceGuide = document.getElementById('faceGuide');
const statusBox = document.getElementById('statusBox');
const sizeStatus = document.getElementById('sizeStatus');
const dimensionStatus = document.getElementById('dimensionStatus');

let loadedImage = null;
let finalBlobUrl = null;

// Preset change handler
presetSelect.addEventListener('change', (e) => {
  if (e.target.value === 'custom') {
    customSettings.classList.remove('hidden');
  } else {
    customSettings.classList.add('hidden');
  }
});

// Image loader
imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      loadedImage = img;
      renderBaseImage(img);
      processBtn.disabled = false;
      downloadBtn.classList.add('hidden');
      statusBox.classList.add('hidden');
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

// Render base image to preview
function renderBaseImage(img) {
  const maxWidth = 350;
  const scale = Math.min(1, maxWidth / img.width);
  canvas.width = img.width * scale;
  canvas.height = img.height * scale;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

// Processing & Compression logic
processBtn.addEventListener('click', async () => {
  if (!loadedImage) return;

  let targetW, targetH, targetKB;
  const selectedKey = presetSelect.value;

  if (selectedKey === 'custom') {
    targetW = parseInt(document.getElementById('customW').value) || 350;
    targetH = parseInt(document.getElementById('customH').value) || 450;
    targetKB = parseInt(document.getElementById('customKB').value) || 50;
  } else {
    const p = presets[selectedKey];
    targetW = p.width;
    targetH = p.height;
    targetKB = p.maxKB;
  }

  // Offscreen canvas e resize & crop
  const offCanvas = document.createElement('canvas');
  offCanvas.width = targetW;
  offCanvas.height = targetH;
  const offCtx = offCanvas.getContext('2d');

  // Center-crop image
  const imgRatio = loadedImage.width / loadedImage.height;
  const targetRatio = targetW / targetH;
  let sWidth, sHeight, sx, sy;

  if (imgRatio > targetRatio) {
    sHeight = loadedImage.height;
    sWidth = sHeight * targetRatio;
    sx = (loadedImage.width - sWidth) / 2;
    sy = 0;
  } else {
    sWidth = loadedImage.width;
    sHeight = sWidth / targetRatio;
    sx = 0;
    sy = (loadedImage.height - sHeight) / 2;
  }

  offCtx.drawImage(loadedImage, sx, sy, sWidth, sHeight, 0, 0, targetW, targetH);

  // Iterative compression (quality step by step komanor logic)
  let quality = 0.95;
  let blob = null;

  while (quality > 0.05) {
    blob = await new Promise((resolve) => offCanvas.toBlob(resolve, 'image/jpeg', quality));
    if (blob.size / 1024 <= targetKB) break;
    quality -= 0.05;
  }

  // Result display
  const resultKB = (blob.size / 1024).toFixed(1);
  sizeStatus.textContent = `File size: ${resultKB} KB of ${targetKB} KB limit`;
  dimensionStatus.textContent = `Dimensions: ${targetW} x ${targetH} px`;
  statusBox.classList.remove('hidden');

  // Preview canvas update
  canvas.width = targetW;
  canvas.height = targetH;
  ctx.drawImage(offCanvas, 0, 0);

  // Setup download
  if (finalBlobUrl) URL.revokeObjectURL(finalBlobUrl);
  finalBlobUrl = URL.createObjectURL(blob);

  downloadBtn.onclick = () => {
    const a = document.createElement('a');
    a.href = finalBlobUrl;
    a.download = `form-image-${targetKB}kb.jpg`;
    a.click();
  };
  downloadBtn.classList.remove('hidden');
});