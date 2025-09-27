fetch('/api/v1/accounts/profile/', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  }
})
.then(res => res.json())
.then(data => {
  // data is the logged-in user's profile
});