using System;
using Microsoft.EntityFrameworkCore;
using StudyBuddy.Models;
namespace StudyBuddy.DAL
{
  public class ApplicationDbContext : DbContext
  {
    // Two constructors, first one is empty
    public ApplicationDbContext()
    {

    }

    // Second one injects the context options
    public ApplicationDbContext(DbContextOptions options) : base(options)
    {

    }

    // Create the table based off the model
    public DbSet<Study> Study { get; set; }
    public DbSet<User> User { get; set; }

    private static IConfigurationRoot _configuration;

    // Set the configuration to use the JSON file for the connection string
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      if (!optionsBuilder.IsConfigured)
      {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

        _configuration = builder.Build();
        string cnstr = _configuration.GetConnectionString("StringyConnections");
        optionsBuilder.UseSqlServer(cnstr);
      }
    }
  }

}

