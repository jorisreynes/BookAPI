using CoursIPI.NewFolder;
using Microsoft.EntityFrameworkCore;

namespace CoursIPI.Models.Context
{
    public class BookContext : DbContext
    {
        public BookContext(DbContextOptions<BookContext> options) : base(options) 
        {
        }

        public DbSet<BookItem> BookItems { get; set; }
    }
}
