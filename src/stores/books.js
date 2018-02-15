import {observable, action, runInAction, computed, autorun, toJS} from "mobx";

const UNCATEGORIZED = 'Uncategorized';
const STORAGE_KEY = 'books';


class Books {
    @observable searchTerm = '';
	@observable isLoading = true;
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

    findById(itemId){
        const items = this.userItems.find( (i) => i.id === itemId);
        if(items){
            return items;
        }
        return null;
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
        const categories = {};
        this.userItems.forEach( (i) => {
            let itemCategory = UNCATEGORIZED;
            if(i.categories && i.categories.length > 0){
                itemCategory = i.categories[0];
            }
            
            if(!Object.keys(categories).includes(itemCategory)){
                categories[itemCategory] = 0;
            }
            categories[itemCategory]++;
        });
        return categories;
    }

    @computed get userItemIds(){
        return this.userItems.map( (i) => i.id );
    }

    @computed get activeItems(){
        console.log('activeItems');
        let items = toJS(this.userItems);
        if(this.currentCategory){
            items = items.filter( (i) => {
                let itemCategory = UNCATEGORIZED;
                if(i.categories && i.categories.length > 0){
                    itemCategory = i.categories[0];
                }
                return itemCategory === this.currentCategory;
            });
        }

        // apply sort here

        return items;
    }
    
    @action setSearchTerm(term){
        this.searchTerm = term;
    }

    @action async search(term){
        if(!term){
            this.clearSearch();
            return;
        }

        this.setSearchTerm(term);
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
        this.setSearchTerm('');
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

    @action setCurrentCategory(category){
        this.currentCategory = category;
    }


}

export default new Books();