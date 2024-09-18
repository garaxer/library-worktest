using desi_library_api.Models;

public static class InitialData
{
    public static List<Book> GetInitialBooks()
    {
        return new List<Book>
        {
            new Book { Id = 1, Name = "Clean Code: A Handbook of Agile Software Craftsmanship", Author = "Robert C. Martin", Language = "English", Pages = 464,   
 Borrowed = false },
            // ... other books
        };
    }
}