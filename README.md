# js-notifications

## Github repo

<https://github.com/rodolfoquendo/js-notifications>

## NPM repo

<https://www.npmjs.com/package/@rodolfoquendo/js-notifications>

## Why?

We have to keep in mind that all the javascript that is rendered in a browser is public
So i will start doing all my javascript in the form of npm packages

This is for html notifications, this might be hooked up to an endpoint to push the notification event to the server

## Installing

```bash
npm i @rodolfoquendo/js-notifications
```

## How?

```html
<!DOCTYPE html>
<html>
<body>
    <div id="notifications" data-report-url="https://example.com/path/to/listener" data></div>    
</html>
```

## Testing

```bash
npm install && npm test && open coverage/lcov-report/index.html
```

### coverage html report

```bash
open coverage/lcov-report/index.html
```
