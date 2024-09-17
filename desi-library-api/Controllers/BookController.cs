using System.Collections.Generic;
using desi_library_api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace desi_library_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController : ControllerBase
    {
        private readonly BookContext _bookContext;

        public BookController()
        {
            var bs = new[]
            {
                new Book { Id = 1, Name = "Clean Code: A Handbook of Agile Software Craftsmanship", Author = "Robert C. Martin", Language = "English", Pages = 464, Borrowed = false },
                new Book { Id = 2, Name = "Test Driven Development: By Example", Author = "Kent Beck", Language = "English", Pages = 240, Borrowed = true },
                new Book { Id = 3, Name = "Design Patterns: Elements of Reusable Object-Oriented Software", Author = "Erich Gamma; Richard Helm; Ralph Johnson; John Vlissides", Language = "English", Pages = 416, Borrowed = false },
                new Book { Id = 4, Name = "The Mythical Man-Month", Author = "Fred Brooks", Language = "English", Pages = 336, Borrowed = false },
                new Book { Id = 5, Name = "The Phoenix Project", Author = "Gene Kim; Kevin Behr; George Spafford", Language = "English", Pages = 423, Borrowed = false }
            };
            _bookContext = new BookContext(new List<Book>(bs));
        }

        [HttpGet(Name = "GetAllBooks")]
        [Route("/book/GetAllBooks")]
        public IEnumerable<SimpleBookDto> GetAllBooks()
        {
            var allBooks = _bookContext.GetAll();
            var reducedList = new List<SimpleBookDto>();

            foreach (var book in allBooks)
            {
                reducedList.Add(new SimpleBookDto() {Id = book.Id, Name = book.Name, Author = book.Author});
            }

            return reducedList;
        }

        [HttpGet(Name = "GetBook")]
        [Route("/book/GetBook")]
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


        // Without being in a database, this update will not reflect in a next REST API request.
        [HttpPut]
        [Route("/book/UpdateBookBorrowStatus")]
        public ActionResult UpdateBookBorrowStatus(int bookId)
        {
            return _bookContext.UpdateBookBorrowStatus(bookId);
        }
    }
}
