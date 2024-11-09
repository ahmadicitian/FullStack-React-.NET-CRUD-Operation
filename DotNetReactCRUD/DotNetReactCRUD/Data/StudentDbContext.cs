using DotNetReactCRUD.Models;
using Microsoft.EntityFrameworkCore;

namespace DotNetReactCRUD.Data
{
    public class StudentDbContext : DbContext
    {
        public StudentDbContext(DbContextOptions<StudentDbContext> options) :base(options) { }

        public DbSet<StudentModel> tblStudent { get; set; }
    }
}
