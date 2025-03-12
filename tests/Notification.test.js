import
  {
    Notification,
    _notify
  } from '../lib/Notification.js';
global.fetch = ( url, options ) => new Promise( ( resolve, reject ) =>
{
  let xhr = new XMLHttpRequest();
  xhr.open( options.method, url );
  xhr.send( options.body );
  xhr.onload = function ()
  {
    if ( xhr.status !== 200 )
    {
      reject( xhr.status );
    } else
    {
      resolve( xhr.response );
    }
  };
} );


Object.defineProperty(window, 'location', {
  value: {
    href: null
  },
  writable: true // possibility to override
});



test( 'Notification.full', async () =>
{
  let type = "success",
    timeout = 1,
    content = "Hola",
    url = "https://insigniaeducation.com",
    method = "POST";
  const notification = new Notification(),
    id = notification.getElementId();
  //defaults
  expect( notification.holder() !== null ).toBe( true );
  expect( id ).toBe( 'notifications-0' );
  expect( notification.getContent() ).toBe( null );
  expect( notification.getType() ).toBe( null );
  expect( notification.getReportUrl() ).toBe( null );
  expect( notification.getMethod() ).toBe( "POST" );
  expect( notification.getTimeout() ).toBe( 5 );
  expect( notification.element() ).toBe( null );
  expect( notification.getReportUrl() ).toBe( null );


  notification.setTimeout( timeout );
  notification.setContent( content );
  notification.setType( type );
  notification.setMethod( method );

  expect( notification.getTimeout() ).toBe( timeout * 1000 );
  expect( notification.getContent() ).toBe( content );
  expect( notification.getType() ).toBe( type );
  expect( notification.getMethod() ).toBe( method )


  const dto = notification.dto();
  expect( dto.type ).toBe( type )
  expect( dto.content ).toBe( content )

  const html = notification.html();
  expect( html ).toBe( `<a class="notification d-block" data-type="${ type }" id="${ id }">
            ${ content }
        </a>`);
  notification.addHtml();
  expect( notification.element() !== null ).toBe( true );
  // we have not setup the url yet
  expect( notification.getReportUrl() ).toBe( null );
  let response = await notification.reportToServer();
  expect( response ).toBe( false );


  notification.setReportUrl( url );
  expect( notification.getReportUrl() ).toBe( url );
  expect( notification.getMethod() ).toBe( "POST" );


  expect( notification.getItems().length == 0 );

  expect( notification.addEventListener() ).toBe( true );
  expect( notification.addTimeout() ).toBe( true );
  const add = await notification.add();
  expect( add.id ).toBe( id );
  expect( add.sent ).toBe( true );
  expect( add.timeout ).toBe( true );
  expect( add.data.type ).toBe( type );
  expect( add.data.content ).toBe( content );
}, 30000 );
test( 'Notification.defaults_from_html_body', async () =>
{
  let type = "success",
    timeout = 5,
    content = "'Notification.notify",
    url = "https://insigniaeducation.com",
    method = "GET";
  document.querySelector( 'body' ).setAttribute( 'data-report-url', url );
  document.querySelector( 'body' ).setAttribute( 'data-report-method', method );
  let notification = new Notification( content );
  notification.holder().removeAttribute( 'data-report-method' );
  notification.holder().removeAttribute( 'data-report-url' );
  notification.setTimeout( timeout );
  notification.setContent( content );
  notification.setType( type );

  expect( notification.getTimeout() ).toBe( timeout * 1000 );
  expect( notification.getContent() ).toBe( content );
  expect( notification.getType() ).toBe( type );
  expect( notification.getMethod() ).toBe( method );
  expect( notification.getReportUrl() ).toBe( url );
  document.querySelector( 'body' ).removeAttribute( 'data-report-method' );
  document.querySelector( 'body' ).removeAttribute( 'data-report-url' );

}, 30000 );
test( 'Notification.defaults_from_html_holder', async () =>
{
  let type = "success",
    timeout = 5,
    content = "'Notification.notify",
    url = "https://insigniaeducation.com",
    method = "GET";
  let notification = new Notification( content );
  notification.setTimeout( timeout );
  notification.setContent( content );
  notification.setType( type );

  notification.holder().setAttribute( 'data-report-url', url );
  notification.holder().setAttribute( 'data-report-method', method );

  expect( notification.getReportUrl() ).toBe( url );
  expect( notification.getMethod() ).toBe( method );
  notification.holder().removeAttribute( 'data-report-method' );
  notification.holder().removeAttribute( 'data-report-url' );

}, 30000 );
test( '_notify', async () =>
{
  let type = "success",
    timeout = 5,
    content = "'Notification._notify",
    url = "https://insigniaeducation.com",
    method = "POST";
  let notification = await _notify( content );
  expect( notification.id ).toBe( 'notifications-1' );
  expect( notification.sent ).toBe( true );
  expect( notification.timeout ).toBe( true );
  expect( notification.data.type ).toBe( type );
  expect( notification.data.content ).toBe( content );

}, 30000 );
test( 'Notification.timeout', async () =>
{
  let type = "Notification.timeout",
    timeout = 0.5,
    content = "Hola",
    url = null,
    method = "POST";
  const notification = await _notify( content, type, timeout, url, method );
  await new Promise( resolve => setTimeout( resolve, timeout * 3 * 1000 ) );
  expect( window.timeouts.notifications[ 'notifications-2' ] ).toBe( false );

}, 30000 );
test( 'Notification.clickClose', async () =>
{
  let type = "success",
    timeout = 30,
    content = "Notification.clickClose",
    report_url = 'https://insigniaeducation.com',
    click_url = report_url,
    method = "POST";
  const notification = await _notify( content, type, timeout, report_url, method, click_url ),
    notification_id = notification.id,
    element = document.getElementById( notification_id );
  element.click();
  expect( document.getElementById( notification.id ) ).toBe( null );

}, 30000 );