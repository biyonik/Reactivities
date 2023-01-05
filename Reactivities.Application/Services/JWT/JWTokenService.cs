using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Reactivities.Domain;

namespace Reactivities.Application.Services.JWT;

public class JwTokenService
{
    private readonly IConfiguration _configuration;

    public JwTokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public string CreateToken(AppUser appUser)
    {

        var claims = GetClaims(appUser);
        var secretKey = _configuration.GetSection("TokenOptions")["SecretKey"];
        var key = GetSecrurityKey(secretKey);
        var tokenDescriptor = GetSecurityTokenDescriptor(claims, key);
        var token = Token(tokenDescriptor);
        return token;
    }

    private List<Claim> GetClaims(AppUser appUser)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.Name, appUser.UserName),
            new(ClaimTypes.Email, appUser.Email),
            new(ClaimTypes.NameIdentifier, appUser.Id.ToString())
        };
        return claims;
    }

    public SymmetricSecurityKey GetSecrurityKey(string secretKey)
    {
        var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        return symmetricSecurityKey;
    }

    private SecurityTokenDescriptor GetSecurityTokenDescriptor(List<Claim> claims, SymmetricSecurityKey key)
    {
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = credentials
        };

        return tokenDescriptor;
    }

    private string Token(SecurityTokenDescriptor tokenDescriptor)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}