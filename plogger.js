// © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.
// Author: Barry Ward
// License: Proprietary – Not for redistribution without written consent.

/*
 * Script: UK Postbox Logger (plogger.js)
 * Version: 0.7.1
 * Date: 28-10-2025
 * Author: Barry Ward (with AI assistance)
 *
 * Changelog:
 * v.0.7.1 - 28-10-2025
 * - Implemented rarity-based icons for user-logged postboxes (Default, Rare, Legendary).
 * - Fixed bug where user markers were not cleared on map re-render.
 * - Added missing components (PostSaveModal, PostboxList, PlayerStats) to fix page load error.
 *
 * v.0.7.0 - 22-08-2025
 * - Re-instated dynamic Overpass API fetching for live data.
 * - Integrated the more accurate LBSG rarity and classification model.
 *
 * v.0.6.0 - 22-08-2025
 * - RETHINK: Aligned data structure and rarity with Letter Box Study Group (LBSG) classifications.
 *
 * v.0.5.0 - 22-08-2025
 * - Implemented dynamic data fetching based on the current map view from Overpass API.
 */

const { useState, useEffect, useRef, useCallback } = React;

// --- UTILITY FUNCTIONS (LBSG Aligned) ---
const getRarityInfo = (type) => {
  const rarityMap = {
    'Pillar Box: Penfold Hexagonal (1866-1879)': { level: 10, label: 'LBSG MUSEUM PIECE', color: '#a855f7', points: 200 },
    'Pillar Box: First National Standard (1859)': { level: 9, label: 'LBSG HISTORIC', color: '#dc2626', points: 120 },
    'Pillar Box: Victorian Cipher (VR)': { level: 8, label: 'LBSG RARE VICTORIAN', color: '#f97316', points: 90 },
    'Pillar Box: Edward VII Cipher (EVIIR)': { level: 7, label: 'LBSG EDWARDIAN', color: '#f59e0b', points: 75 },
    'Wall Box: First Type (1857)': { level: 8, label: 'LBSG EARLY WALL BOX', color: '#84cc16', points: 85 },
    'Wall Box: Large Type': { level: 4, label: 'LBSG COMMON WALL BOX', color: '#22c55e', points: 15 },
    'Ludlow Box: Standard': { level: 7, label: 'LBSG LUDLOW FIND', color: '#10b981', points: 60 },
    'Lamp Box: Standard Oval': { level: 3, label: 'LBSG COMMON LAMP BOX', color: '#06b6d4', points: 10 },
    'Modern: Elizabeth II Cipher (EIIR)': { level: 2, label: 'COMMON', color: '#059669', points: 5 },
    'Modern: Charles III Cipher (CIIIR)': { level: 9, label: 'NEW ERA - RARE', color: '#4f46e5', points: 80 },
    'Special: Olympic Gold (2012)': { level: 8, label: 'SPECIAL EDITION', color: '#d97706', points: 50 },
  };
  return rarityMap[type] || { level: 1, label: 'STANDARD', color: '#6b7280', points: 2 };
};

const getPlayerLevel = (totalPoints) => {
  if (totalPoints >= 1000) return { level: 5, title: 'LBSG Collaborator', icon: '👑' };
  if (totalPoints >= 500) return { level: 4, title: 'Master Postbox Hunter', icon: '🏆' };
  if (totalPoints >= 200) return { level: 3, title: 'Seasoned Explorer', icon: '🎖️' };
  if (totalPoints >= 50) return { level: 2, title: 'Postbox Detective', icon: '🔍' };
  return { level: 1, title: 'Rookie Spotter', icon: '🚀' };
};

const getRegionalBonus = (lat, lng) => {
    const dataGaps = [
      { name: 'Wales', minLat: 51.3, maxLat: 53.5, minLng: -5.5, maxLng: -2.5, bonus: 50 },
      { name: 'SW Peninsula', minLat: 49.9, maxLat: 51.5, minLng: -6.5, maxLng: -2.5, bonus: 50 },
      { name: 'Lincolnshire', minLat: 52.7, maxLat: 53.8, minLng: -1.0, maxLng: 0.5, bonus: 50 },
      { name: 'Scottish Highlands', minLat: 56.5, maxLat: 59.0, minLng: -6.0, maxLng: -2.0, bonus: 25 }
    ];
    for (const gap of dataGaps) {
      if (lat >= gap.minLat && lat <= gap.maxLat && lng >= gap.minLng && lng <= gap.maxLng) {
        return { region: gap.name, bonus: gap.bonus };
      }
    }
    return null;
};

// --- CHILD COMPONENTS ---

const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  return React.createElement('div', {
    style: { position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', background: toast.type === 'achievement' ? '#ca8a04' : '#059669', color: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 2000, maxWidth: '90%', textAlign: 'center' }
  },
    React.createElement('div', { style: { fontWeight: 'bold' } }, toast.title),
    React.createElement('div', { style: { fontSize: '14px', opacity: 0.9 } }, toast.message)
  );
};

const MapView = ({ userPostboxes, officialPostboxes, userLocation, onMapClick, onMapViewChange }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const officialMarkersRef = useRef([]);
  const userMarkersRef = useRef([]); // Added this to track user markers

  // --- NEW: Define User Icons ---
  const userIconDefault = new window.L.Icon({ iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] });
  const userIconRare = new window.L.Icon({ iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] });
  const userIconLegendary = new window.L.Icon({ iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] });
  const greyIcon = new window.L.Icon({ iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] });
  // ---

  useEffect(() => {
    if (userLocation && mapRef.current && !mapInstanceRef.current) {
      const map = window.L.map(mapRef.current).setView([userLocation.lat, userLocation.lng], 16);
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
      
      const userIcon = window.L.divIcon({ html: '<div style="background:#4285f4;width:12px;height:12px;border-radius:50%;border:2px solid white;"></div>' });
      window.L.marker([userLocation.lat, userLocation.lng], { icon: userIcon }).addTo(map).bindPopup('Your Location');
      
      map.on('click', (e) => onMapClick(e.latlng));

      let moveTimeout;
      map.on('moveend', () => {
          clearTimeout(moveTimeout);
          moveTimeout = setTimeout(() => onMapViewChange(map.getBounds()), 500);
      });

      mapInstanceRef.current = map;
      onMapViewChange(map.getBounds());
    }
  }, [userLocation, onMapClick, onMapViewChange]);
  
  useEffect(() => {
    if (mapInstanceRef.current) {
        // --- MODIFICATION: Clear both official and user markers ---
        officialMarkersRef.current.forEach(marker => marker.remove());
        officialMarkersRef.current = [];
        
        userMarkersRef.current.forEach(marker => marker.remove()); // This clears old user markers
        userMarkersRef.current = [];
        // ---

        // Draw Official Markers
        if (Array.isArray(officialPostboxes)) {
            officialPostboxes.forEach(p => {
                const marker = window.L.marker([p.lat, p.lon], { icon: greyIcon }).addTo(mapInstanceRef.current).bindPopup(`Existing Postbox<br><small>${p.tags.ref || ''}</small>`);
                officialMarkersRef.current.push(marker);
            });
        }
        
        // --- MODIFICATION: Draw User Markers with Rarity ---
        userPostboxes.forEach(p => {
            const rarity = getRarityInfo(p.type); // getRarityInfo() is available from the top of the file
            let icon = userIconDefault;
            if (rarity.level >= 10) icon = userIconLegendary;
            else if (rarity.level >= 8) icon = userIconRare;

            const marker = window.L.marker([p.lat, p.lng], { icon: icon })
                .addTo(mapInstanceRef.current)
                .bindPopup(`<b>My Find:</b> ${p.type || 'Postbox'}`);
            
            userMarkersRef.current.push(marker); // Track the new user marker
        });
        // ---
    }
  }, [officialPostboxes, userPostboxes]);

  return React.createElement('div', { ref: mapRef, style: { width: '100%', height: '100%' } });
};

const PostboxForm = ({ postbox, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ photos: [], postboxCode: '', postcode: '', ...postbox });
  const fileInputRef = useRef(null);

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  
  const handlePhotoCapture = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto = { data: e.target.result, name: file.name };
        setFormData(prev => ({ ...prev, photos: [...(prev.photos || []), newPhoto] }));
      };
      reader.readAsDataURL(file);
    });
  };
  
  const removePhoto = (index) => {
      setFormData(prev => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }));
  };

  const postboxTypes = [
      'Pillar Box: Penfold Hexagonal (1866-1879)', 'Pillar Box: First National Standard (1859)', 'Pillar Box: Victorian Cipher (VR)', 'Pillar Box: Edward VII Cipher (EVIIR)',
      'Wall Box: First Type (1857)', 'Wall Box: Large Type',
      'Ludlow Box: Standard',
      'Lamp Box: Standard Oval',
      'Modern: Elizabeth II Cipher (EIIR)', 'Modern: Charles III Cipher (CIIIR)',
      'Special: Olympic Gold (2012)'
  ];
  const conditions = ['Excellent', 'Good', 'Fair', 'Poor', 'Derelict', 'Needs Maintenance'];

  return React.createElement('div', { style: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '10px' } },
    React.createElement('div', { style: { background: 'white', padding: '20px', borderRadius: '8px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' } },
      React.createElement('h2', { style: { marginTop: 0 } }, postbox.id ? 'Edit Postbox' : 'Add New Postbox'),
      
      React.createElement('div', { style: { display: 'grid', gap: '15px' } },
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' } },
          React.createElement('div', null,
            React.createElement('label', { style: { fontSize: '14px', display: 'block' } }, 'Latitude'),
            React.createElement('input', { type: 'number', step: 'any', value: formData.lat, onChange: e => updateField('lat', parseFloat(e.target.value)), style: {width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'} })
          ),
          React.createElement('div', null,
            React.createElement('label', { style: { fontSize: '14px', display: 'block' } }, 'Longitude'),
            React.createElement('input', { type: 'number', step: 'any', value: formData.lng, onChange: e => updateField('lng', parseFloat(e.target.value)), style: {width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'} })
          )
        ),
         React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' } },
          React.createElement('div', null,
            React.createElement('label', { style: { fontSize: '14px', display: 'block' } }, 'Postbox Number'),
            React.createElement('input', { type: 'text', placeholder: 'e.g. AB1 23', value: formData.postboxCode, onChange: e => updateField('postboxCode', e.target.value), style: {width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'} })
          ),
          React.createElement('div', null,
            React.createElement('label', { style: { fontSize: '14px', display: 'block' } }, 'Postcode'),
            React.createElement('input', { type: 'text', placeholder: 'e.g. SW1A 0AA', value: formData.postcode, onChange: e => updateField('postcode', e.target.value), style: {width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'} })
          )
        ),
        React.createElement('div', null,
            React.createElement('label', { style: { fontSize: '14px', display: 'block' } }, 'Type'),
            React.createElement('select', { value: formData.type, onChange: e => updateField('type', e.target.value), style: {width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'} },
              React.createElement('option', { value: '' }, 'Select type...'),
              postboxTypes.map(type => React.createElement('option', { key: type, value: type }, type))
            )
        ),
        React.createElement('div', null,
            React.createElement('label', { style: { fontSize: '14px', display: 'block' } }, 'Condition'),
            React.createElement('select', { value: formData.condition, onChange: e => updateField('condition', e.target.value), style: {width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'} },
              React.createElement('option', { value: '' }, 'Select condition...'),
              conditions.map(c => React.createElement('option', { key: c, value: c }, c))
            )
        ),
        React.createElement('div', null,
            React.createElement('label', { style: { display: 'block', marginBottom: '5px', fontSize: '14px' } }, 'Photos'),
            React.createElement('button', { onClick: () => fileInputRef.current.click(), style: { background: '#2563eb', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', width: '100%' } }, '📷 Add Photos from Camera'),
            React.createElement('input', {
                ref: fileInputRef, type: 'file', accept: 'image/*', capture: 'environment', multiple: true, onChange: handlePhotoCapture, style: { display: 'none' }
            }),
            React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' } },
                (formData.photos || []).map((photo, index) =>
                    React.createElement('div', { key: index, style: { position: 'relative' } },
                        React.createElement('img', { src: photo.data, style: { width: '70px', height: '70px', objectFit: 'cover', borderRadius: '5px' } }),
                        React.createElement('button', { onClick: () => removePhoto(index), style: { position: 'absolute', top: '-5px', right: '-5px', background: 'red', color: 'white', border: '1px solid white', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' } }, '×')
                    )
                )
            )
        ),
        React.createElement('div', { style: { display: 'flex', gap: '10px', marginTop: '20px' } },
            React.createElement('button', { onClick: () => onSave(formData), style: { flex: 1, background: '#dc2626', color: 'white', border: 'none', padding: '12px', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' } }, 'Save Postbox'),
            React.createElement('button', { onClick: onCancel, style: { padding: '12px 20px', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' } }, 'Cancel')
        )
      )
    )
  );
};

// --- MAIN APP COMPONENT ---

const PostboxLogger = () => {
  const [userPostboxes, setUserPostboxes] = useState([]);
  const [officialPostboxes, setOfficialPostboxes] = useState([]);
  const [selectedPostbox, setSelectedPostbox] = useState(null);
  const [viewMode, setViewMode] = useState('map');
  const [userLocation, setUserLocation] = useState(null);
  const [toast, setToast] = useState(null);
  const [playerStats, setPlayerStats] = useState({ totalFinds: 0, rarityScore: 0, level: 1, achievements: [] });
  const [postSaveAction, setPostSaveAction] = useState(null);
  
  useEffect(() => {
    const savedUserPostboxes = localStorage.getItem('postboxes_data_full');
    if (savedUserPostboxes) setUserPostboxes(JSON.parse(savedUserPostboxes));
    const savedStats = localStorage.getItem('player_stats_full');
    if (savedStats) setPlayerStats(JSON.parse(savedStats));
  }, []);

  useEffect(() => {
    localStorage.setItem('postboxes_data_full', JSON.stringify(userPostboxes));
    localStorage.setItem('player_stats_full', JSON.stringify(playerStats));
  }, [userPostboxes, playerStats]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }),
      () => setUserLocation({ lat: 54.5, lng: -3.5, accuracy: null })
    );
  }, []);

  const fetchPostboxesForView = useCallback((bounds) => {
    const bbox = `${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}`;
    const overpassQuery = `[out:json];node["amenity"="post_box"](${bbox});out;`;
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
    
    fetch(overpassUrl)
        .then(response => response.json())
        .then(data => setOfficialPostboxes(data.elements))
        .catch(error => console.error("Error fetching Overpass data:", error));
  }, []);

  const showToast = (title, message, type = 'info') => setToast({ title, message, type });
  
  const checkAchievements = useCallback((newPostbox, allPostboxes, currentStats) => {
    const newAchievements = [];
    if (allPostboxes.length === 1 && !currentStats.achievements.find(a => a.id === 'first_find')) {
        newAchievements.push({ id: 'first_find', title: 'First Steps!', message: 'You logged your first postbox!'});
    }
    if (getRarityInfo(newPostbox.type).level >= 9 && !currentStats.achievements.find(a => a.id === 'rare_find')) {
        newAchievements.push({ id: 'rare_find', title: 'Treasure Hunter!', message: 'You found a very rare postbox!'});
    }
    return newAchievements;
  }, []);
  
  const handleMapClick = (latlng) => setSelectedPostbox({ lat: latlng.lat, lng: latlng.lng, photos: [] });
  
  const handleAddClick = () => {
      if (userLocation) {
          setSelectedPostbox({ lat: userLocation.lat, lng: userLocation.lng, photos: [] });
      } else {
          alert("Getting your location... please try again in a moment.");
      }
  };
  
  const deletePostbox = (id) => {
      if (confirm('Are you sure you want to delete this postbox?')) {
          setUserPostboxes(prev => prev.filter(p => p.id !== id));
          showToast('Postbox Deleted', 'The entry has been removed.');
      }
  };
  
  const savePostbox = (data) => {
      const isEditing = !!data.id;
      let updatedPostboxes;
      let finalPostbox = data;

      if (isEditing) {
          updatedPostboxes = userPostboxes.map(p => p.id === data.id ? data : p);
          showToast("Postbox Updated!", "Your changes have been saved.");
      } else {
          finalPostbox = { ...data, id: Date.now() };
          updatedPostboxes = [...userPostboxes, finalPostbox];
          
          const rarity = getRarityInfo(finalPostbox.type);
          const regionalBonus = getRegionalBonus(finalPostbox.lat, finalPostbox.lng);
          const pointsEarned = (rarity.points || 0) + (regionalBonus ? regionalBonus.bonus : 0);
          const newScore = playerStats.rarityScore + pointsEarned;
          
          const newAchievements = checkAchievements(finalPostbox, updatedPostboxes, playerStats);
          
          setPlayerStats(prev => ({
              totalFinds: prev.totalFinds + 1,
              rarityScore: newScore,
              level: getPlayerLevel(newScore).level,
              achievements: [...prev.achievements, ...newAchievements]
          }));
          
          showToast("Postbox Added!", `+${pointsEarned} points! ${regionalBonus ? `(+${regionalBonus.bonus} bonus for ${regionalBonus.region})` : ''}`);
          newAchievements.forEach((ach, index) => {
              setTimeout(() => showToast(`🎉 ${ach.title}`, ach.message, 'achievement'), (index + 1) * 1500);
          });
          
          setPostSaveAction(finalPostbox);
      }
      setUserPostboxes(updatedPostboxes);
      setSelectedPostbox(null);
  };
  
  const generateFacebookPost = (postbox) => {
    const rarity = getRarityInfo(postbox.type);
    const text = `🎯 POSTBOX SPOTTED! 🎯\n\n📮 ${postbox.type || 'Mystery Postbox'}\n📍 Postcode: ${postbox.postcode || 'N/A'}\n⭐ Rarity: ${rarity.label}\n\n#OldPostBoxesUK #PostboxHunting #RoyalMail`;
    return `https://www.facebook.com/groups/oldpostboxesuk/search/?q=${encodeURIComponent(text)}`;
  };
  
  const generateMaintenanceEmail = (postbox) => {
    const subject = `Postbox Maintenance Report: ${postbox.postboxCode || 'Unknown Number'} at ${postbox.postcode || 'Unknown Postcode'}`;
    const body = `Dear Royal Mail,\n\nI would like to report a postbox that requires maintenance attention.\n\nDETAILS:\n- Postbox Number: ${postbox.postboxCode || 'Not recorded'}\n- Postcode: ${postbox.postcode || 'Not recorded'}\n- GPS Coordinates: ${postbox.lat}, ${postbox.lng}\n- Reported Condition: ${postbox.condition}\n\nPhotographic evidence of the postbox's condition has been captured and can be provided upon request.\n\nThank you for your attention to our postal heritage.\n\n---\nSent via the UK Postbox Logger app`;
    return `mailto:postbox.appearance@royalmailpfs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const renderContent = () => {
      if (!userLocation) return React.createElement('div', { style: { display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' } }, 'Getting location...');
      
      switch (viewMode) {
          case 'map':
              return React.createElement(MapView, { userPostboxes, officialPostboxes, userLocation, onMapClick: handleMapClick, onMapViewChange: fetchPostboxesForView });
          case 'stats':
              return React.createElement(PlayerStats, { playerStats, userPostboxes });
          case 'list':
              return React.createElement(PostboxList, { postboxes: userPostboxes, onSelect: setSelectedPostbox, onDelete: deletePostbox, onShare: generateFacebookPost, onReport: generateMaintenanceEmail });
          default: return null;
      }
  };

  return React.createElement('div', { style: { height: '100vh', display: 'flex', flexDirection: 'column' } },
    React.createElement('header', { style: { background: '#991b1b', color: 'white', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' } },
      React.createElement('h1', { style: { margin: 0, fontSize: '18px' } }, 'Heritage Postbox'),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' } },
        React.createElement('span', null, `${getPlayerLevel(playerStats.rarityScore).icon} ${playerStats.rarityScore}pts`),
        React.createElement('button', { onClick: () => setViewMode('map'), style: {background: viewMode === 'map' ? '#ea580c' : '#7f1d1d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer'} }, 'Map'),
        React.createElement('button', { onClick: () => setViewMode('list'), style: {background: viewMode === 'list' ? '#ea580c' : '#7f1d1d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer'} }, 'List'),
        React.createElement('button', { onClick: () => setViewMode('stats'), style: {background: viewMode === 'stats' ? '#ea580c' : '#7f1d1d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer'} }, '🏆 Stats'),
        React.createElement('button', { onClick: handleAddClick, style: { background: '#059669', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer'} }, '+ Add')
      )
    ),
    React.createElement('main', { style: { flex: 1, position: 'relative', overflowY: 'auto' } }, renderContent()),
    React.createElement(Toast, { toast, onClose: () => setToast(null) }),
    selectedPostbox && React.createElement(PostboxForm, {
        postbox: selectedPostbox, onSave: savePostbox, onCancel: () => setSelectedPostbox(null)
    }),
    postSaveAction && React.createElement(PostSaveModal, {
        postbox: postSaveAction, onShare: generateFacebookPost, onReport: generateMaintenanceEmail, onClose: () => setPostSaveAction(null)
    })
  );
};

// --- ADDED MISSING COMPONENTS ---

const PostSaveModal = ({ postbox, onShare, onReport, onClose }) => {
    const canReport = postbox.condition === 'Poor' ||
postbox.condition === 'Derelict' || postbox.condition === 'Needs Maintenance';
    return React.createElement('div', { style: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1500, padding: '10px' } },
        React.createElement('div', { style: { background: 'white', padding: '25px', borderRadius: '8px', textAlign: 'center', width: '100%', maxWidth: '400px' } },
            React.createElement('h2', { style: { marginTop: 0 } }, '✅ Success!'),
            React.createElement('p', null, 'Your postbox has been logged. What would you like to do next?'),
            React.createElement('div', { style: { display: 'grid', gap: '10px', marginTop: '20px' } },
                React.createElement('a', { href: onShare(postbox), target: '_blank', rel: 'noopener noreferrer', style: { display: 'block', background: '#1877F2', color: 'white', textDecoration: 'none', padding: '12px', borderRadius: '5px' } }, 'Share to Facebook'),
                canReport && React.createElement('a', { href: onReport(postbox), style: { display: 'block', background: '#f97316', color: 'white', textDecoration: 'none', padding: '12px', borderRadius: '5px' } }, '🔧 Report Maintenance Issue'),
                React.createElement('button', { onClick: onClose, style: { background: '#6b7280', color: 'white', border: 'none', padding: '12px', borderRadius: '5px', cursor: 'pointer' } }, 'Close')
            )
        )
    );
};

const PostboxList = ({ postboxes, onSelect, onDelete, onShare, onReport }) => {
    if (postboxes.length === 0) return React.createElement('div', { style: { padding: '20px', textAlign: 'center' } }, 'No postboxes logged yet. Add one!');
return React.createElement('div', { style: { padding: '10px' } },
        postboxes.map(p => React.createElement('div', { key: p.id, style: { background: 'white', borderLeft: `5px solid ${getRarityInfo(p.type).color}`, marginBottom: '10px', padding: '15px', borderRadius: '5px' } },
            React.createElement('h3', { style: { marginTop: 0 } }, p.type || 'Postbox'),
            (p.photos || []).length > 0 && React.createElement('img', { src: p.photos[0].data, style: { maxWidth: '100px', borderRadius: '5px', float: 'right' } }),
            React.createElement('p', null, `Condition: ${p.condition || 'N/A'}`),
            React.createElement('p', null, `Postbox Number: ${p.postboxCode || 'N/A'}`),
            React.createElement('div', { style: { marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' } },
                React.createElement('button', { onClick: () => onSelect(p) }, 'Edit'),
                React.createElement('button', { onClick: () => onDelete(p.id) }, 'Delete'),
                React.createElement('a', { href: onShare(p), target: '_blank', rel: 'noopener noreferrer' }, 'Share'),
                (p.condition === 'Poor' ||
p.condition === 'Derelict' || p.condition === 'Needs Maintenance') && 
                    React.createElement('a', { href: onReport(p) }, 'Report')
            )
        ))
    );
};

const PlayerStats = ({ playerStats, userPostboxes }) => {
    const level = getPlayerLevel(playerStats.rarityScore);
return React.createElement('div', { style: { padding: '20px' } },
        React.createElement('div', { style: { textAlign: 'center', background: 'white', padding: '20px', borderRadius: '8px' } },
            React.createElement('div', { style: { fontSize: '4rem' } }, level.icon),
            React.createElement('h2', { style: { margin: '10px 0' } }, level.title),
            React.createElement('p', null, `Level ${level.level} Hunter`)
        ),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', margin: '20px 0' } },
            React.createElement('div', { style: { background: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center' } },
                React.createElement('h3', { style: { margin: 0 } }, playerStats.totalFinds),
                React.createElement('p', { style: { margin: 0 } }, 'Total Finds')
           ),
            React.createElement('div', { style: { background: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center' } },
                React.createElement('h3', { style: { margin: 0 } }, playerStats.rarityScore),
                React.createElement('p', { style: { margin: 0 } }, 'Hunter Points')
            )
        ),
         React.createElement('div', { style: { background: 'white', padding: '20px', borderRadius: '8px' } },
            React.createElement('h3', null, 'Achievements'),
            playerStats.achievements.length > 0 ?
React.createElement('ul', null, playerStats.achievements.map(a => React.createElement('li', { key: a.id }, `${a.title}: ${a.message}`))) :
                React.createElement('p', null, 'No achievements yet. Keep hunting!')
        )
    );
};

// --- RENDER THE APP ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(PostboxLogger));