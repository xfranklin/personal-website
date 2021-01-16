(()=> {
  const subscribe_form_0 = document.forms["subscribe-form-0"];
  const subscribe_form_1 = document.forms["subscribe-form-1"];
  const subscribe_form_2 = document.forms["subscribe-form-2"];
  const subscribe_form_3 = document.forms["subscribe-form-3"];

  const checkboxCaptcha = document.getElementById("recaptcha-checkbox");
  const invisibleCaptcha = document.getElementById("recaptcha-invisible");

  let
    checkbox_widget_id = null,
    invisible_widget_id = null;
  
  grecaptcha.ready(() => {
    invisible_widget_id = grecaptcha.render(invisibleCaptcha, {
       'sitekey': '6LdzMR4aAAAAAElctZtApS5MxXh3QV8WZ_1MHWR9',
       'badge': 'inline',
       'callback': mailSubscribe,
       'size': 'invisible'
    });
    checkbox_widget_id = grecaptcha.render(checkboxCaptcha, {
       'sitekey' : '6Lf36h4aAAAAAMsVcXrkGfRIBiawfRjowYDY0qOX'
    });
  });

  subscribe_form_0.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = new FormData(e.target).get("email");
    if (email) {
      const response = await fetch('/.netlify/functions/subscribe', {
        body: email,
        method: 'POST'
      })
      const data = await response.json();
      alert(data);
    }
  });

  subscribe_form_1.addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = new FormData(e.target).get("email");
    if(email) { 
      grecaptcha.ready(async()=> {
        const token = await grecaptcha.execute('6LeB3xAaAAAAAPpM1dgtjAdLZ-z7i4Ekp4CGU0IL', {action: 'submit'})
        const response = await fetch('/.netlify/functions/subscribe-captcha-v3', {
          body: JSON.stringify({ email, token }),
          method: 'POST'
        })
        const data = await response.json();
        alert(data);
      });
    }
  });

  subscribe_form_2.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const email = new FormData(e.target).get("email");
    const token = grecaptcha.getResponse(checkbox_widget_id);
    if(email && token){
      const response = await fetch('/.netlify/functions/subscribe-captcha-v2', {
        body: JSON.stringify({email, token, isCheckbox: true }),
        method: 'POST'
      })
      const data = await response.json();
      if (data) {
        grecaptcha.reset(checkbox_widget_id);
        alert(data);
      }
    }
  });

  subscribe_form_3.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const email = new FormData(e.target).get("email");
    if(email) {
      grecaptcha.execute(invisible_widget_id);
    }
  });

  async function mailSubscribe(token) {
    if(token) {
      const email = new FormData(subscribe_form_3).get("email");
      const response = await fetch('/.netlify/functions/subscribe-captcha-v2', {
        body: JSON.stringify({email, token, isCheckbox: false }),
        method: 'POST'
      })
      const data = await response.json();
      if (data) {
        grecaptcha.reset(invisible_widget_id);
        alert(data);
      }
    }
  }
    
})()