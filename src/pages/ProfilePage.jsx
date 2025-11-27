import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProfilePage() {
  const [activeTab, setActiveTab] = useState('interests');
  const [allInterests, setAllInterests] = useState([]);
  const [userInterests, setUserInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from localStorage (set during login)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      fetchUserInterests(userData.id);
    }
    fetchAllInterests();
  }, []);

  const fetchAllInterests = async () => {
    try {
      const response = await fetch('/api/interests');
      const data = await response.json();
      
      // Group by category
      const grouped = data.reduce((acc, interest) => {
        if (!acc[interest.category]) {
          acc[interest.category] = [];
        }
        acc[interest.category].push(interest);
        return acc;
      }, {});
      
      setAllInterests(grouped);
    } catch (error) {
      console.error('Error fetching interests:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserInterests = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}/interests`);
      const data = await response.json();
      setUserInterests(data.map(i => i.id));
    } catch (error) {
      console.error('Error fetching user interests:', error);
    }
  };

  const handleInterestToggle = (interestId) => {
    setUserInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleSaveInterests = async () => {
    if (!user) {
      setMessage('Please login first');
      setError(true);
      return;
    }

    setSaving(true);
    setMessage('');
    setError(false);

    try {
      const response = await fetch(`/api/users/${user.id}/interests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ interestIds: userInterests }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage('Interests saved successfully!');
        setError(false);
      } else {
        setMessage(data.message || 'Failed to save interests');
        setError(true);
      }
    } catch (error) {
      setMessage('Error saving interests. Please try again.');
      setError(true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="courses-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="courses-page">
        <div className="error-container">
          <p>Please login to view your profile</p>
          <Link to="/login" className="btn-primary">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="courses-page">
      {/* Header */}
      <header className="main-header">
        <div className="header-content">
          <Link to="/main" className="logo">
            <div className="vinyl-logo">
              <svg className="vinyl-disc" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <mask id="c-cutout-profile">
                    <rect width="120" height="120" fill="white"/>
                    <path d="M 60 15 
                             A 35 35 0 0 1 60 105
                             L 50 105
                             A 25 25 0 0 0 50 15
                             Z" fill="black"/>
                  </mask>
                </defs>
                <circle cx="60" cy="60" r="50" fill="#2a2a2a" mask="url(#c-cutout-profile)"/>
                <circle cx="60" cy="60" r="48" fill="none" stroke="#3a3a3a" strokeWidth="0.5" mask="url(#c-cutout-profile)"/>
                <circle cx="60" cy="60" r="45" fill="none" stroke="#3a3a3a" strokeWidth="0.5" mask="url(#c-cutout-profile)"/>
                <circle cx="60" cy="60" r="42" fill="none" stroke="#3a3a3a" strokeWidth="0.5" mask="url(#c-cutout-profile)"/>
                <circle cx="60" cy="60" r="39" fill="none" stroke="#3a3a3a" strokeWidth="0.5" mask="url(#c-cutout-profile)"/>
                <circle cx="60" cy="60" r="36" fill="none" stroke="#3a3a3a" strokeWidth="0.5" mask="url(#c-cutout-profile)"/>
                <circle cx="60" cy="60" r="33" fill="none" stroke="#3a3a3a" strokeWidth="0.5" mask="url(#c-cutout-profile)"/>
                <circle cx="60" cy="60" r="30" fill="none" stroke="#3a3a3a" strokeWidth="0.5" mask="url(#c-cutout-profile)"/>
                <circle cx="60" cy="60" r="27" fill="none" stroke="#3a3a3a" strokeWidth="0.5" mask="url(#c-cutout-profile)"/>
                <circle cx="60" cy="60" r="24" fill="none" stroke="#3a3a3a" strokeWidth="0.5" mask="url(#c-cutout-profile)"/>
                <circle cx="60" cy="60" r="21" fill="none" stroke="#3a3a3a" strokeWidth="0.5" mask="url(#c-cutout-profile)"/>
                <circle cx="60" cy="60" r="18" fill="none" stroke="#3a3a3a" strokeWidth="0.5" mask="url(#c-cutout-profile)"/>
                <circle cx="60" cy="60" r="6" fill="#1a1a1a" mask="url(#c-cutout-profile)"/>
                <circle cx="60" cy="60" r="5" fill="none" stroke="#3a3a3a" strokeWidth="0.5" mask="url(#c-cutout-profile)"/>
                <ellipse cx="55" cy="55" rx="35" ry="35" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" mask="url(#c-cutout-profile)"/>
              </svg>
            </div>
          </Link>
          <nav className="main-nav">
            <Link to="/main" className="nav-link">Home</Link>
            <Link to="/courses" className="nav-link">Courses</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
          </nav>
        </div>
      </header>

      {/* Page Header */}
      <section className="courses-header">
        <div className="courses-header-content">
          <h1 className="courses-title">My Profile</h1>
          <p className="courses-subtitle">Manage your interests and preferences</p>
        </div>
      </section>

      {/* Profile Content */}
      <section className="profile-section">
        <div className="profile-container">
          {/* Tabs */}
          <div className="profile-tabs">
            <button 
              className={`profile-tab ${activeTab === 'interests' ? 'active' : ''}`}
              onClick={() => setActiveTab('interests')}
            >
              Interests
            </button>
            <button 
              className={`profile-tab ${activeTab === 'info' ? 'active' : ''}`}
              onClick={() => setActiveTab('info')}
            >
              Account Info
            </button>
          </div>

          {/* Interests Tab */}
          {activeTab === 'interests' && (
            <div className="profile-content">
              <h2>Select Your Interests</h2>
              <p style={{ color: '#b8b8b8', marginBottom: '30px' }}>
                Choose your interests to get personalized course recommendations
              </p>

              {Object.entries(allInterests).map(([category, interests]) => (
                <div key={category} className="interest-category">
                  <h3 className="interest-category-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                  <div className="interests-grid">
                    {interests.map(interest => (
                      <button
                        key={interest.id}
                        className={`interest-tag ${userInterests.includes(interest.id) ? 'selected' : ''}`}
                        onClick={() => handleInterestToggle(interest.id)}
                      >
                        {interest.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="profile-actions">
                <button 
                  className="btn-primary" 
                  onClick={handleSaveInterests}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Interests'}
                </button>
                {message && (
                  <div style={{ 
                    marginTop: '15px', 
                    padding: '12px', 
                    borderRadius: '8px',
                    backgroundColor: error ? '#f8d7da' : '#d4edda',
                    color: error ? '#721c24' : '#155724',
                    textAlign: 'center',
                    fontWeight: '500'
                  }}>
                    {message}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Account Info Tab */}
          {activeTab === 'info' && (
            <div className="profile-content">
              <h2>Account Information</h2>
              <div className="profile-info">
                <div className="info-item">
                  <label>Username</label>
                  <p>{user.username}</p>
                </div>
                {user.email && (
                  <div className="info-item">
                    <label>Email</label>
                    <p>{user.email}</p>
                  </div>
                )}
                <div className="info-item">
                  <label>Role</label>
                  <p>{user.role}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProfilePage;

