using Microsoft.EntityFrameworkCore;
using desi_library_api.Models;

namespace desi_library_api.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {

        public DbSet<Book> Books { get; set; }
        public DbSet<BookBorrowRecs> BookBorrowRecs { get; set; }

    }
}