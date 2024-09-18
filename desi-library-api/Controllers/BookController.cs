using System.Collections.Generic;
using desi_library_api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using desi_library_api.Data;

namespace desi_library_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController : ControllerBase
    {
        private readonly BookContext _bookContext;
        private readonly ApplicationDbContext _dbContext;

        public BookController(ApplicationDbContext _dbContext)
        {
            _bookContext = new BookContext(_dbContext);
            this._dbContext = _dbContext;
        }

        [HttpGet(Name = "GetAllBooks")]
        [Route("/book/GetAllBooks")]
        public IEnumerable<SimpleBookDto> GetAllBooks()
        {
            List<SimpleBookDto>? allBooks = _dbContext.Books.Select(book => new SimpleBookDto() { Id = book.Id, Name = book.Name, Author = book.Author }).ToList();
            return allBooks;
        }

        [HttpGet(Name = "GetBook")]
        [Route("/book/getbook/{id}")]
        public ActionResult<Book> GetBook(int id)
        {
            var book = _bookContext.GetBook(id);
            if (book == null)
            {
                return NotFound();
            }
            return book;
        }

        [HttpGet(Name = "BorrowableBooks")]
        [Route("/book/BorrowableBooks")]
        public IEnumerable<Book> BorrowableBooks()
        {
            return _bookContext.BorrowableBooks();
        }

        [HttpGet(Name = "UnBorrowableBooks")]
        [Route("/book/UnborrowableBooks")]
        public IEnumerable<Book> UnBorrowableBooks()
        {
            return _bookContext.UnBorrowableBooks();
        }


        // Without being in a database, this update will not reflect in the next REST API request.
        [HttpPut]
        [Route("/book/UpdateBookBorrowStatus/{bookId}")]
        public ActionResult UpdateBookBorrowStatus(int bookId)
        {
            return _bookContext.UpdateBookBorrowStatus(bookId);
        }
    }
}
