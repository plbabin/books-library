import {observable, action, runInAction, computed, autorun, toJS} from "mobx";

const STORAGE_KEY = 'books';
export const UNCATEGORIZED = 'Uncategorized';

export const SORT = {
    'ASC':'Title A-Z',
    'DESC':'Title Z-A',
    'CREATED_AT': 'Added to list',
};

class Books {
    @observable searchTerm = '';
	@observable isLoading = true;
    @observable userItems = [];
    @observable ids = [];
    @observable searchResults = [];
    @observable currentCategory;
    @observable currentSort = SORT.ASC;

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
        const data = localStorage.getItem(STORAGE_KEY);
        if(data){
            const items = JSON.parse();

            if(items){
                runInAction( () => {
                    this.userItems = items;
                });
            }
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

        const sortByTitle = (a,b) => {
            const titleA=a.title.toLowerCase();
            const titleB=b.title.toLowerCase();
            if(titleA > titleB){
                return 1;
            }else if(titleA < titleB){
                return -1;
            }else{
                return 0;
            }
        };

        const sortByCreatedAt = (a,b) => b.createdAt - a.createdAt;
        return items.sort( (a,b) => {
            switch(this.currentSort){
                case SORT.DESC:
                    return sortByTitle(b,a);
                case SORT.CREATED_AT:
                    return sortByCreatedAt(a,b);
                default:
                    return sortByTitle(a,b);
            }
        });
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
            item.createdAt = Date.now();
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

    @action setCurrentSort(sort){
        this.currentSort = sort;
    }

    @action resetCurrentSort(){
        this.currentSort = SORT.ASC;
    }

}

export default new Books();