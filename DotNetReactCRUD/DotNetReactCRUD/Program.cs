
using DotNetReactCRUD.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

namespace DotNetReactCRUD
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<StudentDbContext>
                (opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("defaultCon")));
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", builder =>
                {
                    builder.WithOrigins("http://localhost:5173") // Correct method
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });


            var app = builder.Build();
            // Inject IWebHostEnvironment to check the current environment
            var env = app.Environment;
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseStaticFiles(new StaticFileOptions
                {
                    ServeUnknownFileTypes = true, // For serving uncommon types
                    DefaultContentType = "application/octet-stream" // Default content type
                });
            }
            else
            {
                app.UseStaticFiles(); // Default static file middleware for production
            }
            app.UseCors("AllowAll");
            app.UseHttpsRedirection();

            app.UseAuthorization();
            //app.UseStaticFiles(new StaticFileOptions
            //{
            //    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "StudentImages")),
            //    RequestPath = "/StudentImages",
            //});


            app.MapControllers();

            app.Run();
        }
    }
}
