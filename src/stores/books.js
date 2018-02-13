import {observable, action, runInAction} from "mobx";

class Books {
    @observable searchTerm = '';
	@observable isLoading = false;
    @observable items = [];
    @observable ids = [];
    @observable searchResults = [];

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

    @action async search(term){
        if(term === ''){
            this.clearSearch();
            return;
        }

        this.searchTerm = term;
        this.isLoading = true;
        const items = await this.getRequest(`/books?q=${term}`);

        runInAction( () => {
            this.searchResults = items;
            this.isLoading = false;
        })

    }

    @action clearSearch(){
        this.searchResults = [];
        this.isLoading = false;
    }

    @action addItem(itemId){
        console.log('ADD ITEM', itemId);
    }

    @action removeItems(itemId){
        console.log('REMOVE ITEM', itemId);
    }


}

export default new Books();