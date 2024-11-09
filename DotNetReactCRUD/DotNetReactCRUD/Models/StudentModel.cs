using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetReactCRUD.Models
{
    public class StudentModel
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        [ValidateNever] 
        public string Image { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }

    }
}
