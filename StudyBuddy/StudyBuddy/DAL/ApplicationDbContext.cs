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
    public DbSet<Favorite> Favorites { get; set; }

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
    public List<User> GetUsers()
    {
      return User.ToList();
    }
    public User GetUser(string userName, string password)
    {
      User user = GetUsers().FirstOrDefault(x => x.UserName == userName && x.Password == password);
      if (user == null)
      {
        return null;
      }
      return user;
    }
    public User GetUserById(int id)
    {
      User user = GetUsers().FirstOrDefault(x => x.Id == id);
      if(user == null)
      {
        return null;
      }
      return user;
    }
    public User AddUser(string userName, string password)
    {
      User.Add(new Models.User()
      {
        UserName = userName,
        Password = password
      });
      SaveChanges();
      return GetUser(userName, password);
    }
    public Study FavoriteStudy(int studyId, int userId)
    {
      Study study = GetStudy(studyId);
      User user = GetUserById(userId);
      Favorite favorite = new Favorite()
      {
        StudyId = study.Id,
        UserId = user.Id
      };
      if (user != null && study != null)
      {
        Favorites.Add(favorite);
        SaveChanges();
        return study;
      }
      return null;
    }
    public List<Study> GetStudies()
    {
      return Study.ToList();
    }
    public Study GetStudy(int studyId)
    {
      Study study = GetStudies().FirstOrDefault(x => x.Id == studyId);
      if(study == null)
      {
        return null;
      }
      return study;
    }
    public Study AddStudy(string question, string answer)
    {
      Study study = new Study()
      {
        Question= question,
        Answer= answer
      };
      Study.Add(study);
      SaveChanges();
      return study;
    }
    public List<Favorite> JustFavorites()
    {
      return Favorites.ToList();
    }
    public List<Study> GetAllFavorites(int userId)
    {
      List<Study> favorites = JustFavorites().Where(x => x.UserId == userId).Select(x => GetStudy(x.StudyId)).ToList();
      if (favorites == null)
      {
        return null;
      }
      return favorites;
    }
    public bool DeleteFromFavoriteById(int userId, int studyId)
    {
      Favorite favorite = Favorites.Where(x => x.UserId == userId).FirstOrDefault(x => x.StudyId == studyId);

      if (favorite == null)
      {
        return false;
      }
      Favorites.Remove(favorite);
      SaveChanges();

      return true;
    }
  }
}

