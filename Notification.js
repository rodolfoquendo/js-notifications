export default class Notification{
    NOTIFICATION_TYPE_SUCCESS = 'success';
    NOTIFICATION_TYPE_ERROR = 'error';
    NOTIFICATION_ELEMENT_ID = 'notifications';
    #holder = null;
    #type = null;
    #url = null;
    #content = null;
    static items = [];
    
    #getHolder(){
        if(this.#holder === null){
            this.#holder = document.getElementById(this.NOTIFICATION_ELEMENT_ID);
        }
        return this.#holder;
    }
    setType(type){
        this.#type = type;
    }
    getType(){
        return this.#type;
    }
    getUrl(){
        if(is_null(this.#url))
        return this.#url;
    }
    setContent(content){
        this.#content = content;
    }
    getContent(){
        return this.#content;
    }
    html(){
        return `<div class="notification" data-type="${this.getType()}" id="notification-${Notification.items.length}">
            ${this.getContent()}
        </div>`;
    }
    setup(){
        if(this.#getHolder() === null){
            document.body.innerHTML += `<div id="notifications"></div>`;
            this.#getHolder();
        }
    }
    add(){
        const holder = this.#getHolder();
        holder.innerHTML += this.html();
        Notification.items.push(this.getContent());
    }
    addServer(){
        
    }
    static notify(content, type = this.NOTIFICATION_TYPE_SUCCESS){
        const notification = new Notification();
        notification.setContent(content);
        notification.setType(type);
        return notification.add();
    }

}