const EventListeners = require( "@rodolfoquendo/js-core/lib/EventListeners.js");
const Helpers = require( "@rodolfoquendo/js-core/lib/Helpers.js");

class Notification{
    NOTIFICATION_TYPE_SUCCESS = 'success';
    NOTIFICATION_TYPE_ERROR = 'error';
    NOTIFICATION_HOLDER_ID = 'notifications';
    #type = null;
    #url = null;
    #method = "POST";
    #content = null;
    #timeout = 5;
    #sent = false;
    static items = [];
    
    setHolder(){
        if(Helpers.is_null(document.getElementById(this.NOTIFICATION_HOLDER_ID))){
            document.body.innerHTML += `<div id="${this.NOTIFICATION_HOLDER_ID}"></div>`;
        }
    }
    holder(){
        this.setHolder();
        return document.getElementById(this.NOTIFICATION_HOLDER_ID);
    }
    id(){
        return Notification.items.length;
    }
    getElementId(){
        return `${this.NOTIFICATION_HOLDER_ID}-${this.id()}`;
    }
    element(){
        return document.getElementById(this.getElementId());
    }
    setTimeout(timeout){
        this.#timeout = timeout * 1000;
    }
    getTimeout(){
        return this.#timeout;
    }
    setType(type){
        this.#type = type;
    }
    getType(){
        return this.#type;
    }
    setContent(content){
        this.#content = content;
    }
    getContent(){
        return this.#content;
    }
    setUrl(url = null){
        this.#url = !Helpers.is_null(url) ? url : this.#url;
        this.#url = !Helpers.is_null(this.#url) ? this.#url : this.holder().getAttribute('data-report-url');
        this.#url = !Helpers.is_null(this.#url) ? this.#url : document.querySelector('body').getAttribute('data-report-url');
    }
    getUrl(){
        this.setUrl();
        return this.#url;
    }
    setMethod(method){
        this.#method = method;
    }
    getMethod(){
        return this.#method;
    }
    html(){
        return `<div class="notification" data-type="${this.getType()}" id="${this.getElementId()}">
            ${this.getContent()}
        </div>`;
    }
    addHtml(){
        if(Helpers.is_null(this.element())){
            const holder = this.holder();
            holder.innerHTML += this.html();
        }
        return !Helpers.is_null(this.element());
    }
    addTimeout(){
        if(typeof window.timeouts === typeof undefined){
            window.timeouts = {};
        }
        if(typeof window.timeouts.notifications === typeof undefined){
            window.timeouts.notifications = {};
        }
        const element = this.element();
        window.timeouts.notifications[element.id] = setTimeout(function(){
            Notification.close(element.id);
        },this.#timeout);
        return Helpers.isset(window.timeouts.notifications[element.id]);
    }
    addEventListener(){
        const element = this.element();
        return EventListeners._e(element,'click',() => {
            Notification.close(element.id);
        });
    }
    static close(element_id){
        clearTimeout(window.timeouts.notifications[element_id]);
        window.timeouts.notifications[element_id] = false
        document.getElementById(element_id).remove();
    }
    addServer(){
        if(Helpers.is_null(this.getUrl()) || this.#sent){
            return this.#sent;
        }
        return fetch(this.getUrl(),{
            method:this.getMethod(),
            body: JSON.stringify(this.dto())
        }).then(response => {
            this.#sent = response;
            return this.#sent;
        });
    }
    dto(){
        return {
            type: this.getType(),
            content: this.getContent(),
        };
    }
    getItems(){
        return Notification.items;
    }
    async add(){
        const html = this.addHtml(),
            timeout = this.addTimeout(),
            listeners = this.addEventListener(),
            server = await this.addServer();
        Notification.items.push({
            id: this.getElementId(),
            data: this.dto(),
            sent: server !== false,
            response: server,
            timeout: timeout,
        })
        return Notification.items.slice(-1).pop() ;
    }
    static notify(content, type = 'success', timeout = 5, url = null, method = "POST"){
        const notification = new Notification();
        notification.setContent(content);
        notification.setType(type);
        notification.setTimeout(timeout);
        notification.setUrl(url);
        notification.setMethod(method);
        return notification.add();
    }

}
module.exports = Notification;