
function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const status = document.getElementById('form-status');
  const formData = new FormData(form);

  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => {
      status.innerHTML = '<p class="bold-text">Thank you for your message!</p>';
      form.reset();
    })
    .catch((error) => {
      status.innerHTML = '<p style="color: red;">Oops! Something went wrong. Please try again later.</p>';
    });
}







//initially used node.js to test forms locally 
//backend is now on netlify.com through their form info 



















