import { observable } from "mobx";
import stores from "stores/";
import { UNCATEGORIZED } from "stores/books";

const BOOK_ITEM_1 = {
  id: "46856546568",
  title: "GHJ",
  categories: ["Cat 1"],
  authors: ["Author 1", "Author 2"],
  thumbnail: "url_of_first_image.png"
};

const BOOK_ITEM_2 = {
  id: "4723934794378",
  title: "DEF",
  categories: ["Cat 2"],
  authors: ["Author 3", "Author 4"],
  thumbnail: "url_of_second_image.png"
};

const BOOK_ITEM_WITHOUT_CATEGORIES = {
  id: "362i7468",
  title: "ABC",
  authors: ["Author 5", "Author 6"],
  thumbnail: "url_of_third_image.png"
};

beforeEach(() => {
  stores.books.searchResults = [
    BOOK_ITEM_1,
    BOOK_ITEM_2,
    BOOK_ITEM_WITHOUT_CATEGORIES
  ];
});

afterEach(() => {
  stores.books.userItems = observable.array();
  stores.books.searchResults = [];
});

describe("Mobx Stores", () => {
  it("add item from search results to user list", () => {
    stores.books.addItem(BOOK_ITEM_1.id);
    stores.books.addItem(BOOK_ITEM_2.id);
    stores.books.addItem("fake id");

    expect(stores.books.userItems.length).toBe(2);
    expect(stores.books.userItems[0].title).toBe(BOOK_ITEM_1.title);
    expect(stores.books.userItems[1].title).toBe(BOOK_ITEM_2.title);
  });

  it("remove item from user list", () => {
    stores.books.addItem(BOOK_ITEM_1.id);
    stores.books.addItem(BOOK_ITEM_2.id);

    stores.books.removeItem(BOOK_ITEM_1.id);

    expect(stores.books.userItems.length).toBe(1);

    expect(stores.books.userItems[0].title).toBe(BOOK_ITEM_2.title);
  });

  it("update ids list after item was added", () => {
    stores.books.addItem(BOOK_ITEM_1.id);
    stores.books.addItem(BOOK_ITEM_2.id);

    expect(stores.books.userItemIds).toContain(BOOK_ITEM_1.id);
    expect(stores.books.userItemIds).toContain(BOOK_ITEM_2.id);
  });

  it("retrieve item from userItems list", () => {
    stores.books.addItem(BOOK_ITEM_1.id);
    stores.books.addItem(BOOK_ITEM_2.id);
    const item = stores.books.findById(BOOK_ITEM_1.id);
    expect(item.title).toBe(BOOK_ITEM_1.title);
  });

  it("update categories list after item was added", () => {
    stores.books.addItem(BOOK_ITEM_1.id);
    stores.books.addItem(BOOK_ITEM_2.id);

    expect(Object.keys(stores.books.categories)).toContain(
      BOOK_ITEM_1.categories[0]
    );
    expect(Object.keys(stores.books.categories)).toContain(
      BOOK_ITEM_2.categories[0]
    );
  });

  it("used UNCATEGORIZED if no item category doesn't exists", () => {
    stores.books.addItem(BOOK_ITEM_WITHOUT_CATEGORIES.id);

    expect(Object.keys(stores.books.categories)).toContain(UNCATEGORIZED);
  });

  it("used UNCATEGORIZED if no item category doesn't exists", () => {
    stores.books.addItem(BOOK_ITEM_WITHOUT_CATEGORIES.id);

    expect(Object.keys(stores.books.categories)).toContain(UNCATEGORIZED);
  });

  it("activeItems should only display current category elements", () => {
    stores.books.addItem(BOOK_ITEM_1.id);
    stores.books.addItem(BOOK_ITEM_2.id);
    stores.books.addItem(BOOK_ITEM_WITHOUT_CATEGORIES.id);
    stores.books.setCurrentCategory(UNCATEGORIZED);
    expect(stores.books.activeItems.length).toBe(1);
    expect(stores.books.activeItems[0].title).toBe(
      BOOK_ITEM_WITHOUT_CATEGORIES.title
    );
  });
});
