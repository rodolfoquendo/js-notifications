import
{
    is_null,
    isset
} from "../node_modules/@rodolfoquendo/js-core/lib/Helpers.js";
import
{
    _event
} from "../node_modules/@rodolfoquendo/js-core/lib/EventListeners.js";

export class Notification
{
    NOTIFICATION_TYPE_SUCCESS = 'success';
    NOTIFICATION_TYPE_ERROR = 'error';
    NOTIFICATION_HOLDER_ID = 'notifications';
    #type = null;
    #report_url = null;
    #click_url = null;
    #method = null;
    #content = null;
    #timeout = 5;
    #sent = false;
    static items = [];

    setHolder ()
    {
        if ( is_null( document.getElementById( this.NOTIFICATION_HOLDER_ID ) ) )
        {
            document.body.innerHTML += `<div id="${ this.NOTIFICATION_HOLDER_ID }"></div>`;
        }
    }
    holder ()
    {
        this.setHolder();
        return document.getElementById( this.NOTIFICATION_HOLDER_ID );
    }
    id ()
    {
        return Notification.items.length;
    }
    getElementId ()
    {
        return `${ this.NOTIFICATION_HOLDER_ID }-${ this.id() }`;
    }
    element ()
    {
        return document.getElementById( this.getElementId() );
    }

    setTimeout ( timeout )
    {
        this.#timeout = timeout * 1000;
    }

    getTimeout ()
    {
        return this.#timeout;
    }
    setType ( type )
    {
        this.#type = type;
    }
    getType ()
    {
        return this.#type;
    }
    setContent ( content )
    {
        this.#content = content;
    }
    getContent ()
    {
        return this.#content;
    }
    setReportUrl ( url = null )
    {
        const holder_data = this.holder().getAttribute( 'data-report-url' ),
            body_data = document.querySelector( 'body' ).getAttribute( 'data-report-url' );
        this.#report_url = !is_null( body_data ) ? body_data : this.#report_url;
        this.#report_url = !is_null( holder_data ) ? holder_data : this.#report_url;
        this.#report_url = !is_null( url ) ? url : this.#report_url;
        if ( !is_null( this.#report_url ) )
        {
            this.holder().setAttribute( 'data-report-url', this.#report_url );
            document.querySelector( 'body' ).setAttribute( 'data-report-url', this.#report_url );
        }
    }
    getReportUrl ()
    {
        this.setReportUrl();
        return this.#report_url;
    }
    setClickUrl ( url = null )
    {
        this.#click_url = !is_null( url ) ? url : this.#click_url;
    }
    getClickUrl ()
    {
        this.setClickUrl();
        return this.#click_url;
    }
    setMethod ( method = null )
    {
        const holder_data = this.holder().getAttribute( 'data-report-method' ),
            body_data = document.querySelector( 'body' ).getAttribute( 'data-report-method' );

        this.#method = !is_null( body_data ) ? body_data : this.#method;
        this.#method = !is_null( holder_data ) ? holder_data : this.#method;
        this.#method = !is_null( method ) ? method : this.#method;
        this.#method = !is_null( this.#method ) ? this.#method : "POST";

        this.holder().setAttribute( 'data-report-method', this.#method );
        document.querySelector( 'body' ).setAttribute( 'data-report-method', this.#method );
    }
    getMethod ()
    {
        this.setMethod();
        return this.#method;
    }
    html ()
    {
        return `<a class="notification d-block" data-type="${ this.getType() }" id="${ this.getElementId() }"${ !is_null( this.getClickUrl() ) ? ` href="${ this.getClickUrl() }"` : '' }>
            ${ this.getContent() }
        </a>`;
    }
    addHtml ()
    {
        if ( is_null( this.element() ) )
        {
            const holder = this.holder();
            holder.innerHTML += this.html();
        }
        return !is_null( this.element() );
    }
    addTimeout ()
    {
        if ( typeof window.timeouts === typeof undefined )
        {
            window.timeouts = {};
        }
        if ( typeof window.timeouts.notifications === typeof undefined )
        {
            window.timeouts.notifications = {};
        }
        const element = this.element();
        window.timeouts.notifications[ element.id ] = setTimeout( () =>
        {
            _unnotify( element.id )
        }, this.#timeout );
        return isset( window.timeouts.notifications[ element.id ] );
    }
    addEventListener ()
    {
        const element = this.element();
        return _event( element, 'click', _notificationClose );
    }
    async reportToServer ()
    {
        if ( is_null( this.getReportUrl() ) || is_null( this.getMethod() ) || this.#sent )
        {
            return this.#sent;
        }
        const request = await fetch( this.getReportUrl(), {
            method: this.getMethod(),
            body: JSON.stringify( this.dto() )
        } );
        this.#sent = JSON.parse( request );
        return this.#sent;
    }
    dto ()
    {
        return {
            type: this.getType(),
            content: this.getContent(),
        };
    }
    getItems ()
    {
        return Notification.items;
    }
    async add ()
    {
        const html = this.addHtml(),
            timeout = this.addTimeout(),
            listeners = this.addEventListener(),
            server = await this.reportToServer(),
            notification = {
                id: this.getElementId(),
                data: this.dto(),
                sent: server !== false,
                html,
                listeners: listeners,
                response: server,
                timeout: timeout,
            };
        if ( !is_null( this.#click_url ) )
        {
            this.element().setAttribute( 'data-click-url', this.#click_url );
        }
        Notification.items.push( notification );
        return notification;
    }
}
export const _unnotify = ( element_id ) =>
{
    const element = document.getElementById( element_id );
    clearTimeout( window.timeouts.notifications[ element_id ] );
    window.timeouts.notifications[ element_id ] = false;
    if ( !is_null( element ) )
    {
        if ( !is_null( element.getAttribute( 'data-click-url' ) ) )
        {
            window.location.href = element.getAttribute( 'data-click-url' );
        }
        element.remove();
    }
};

const _notificationClose = ( event ) => _unnotify( event.target.id );

export const _notify = async ( content, type = 'success', timeout = 5, report_url = null, method = "POST", click_url = null ) =>
{
    const notification = new Notification();
    notification.setContent( content );
    notification.setType( type );
    notification.setTimeout( timeout );
    notification.setReportUrl( report_url );
    notification.setMethod( method );
    notification.setClickUrl( click_url );
    return notification.add();
}
