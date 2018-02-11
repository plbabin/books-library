import {observable, action} from "mobx";

class Books {
	@observable isLoading = false;
    @observable items = [];
    @observable ids = [];

    @action addItem(){

    }

    @action removeItems(){

    }


}

export default new Books();