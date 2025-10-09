import React, { useState, useEffect } from 'react';
import './FreelancerProfile.css';

const PROFILE_API = 'http://127.0.0.1:8000/api/v1/accounts/profile/';
const API_BASE = 'http://127.0.0.1:8000/api/v1/Freelancers/';


const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken') || localStorage.getItem('access_token') || localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}`, Accept: 'application/json' } : { Accept: 'application/json' };
};


const saveProfileToServer = async (profileId, profileData, selectedProfileFile, selectedResumeFile) => {
  const headers = getAuthHeaders();
  const url = profileId ? `${API_BASE}${profileId}/` : API_BASE;
  const method = profileId ? 'PATCH' : 'POST';

  
  let languagesForSend = profileData.languages;
  if (!Array.isArray(languagesForSend)) {
    if (typeof languagesForSend === 'string' && languagesForSend.trim()) {
      try { languagesForSend = JSON.parse(languagesForSend); }
      catch(e) {
        try { languagesForSend = JSON.parse(languagesForSend.replace(/'/g, '"')); }
        catch(e2) { languagesForSend = languagesForSend ? [String(languagesForSend)] : null; }
      }
    } else if (languagesForSend == null) {
      languagesForSend = null;
    } else {
      languagesForSend = [String(languagesForSend)];
    }
  }

  
  const phoneForSend = (profileData.phone && String(profileData.phone).trim()) ? String(profileData.phone).trim() : null;

  const hasFiles = selectedProfileFile instanceof File || selectedResumeFile instanceof File;

  try {
    let res;
    if (hasFiles) {
      const fd = new FormData();
      if (selectedProfileFile instanceof File) fd.append('profile_photo', selectedProfileFile);
      if (selectedResumeFile instanceof File) fd.append('resume', selectedResumeFile);

      
      const skip = new Set(['profilePhoto','resume']);
      Object.entries(profileData).forEach(([k,v]) => {
        if (skip.has(k)) return;
        if (k === 'languages') {
          if (languagesForSend != null) fd.append('languages', JSON.stringify(languagesForSend));
          return;
        }
        if (k === 'phone') {
          if (phoneForSend != null) fd.append('phone', phoneForSend);
          return;
        }
        if (v !== undefined && v !== null) fd.append(k, v);
      });

      res = await fetch(url, { method, headers: { ...headers }, body: fd });
    } else {
      const payload = {
        name: profileData.name ?? '',
        email: profileData.email ?? '',
        phone: phoneForSend,
        bio: profileData.bio ?? '',
        course: profileData.course ?? '',
        skills: profileData.skills ?? '',
        experience: profileData.experience ?? '',
        linkedin: profileData.linkedin ?? null,
        github: profileData.github ?? null,
        portfolio: profileData.portfolio ?? null,
        jobpreferences: profileData.jobPreferences ?? profileData.jobpreferences ?? null,
        languages: languagesForSend
      };
      res = await fetch(url, {
        method,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    const text = await res.text().catch(()=>null);
    let body = null;
    try { body = text ? JSON.parse(text) : null; } catch { body = text; }

    if (!res.ok) {
      console.error('Save failed', { url, method, status: res.status, body });
      return { ok: false, err: body, status: res.status };
    }
    return { ok: true, data: body };
  } catch (err) {
    console.error('Network/save error', err);
    return { ok: false, err };
  }
};

const FreelancerProfile = () => {
  const [editingSections, setEditingSections] = useState({});
  const [showSaveModal, setShowSaveModal] = useState(false);

  
  const [profileId, setProfileId] = useState(null);
  const [selectedProfileFile, setSelectedProfileFile] = useState(null);
  const [selectedResumeFile, setSelectedResumeFile] = useState(null);

  const [profileData, setProfileData] = useState({
    profilePhoto: '',
    name: '',
    course: '',
    bio: '',
    phone: '',
    email: '',
    linkedin: '',
    github: '',
    portfolio: '',
    skills: '',
    experience: '',
    languages: ['English', 'Spanish', 'French'],
    jobPreferences: ''
  });

  const [newLanguage, setNewLanguage] = useState('');

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const headers = getAuthHeaders();
        if (!headers.Authorization) return;

      
        const res = await fetch(PROFILE_API, { headers });
        if (!res.ok) {
          
          const userId = localStorage.getItem('userId');
          if (!userId) return;
          const frRes = await fetch(`${API_BASE}${userId}/`, { headers });
          if (!frRes.ok) return;
          const data = await frRes.json();
          setProfileId(userId);
          setProfileData(prev => ({
            ...prev,
            name: data.name || prev.name,
            course: data.course || prev.course,
            bio: data.bio || prev.bio,
            phone: data.phone || prev.phone,
            email: data.email || prev.email,
            linkedin: data.linkedin || prev.linkedin,
            github: data.github || prev.github,
            portfolio: data.portfolio || prev.portfolio,
            skills: data.skills || prev.skills,
            experience: data.experience || prev.experience,
            languages: Array.isArray(data.languages) ? data.languages : prev.languages,
            jobPreferences: data.jobPreferences || prev.jobPreferences,
            profilePhoto: data.profile_photo || prev.profilePhoto
          }));
          return;
        }

        const payload = await res.json();
        const user = payload.user || {};
        const freelancer = payload.freelancer || null;

        const userId = user.id || localStorage.getItem('userId');
        setProfileId(userId || null);

        setProfileData(prev => ({
          ...prev,
          
          name: (freelancer && (freelancer.name ?? user.name)) || user.name || prev.name,
          email: user.email || prev.email,
          phone: freelancer?.phone ?? prev.phone,
          bio: freelancer?.bio ?? prev.bio,
          course: freelancer?.course ?? prev.course,
          skills: freelancer?.skills ?? prev.skills,
          experience: freelancer?.experience ?? prev.experience,
          linkedin: freelancer?.linkedin ?? prev.linkedin,
          
          github: freelancer?.github ?? freelancer?.Github ?? prev.github,
          portfolio: freelancer?.portfolio ?? prev.portfolio,
          languages: Array.isArray(freelancer?.languages) ? freelancer.languages : prev.languages,
          jobPreferences: freelancer?.jobPreferences ?? freelancer?.jobpreferences ?? prev.jobPreferences,
          profilePhoto: freelancer?.profile_photo ?? prev.profilePhoto
        }));
      } catch (err) {
        console.error('fetchProfile error', err);
      }
    };
    fetchProfile();
  }, []);

  const [isSaving, setIsSaving] = useState(false);

  
  const onProfileFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setSelectedProfileFile(f);
    setProfileData(prev => ({ ...prev, profilePhoto: URL.createObjectURL(f) })); // preview
  };

  const onResumeFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setSelectedResumeFile(f);
  };


  const buildFormData = () => {
    const fd = new FormData();

    if (selectedProfileFile) fd.append('profile_photo', selectedProfileFile);
    if (selectedResumeFile) fd.append('resume', selectedResumeFile);

    
    Object.entries(profileData).forEach(([k, v]) => {
      if (k === 'profilePhoto') return;
      if (Array.isArray(v)) {
        fd.append(k, JSON.stringify(v));
      } else {
        fd.append(k, v ?? '');
      }
    });
    return fd;
  };

  const saveProfileToServer = async () => {
    setIsSaving(true);
    const headers = getAuthHeaders();
    if (!headers.Accept) headers.Accept = 'application/json';
    const userId = profileId; // user id used as detail key
    const url = userId ? `${API_BASE}${userId}/` : API_BASE;
    const method = userId ? 'PATCH' : 'POST'; // use PATCH for partial updates

    // normalize languages for sending
    let languagesForSend = profileData.languages;
    if (!Array.isArray(languagesForSend)) {
      if (typeof languagesForSend === 'string' && languagesForSend.trim()) {
        // try safe parse for both double- and single-quoted JSON
        try { languagesForSend = JSON.parse(languagesForSend); }
        catch(e) {
          try { languagesForSend = JSON.parse(languagesForSend.replace(/'/g, '"')); }
          catch(e2) { languagesForSend = languagesForSend ? [String(languagesForSend)] : null; }
        }
      } else if (languagesForSend == null) {
        languagesForSend = null;
      } else {
        languagesForSend = [String(languagesForSend)];
      }
    }

    // normalize phone: send null for empty values (avoids invalid format errors)
    const phoneForSend = (profileData.phone && String(profileData.phone).trim()) ? String(profileData.phone).trim() : null;

    const hasFiles = !!(selectedProfileFile instanceof File || selectedResumeFile instanceof File);

    try {
      let res;
      if (hasFiles) {
        const fd = new FormData();
        if (selectedProfileFile instanceof File) fd.append('profile_photo', selectedProfileFile);
        if (selectedResumeFile instanceof File) fd.append('resume', selectedResumeFile);

        // append other fields (skip preview URL fields)
        const skip = new Set(['profilePhoto']);
        Object.entries(profileData).forEach(([k, v]) => {
          if (skip.has(k)) return;
          if (k === 'languages') {
            if (languagesForSend != null) fd.append('languages', JSON.stringify(languagesForSend));
            return;
          }
          if (k === 'phone') {
            if (phoneForSend != null) fd.append('phone', phoneForSend);
            return;
          }
          if (v !== undefined && v !== null) fd.append(k, v);
        });

        // DO NOT set Content-Type for FormData; browser will set boundary
        res = await fetch(url, { method, headers: { ...headers }, body: fd });
      } else {
        // JSON path: send array for languages (or null)
        const payloadJson = {
          name: profileData.name ?? '',
          email: profileData.email ?? '',
          phone: phoneForSend,
          bio: profileData.bio ?? '',
          course: profileData.course ?? '',
          courseName: profileData.courseName ?? '',
          completionDate: profileData.completionDate ?? '',
          university: profileData.university ?? '',
          skills: profileData.skills ?? '',
          experience: profileData.experience ?? '',
          linkedin: profileData.linkedin ?? null,
          github: profileData.github ?? null,
          portfolio: profileData.portfolio ?? null,
          jobpreferences: profileData.jobPreferences ?? profileData.jobpreferences ?? null,
          languages: languagesForSend
        };

        res = await fetch(url, {
          method,
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify(payloadJson)
        });
      }

      // parse response body safely (may be JSON or plain text)
      const text = await res.text().catch(() => null);
      let body = null;
      try { body = text ? JSON.parse(text) : null; } catch (e) { body = text; }

      setIsSaving(false);

      if (!res.ok) {
        // show full response so you can see serializer.errors in browser console
        console.error('Save failed', { url, method, status: res.status, body });
        return { ok: false, err: body, status: res.status };
      }

      // success -> update previews/ids if backend returned them
      if (body?.user && !profileId) setProfileId(body.user);
      if (body?.id && !profileId) setProfileId(body.id);
      if (body?.profile_photo) setProfileData(prev => ({ ...prev, profilePhoto: body.profile_photo }));
      if (body?.resume) setProfileData(prev => ({ ...prev, resume: body.resume }));
      return { ok: true, data: body };
    } catch (err) {
      setIsSaving(false);
      console.error('Network/save error', err);
      return { ok: false, err };
    }
  };

  // ---------- integrate with edit/save flow ----------
  const handleSectionEdit = (section) => {
    setEditingSections(prev => ({ ...prev, [section]: true }));
  };

  // REPLACE previous handleSectionSave to call API
  const handleSectionSave = async (section) => {
    setEditingSections(prev => ({ ...prev, [section]: false }));
    setShowSaveModal(true);
    setTimeout(() => setShowSaveModal(false), 2000);

    const result = await saveProfileToServer();
    if (!result.ok) {
      console.error('Save failed', result.err);
      // optionally display validation errors in UI
    } else {
      console.log(`${section} section saved:`, result.data || profileData);
    }
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !profileData.languages.includes(newLanguage.trim())) {
      setProfileData(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }));
      setNewLanguage('');
    }
  };

  const removeLanguage = (languageToRemove) => {
    setProfileData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang !== languageToRemove)
    }));
  };

  return (
    <div className="freelancer-profile">
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          
        </div>

        {/* Save Confirmation Modal - Top of Screen */}
        {showSaveModal && (
          <div className="save-modal-top-overlay">
            <div className="save-modal-top">
              <div className="save-modal-top-content">
                <div className="save-modal-top-icon">✅</div>
                <p className="save-modal-top-text">Changes saved successfully!</p>
              </div>
            </div>
          </div>
        )}

 
        {/* Navigation Bar */}
        <div className="profile-nav">
          <button onClick={() => document.getElementById('personal-info-section').scrollIntoView({ behavior: 'smooth' })}>Personal Info</button>
          <button onClick={() => document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' })}>Contact</button>
          <button onClick={() => document.getElementById('level-badge-section').scrollIntoView({ behavior: 'smooth' })}>Level Badge</button>
          <button onClick={() => document.getElementById('bio-section').scrollIntoView({ behavior: 'smooth' })}>Profile Summary</button>
          <button onClick={() => document.getElementById('resume-section').scrollIntoView({ behavior: 'smooth' })}>Resume</button>
          <button onClick={() => document.getElementById('skills-section').scrollIntoView({ behavior: 'smooth' })}>Skills</button>
          <button onClick={() => document.getElementById('experience-section').scrollIntoView({ behavior: 'smooth' })}>Experience</button>
          <button onClick={() => document.getElementById('social-section').scrollIntoView({ behavior: 'smooth' })}>Social Links</button>
          <button onClick={() => document.getElementById('languages-section').scrollIntoView({ behavior: 'smooth' })}>Languages</button>
          <button onClick={() => document.getElementById('preferences-section').scrollIntoView({ behavior: 'smooth' })}>Preferences</button>
        </div>

        <div className="profile-grid">
          {/* LEFT COLUMN */}
          <div className="profile-left">
            <div id="personal-info-section" className="personal-info-grid">
              <div className="personal-info-header">
                <h2 className="profile-heading">Personal Information</h2>
                {!editingSections.profile ? (
                  <button className="section-edit-btn" onClick={() => handleSectionEdit('profile')}>
                    EDIT
                  </button>
                ) : (
                  <button className="section-save-btn" onClick={() => handleSectionSave('profile')}>
                    SAVE
                  </button>
                )}
              </div>
              <div className="profile-photo-section">
                <div className="profile-photo-container">
                  <div className="profile-photo-placeholder">
                    {profileData.profilePhoto ? (
                      <img
                        src={profileData.profilePhoto}
                        alt="Profile"
                        style={{ width: '90px', height: '90px', borderRadius: '50%' }}
                      />
                    ) : (
                      <div className="photo-upload-area">
                        <div className="photo-icon">📷</div>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="profile-photo-input"
                    onChange={onProfileFileChange}
                    disabled={!editingSections.profile}
                  />
                  <button
                    className="upload-photo-btn"
                    disabled={!editingSections.profile}
                    type="button"
                    onClick={() => document.getElementById('profile-photo-input').click()}
                  >
                    Upload Photo
                  </button>
                </div>
              </div>
              <div className="profile-info">
                <div className="input-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!editingSections.profile}
                    className="profile-input"
                  />
                </div>
                <div className="input-group">
                  <label>Course</label>
                  <select
                    value={profileData.course}
                    onChange={(e) => handleInputChange('course', e.target.value)}
                    disabled={!editingSections.profile}
                    className="profile-input"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Web Development">Web Development</option>
                  </select>
                </div>
              </div>
            </div>
            <div id="contact-section" className="contact-details-grid">
              <div className="contact-details-header">
                <h2 className="profile-heading">Contact Details</h2>
                {!editingSections.contact ? (
                  <button className="section-edit-btn" onClick={() => handleSectionEdit('contact')}>
                    EDIT
                  </button>
                ) : (
                  <button className="section-save-btn" onClick={() => handleSectionSave('contact')}>
                    SAVE
                  </button>
                )}
              </div>
              <div className="contact-fields">
                <div className="input-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!editingSections.contact}
                    className="profile-input"
                  />
                </div>
                <div className="input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!editingSections.contact}
                    className="profile-input"
                  />
                </div>
              </div>
            </div>
            <div id="level-badge-section" className="level-badge-grid">
              <h2 className="profile-heading">Level Badge</h2>
              <div className="level-badge-card">
                <div className="badge-icon-container">
                  <div className="badge-icon">
                    <div className="badge-icon-left"></div>
                    <div className="badge-icon-right"></div>
                  </div>
                </div>
                <div className="badge-content">
                  <div className="badge-level">Level 3</div>
                  <div className="badge-title">ROOKIE</div>
                  <div className="badge-progress-info">
                    <span className="progress-projects">8/10 projects</span>
                    <span className="progress-percentage">80%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* RIGHT COLUMN */}
          <div className="profile-content">
            {/* Profile Summary / Bio Section */}
            <div id="bio-section" className="bio-section">
              <div className="section-header">
                <h3 className="section-title">Profile Summary / Bio</h3>
                {!editingSections.bio ? (
                  <button className="section-edit-btn" onClick={() => handleSectionEdit('bio')}>
                    EDIT
                  </button>
                ) : (
                  <button className="section-save-btn" onClick={() => handleSectionSave('bio')}>
                    SAVE
                  </button>
                )}
              </div>
              <div className="input-group">
                
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!editingSections.bio}
                  className="profile-textarea"
                  rows="4"
                />
              </div>
            </div>

            {/* Resume Section */}
            <div id="resume-section" className="resume-section">
              <div className="section-header">
                <h3 className="section-title">Resume</h3>
                {!editingSections.resume ? (
                  <button className="section-edit-btn" onClick={() => handleSectionEdit('resume')}>
                    EDIT
                  </button>
                ) : (
                  <button className="section-save-btn" onClick={() => handleSectionSave('resume')}>
                    SAVE
                  </button>
                )}
              </div>
              <div className="file-upload-area">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  style={{ display: 'none' }}
                  id="resume-file-input"
                  onChange={onResumeFileChange}
                  disabled={!editingSections.resume}
                />
                <button 
                  className="upload-resume-btn" 
                  disabled={!editingSections.resume}
                  type="button"
                  onClick={() => document.getElementById('resume-file-input').click()}
                >
                  📄 Upload Resume
                </button>
              </div>
            </div>

            {/* Skills Section */}
            <div id="skills-section" className="skills-section">
              <div className="section-header">
                <h3 className="section-title">Skills</h3>
                {!editingSections.skills ? (
                  <button className="section-edit-btn" onClick={() => handleSectionEdit('skills')}>
                    EDIT
                  </button>
                ) : (
                  <button className="section-save-btn" onClick={() => handleSectionSave('skills')}>
                    SAVE
                  </button>
                )}
              </div>
              <div className="skills-grid">
                <div className="input-group">
                  
                  <textarea
                    value={profileData.skills}
                    onChange={(e) => handleInputChange('skills', e.target.value)}
                    disabled={!editingSections.skills}
                    className="profile-textarea"
                    rows="3"
                    placeholder="List your technical skills separated by commas"
                  />
                </div>
              </div>
            </div>

            {/* Experience Section */}
            <div id="experience-section" className="experience-section">
              <div className="section-header">
                <h3 className="section-title">Experience</h3>
                {!editingSections.experience ? (
                  <button className="section-edit-btn" onClick={() => handleSectionEdit('experience')}>
                    EDIT
                  </button>
                ) : (
                  <button className="section-save-btn" onClick={() => handleSectionSave('experience')}>
                    SAVE
                  </button>
                )}
              </div>
              <div className="experience-grid">
                <div className="input-group">
                  
                  <textarea
                    value={profileData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    disabled={!editingSections.experience}
                    className="profile-textarea"
                    rows="3"
                    placeholder="List your work experience"
                  />
                </div>
              </div>
            </div>

            {/* Social Links Section */}
            <div id="social-section" className="social-section">
              <div className="section-header">
                <h3 className="section-title">Social Links</h3>
                {!editingSections.social ? (
                  <button className="section-edit-btn" onClick={() => handleSectionEdit('social')}>
                    EDIT
                  </button>
                ) : (
                  <button className="section-save-btn" onClick={() => handleSectionSave('social')}>
                    SAVE
                  </button>
                )}
              </div>
              <div className="social-grid">
                <div className="input-group">
                  <label>LinkedIn</label>
                  <input
                    type="url"
                    value={profileData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    disabled={!editingSections.social}
                    className="profile-input"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                <div className="input-group">
                  <label>GitHub</label>
                  <input
                    type="url"
                    value={profileData.github}
                    onChange={(e) => handleInputChange('github', e.target.value)}
                    disabled={!editingSections.social}
                    className="profile-input"
                    placeholder="https://github.com/yourusername"
                  />
                </div>
                <div className="input-group">
                  <label>Portfolio</label>
                  <input
                    type="url"
                    value={profileData.portfolio}
                    onChange={(e) => handleInputChange('portfolio', e.target.value)}
                    disabled={!editingSections.social}
                    className="profile-input"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>
            </div>

            

            {/* Languages Known Section */}
            <div id="languages-section" className="languages-section">
              <div className="section-header">
                <h3 className="section-title">Languages Known</h3>
                {!editingSections.languages ? (
                  <button className="section-edit-btn" onClick={() => handleSectionEdit('languages')}>
                    EDIT
                  </button>
                ) : (
                  <button className="section-save-btn" onClick={() => handleSectionSave('languages')}>
                    SAVE
                  </button>
                )}
              </div>
              <div className="languages-container">
                <div className="language-input-group">
                  <input
                    type="text"
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    disabled={!editingSections.languages}
                    className="profile-input"
                    placeholder="Add a language"
                  />
                  <button 
                    className="add-language-btn" 
                    onClick={addLanguage}
                    disabled={!editingSections.languages || !newLanguage.trim()}
                  >
                    +
                  </button>
                </div>
                <div className="languages-list">
                  {profileData.languages.map((language, index) => (
                    <div key={index} className="language-tag">
                      <span>{language}</span>
                      {editingSections.languages && (
                        <button 
                          className="remove-language-btn"
                          onClick={() => removeLanguage(language)}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Job Preferences Section */}
            <div id="preferences-section" className="preferences-section">
              <div className="section-header">
                <h3 className="section-title">Job Preferences</h3>
                {!editingSections.preferences ? (
                  <button className="section-edit-btn" onClick={() => handleSectionEdit('preferences')}>
                    EDIT
                  </button>
                ) : (
                  <button className="section-save-btn" onClick={() => handleSectionSave('preferences')}>
                    SAVE
                  </button>
                )}
              </div>
              <div className="input-group">
                
                <textarea
                  value={profileData.jobPreferences}
                  onChange={(e) => handleInputChange('jobPreferences', e.target.value)}
                  disabled={!editingSections.preferences}
                  className="profile-textarea"
                  rows="4"
                  placeholder="Describe your job preferences, work style, and career goals"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;