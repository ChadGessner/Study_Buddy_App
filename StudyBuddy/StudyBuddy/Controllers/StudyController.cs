using Microsoft.AspNetCore.Mvc;
using StudyBuddy.DAL;
using StudyBuddy.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StudyBuddy.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class StudyController : ControllerBase
  {
    private ApplicationDbContext _db;
    public StudyController()
    {
      _db = new ApplicationDbContext();
    }
    [HttpGet]
    public IEnumerable<Study> Get()
    {
      return _db.GetStudies();
    }


    [HttpGet("{id}")]
    public Study Get(int id)
    {
      return _db.GetStudy(id);
    }


    [HttpPost("{question}/{answer}")]
    public Study Post(string question, string answer)
    {
      return _db.AddStudy(question, answer);
    }


    //[HttpPut("{studyId}/{userId}")]
    //public Study PutFavorite(int studyId, int userId)
    //{
    //  return _db.FavoriteStudy(studyId, userId);

    //}


    [HttpDelete("{id}")]
    public void Delete(int id)
    {

    }
  }
}
