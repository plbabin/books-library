import {observable, action, runInAction, computed, autorun, toJS} from "mobx";

const UNCATEGORIZED = 'Uncategorized';
const STORAGE_KEY = 'books';


class Books {
    @observable searchTerm = '';
	@observable isLoading = false;
    @observable userItems = [];
    @observable ids = [];
    @observable searchResults = [];
    @observable currentCategory;

    constructor(){
        this.load();
        let firstRun = true;
        autorun(() => {
        // This code will run every time any observable property
        // on the store is updated.
            const json = JSON.stringify(toJS(this.userItems));
            if (!firstRun) {
                localStorage.setItem(STORAGE_KEY, json);
            }
            firstRun = false;
        });
    }

    async getRequest(url){
        let data = await (await (fetch(url)
            .then(res => {
            return res.json()
            })
            .catch(err => {
            console.log('Error: ', err)
            })
        ))
        return data
    }

    load(){
        const items = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if(items){
            runInAction( () => {
                this.userItems = items;
            });
        }
    }

    @computed get categories(){
        const categories = [];
        this.userItems.forEach( (i) => {
            let itemCategory = UNCATEGORIZED;
            if(i.categories && i.categories.length > 0){
                itemCategory = i.categories[0];
            }
            
            if(!categories.includes(itemCategory)){
                categories.push(itemCategory);
            }
        });
        return categories.sort();
    }

    @computed get userItemIds(){
        return this.userItems.map( (i) => i.id );
    }

    @computed get activeItems(){
        return this.userItems;
    }

    @action async search(term){
        if(!term){
            this.clearSearch();
            return;
        }

        this.searchTerm = term;
        this.isLoading = true;
        const items = await this.getRequest(`/books?q=${term}`);

        runInAction( () => {
            this.searchResults = items.map( (i) => {
                i.saved = this.userItemIds.includes(i.id);
                return i;
            });
            this.isLoading = false;
        });
    }

    @action clearSearch(){
        this.searchResults = [];
        this.isLoading = false;
        this.searchTerm = '';
    }

    @action addItem(itemId){
        const item = this.searchResults.find( (el) => el.id === itemId);

        if(item){
            item.saved = true;
            this.userItems.push(item);
        }
    }

    @action removeItem(itemId){
        const item = this.userItems.find( (el) => el.id === itemId);
        const searchItem = this.searchResults.find( (el) => el.id === itemId);
        
        if(searchItem){
            searchItem.saved = false;
        }

        this.userItems.remove(item);
    }


}

export default new Books();