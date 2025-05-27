
import React, { useState, useEffect } from 'react';
import ModeSwitcher from './ModeSwitcher';
import LicenseValidation from './LicenseValidation';

interface UserSessionManagerProps {
  children: (props: {
    userMode: 'client' | 'developer';
    isLicenseValid: boolean;
    currentUser: {name: string, key: string} | null;
    onLogout: () => void;
  }) => React.ReactNode;
}

const UserSessionManager = ({ children }: UserSessionManagerProps) => {
  const [userMode, setUserMode] = useState<'client' | 'developer' | null>(null);
  const [isLicenseValid, setIsLicenseValid] = useState(false);
  const [currentUser, setCurrentUser] = useState<{name: string, key: string} | null>(null);

  // Check if user has valid session
  useEffect(() => {
    const savedMode = localStorage.getItem('octaUserMode');
    const savedLicense = localStorage.getItem('octaLicense');
    
    if (savedMode && savedLicense) {
      setUserMode(savedMode as 'client' | 'developer');
      setIsLicenseValid(true);
      setCurrentUser(JSON.parse(savedLicense));
    }
  }, []);

  const handleModeSelect = (mode: 'client' | 'developer') => {
    setUserMode(mode);
    localStorage.setItem('octaUserMode', mode);
    
    if (mode === 'developer') {
      // Developer mode doesn't require license validation
      setIsLicenseValid(true);
      setCurrentUser({ name: 'Developer', key: 'DEV-ACCESS' });
    }
  };

  const handleLicenseValidation = (name: string, key: string) => {
    setIsLicenseValid(true);
    setCurrentUser({ name, key });
    localStorage.setItem('octaLicense', JSON.stringify({ name, key }));
  };

  const handleLogout = () => {
    setUserMode(null);
    setIsLicenseValid(false);
    setCurrentUser(null);
    localStorage.removeItem('octaUserMode');
    localStorage.removeItem('octaLicense');
  };

  // If no mode selected, show mode switcher
  if (!userMode) {
    return <ModeSwitcher onModeSelect={handleModeSelect} />;
  }

  // If client mode and no valid license, show license validation
  if (userMode === 'client' && !isLicenseValid) {
    return <LicenseValidation onValidLicense={handleLicenseValidation} />;
  }

  return (
    <>
      {children({
        userMode,
        isLicenseValid,
        currentUser,
        onLogout: handleLogout
      })}
    </>
  );
};

export default UserSessionManager;
