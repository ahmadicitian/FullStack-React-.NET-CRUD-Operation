using DotNetReactCRUD.Data;
using DotNetReactCRUD.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace DotNetReactCRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly StudentDbContext _studentDbContext;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public StudentController(StudentDbContext studentDbContext,IWebHostEnvironment webHostEnvironment) {
            _studentDbContext = studentDbContext;  
            _webHostEnvironment = webHostEnvironment;
        }
        [HttpPost]
        public async Task<IActionResult> StudentPost([FromForm] StudentModel studentModel)
        {
           studentModel.Image = SaveImage(studentModel.ImageFile);
            if (studentModel.Id == 0)
            {
                await _studentDbContext.tblStudent.AddAsync(studentModel);
                await _studentDbContext.SaveChangesAsync();
                return Ok(studentModel);
            }
            else
            {
                _studentDbContext.tblStudent.Update(studentModel);
                await _studentDbContext.SaveChangesAsync();
                return Ok(studentModel);
            }
        }
        [HttpGet]
        public async Task<IActionResult> StudentsGet()
        {
            var data =await _studentDbContext.tblStudent.ToListAsync();
            return Ok(data);

        }
        [HttpGet ("StudentGet/{id}")]
        public async Task<IActionResult> StudentGet(int id)
        {
            var data =await _studentDbContext.tblStudent.FindAsync(id);
            return Ok(data);

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> StudentDelete(int id)
        {
            var data = await _studentDbContext.tblStudent.FindAsync(id);
             _studentDbContext.tblStudent.Remove(data !);
            await _studentDbContext.SaveChangesAsync();
            return Ok(data);

        }
        [HttpPut("StudentUpdate/{id}")]
        public async Task<IActionResult> StudentUpdate(int id,[FromForm]StudentModel studentModel)
        {
            if (id == studentModel.Id)
            {
                studentModel.Image = SaveImage(studentModel.ImageFile);
                _studentDbContext.tblStudent.Update(studentModel);
                await _studentDbContext.SaveChangesAsync();
                return Ok(studentModel);
            }
            else
            {
                return BadRequest("Invalid Request");
            }
        }
        [NonAction]
        public string SaveImage(IFormFile File)
        {
            if (File != null)
            {


                string wwroot = _webHostEnvironment.WebRootPath;
                string Ext = Guid.NewGuid().ToString() + Path.GetExtension(File.FileName);
                string fileNamee = Path.Combine("https://localhost:7057" + "/StudentImages/", Ext);
                string imagepath = Path.Combine(wwroot, "StudentImages", Ext);
                using (var filestream = new FileStream(imagepath, FileMode.Create))
                {
                    File.CopyTo(filestream);
                }
                return fileNamee;
            }
            return string.Empty;
        }
    }
}
