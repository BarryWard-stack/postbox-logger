// © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.
// Author: Barry Ward
// License: Proprietary – Not for redistribution without written consent.

/*
 * Postcard Engine - Digital Collectible Module
 * Version: 1.0.0
 * Date: 17-02-2026
 * 
 * Creates vintage-style digital postcards featuring logged postboxes
 * with handwritten message styling and authentic postmark cancellations.
 */

const { useState, useRef, useEffect } = React;

// --- POSTCARD CANVAS COMPONENT ---
const PostcardCanvas = ({ postbox, onClose, onExport }) => {
  const canvasRef = useRef(null);
  const [message, setMessage] = useState('Greetings from my postbox hunt!');
  const [recipientName, setRecipientName] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  // Load Google Font for handwriting
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Draw postcard on canvas
  useEffect(() => {
    if (!canvasRef.current || !postbox) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size (standard postcard ratio 3:2)
    const width = 1200;
    const height = 800;
    canvas.width = width;
    canvas.height = height;

    // Draw background - cream/sepia
    ctx.fillStyle = '#FDFBF7';
    ctx.fillRect(0, 0, width, height);

    // Add subtle texture overlay
    ctx.fillStyle = 'rgba(139, 69, 19, 0.02)';
    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      ctx.fillRect(x, y, 1, 1);
    }

    // Draw border
    ctx.strokeStyle = '#D4C5B9';
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, width - 40, height - 40);

    // --- LEFT SIDE: Message Area ---
    const safeZone = 40; // 20px padding + 20px border
    const leftWidth = width * 0.55;

    // Draw message text (handwriting style)
    ctx.font = '32px "Pinyon Script", cursive';
    ctx.fillStyle = '#2C1810';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    // Word wrap the message
    const maxWidth = leftWidth - safeZone * 2;
    const lineHeight = 45;
    const words = message.split(' ');
    let line = '';
    let y = safeZone + 60;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line, safeZone + 20, y);
        line = words[i] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, safeZone + 20, y);

    // Add recipient name if provided
    if (recipientName) {
      ctx.font = '28px "Pinyon Script", cursive';
      ctx.fillText(`To: ${recipientName}`, safeZone + 20, safeZone + 20);
    }

    // --- RIGHT SIDE: Stamp Box Area ---
    const rightX = leftWidth + 40;
    const stampBoxSize = 200;
    const stampBoxX = width - stampBoxSize - safeZone - 20;
    const stampBoxY = safeZone + 20;

    // Draw postmark cancellation (wavy lines)
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 2;
    
    // Outer circle
    ctx.beginPath();
    ctx.arc(stampBoxX + stampBoxSize / 2, stampBoxY + stampBoxSize / 2, stampBoxSize / 2 - 10, 0, Math.PI * 2);
    ctx.stroke();

    // Wavy cancellation lines
    const centerX = stampBoxX + stampBoxSize / 2;
    const centerY = stampBoxY + stampBoxSize / 2;
    
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      const startAngle = (i * Math.PI) / 3;
      const endAngle = startAngle + Math.PI / 3;
      const radius = stampBoxSize / 2 - 25;
      
      for (let angle = startAngle; angle < endAngle; angle += 0.1) {
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        if (angle === startAngle) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }

    // Draw postmark text
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = '#8B4513';
    ctx.textAlign = 'center';
    
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
    
    ctx.fillText('HERITAGE POSTBOX', centerX, centerY - 70);
    ctx.fillText(dateStr, centerX, centerY + 70);

    // Load and draw heritage postmark stamp background
    const postmarkStamp = new Image();
    postmarkStamp.crossOrigin = 'anonymous';
    postmarkStamp.onload = () => {
      ctx.save();
      ctx.globalAlpha = 0.75;
      ctx.globalCompositeOperation = 'multiply';
      ctx.drawImage(postmarkStamp, stampBoxX, stampBoxY, stampBoxSize, stampBoxSize);
      ctx.restore();
    };
    postmarkStamp.onerror = () => {
      // Fallback: Draw programmatic texture if heritage stamp is missing
      ctx.save();
      ctx.fillStyle = 'rgba(139, 69, 19, 0.1)';
      ctx.fillRect(stampBoxX, stampBoxY, stampBoxSize, stampBoxSize);
      
      // Add texture noise
      for (let i = 0; i < 300; i++) {
        const x = stampBoxX + Math.random() * stampBoxSize;
        const y = stampBoxY + Math.random() * stampBoxSize;
        ctx.fillStyle = 'rgba(139, 69, 19, 0.05)';
        ctx.fillRect(x, y, 2, 2);
      }
      ctx.restore();
    };
    postmarkStamp.src = 'assets/icons/heritage_postmark_stamp_1.png';

    // Load and draw postbox image inside stamp area
    const rarityInfo = getRarityInfo(postbox.type);
    if (rarityInfo && rarityInfo.asset) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        // Draw image centered in stamp box with padding
        const imgSize = stampBoxSize - 60;
        const imgX = stampBoxX + (stampBoxSize - imgSize) / 2;
        const imgY = stampBoxY + (stampBoxSize - imgSize) / 2;
        
        ctx.save();
        ctx.globalAlpha = 0.9;
        ctx.drawImage(img, imgX, imgY, imgSize, imgSize);
        ctx.restore();
      };
      img.src = rarityInfo.asset;
    }

    // Draw address lines (right side, below stamp)
    ctx.font = '20px "Courier New", monospace';
    ctx.fillStyle = '#2C1810';
    ctx.textAlign = 'left';
    
    const addressY = stampBoxY + stampBoxSize + 40;
    const addressX = rightX;
    
    ctx.fillText('Found at:', addressX, addressY);
    
    // Postbox details
    ctx.font = '18px "Courier New", monospace';
    ctx.fillText(postbox.type || 'Heritage Postbox', addressX, addressY + 30);
    
    if (postbox.postcode) {
      ctx.fillText(postbox.postcode, addressX, addressY + 55);
    }
    
    if (postbox.postboxCode) {
      ctx.fillText(`Box: ${postbox.postboxCode}`, addressX, addressY + 80);
    }

    // Rarity badge
    const badge = rarityInfo.label;
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = rarityInfo.color;
    ctx.fillText(badge, addressX, addressY + 110);

    // Footer - copyright
    ctx.font = '12px Arial';
    ctx.fillStyle = '#999';
    ctx.textAlign = 'center';
    ctx.fillText('© 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.', width / 2, height - 30);

  }, [postbox, message, recipientName]);

  // Export postcard as image
  const handleExport = () => {
    if (!canvasRef.current) return;
    
    setIsExporting(true);
    
    canvasRef.current.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const filename = `postcard-${postbox.type.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${Date.now()}.png`;
      link.download = filename;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      
      setIsExporting(false);
      
      if (onExport) {
        onExport(filename);
      }
    }, 'image/png');
  };

  // Modal overlay styles
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    padding: '20px',
    overflowY: 'auto'
  };

  const modalStyle = {
    background: 'white',
    borderRadius: '12px',
    padding: '30px',
    maxWidth: '1000px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
  };

  const canvasContainerStyle = {
    border: '2px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '20px',
    background: '#f5f5f5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px'
  };

  const canvasDisplayStyle = {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '2px solid #ddd',
    borderRadius: '6px',
    fontSize: '16px',
    fontFamily: '"Pinyon Script", cursive',
    marginBottom: '15px',
    boxSizing: 'border-box'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '120px',
    resize: 'vertical',
    lineHeight: '1.6'
  };

  const buttonStyle = {
    padding: '12px 24px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginRight: '10px',
    transition: 'all 0.2s'
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: '#DC2626',
    color: 'white'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    background: '#6b7280',
    color: 'white'
  };

  return React.createElement('div', { style: overlayStyle, onClick: onClose },
    React.createElement('div', { style: modalStyle, onClick: (e) => e.stopPropagation() },
      React.createElement('h2', { style: { marginTop: 0, marginBottom: '20px', color: '#2C1810' } }, 
        '📮 Create Digital Postcard'
      ),
      
      // Canvas preview
      React.createElement('div', { style: canvasContainerStyle },
        React.createElement('canvas', { 
          ref: canvasRef,
          style: canvasDisplayStyle
        })
      ),

      // Message input
      React.createElement('div', { style: { marginBottom: '20px' } },
        React.createElement('label', { 
          style: { display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2C1810' } 
        }, 'Your Message:'),
        React.createElement('textarea', {
          value: message,
          onChange: (e) => setMessage(e.target.value),
          placeholder: 'Write your postcard message here...',
          style: textareaStyle,
          maxLength: 200
        }),
        React.createElement('div', { 
          style: { fontSize: '12px', color: '#666', textAlign: 'right' } 
        }, `${message.length}/200 characters`)
      ),

      // Recipient name input
      React.createElement('div', { style: { marginBottom: '20px' } },
        React.createElement('label', { 
          style: { display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2C1810' } 
        }, 'To (optional):'),
        React.createElement('input', {
          type: 'text',
          value: recipientName,
          onChange: (e) => setRecipientName(e.target.value),
          placeholder: 'Recipient name',
          style: inputStyle,
          maxLength: 50
        })
      ),

      // Action buttons
      React.createElement('div', { style: { display: 'flex', justifyContent: 'flex-end', marginTop: '20px' } },
        React.createElement('button', {
          onClick: onClose,
          style: secondaryButtonStyle
        }, 'Cancel'),
        React.createElement('button', {
          onClick: handleExport,
          disabled: isExporting,
          style: {
            ...primaryButtonStyle,
            opacity: isExporting ? 0.6 : 1,
            cursor: isExporting ? 'not-allowed' : 'pointer'
          }
        }, isExporting ? 'Exporting...' : '💾 Download Postcard')
      ),

      // Info text
      React.createElement('p', { 
        style: { 
          marginTop: '15px', 
          fontSize: '12px', 
          color: '#666', 
          textAlign: 'center' 
        } 
      }, 'Your postcard will be saved as a high-quality PNG image (1200x800px)')
    )
  );
};

// Make PostcardCanvas available globally
window.PostcardCanvas = PostcardCanvas;

console.log('✅ Postcard Engine loaded successfully');
