import Notification from '../Notification.js';

test('notifications-setContent-getContent', () => {
  const instance = new Notification();
  instance.setContent("Hola")
  expect(instance.getContent()).toBe("Hola");
});
test('notifications-setType-getType', () => {
  const instance = new Notification();
  instance.setType("success")
  expect(instance.getType()).toBe("success");
});
test('notifications-html', () => {
  const type = "success",
    content  = "Hola";

  const instance = new Notification();
  instance.setType(type);
  instance.setContent(content);
  expect(instance.html()).toBe(`<div class="notification" data-type="${type}" id="notification-1">
            ${content}
        </div>`);
});