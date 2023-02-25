using Microsoft.AspNetCore.Mvc;
using StudyBuddy.DAL;
using StudyBuddy.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StudyBuddy.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {
    private ApplicationDbContext _db;
    public UserController()
    {
      _db = new ApplicationDbContext();
    }
    [HttpGet]
    public List<User> Get()
    {
      return _db.GetUsers();
    }


    [HttpGet("{userName}/{password}")]
    public User Get(string userName, string password)
    {
      return _db.GetUser(userName, password);
    }


    [HttpPost("{userName}/{password}")]
    public User Post(string userName,string password)
    {
      return _db.AddUser(userName, password);
    }


    [HttpPost("SelectFavorite{studyId}/{userId}")]
    public Study PutFavorite(int studyId, int userId)
    {
      return _db.FavoriteStudy(studyId, userId);

    }
    [HttpPost("DeleteFavorite/{studyId}/{userId}")]
    public bool DeleteFavorite(int userId, int studyId)
    {
      return _db.DeleteFromFavoriteById(userId, studyId);
    }


    [HttpGet("GetAllFavorites/{userId}")]
    public List<Study> GetAllFavorites(int userId)
    {
      return _db.GetAllFavorites(userId);
    }
  }
}
