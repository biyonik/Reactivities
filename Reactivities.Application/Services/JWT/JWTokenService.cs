using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Reactivities.Domain;

namespace Reactivities.Application.Services.JWT;

public class JwTokenService
{
    public string CreateToken(AppUser appUser)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.Name, appUser.UserName),
            new(ClaimTypes.Email, appUser.Email),
            new(ClaimTypes.NameIdentifier, appUser.Id.ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("$up3r s3cr3t key f0r reactivities @PP"));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = credentials
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}