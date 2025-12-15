class BookModel {
  constructor({id, title, author, genre, price, image_url, created_at, description, slug}) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.price = price;
    this.image_url = image_url;
    this.created_at = created_at;
    this.description = description;
    this.slug = slug;
  }
}

module.exports= BookModel;