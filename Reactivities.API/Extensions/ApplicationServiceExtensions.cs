using MediatR;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Reactivities.Application.Activities;
using Reactivities.Application.Core;
using Reactivities.Persistence;

namespace Reactivities.API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<DataContext>(options =>
        {
            options.UseNpgsql(configuration.GetConnectionString("Default"));
        });
        services.AddCors((CorsOptions options) =>
        {
            options.AddPolicy("CorsPolicy",
                (CorsPolicyBuilder policy) => { policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod(); });
        });
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        services.AddMediatR(typeof(List.Query));
        services.AddAutoMapper(typeof(MappingProfiles).Assembly);
        return services;
    }
}