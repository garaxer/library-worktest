using System.Collections.Generic;
using System.Linq;
using desi_library_api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Add this for database operations

namespace desi_library_api.Models
{
    public class BookContext
    {
        private readonly ApplicationDbContext _dbContext;

        public BookContext(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Book> GetAll()
        {
            return _dbContext.Books.ToList();
        }

        public Book? GetBook(int id)
        {
            // Use _dbContext to find the book
            var book = _dbContext.Books.FirstOrDefault(a => a.Id == id);
            return book; // Might be null if not found
        }

        public IEnumerable<Book> BorrowableBooks()
        {
            return _dbContext.Books.Where(a => !a.Borrowed).ToList();
        }

        public IEnumerable<Book> UnBorrowableBooks()
        {
            return _dbContext.Books.Where(a => a.Borrowed).ToList();
        }

        public ActionResult UpdateBookBorrowStatus(int bookId)
        {
            var book = _dbContext.Books.FirstOrDefault(a => a.Id == bookId);
            if (book == null)
            {
                return new NotFoundResult();
            }
            book.Borrowed = !book.Borrowed;

            // Save changes to the database
            _dbContext.SaveChanges();

            return new OkResult();
        }
    }
}