import { shallow } from 'enzyme'
import React from "react"

import Book from "./Book"
import stores from "stores/"

const BOOK_ITEM = {
    id:'46856546568',
    title:"GHJ",
    categories:['Cat 1'],
    authors:['Author 1', 'Author 2'],
    thumbnail:'url_of_first_image.png',
    saved:false,
};

beforeEach(() => {
    stores.books.searchResults = [BOOK_ITEM];
});

afterEach(() => {
    stores.books.userItems = [];
    stores.books.searchResults = [];
});

describe("Book.functional", () => {

  it("add book to list", () => {
    const wrapper = shallow(<Book id={BOOK_ITEM.id} title={BOOK_ITEM.title} onAddItem={ (itemId) => { stores.books.addItem(itemId) } } />)

    wrapper.find(".hs-book-action").simulate("click");
    expect(stores.books.userItems.length).toBe(1);
  })
})