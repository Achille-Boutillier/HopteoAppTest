

 export function trackingFunction(actionName, screenName, params={}) {
  const measurement_id = "G-QZ53RWJ51Q";
  const api_secret = "2AjkWRnWRnKIfwilrrdNvA";
  const paramsToSend = screenName ? {page_title: screenName, ...params} : params
  // console.log("oui");
  fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`, {
      method: "POST",
      body: JSON.stringify({
          client_id: 'XXXXXXXXXX.YYYYYYYYYY',
          events: [{
              name: actionName,
              params: paramsToSend,
          }]
      })
  }).then(response => {
      if (response.ok) {
          console.log("tracking effetué !");
      } else {
          console.log("tracking échoué : " + response.status);
      }
  }).catch(error => {
          console.error("tracking échoué :", error);
      });
}