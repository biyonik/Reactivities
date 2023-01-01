using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Reactivities.Domain;

namespace Reactivities.Persistence;

public class DataContext : IdentityDbContext<AppUser, AppRole, Guid>
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    public DbSet<Activity> Activities { get; set; }
}