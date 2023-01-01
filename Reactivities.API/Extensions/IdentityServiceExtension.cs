﻿using Microsoft.AspNetCore.Identity;
using Reactivities.Domain;
using Reactivities.Persistence;

namespace Reactivities.API.Extensions;

public static class IdentityServiceExtension
{
    public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddIdentityCore<AppUser>((IdentityOptions options) =>
        {
            options.Password.RequireNonAlphanumeric = false;
        }).AddEntityFrameworkStores<DataContext>();

        services.AddAuthentication();
        
        return services;
    }
}