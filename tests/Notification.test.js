import Notification from '../lib/Notification.js';
global.fetch = (url, options) => new Promise((resolve, reject) => {
  let xhr = new XMLHttpRequest();

  // 2. Configuración: solicitud GET para la URL /article/.../load
  xhr.open(options.method, url);

  // 3. Envía la solicitud a la red
  xhr.send(options.body);

  // 4. Esto se llamará después de que la respuesta se reciba
  xhr.onload = function() {
    if (xhr.status != 200) { // analiza el estado HTTP de la respuesta
      reject(xhr.status);
    } else { // muestra el resultado
      resolve(xhr.response);
    }
  };
});
test('Notification.full', async () => {
  let type = "success",
    timeout = 1,
    content = "Hola",
    url = "https://insigniaeducation.com",
    method = "POST";
  const notification = new Notification(),
    id = notification.getElementId();
  //defaults
  expect(notification.holder() !== null).toBe(true);
  expect(id).toBe('notifications-0');
  expect(notification.getContent()).toBe(null);
  expect(notification.getType()).toBe(null);
  expect(notification.getUrl()).toBe(null);
  expect(notification.getMethod()).toBe("POST");
  expect(notification.getTimeout()).toBe(5);
  expect(notification.element()).toBe(null);
  expect(notification.getUrl()).toBe(null);


  notification.setTimeout(timeout);
  notification.setContent(content);
  notification.setType(type);
  notification.setMethod(method);

  expect(notification.getTimeout()).toBe(timeout * 1000);
  expect(notification.getContent()).toBe(content);
  expect(notification.getType()).toBe(type);
  expect(notification.getMethod()).toBe(method)


  const dto = notification.dto();
  expect(dto.type).toBe(type)
  expect(dto.content).toBe(content)

  const html = notification.html();
  expect(html).toBe(`<div class="notification" data-type="${type}" id="${id}">
            ${content}
        </div>`);
  notification.addHtml();
  expect(notification.element() !== null).toBe(true);

  if(url !== null){
    document.querySelector('body').setAttribute('data-report-url',url);
  }
  expect(notification.getUrl()).toBe(url);
  let  response = await notification.addServer();
  expect(response !== false).toBe(true);


  url = "https://rodolfoquendo.com";
  notification.setUrl(url);
  expect(notification.getUrl()).toBe(url)


  expect(notification.getItems().length == 0 );

  expect(notification.addEventListener()).toBe(true);
  expect(notification.addTimeout()).toBe(true);
  const add = await notification.add();
  expect(add.id).toBe(id);
  expect(add.sent).toBe(true);
  expect(add.timeout).toBe(true);
  expect(add.data.type).toBe(type);
  expect(add.data.content).toBe(content);
});
test('Notification.notify', async () => {
  let type = "success",
    timeout = 5,
    content = "'Notification.notify",
    url = "https://insigniaeducation.com",
    method = "POST";
  let notification = await Notification.notify(content);
  expect(notification.id).toBe('notifications-1');
  expect(notification.sent).toBe(true);
  expect(notification.timeout).toBe(true);
  expect(notification.data.type).toBe(type);
  expect(notification.data.content).toBe(content);
  
});
test('Notification.timeout', async () => {
  let type = "Notification.timeout",
    timeout = 0.5,
    content = "Hola",
    url = null,
    method = "POST";
  const notification = await Notification.notify(content, type, timeout, url, method);
  await new Promise(resolve => setTimeout(resolve, timeout * 2 * 1000));
  expect(window.timeouts.notifications['notifications-2']).toBe(false);
  
});
test('Notification.clickClose', async () => {
  let type = "success",
    timeout = 30,
    content = "Notification.clickClose",
    url = null,
    method = "POST";
  const notification = await Notification.notify(content, type, timeout, url, method);
  document.getElementById(notification.id).click();
  expect(document.getElementById(notification.id)).toBe(null);
  
});