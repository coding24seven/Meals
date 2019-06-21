export default function sendEditRequest(payload) {

  const stringPayload = JSON.stringify(payload);
  const url = '/meals/edit';

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: stringPayload // body data type must match "Content-Type" header
  })
    .then(response => response.json())
    .then(jsonResponse => {
      console.log(jsonResponse);
    })
    .catch(error => {
      console.error(error);
    });
}
