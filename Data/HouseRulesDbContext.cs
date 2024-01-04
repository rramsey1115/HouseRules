using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using HouseRules.Models;
using Microsoft.AspNetCore.Identity;

namespace HouseRules.Data;
public class HouseRulesDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Chore> Chores { get; set; }
    public DbSet<ChoreAssignment> ChoreAssignments { get; set; }
    public DbSet<ChoreCompletion> ChoreCompletions { get; set; }

    public HouseRulesDbContext(DbContextOptions<HouseRulesDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admina@strator.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });

        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Admina",
            LastName = "Strator",
            Address = "101 Main Street"
        });

        modelBuilder.Entity<Chore>().HasData(
            new Chore
            {
                Id = 1,
                Name = "Take Out Trash",
                Difficulty = 1,
                ChoreFrequencyDays = 4
            },
            new Chore
            {
                Id = 2,
                Name = "Vacuum",
                Difficulty = 2,
                ChoreFrequencyDays = 5
            },
            new Chore
            {
                Id = 3,
                Name = "Scrub Bathtub",
                Difficulty = 4,
                ChoreFrequencyDays = 14
            },
            new Chore
            {
                Id = 4,
                Name = "Mow the Lawn",
                Difficulty = 5,
                ChoreFrequencyDays = 14
            },
            new Chore 
            {
                Id = 5,
                Name = "Mop Kitchen Floors",
                Difficulty = 3,
                ChoreFrequencyDays = 7
            }
        );

        modelBuilder.Entity<ChoreAssignment>().HasData(
            new ChoreAssignment
            {
                Id = 1,
                UserProfileId = 1,
                ChoreId = 3
            },
            new ChoreAssignment
            {
                Id = 2,
                UserProfileId = 1,
                ChoreId = 1
            }
        );

        modelBuilder.Entity<ChoreCompletion>().HasData(
            new ChoreCompletion
            {
                Id = 1,
                UserProfileId = 1,
                ChoreId = 1,
                CompletedOn = new DateTime(2023-01-03)
            }

        );

    }
}