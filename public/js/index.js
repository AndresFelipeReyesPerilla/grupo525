document.getElementById('contactForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = {
    sex: formData.get('sex'),
    date: formData.get('date'),
    name: formData.get('name'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    address: formData.get('address'),
    typeHome: formData.get('typeHome'),
    country: formData.get('country'),
    state: formData.get('state'),
    city: formData.get('city'),
    departament: formData.get('departament'),
  };

  console.log("que va querer", data)
  
  const response = await fetch('/contact-form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  console.log('response',response);
  if(response.ok) {
    alert('Contact saved successfully!',response);
  } else {
    alert('Debes completar el formulario',response);
  }

});
  