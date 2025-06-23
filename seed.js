// Collegati al database corretto
use my_mongo_db;

// Svuota le collezioni se esistono
db.authors.drop();
db.books.drop();
db.users.drop();
db.loans.drop();

// Inserisci autori
const authors = db.authors.insertMany([
    { name: "Nora Freeman", birthYear: 1970, nationality: "Canadian", genres: ["Mystery", "Thriller"] },
    { name: "Luca Bianchi", birthYear: 1982, nationality: "Italian", genres: ["Sci-Fi", "Adventure"] },
    { name: "Emily Zhao", birthYear: 1990, nationality: "Chinese", genres: ["Fantasy", "Young Adult"] },
    { name: "George Allen", birthYear: 1955, nationality: "American", genres: ["History", "Biography"] },
    { name: "Amina Hassan", birthYear: 1978, nationality: "Moroccan", genres: ["Poetry", "Drama"] }
]);

// Inserisci utenti
const users = db.users.insertMany([
    { name: "Alice Johnson", email: "alice@example.com", memberSince: new Date("2021-01-15"), preferredGenres: ["Fantasy", "Historical"] },
    { name: "Marco Rossi", email: "marco@example.com", memberSince: new Date("2020-06-30"), preferredGenres: ["Thriller"] },
    { name: "Sara Lee", email: "sara@example.com", memberSince: new Date("2022-09-01"), preferredGenres: ["Biography", "Drama"] },
    { name: "David Kim", email: "david@example.com", memberSince: new Date("2023-03-21"), preferredGenres: ["Sci-Fi", "Fantasy"] },
    { name: "Fatima Aloui", email: "fatima@example.com", memberSince: new Date("2021-11-10"), preferredGenres: ["Poetry", "Romance"] }
]);

// Inserisci libri con riferimenti agli autori
const books = db.books.insertMany([
    { title: "The Vanishing Signal", yearPublished: 2015, genre: "Sci-Fi", authorIds: [authors.insertedIds[1]] },
    { title: "Desert Echoes", yearPublished: 2021, genre: "Poetry", authorIds: [authors.insertedIds[4]] },
    { title: "Frozen Time", yearPublished: 2010, genre: "Fantasy", authorIds: [authors.insertedIds[2]] },
    { title: "The Last Emperor", yearPublished: 1999, genre: "History", authorIds: [authors.insertedIds[3]] },
    { title: "Hidden Truths", yearPublished: 2018, genre: "Thriller", authorIds: [authors.insertedIds[0]] },
    { title: "Galactic Wars", yearPublished: 2020, genre: "Sci-Fi", authorIds: [authors.insertedIds[1], authors.insertedIds[2]] },
    { title: "The Poet’s Journey", yearPublished: 2005, genre: "Drama", authorIds: [authors.insertedIds[4]] },
    { title: "Code of Shadows", yearPublished: 2022, genre: "Thriller", authorIds: [authors.insertedIds[0], authors.insertedIds[1]] },
    { title: "Ember & Ash", yearPublished: 2019, genre: "Fantasy", authorIds: [authors.insertedIds[2]] },
    { title: "Voices of the Past", yearPublished: 2000, genre: "Biography", authorIds: [authors.insertedIds[3]] }
]);

// Inserisci prestiti con riferimenti a utenti e libri
db.loans.insertMany([
    { userId: users.insertedIds[0], bookId: books.insertedIds[2], loanDate: new Date("2024-05-10"), returnDate: new Date("2024-06-10") },
    { userId: users.insertedIds[1], bookId: books.insertedIds[0], loanDate: new Date("2024-05-15"), returnDate: new Date("2024-06-15") },
    { userId: users.insertedIds[2], bookId: books.insertedIds[9], loanDate: new Date("2024-06-01"), returnDate: null },
    { userId: users.insertedIds[3], bookId: books.insertedIds[5], loanDate: new Date("2024-06-05"), returnDate: null },
    { userId: users.insertedIds[4], bookId: books.insertedIds[6], loanDate: new Date("2024-06-07"), returnDate: new Date("2024-06-21") }
]);
