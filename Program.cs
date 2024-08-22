
using helpinghands.Models;
using System.Text.Json.Serialization;

namespace helpinghands
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
			builder.Services.AddControllers().AddJsonOptions(x =>
			{
				x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
				x.JsonSerializerOptions.WriteIndented = true;
			});
			builder.Services.AddCors(policybuilder => policybuilder.AddDefaultPolicy(policy => policy.WithOrigins("*").AllowAnyHeader()));
			builder.Services.AddControllers().AddJsonOptions(x =>
			x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
			builder.Services.AddDbContext<HelpinghandsContext>();
			var app = builder.Build();

			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseHttpsRedirection();

			app.UseAuthorization();


			app.MapControllers();
			app.UseCors(x=> x
			.AllowAnyMethod()
			.AllowAnyHeader()
			.SetIsOriginAllowed(origin => true)
			.AllowCredentials()
			);
			app.Run();
		}
	}
}
