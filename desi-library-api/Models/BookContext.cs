using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace desi_library_api.Models
{
    public class BookContext
    {
        private readonly IEnumerable<Book> _books;

        public BookContext(List<Book> books)
        {
            _books = books;
        }

        public IEnumerable<Book> GetAll()
        {
            return _books;
        }

        public Book GetBook(int id) {
            var book = _books.First(a => a.Id == id);
            return book;
        }

        public IEnumerable<Book> BorrowableBooks()
        {
            return _books.Where(a => !a.Borrowed).ToList();
        }

        public IEnumerable<Book> UnBorrowableBooks()
        {
            return _books.Where(a => a.Borrowed).ToList();
        }

        public ActionResult UpdateBookBorrowStatus(int bookId)
        {
            var book = _books.First(a => a.Id == bookId);
            if (book == null)
            {
                return new NotFoundResult();
            }
            book.Borrowed = !book.Borrowed;
            return new OkResult();
        }
    }
}
