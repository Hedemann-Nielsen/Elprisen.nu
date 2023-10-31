

openSettingsPage
function openSettingsPage() {
    window.location.href = 'indstillinger.html';
  }
  
  const settingIcon = document.getElementById('setting');
  settingIcon.addEventListener('click', openSettingsPage);