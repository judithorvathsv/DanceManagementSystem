
using DanceApi.Models;
using Microsoft.EntityFrameworkCore;

namespace DanceApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<DanceClass> Classes { get; set; }

        public DbSet<Lecture> Lectures { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DanceClass>()
            .HasMany(l => l.Lectures)
            .WithOne(d => d.DanceClass)
            .HasForeignKey(d => d.DanceClassId)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}