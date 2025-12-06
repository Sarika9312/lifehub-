// Settings page
checkAuth();

async function loadSettings() {
  try {
    const user = await authAPI.getMe();
    document.getElementById('settingsName').value = user.user.name;
    document.getElementById('email').value = user.user.email;
    
    const theme = user.user.theme || 'light';
    document.getElementById('themeSelect').value = theme;
  } catch (error) {
    console.error('Error loading settings:', error);
  }
}

document.getElementById('profileForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('settingsName').value;
  
  try {
    const response = await authAPI.updateMe({ name });
    if (response.success) {
      alert('Profile updated!');
      loadSettings();
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('Error updating profile');
  }
});

function changeTheme() {
  const theme = document.getElementById('themeSelect').value;
  applyTheme(theme);
}

function changePassword() {
  alert('Password change feature coming soon!');
}

function deleteAccount() {
  if (confirm('Are you absolutely sure? This cannot be undone!')) {
    if (confirm('Type "DELETE" to confirm account deletion.')) {
      alert('Account deletion feature coming soon!');
    }
  }
}

loadSettings();
