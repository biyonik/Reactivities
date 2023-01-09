using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Reactivities.Application.Services.JWT;
using Reactivities.Domain;
using Reactivities.Infrastructure.Security;
using Reactivities.Persistence;

namespace Reactivities.API.Extensions;

public static class IdentityServiceExtension
{
    public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddIdentityCore<AppUser>((IdentityOptions options) =>
        {
            options.Password.RequireNonAlphanumeric = false;
            options.User.RequireUniqueEmail = true;
        }).AddEntityFrameworkStores<DataContext>();

        var secretKey = configuration.GetSection("TokenOptions")["SecretKey"];
        var key = new JwTokenService(configuration).GetSecrurityKey(secretKey);

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer((JwtBearerOptions options) =>
            {
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

        services.AddAuthorization((AuthorizationOptions options) =>
        {
            options.AddPolicy("IsActivityHost", (AuthorizationPolicyBuilder policy) =>
            {
                policy.Requirements.Add(new IsHostRequirement());
            });
        });
        services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();
        services.AddScoped<JwTokenService>();
        return services;
    }
}