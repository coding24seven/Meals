export default function sendEditRequest(payload, successCB, failCB) {

  const stringPayload = JSON.stringify(payload);
  const url = '/meals/edit';

  fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: stringPayload // body data type must match "Content-Type" header
  })
    .then(response => {
      if (response.ok) successCB && successCB();
      else failCB && failCB();
      return response.json();
    })
    .then(jsonResponse => {
      console.log(jsonResponse);
    })
    .catch(error => {
      console.error(error); // no response
    });
}
