import Helpers from "@insignia-education/js-core/Helpers.js";
export default class Notification{
    NOTIFICATION_TYPE_SUCCESS = 'success';
    NOTIFICATION_TYPE_ERROR = 'error';
    NOTIFICATION_ELEMENT_ID = 'notifications';
    #type  = null;
    #url = null;
    #id = null;
    #content = null;
    #sent = false;
    static items = [];
    /**
     * If the notification element does not exists, we create it
     * 
     * @author Rodolfo Oquendo <rodolfoquendo@gmail.com>
     */
    #setHolder(){
        if(Helpers.is_null(document.getElementById(this.NOTIFICATION_ELEMENT_ID))){
            document.querySelector('body').innerHTML += `<div id="${this.NOTIFICATION_ELEMENT_ID}"></div>`;
        }
    }
    /**
     * Sets the type of the notification
     * This is just a class to be added to the DOM node 
     * The final class is notification-${type}
     * 
     * @param {string} type 
     * 
     * @author Rodolfo Oquendo <rodolfoquendo@gmail.com>
     */
    setType(type){
        this.#type = type;
    }

    /**
     * 
     * @param {string} content 
     */
    setContent(content){
        this.#content = content;
    }

    #setUrl(){
        if(Helpers.is_null(this.#url)){
            const holder = this.#getHolder();
            if(!Helpers.is_null(holder)){
                this.#url = holder.getAttribute('data-url');
            }
        }
    }

    #getHolder(){
        this.#setHolder();
        return document.getElementById(this.NOTIFICATION_ELEMENT_ID);
    }

    getType(){
        return this.#type;
    }

    getContent(){
        return this.#content;
    }

    getUrl(){
        this.#setUrl();
        return this.#url;
    }

    setID(){
        if(Helpers.is_null(this.#id)){
            this.#id = Notification.items.length + 1;
        }
    }
    getID(){
        this.setID();
        return this.#id;
    }

    html(){
        return `<div class="notification" data-type="${this.getType()}" id="notification-${this.getID()}">
            ${this.getContent()}
        </div>`;
    }

    get(){
        return {
            content: this.getContent(),
            type: this.getType(),
        }
    }
    
    add(){
        const holder = this.#getHolder();
        holder.innerHTML += this.html();
        this.addServer().finally(() => {
            Notification.items.push(this.get());
        });
    }

    addServer(){
        return Helpers.is_null(this.getUrl()) || this.#sent ? null : fetch(this.getUrl(),{
            method: 'POST',
            mode: 'cors', 
            body: JSON.stringify(this.get())
        })
        .then(response => {
            this.#sent = true;
            return response;
        });
    }
    static notify(content, type = this.NOTIFICATION_TYPE_SUCCESS){
        const notification = new Notification();
        notification.setContent(content);
        notification.setType(type);
        return notification.add();
    }

}